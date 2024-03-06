// src/firebase.js
// firebase.js
import firebaseConfig from '@/configuration/firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import { initializeApp } from 'firebase/compat/app';
//import { getDatabase, ref, set, remove, query, onValue } from 'firebase/database';
//import  'firebase/compat/auth'
//const firebaseApp = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database;
const auth = firebase.auth;
export { firebase, database };