import Sequencia from '@/model/Sequencia';
import firebaseConfig from '../configuration/firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/database';

class FirebaseService {

  static database = firebase.database.Database;
  
  constructor() {
    // Evita instâncias da classe
  }

  static initializeApp() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      this.database = firebase.database();
      
    }
    
    
  }

  static async incrementarCodigo(path) {
    try {
       // Substitua pelo ID real do documento
      const databaseRef = firebase.database().ref('Sequencia/' + path);

      // Use once para buscar o documento uma vez
      const snapshot = await databaseRef.once('value');

      if (!snapshot.exists()) {
        console.warn('Documento não encontrado.');
        return;
      }

      // Obtenha o valor atual do campo "codigo"
      const codigoAtual = snapshot.val().codigo || 0;

      // Incrementa o valor do campo "codigo"
      const novoCodigo = codigoAtual + 1;

      // Atualize o campo "codigo" no Realtime Database
      await databaseRef.update({ codigo: novoCodigo });


      console.log('Código incrementado com sucesso:', novoCodigo);
      return novoCodigo;
    } catch (error) {
      console.error('Erro ao incrementar código:', error);
    }
  
  }

  static async getSequencia(idDoDocumento) {
    let dados;
     const snapshot = await this.database.ref('Sequencia/' + idDoDocumento).once('value');
     dados.value = snapshot ? Object.values(snapshot) : [];
    return dados;
  }

  static async getData(path) {
    const snapshot = await this.database.ref(path).once('value');
    return snapshot.toJSON();
  }

  static async setData(path, data) { 
    try {
      await this.database.ref(path).set(data);
      console.log('Document insert successfully!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }
  
  static async updateData(path, documentId, data) {
    try {
      await this.database.ref(path+documentId).update(data);
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

 static async deleteData(path, documentId) {
    
      await this.database.ref(path+documentId).remove()
      .then(() => {
        console.log('Data deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

  }

}
export default FirebaseService