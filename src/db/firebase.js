import firebase from 'firebase'
import { FB_API_KEY } from '../env.config'

const firebaseConfig = {
	apiKey: FB_API_KEY,
	authDomain: 'mythic-planning.firebaseapp.com',
	databaseURL: 'https://mythic-planning.firebaseio.com',
	projectId: 'mythic-planning',
	storageBucket: 'mythic-planning.appspot.com',
	messagingSenderId: '191327179286',
	appId: '1:191327179286:web:dda107d301d5ec6f889b37'
}

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const fieldValue = firebase.firestore.FieldValue

const storage = firebase.storage().ref()

export const teamsRef = db.collection('teams')

export const addTeam = async team => {
	const teamRef = teamsRef.doc(team.name)
	const newTeam = await teamRef.set({
		name: team.name
	})
	await team.members.forEach(member =>
		teamRef
			.collection('members')
			.doc(member)
			.set({ id: member })
	)
	return newTeam ? newTeam : undefined
}

export const getAllTeams = async user => {
	const teams = []
	const teamQuery = await db
		.collectionGroup('members')
		.where('id', '==', `${user}`)
		.get()
	if (teamQuery) teamQuery.forEach(team => teams.push(team.data()))
	return teams
}

export const getTeam = async (team, user) => {
	const teamResult = await teamsRef.doc(team).get()
	const userResult = await teamsRef
		.doc(team)
		.collection('members')
		.doc(user)
		.get()
	return { ...teamResult.data(), user: userResult.data() }
}

export const addQuest = async (quest, team) => {
	const questRef = teamsRef.doc(team.name).collection('quests')
	await questRef.add({
		name: quest.name,
		description: quest.description,
		experience: quest.experience,
		reward: quest.reward,
		questGiver: team.user.id,
		hero: null,
		assignee: null,
		status: quest.status
	})
}

export const acceptQuest = async (quest, team) => {
	return await teamsRef
		.doc(team.name)
		.collection('quests')
		.doc(quest.id)
		.update({
			hero: team.user.id,
			assignee: team.user.id,
			status: 'active'
		})
}

export const finishQuest = async (quest, team) => {
	const questRef = teamsRef
		.doc(team.name)
		.collection('quests')
		.doc(quest.id)
	return await questRef.update({
		assignee: quest.questGiver,
		status: 'pending'
	})
}

export const archiveQuest = async (quest, team) => {
	await teamsRef
		.doc(team.name)
		.collection('quests')
		.doc(quest.id)
		.delete()
	await teamsRef
		.doc(team.name)
		.collection('archivedQuests')
		.doc(quest.id)
		.set(quest)
	await teamsRef
		.doc(team.name)
		.collection('members')
		.doc(team.user.id)
		.update({
			experience: fieldValue.increment(quest.experience),
			questsCompleted: fieldValue.increment(1),
			bank: fieldValue.increment(quest.reward)
		})
}

export const getAllQuests = async team => {
	const quests = []
	const userQuests = []
	const questQuery = await teamsRef
		.doc(team.name)
		.collection('quests')
		.get()
	if (questQuery)
		questQuery.forEach(quest => {
			const questBody = { id: quest.id, ...quest.data() }
			if (!questBody.hero) {
				quests.push(questBody)
			} else if (questBody.hero === team.user.id) {
				userQuests.push(questBody)
			}
		})
	return [quests, userQuests]
}

export const getQuest = async (quest, team) => {
	const questResult = await teamsRef
		.doc(team)
		.collection('quests')
		.doc(quest)
		.get()
	return { id: questResult.id, ...questResult.data() }
}

export const updateProfile = async (team, profile) => {
	const profileRef = teamsRef
		.doc(team.name)
		.collection('members')
		.doc(team.user.id)
	const updatedProfile = await profileRef.update(profile)
	return updatedProfile
}

export const updateAvatar = async (team, file) => {
	const newAvatar = await storage.child(`avatars/${team.user.id}`).put(file)
	const imgLocation = await newAvatar.ref.getDownloadURL()
	const userRef = teamsRef
		.doc(team.name)
		.collection('members')
		.doc(team.user.id)
	await userRef.update({ avatar: imgLocation })
}

export const addMessage = async (team, quest, message, user) => {
	const messagesRef = teamsRef.doc(team.name).collection('messages')
	const time = Date.now()
	const messageDoc = await messagesRef.doc(quest.id).get()
	if (messageDoc.exists) {
		await messagesRef.doc(quest.id).update({ [time]: { message, user, time } })
	} else {
		await messagesRef.doc(quest.id).set({ [time]: { message, user, time } })
	}
}
