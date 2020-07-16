import firebase from 'firebase'
import { app } from '../db/firebase'

const signInWithLink = async (email, options) => {
  await firebase.auth(app).setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  await firebase.auth(app).sendSignInLinkToEmail(email, options)
  localStorage.setItem('userEmail', email)
}

const signOut = () => firebase.auth(app).signOut().then(user => user).catch(err => err)

export {
  signInWithLink,
  signOut
}