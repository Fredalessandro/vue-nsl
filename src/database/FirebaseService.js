import Sequencia from '@/model/Sequencia';
import firebase from 'firebase/app';
import 'firebase/database';

class FirebaseService {

   static firebaseConfig = {
    apiKey: "AIzaSyDs7aTdlcDuutBnrjK25ky7xwouiK1wbsA",
    authDomain: "apisurf-64cfd.firebaseapp.com",
    //databaseURL: "https://apisurf-64cfd-default-rtdb.firebaseio.com",
    databaseURL: "http://localhost:9000/?ns=apisurf-64cfd", 
    projectId: "apisurf-64cfd",
    storageBucket: "apisurf-64cfd.appspot.com",
    messagingSenderId: "8261911800",
    appId: "1:8261911800:web:9313dc0ed3a305ef5be70d",
    measurementId: "G-VB1PFWTN1G"
  };

   static database = firebase.database.Database;


  constructor() {
    // Evita instâncias da classe
  }

  static initializeApp() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
      this.database = firebase.database();
    }
  }

  static async incrementarCodigo() {
    try {
      const idDoDocumento = 'usuario'; // Substitua pelo ID real do documento
      const databaseRef = firebase.database().ref('Sequencia/' + idDoDocumento);

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
  static async getSequencia() {
     let dados;
     const snapshot = await this.database.ref('sequencia').once('value');
     dados.value = snapshot ? Object.values(snapshot) : [];


    return dados;
  }

  static async getData(path) {
    const snapshot = await this.database.ref(path).once('value');
    return snapshot.toJSON();
  }

  static async setData(path, data) {
    await this.database.ref(path).set(data);
  }
}
export default FirebaseService