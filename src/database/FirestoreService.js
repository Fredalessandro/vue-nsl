import { getFirestore, doc, getDoc, addDoc, updateDoc, increment, setDoc, deleteDoc, collection, getDocs,  query, where } from 'firebase/firestore';


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
    try {
      const documentRef = doc(db, collection, documentId);
      await setDoc(documentRef, {...data});
    }  catch (error) {
      console.error('Error set document:', error);
    } 

  },

  async add(collectionName, data) {
    try {
      
      const collectionRef = collection(db, collectionName);
      
      const doc = await addDoc(collectionRef, { ...data });
     
      data.id = doc.id;

      this.set(collectionName, doc.id, {...data});

      console.log('Document added successfully with ID:', doc.id);
      
      return  data;

    } catch (error) {
      console.error('Error adding document:', error);
    } 
    return null;
  },

  async remove(collection, documentId) {
    const documentRef = doc(db, collection, documentId);
    await deleteDoc(documentRef);
  },
  async executeQuery(path, atributo, operador, valor) {
    const collectionRef = collection(db, path); // Replace with your Firestore collection name
    const q = query(collectionRef, where(atributo, operador, valor)); // Replace with your query conditions

      // Replace with your field name and desired value
      try {
        const querySnapshot =  getDocs(q);

        if (querySnapshot.size > 0) {
          // Document with the specified filter condition found
          const documentData = querySnapshot.docs[0].data();
          console.log('Document data:', documentData);
          return documentData;
        } else {
          // No document matching the filter condition found
          console.log('No document found with the specified filter condition');
          return null;
        }
      } catch (error) {
        // Handle error
        console.error('Error getting document with filter:', error.message);
      }
    }
}

export default FirestoreService;