import firebase from 'firebase'
import { app } from '../db/firebase'

const signInWithLink = async (email, options) => {
  await firebase.auth(app).setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  await firebase.auth(app).sendSignInLinkToEmail(email, options)
  console.log('email', email)
  localStorage.setItem('userEmail', email)
}

const currentUser = firebase.auth(app).currentUser

export {
  signInWithLink,
  currentUser
}