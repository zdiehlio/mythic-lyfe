import firebase from 'firebase'
import { app } from '../db/firebase'

const signInWithLink = async (email, options) => {
  await firebase.auth(app).setPersistence(firebase.auth.Auth.Persistence.NONE)
  await firebase.auth(app).sendSignInLinkToEmail(email, options)
  localStorage.setItem('userEmail', email)
}

const signOut = () => firebase.auth(app).signOut().then(user => console.log(user)).catch(err => err)

const authState = firebase.auth(app).onAuthStateChanged(user => user)

const currentUser = firebase.auth(app).currentUser

export {
  signInWithLink,
  currentUser,
  signOut
}