import firebase from 'firebase'
import { FB_API_KEY } from '../env.config';

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: "mythic-planning.firebaseapp.com",
  databaseURL: "https://mythic-planning.firebaseio.com",
  projectId: "mythic-planning",
  storageBucket: "mythic-planning.appspot.com",
  messagingSenderId: "191327179286",
  appId: "1:191327179286:web:dda107d301d5ec6f889b37"
}

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig)