import { getFirestore, doc, getDoc, addDoc, setDoc, deleteDoc, collection, getDocs,  query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore();

const FirestoreService = {
  
  async createEmptyCollection(collectionName) {
    const newCollectionRef = collection(db, collectionName); // Replace with your desired collection name

    try {
      await addDoc(newCollectionRef, {}); // Add an empty document to the collection
      console.log('Empty collection created successfully');
    } catch (error) {
      // Handle error
      console.error('Error creating empty collection:', error.message);
    }
  },
  
  async checkCollectionExistence(collectionName) {

    const collectionRef = collection(db, collectionName); // Replace with your desired collection name

    try {
      const querySnapshot = await getDocs(collectionRef);

      if (querySnapshot.size > 0) {
        // Collection exists and has documents
        console.log('Collection exists');
        return true;
        
      } else {
        // Collection does not exist or is empty
        console.log('Collection does not exist or is empty');
        return false;
        
      }
    } catch (error) {
      // Handle error
      console.error('Error checking collection existence:', error.message);
    }
  },

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

     /*const exists = await this.checkCollectionExistence(collectionName);
     if (!exists) {
        await this.createEmptyCollection(collectionName);
     }*/
    
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
  
  async executeQuery(path, atributo, operador, valor) {
    const collectionRef = collection(db, path); // Replace with your Firestore collection name
    const q = query(collectionRef, where(atributo, operador, valor)); // Replace with your query conditions

    try {
      const querySnapshot = await getDocs(q);
      let queryResults = [];
      queryResults = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: () => doc.data(),
      }));
      return queryResults?queryResults[0]:null;
    } catch (error) {
      // Handle error
      console.error('Error executing query:', error.message);
    }
    return null;
  },
  
};



export default FirestoreService;