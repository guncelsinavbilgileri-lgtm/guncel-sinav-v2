import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  getDocFromServer, 
  getDocsFromServer, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  limit,
  getFirestore,
  terminate
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import firebaseConfig from '../firebase-applet-config.json';
import { NewsItem } from '../types';

const NEWS_COLLECTION = 'news';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const subscribeToNews = (callback: (news: NewsItem[]) => void) => {
  const q = query(collection(db, NEWS_COLLECTION), orderBy('order', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const news = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as NewsItem));
    callback(news);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, NEWS_COLLECTION);
  });
};

export const addNewsItem = async (news: Omit<NewsItem, 'id'>) => {
  try {
    await addDoc(collection(db, NEWS_COLLECTION), {
      ...news,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, NEWS_COLLECTION);
  }
};

export const setNewsItem = async (news: Omit<NewsItem, 'id'>, id: string) => {
  try {
    await setDoc(doc(db, NEWS_COLLECTION, id), {
      ...news,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, NEWS_COLLECTION);
  }
};

export const clearNews = async () => {
  try {
    const q = query(collection(db, NEWS_COLLECTION));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, NEWS_COLLECTION);
  }
};

import { signInAnonymously } from 'firebase/auth';

export const testConnection = async () => {
  let internetStatus = "Kontrol ediliyor...";
  let domainStatus = "Bekliyor...";
  let restStatus = "Bekliyor...";
  let authStatus = "Bekliyor...";
  
  try {
    // 1. Genel internet kontrolü
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      await fetch('https://8.8.8.8', { mode: 'no-cors', signal: controller.signal });
      clearTimeout(timeoutId);
      internetStatus = "OK";
    } catch (e) {
      internetStatus = "HATA";
    }

    // 2. Domain Kontrolü
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      await fetch(`https://${firebaseConfig.authDomain}`, { mode: 'no-cors', signal: controller.signal });
      clearTimeout(timeoutId);
      domainStatus = "OK";
    } catch (e) {
      domainStatus = "ENGEL";
    }

    // 3. REST API Testi (SDK'sız direkt bağlantı)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnSecureToken: true }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      restStatus = res.ok ? "OK" : `HATA (${res.status})`;
    } catch (e) {
      restStatus = "ZAMAN AŞIMI";
    }

    // 4. Auth SDK Testi
    try {
      const authPromise = signInAnonymously(auth);
      const authTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Zaman Aşımı')), 15000)
      );
      await Promise.race([authPromise, authTimeout]);
      authStatus = "OK";
    } catch (e: any) {
      authStatus = `HATA (${e.code || 'Timeout'})`;
    }

    // 5. DB Testi
    const newsCollection = collection(db, 'news');
    const q = query(newsCollection, limit(1));
    const fetchPromise = getDocsFromServer(q);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Zaman Aşımı')), 15000)
    );
    await Promise.race([fetchPromise, timeoutPromise]);
    
    return { success: true, message: `Bağlantı Başarılı! (İnt: ${internetStatus}, Rest: ${restStatus}, Auth: ${authStatus})` };
  } catch (error: any) {
    return { 
      success: false, 
      message: `İnt: ${internetStatus} | Dom: ${domainStatus} | Rest: ${restStatus} | Auth: ${authStatus} | DB: ${error.message}`,
      code: error.code || 'N/A'
    };
  }
};
