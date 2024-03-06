import { getDatabase, ref, onValue, set, remove, runTransaction } from 'firebase/database'; // Adjust the path as needed

class FirebaseService {

  constructor() {
    // Evita instâncias da classe
  }
    
  static async setData(path,data) {
    try {
      const itemsRef = ref(getDatabase(), path);
      await set(itemsRef, data);
      console.log('Data set successfully:', data);
    } catch (error) {
      console.error('Error setting data:', error.message);
      throw error;
    }
  }

  static async getData(path) {

    try {
      
     

      const itensRef = ref(getDatabase(), path);  
        
      onValue(itensRef, (snapshot) => {

              let itens = [];

              snapshot.forEach((childSnapshot) => {
                const item = {
                  key: childSnapshot.key,
                  ...childSnapshot.val(),
                };
                itens.push(item);
              });
              
              return itens;

      });
          
    } catch (error) {
      console.error('Error getting data:', error.message);
      throw error;
    }

  }

  static async deleteData(path) {
    try {
      const itemsRef = ref(getDatabase(), path); // Adjust the path as needed
      await remove(itemsRef);
      console.log('Data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error.message);
      throw error;
    }
  }

  static async incrementarValue(path) {
    try {

      // Use once para buscar o documento uma vez
      const snapshot = await this.getData('Sequencia/' + path);

      if (!snapshot) {
        console.warn('Documento não encontrado.');
        return;
      }

      // Obtenha o valor atual do campo "codigo"
      const codigoAtual = snapshot.codigo || 0;

      // Incrementa o valor do campo "codigo"
      const novoCodigo = codigoAtual + 1;

      // Atualize o campo "codigo" no Realtime Database
      await this.setData('Sequencia/' + path, { codigo: novoCodigo });

      console.log('Código incrementado com sucesso:', novoCodigo);
      return novoCodigo;
    } catch (error) {
      console.error('Erro ao incrementar código:', error);
    }
  

}

static incrementarCodigo = async (path) => {
  const dataRef = ref(getDatabase(), path);

  try {
    await runTransaction(dataRef, (currentData) => {
      // Ensure the data exists before trying to increment
      if (!currentData) {
        return 0; // If it doesn't exist, initialize it to 0
      }

      // Increment the existing value
      return currentData + 1;
    });
    console.log('Increment successful');
  } catch (error) {
    console.error('Error incrementing value:', error);
  }
}
}
export default FirebaseService