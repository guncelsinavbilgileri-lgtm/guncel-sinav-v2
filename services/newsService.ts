import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp, getDocFromServer, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
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

export const testConnection = async () => {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
};
