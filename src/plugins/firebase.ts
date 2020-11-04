import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from "@/firebase.config";
import {EmailPasswordForm} from "@/types/forms";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export type FirebaseUserCredential = firebase.auth.UserCredential;
export type FirebaseUser = firebase.User;
export type FirebaseUserMetadata = firebase.auth.UserMetadata;
export type FirebaseAuthProvider = firebase.auth.AuthProvider;
export type FirebaseAuthError = firebase.auth.AuthError;

export const onAuthStateChange = (next: (user: FirebaseUser | null) => void) => {
  return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    return auth.onAuthStateChanged(user => next(user));
  })
}

export const attemptEmailPasswordAuthentication = (form: EmailPasswordForm): Promise<FirebaseUserCredential> => {
  return auth.signInWithEmailAndPassword(form.email, form.password);
}

export const attemptRegistration = (form: EmailPasswordForm): Promise<FirebaseUserCredential> => {
  return auth.createUserWithEmailAndPassword(form.email, form.password)
}

export const signOutUser = (): Promise<void> => {
  return auth.signOut();
}

export const isFirebaseUser = (user: FirebaseUser | null): user is FirebaseUser => {
  return user !== null && 'email' in user && 'refreshToken' in user && 'getIdToken' in user;
}

export const currentUser = (): FirebaseUser | null => {
  return auth.currentUser;
}
