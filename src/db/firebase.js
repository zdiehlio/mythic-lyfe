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
const fieldValue = firebase.firestore.FieldValue

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
    reward: quest.reward,
    questGiver: team.user.id,
    hero: null
  })
  return newQuest
}

export const acceptQuest = async (quest, team) => {
  return await teamsRef.doc(team.name).collection('quests').doc(quest.id).update({
    hero: team.user.id
  })
}

export const finishQuest = async (quest, team) => {
  await teamsRef.doc(team.name).collection('quests').doc(quest.id).delete()
  return await teamsRef.doc(team.name).collection('completeQuests').add(quest)
}

export const getAllQuests = async team => {
  const quests = []
  const userQuests = []
  const questQuery = await teamsRef.doc(team.name).collection('quests').get()
  if(questQuery) questQuery.forEach(quest => {
    const questBody = quest.data()
    if(!questBody.hero) {
      quests.push({ id: quest.id, ...questBody })
    } else if(questBody.hero === team.user.id) {
      userQuests.push({ id: quest.id, ...questBody})
    }
  })
  return [ quests, userQuests]
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
  const questRef = teamsRef.doc(team.name).collection('quests').doc(quest.id)
  try {
    const time = Date.now()
    await questRef.update({ messages: fieldValue.arrayUnion({ message, user, time })})
    return { success: true, time }
  } catch(error) {
    return { success: false, error}
  }
}