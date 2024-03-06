import { getFirestore, doc, getDoc, addDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore();

const FirestoreService = {
  
  async get(collection, documentId) {
    const documentRef = doc(db, collection, documentId);
    const docSnap = await getDoc(documentRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },

  async set(collection, documentId, data) {
    const documentRef = doc(db, collection, documentId);
    await setDoc(documentRef, {...data});
  },

  async add(collectionName, data) {
    try {
      
     const documentId = uuidv4();
    
     const collectionRef = collection(db, collectionName);
      
     const docment = await addDoc(collectionRef, { ...data });
     
     data.id = docment.id;
     const documentRefSet = doc(db, collectionName, docment.id);
     await setDoc(documentRefSet, {...data});
     
     console.log('Document added successfully with ID:', documentId);
      //fetchCollection(); // Optionally fetch the updated collection after adding a document
    } catch (error) {
      console.error('Error adding document:', error);
    }
  },

  async remove(collection, documentId) {
    const documentRef = doc(db, collection, documentId);
    await deleteDoc(documentRef);
  },
  
  
};



export default FirestoreService;