import { collection, onSnapshot, query, setDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
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

export interface HowToApplyData {
  id: string;
  title: string;
  lastUpdate: string;
  content: string;
  imageUrl?: string;
}

export interface AcademicCalendarData {
  id: string;
  title: string;
  lastUpdate: string;
  content: string;
  imageUrl?: string;
}

const EXAM_DETAILS_COLLECTION = 'exam_details';
const FEE_DETAILS_COLLECTION = 'fee_details';
const HOW_TO_APPLY_COLLECTION = 'how_to_apply';
const ACADEMIC_CALENDAR_COLLECTION = 'academic_calendar';

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

export const addExamDetail = async (detail: Omit<ExamDetailData, 'id'>, id: string = '1') => {
  await setDoc(doc(db, EXAM_DETAILS_COLLECTION, id), {
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

export const addFeeDetail = async (detail: Omit<FeeDetailData, 'id'>, id: string = '1') => {
  await setDoc(doc(db, FEE_DETAILS_COLLECTION, id), {
    ...detail,
    createdAt: serverTimestamp()
  });
};

export const getHowToApplyById = async (id: string): Promise<HowToApplyData | null> => {
  const docRef = doc(db, HOW_TO_APPLY_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as HowToApplyData;
  }
  return null;
};

export const addHowToApply = async (detail: Omit<HowToApplyData, 'id'>, id: string = '1') => {
  await setDoc(doc(db, HOW_TO_APPLY_COLLECTION, id), {
    ...detail,
    createdAt: serverTimestamp()
  });
};

export const getAcademicCalendarById = async (id: string): Promise<AcademicCalendarData | null> => {
  const docRef = doc(db, ACADEMIC_CALENDAR_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as AcademicCalendarData;
  }
  return null;
};

export const addAcademicCalendar = async (detail: Omit<AcademicCalendarData, 'id'>, id: string = '1') => {
  await setDoc(doc(db, ACADEMIC_CALENDAR_COLLECTION, id), {
    ...detail,
    createdAt: serverTimestamp()
  });
};
