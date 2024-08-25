import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { db } from '../utils/firebase';

const useFirestore = (collectionName) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    console.error(`Firestore error: ${error.message}`);
    setError(error.message);
    setLoading(false);
  };

  const addDocument = useCallback(
    async (data) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = await addDoc(collection(db, collectionName), data);
        setLoading(false);
        return docRef.id;
      } catch (error) {
        handleError(error);
      }
    },
    [collectionName],
  );

  const getDocument = useCallback(
    async (documentId) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        setLoading(false);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          return null;
        }
      } catch (error) {
        handleError(error);
      }
    },
    [collectionName],
  );

  const getAllDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      return documents;
    } catch (error) {
      handleError(error);
    }
  }, [collectionName]);

  const updateDocument = useCallback(
    async (documentId, data) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, data);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    },
    [collectionName],
  );

  const deleteDocument = useCallback(
    async (documentId) => {
      setLoading(true);
      setError(null);
      try {
        await deleteDoc(doc(db, collectionName, documentId));
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    },
    [collectionName],
  );

  return {
    addDocument,
    getDocument,
    getAllDocuments,
    updateDocument,
    deleteDocument,
    loading,
    error,
  };
};

export { useFirestore };
