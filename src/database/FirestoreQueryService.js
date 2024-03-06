// services/FirestoreService.js
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';

const db = getFirestore();

const useFirestoreService = (collectionName) => {
  const data = ref([]);

  const fetchCollection = () => {
    const collectionRef = collection(db, collectionName);

    // Use onSnapshot to observe changes in the collection
    onSnapshot(collectionRef, (snapshot) => {
      data.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  };

  return {
    data,
    fetchCollection,
  };
};

export default useFirestoreService;
