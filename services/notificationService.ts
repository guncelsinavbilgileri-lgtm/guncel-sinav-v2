import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const saveFcmToken = async (token: string, userId?: string) => {
  try {
    const tokensRef = collection(db, 'fcm_tokens');
    const q = query(tokensRef, where('token', '==', token));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(tokensRef, {
        token,
        userId: userId || null,
        lastUpdated: serverTimestamp(),
        platform: Capacitor.getPlatform()
      });
    } else {
      const tokenDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'fcm_tokens', tokenDoc.id), {
        lastUpdated: serverTimestamp(),
        userId: userId || tokenDoc.data().userId
      });
    }
  } catch (error) {
    console.error("Error saving FCM token:", error);
  }
};

export const initializePushNotifications = async () => {
  // Only run on native platforms (iOS/Android)
  if (!Capacitor.isNativePlatform()) {
    console.log('Push notifications skipped: Not on a native platform.');
    return;
  }

  try {
    // Request permission to use push notifications
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    // Register with Apple / Google to receive push notifications
    await PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token: ' + token.value);
      saveFcmToken(token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received: ' + JSON.stringify(notification));
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
    });

  } catch (error) {
    console.error('Push notification initialization error:', error);
  }
};
