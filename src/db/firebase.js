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

const storage = firebase.storage().ref()

const teamsRef = db.collection('teams')

export const addTeam = async team => {
  const teamRef = teamsRef.doc(team.name)
  const newTeam = await teamRef.set({
    name: team.name,
  })
  await team.members.forEach(member => teamRef.collection('members').doc(member).set({id: member}))
  return newTeam ? newTeam : undefined
}

export const getAllTeams = async user => {
  const teams = []
  const teamQuery = await db.collectionGroup('members').where('id', '==', `${user}`).get()
  if(teamQuery) teamQuery.forEach(team => teams.push(team.data()))
  return teams
}

export const getTeam = async (team, user) => {
  const teamResult = await teamsRef.doc(team).get()
  const userResult = await teamsRef.doc(team).collection('members').doc(user).get()
  return { ...teamResult.data(), user: userResult.data() }
}

export const addQuest = async (quest, team) => {
  const newQuest = await teamsRef.doc(team).collection('quests').add({
    name: quest.name,
    description: quest.description,
    experience: quest.experience,
    reward: quest.reward
  })
  return newQuest
}

export const getAllQuests = async team => {
  const quests = []
  const questQuery = await teamsRef.doc(team).collection('quests').get()
  if(questQuery) questQuery.forEach(quest => quests.push(quest.data()))
  return quests
}

export const getQuest = async (quest, team) => {
  const questResult = await teamsRef.doc(team).collection('quests').doc(quest).get()
  return { id: questResult.id, ...questResult.data() }
}

export const updateProfile = async (team, profile) => {
  const profileRef = teamsRef.doc(team.name).collection('members').doc(team.user.id)
  const updatedProfile = await profileRef.update(profile)
  return updatedProfile
}

export const updateAvatar = async (team, file) => {
  const newAvatar = await storage.child(`avatars/${team.user.id}`).put(file)
  const imgLocation = await newAvatar.ref.getDownloadURL()
  const userRef = teamsRef.doc(team.name).collection('members').doc(team.user.id)
  await userRef.update({ avatar: imgLocation })
}

export const addMessage = async (team, quest, message, user) => {
  const questRef = teamsRef.doc(team.name).collection('quests').doc(quest.id).collection('messages')
  const newMessage = await questRef.add({ message, user, time: firebase.firestore.FieldValue.serverTimestamp()})
  return newMessage.data()
}