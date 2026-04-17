import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, User, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// iOS/Capacitor için en güvenli Auth başlatma
export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
});

console.log("Initializing Firestore with Project ID:", firebaseConfig.projectId);

// iOS ve Mobil için EN STABİL başlatma yöntemi (Long Polling Zorunlu)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  experimentalAutoDetectLongPolling: false, // Otomatik algılamayı kapat, direkt zorla
}, firebaseConfig.firestoreDatabaseId || '(default)');

export { onAuthStateChanged };
export type { User };
