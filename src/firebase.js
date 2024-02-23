// src/firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './configuration/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
