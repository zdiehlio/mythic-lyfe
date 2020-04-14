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

const db = firebase.firestore()

export const addTeam = async team => {
  const newTeam = await db.collection('teams').doc(team.name).set({
    name: team.name,
    members: team.members
  })
  return newTeam
}

export const getTeams = async user => {
  const teams = []
  const teamQuery = await db.collection('teams').where('members', 'array-contains', `${user}`).get()
  if(teamQuery) teamQuery.forEach(team => teams.push(team.data()))
  return teams
}

export const getTeam = async team => {
  const teamResult = await db.collection('teams').doc(team).get()
  return teamResult.data()
}