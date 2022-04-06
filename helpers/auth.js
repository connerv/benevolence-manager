import { auth } from "../services/firebase";
import {getUserInfo, resetUserInfo} from "./db"
import { Observable } from 'rxjs';


export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  resetUserInfo();
  return auth().signOut();
}

export function authenticated() {
  return auth().currentUser;
}

export let watchAuth = new Observable(sub => {
  auth().onAuthStateChanged(function(user) {
    console.log("auth state changed")
      getUserInfo(user).then((userInfo) =>{
        sub.next({user, userInfo})
      })
   
  });
})

export function sendPWResetEmail(email){
  return auth().sendPasswordResetEmail(email)
}

