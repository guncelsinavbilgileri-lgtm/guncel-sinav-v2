import { collection, onSnapshot, query, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export interface ExamDetailData {
  id: string;
  title: string;
  lastUpdate: string;
  content: string;
  imageUrl?: string;
}

export interface FeeDetailData {
  id: string;
  title: string;
  lastUpdate: string;
  content: string;
  imageUrl?: string;
}

const EXAM_DETAILS_COLLECTION = 'exam_details';
const FEE_DETAILS_COLLECTION = 'fee_details';

export const subscribeToExamDetails = (callback: (details: ExamDetailData[]) => void) => {
  const q = query(collection(db, EXAM_DETAILS_COLLECTION));
  
  return onSnapshot(q, (snapshot) => {
    const details = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ExamDetailData));
    callback(details);
  });
};

export const getExamDetailById = async (id: string): Promise<ExamDetailData | null> => {
  const docRef = doc(db, EXAM_DETAILS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ExamDetailData;
  }
  return null;
};

export const addExamDetail = async (detail: Omit<ExamDetailData, 'id'>) => {
  await addDoc(collection(db, EXAM_DETAILS_COLLECTION), {
    ...detail,
    createdAt: serverTimestamp()
  });
};

export const getFeeDetailById = async (id: string): Promise<FeeDetailData | null> => {
  const docRef = doc(db, FEE_DETAILS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as FeeDetailData;
  }
  return null;
};

export const addFeeDetail = async (detail: Omit<FeeDetailData, 'id'>) => {
  await addDoc(collection(db, FEE_DETAILS_COLLECTION), {
    ...detail,
    createdAt: serverTimestamp()
  });
};
