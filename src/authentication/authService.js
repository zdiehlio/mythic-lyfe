import firebase from 'firebase'
import { app } from '../db/firebase'

const signInWithLink = async (email, options) => {
  await firebase.auth(app).setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  await firebase.auth(app).sendSignInLinkToEmail(email, options)
  localStorage.setItem('userEmail', email)
}

const currentUser = firebase.auth(app).onAuthStateChanged(user => user)

export {
  signInWithLink,
  currentUser
}