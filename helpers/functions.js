import { functions } from "../services/firebase";

var createUser = functions.httpsCallable('createUser');
var deleteUser = functions.httpsCallable('deleteUser');
var sendLogin = functions.httpsCallable('sendLogin');
var closeFile = functions.httpsCallable('closeFile');

export async function newUser(name, email, userType, questions, contact, address, phone){
    let result = await createUser({name: name, email: email, role: userType, questions: questions, contact: contact, address: address, phone:phone })
    return result.data
  
}

export async function removeUser(uid){
    let result = await deleteUser({uid:uid})
    return result.data
  
}

export async function closeUserFile(uid){
    let result = await closeFile({uid:uid})
    return result.data
  
}

export async function sendLoginLink(email,uid){
    console.log(email, uid)
    let result = await sendLogin({email:email, uid:uid})
    return result.data
  
}