import { ContactSupportOutlined } from "@material-ui/icons";
import { questions } from "../components/ui/questions/testquestions";
import { db, storage } from "../services/firebase";
import { FieldValue } from "../services/firebase";
import { authenticated } from "./auth"

let userInfo = {}


export const getUserInfo = async (user) => {
    if((Object.keys(userInfo).length === 0 && userInfo.constructor === Object) || userInfo.name == 'loading' || userInfo.name == '' || userInfo.name == null){
        await updateUserInfo(user) 
        await getRoles(user);
        console.log("userInfo", userInfo)
        return userInfo
    } else {
        return userInfo
    }
}

export const updateUserInfo = async (user) => {
    try {
       
            let uid = user.uid
            const ref = await db.collection("profiles").doc(uid).get()
            if(ref.exists){
                userInfo.name = ref.data().name
                userInfo.answers = ref.data().answers || []
                userInfo.income =  ref.data().income || ""
                userInfo.expenses =  ref.data().expenses || ""
            }else{
                userInfo.name = ''
                userInfo.answers = [] 
                userInfo.income = ""
                userInfo.expenses = ""
            }
    } catch {
        userInfo.name = 'loading'
    }
    
}

export const resetUserInfo = () => {
    userInfo = {}
}

const getRoles = async (user) => {
    try {
            let uid = user.uid
            const ref = await db.collection("users").doc(uid).get()
            if(ref.exists){
                userInfo.roles = ref.data().permissions
                userInfo.email = ref.data().email
            }else{
                userInfo.roles = [ "user" ]
                userInfo.email = "no email"
            }
    } catch {
        userInfo.roles = [ "user" ]
        userInfo.email = "no email"
    }
    
}

export const getQuestions = async () => {
    try {
        if(authenticated()){
            const ref = await db.collection("public").doc("questions").get()
            if(ref.exists){
                return ref.data().questions
            }else{
               return [ {name: "no questions available"} ] 
            }
        } else {
            return [ {name: "not authenticated"} ] 
        }
    } catch (e) {
        return [ {name: `error - ${e}`} ] 
    }
    
}

export const getResources = async () => {
    try {
        if(authenticated()){
            const ref = await db.collection("public").doc("resources").get()
            if(ref.exists){
                return ref.data().resources
            }else{
               return [ {title: "no resources available"} ] 
            }
        } else {
            return [ {title: "no resources available"} ] 
        }
    } catch (e) {
        return [ {title: `error - ${e}`} ] 
    }
    
}

export const getUsers = async () => {
    try {
        if(authenticated()){
            const ref = await db.collection("users").get()
            console.log(ref)
            if(ref.size > 0){
                const users = []
                
                ref.forEach( (doc) => {
                    users.push({
                        data: doc.data(),
                        id: doc.id
                    })
                   
                })
                return users
                
            }else{
               return [ {name: "no users available"} ] 
            }
        } else {
            return [ {name: "not authenticated"} ] 
        }
    } catch (e) {
        return [ {name: `error - ${e}`} ] 
    }
    
}

export const getProfiles = async () => {
    try {
        if(authenticated()){
            const ref = await db.collection("profiles").get()
            console.log(ref)
            if(ref.size > 0){
                const users = []
                
                ref.forEach( (doc) => {
                    if(doc.data().questions){
                        if(doc.data().questions.length > 0){
                            users.push({
                                data: doc.data(),
                                id: doc.id
                            })
                        }
                    }
                    
                   
                })
                return users
                
            }else{
               return [ {name: "no users available"} ] 
            }
        } else {
            return [ {name: "not authenticated"} ] 
        }
    } catch (e) {
        return [ {name: `error - ${e}`} ] 
    }
    
}

export const getDeaconData = async () => {
    try {
        let profiles = []
        let users = []
        if(authenticated()){
            let uid = authenticated().uid
            console.log("uid", uid)
            const ref = await db.collection("users").doc(uid).get()
            if(ref.exists){
               
                let data = ref.data()
                console.log("here1", data)
                if(data.assignedClients){
                    for (const client of data.assignedClients) {
                        console.log("client", client)
                        const refprofile = await db.collection("profiles").doc(client).get()
                       
                        if(refprofile.exists){
                            profiles.push(
                                {
                                    data: refprofile.data(),
                                    id: client
                                }
                            )
                        }

                        const refuser = await db.collection("users").doc(client).get()

                        if(refuser.exists){
                            users.push(
                                {
                                    data: refuser.data(),
                                    id: client
                                }
                            )
                        }
                    }

                    return({profiles, users})
                }else{
                    return({profiles: [{data:{name: "No users assigned"}, id: 0}] , users: [{data:{name: "No users assigned"}, id: 0}] })
                }
            }else{
                return({profiles: [{data:{name: "No users assigned"}, id: 0}]  , users: [{data:{name: "No users assigned"}, id: 0}] })
            }
        } else {
            return({profiles: [{data:{name: "No users assigned"}, id: 0}]  , users: [{data:{name: "No users assigned"}, id: 0}] })
        }
    } catch (e) {
        console.log(e)
        return [ {name: `error - ${e}`} ] 
        
    }
    
}

export const sendAnswersArray = async (answersArray) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    // console.log(authenticated().uid)
    try {
        if(authenticated()) {
            let uid = authenticated().uid
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                answers: answersArray
            })
        }
        else console.log('not authenticated')
    } catch (e) {
        console.log(e)
        console.error("Error: Can't send answers to db");
    }
}

export const updateBudget = async (income, expenses) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    // console.log(authenticated().uid)
    try {
        if(authenticated()) {
            let uid = authenticated().uid
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                income: income,
                expenses: expenses,
            })
        }
        else console.log('not authenticated')
    } catch (e) {
        console.log(e)
        console.error("Error: Can't send answers to db");
    }
}



export const updateUserBudget = async (income, expenses, uid) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    // console.log(authenticated().uid)
    try {
        if(authenticated()) {
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                income: income,
                expenses: expenses,
            })
        }
        else console.log('not authenticated')
    } catch (e) {
        console.log(e)
        console.error("Error: Can't send answers to db");
    }
}

export const updateChurchResponse = async (response, uid) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    // console.log(authenticated().uid)
    try {
        if(authenticated()) {
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                churchResponse: response
            })
        }
        else console.log('not authenticated')
    } catch (e) {
        console.log(e)
        console.error("Error: Can't send answers to db");
    }
}

export const updateCaseCommitteeReview = async (review, uid) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    // console.log(authenticated().uid)
    try {
        if(authenticated()) {
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                ccReview: review
            })
        }
        else console.log('not authenticated')
    } catch (e) {
        console.log(e)
        console.error("Error: Can't send answers to db");
    }
}

export const sendUpdatedAnswersArray = async (answersArray, uid) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    // console.log(authenticated().uid)
    try {
        if(authenticated()) {
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                answers: answersArray
            })
        }
        else console.log('not authenticated')
    } catch (e) {
        console.log(e)
        console.error("Error: Can't send answers to db");
    }
}

export const updateUserSelectedQuestions = async (uid , questions) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    // console.log(authenticated().uid)
    try {
        if(authenticated()) {
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                questions: questions
            })
        }
        else console.log('not authenticated')
    } catch (e) {
        console.log(e)
        console.error("Error: Can't send updated questions to db");
    }
}

export const createQuestion = async (type, name, question, options, category) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            console.log(type, name, question, options, category)
            const id = Date.now()
            const ref = db.collection("public").doc("questions");
            await ref.update({
                questions: FieldValue.arrayUnion({
                    id,
                    type,
                    name,
                    question,
                    options,
                    category
                })
            })
            return {message: `question '${name}' successfully added`, type: 'success'};
        }
        return {message: `failed to create question - user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to create question - ${e}`, type: 'error'};
    }
}

export const createResource = async (type, link, title, description) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            const id = Date.now()
            const ref = db.collection("public").doc("resources");
            await ref.update({
                resources: FieldValue.arrayUnion({
                    id,
                    type,
                    link,
                    title,
                    description
                })
            })
            return {message: `resource '${link}' successfully added`, type: 'success'};
        }
        return {message: `failed to create resource- user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to create resource - ${e}`, type: 'error'};
    }
}

export const deleteResource = async (id) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            const ref = await db.collection("public").doc("resources").get()
            let newResources
            if(ref.exists){
             newResources = ref.data().resources.filter(res => res.id !== id )
            }
            const ref2 = db.collection("public").doc("resources");
            await ref2.update({
                resources: newResources
            })
            return {message: `resource '${id}' successfully deleted`, type: 'success'};
        }
        return {message: `failed to delete resource- user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to delete resource - ${e}`, type: 'error'};
    }
}

export const createComment = async (comment, uid) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            console.log(comment)
            const id = Date.now()
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                comments: FieldValue.arrayUnion({
                    id,
                    comment,
                    by: userInfo.name,
                    date: id,
                })
            })
            return {message: `comment successfully added`, type: 'success'};
        }
        return {message: `failed to create comment - user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to create comment - ${e}`, type: 'error'};
    }
}

export const createAssignedDeacon = async (uid, name, deaconID) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            const id = Date.now()
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                deacons: FieldValue.arrayUnion({
                    deaconID,
                    name
                }),
                deaconIDs: FieldValue.arrayUnion(
                    deaconID
                )
            })
            const ref2 = db.collection("users").doc(deaconID);
            await ref2.update({
                assignedClients: FieldValue.arrayUnion(
                    uid
                )
            })
            return {message: `deacon successfully added`, type: 'success'};
        }
        return {message: `failed to create comment - user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to create comment - ${e}`, type: 'error'};
    }
}

export const changeFileStatus = async (uid, status) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                status: status
            })
            
            return {message: `status successfully updated`, type: 'success'};
        }
        return {message: `failed to update status - user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to update status - ${e}`, type: 'error'};
    }
}

export const createTransaction = async (transaction, transactionFor, uid) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            console.log(transaction)
            const id = Date.now()
            const ref = db.collection("profiles").doc(uid);
            await ref.update({
                transactions: FieldValue.arrayUnion({
                    id,
                    transaction,
                    for: transactionFor,
                    by: userInfo.name,
                    date: id,
                })
            })
            return {message: `transaction successfully added`, type: 'success'};
        }
        return {message: `failed to create transaction - user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to create transaction - ${e}`, type: 'error'};
    }
}

export const updateQuestions = async (questions) => { // array with each object having - QID: Identifier for the question, answers: string or whatever the answer to this question is, QNum: num of question in form
    try {
        if(authenticated()) {
            // console.log(questions)
            const ref = db.collection("public").doc("questions");
            await ref.set({
                questions: questions
            })
            return {message: `questions successfully updated`, type: 'success'};
        }
        return {message: `failed to update questions - user not authenticated`, type: 'error'};
    } catch (e) {
        return {message: `failed to update questions - ${e}`, type: 'error'};
    }
}

export const getQuestionIDs = async () => { // get question list for certain user
    try {
        if(authenticated()){
            let uid = authenticated().uid
            const ref = await db.collection("profiles").doc(uid).get()
            if(ref.exists){
                return ref.data().questions
            }else{
                return ['Question list does not exist for this user']
            }
        }
    } catch {
        console.log('Could not find this user')
    }
}


export const getDeacons = async () => { // get question list for certain user
    try {
        if(authenticated()){
            let deacons = []
            const ref = await db.collection("users").where("permissions", "array-contains", "admin").get()
            if(ref){
                ref.forEach((doc) => {
                    deacons.push({id: doc.id, name: doc.data().name})
                })
                return deacons
            }else{
                return ['no deacons']
            }
        }
    } catch {
        console.log('Could not find this user')
    }

}

const categories = ['identifying-information', 'current-situation', 'finances', 'housing', 'education', 'action', 'health']
// In order to make the questions appear sorted by category
const sortByCategory = (a, b) => {
    return categories.indexOf(a.category) < categories.indexOf(b.category) ? -1 : 1
}

const findUnansweredQuestions = () => {
    let unansweredQuestions = []
    userInfo.answers.map((a) => {
        if (a.answer == null) {
            unansweredQuestions.unshift(a.qid)
        }
    })
    return unansweredQuestions
}

export const queryQuestions = async () => { // query for certain questions based on qid
    try {
        let userQuestions = []
        let qids = await getQuestionIDs()  
        let allQuestions = await getQuestions()
        qids.map((qid) => { 
            allQuestions.find((question) => {
                if(qid == question.id) userQuestions.push(question)
            }
                )
        })
        
        userQuestions.sort(sortByCategory) // Putting the questions with the same categories together
        let unansweredQuestions = findUnansweredQuestions()
        userQuestions.sort((a, b) => { // Putting the unanswered questions first and still in corret category order
            return unansweredQuestions.indexOf(a.id) > unansweredQuestions.indexOf(b.id) ? -1 : 1
        })
        return userQuestions
    } catch (e){
        console.log(e)
        console.log('Could not query the questions array')
    }
}

export const uploadFile = async (file) => {
    var storageRef = storage.ref();
    var uploadRef = storageRef.child('admin-uploads/' + file.name);
    // console.log(file.name)
    // var fileName = file.FieldValuestr.split(/(\\|\/)/g).pop();
    uploadRef.put(file);

    // var metadata = {
    //     customMetadata: {
    //       'fileName': file.name
    //     }
    //   };
}

export const deleteFile = async (fileName) => {
    console.log("FILE NAME TO DELETE IS:")
    var storageRef = storage.ref();
    console.log('admin-uploads/' + fileName)
    var fileRef = storageRef.child('admin-uploads/' + fileName)
    fileRef.delete().then(() => {
        console.log('File deleted successfully')
      }).catch((error) => {
        console.log('Could not delete file')
      });
}


export const getFiles = async () => {
    try{
        // console.log("DOWNLOADING...")
        var storageRef = storage.ref();
        var downloadRef = storageRef.child('admin-uploads');
        var files = await downloadRef.listAll()

        return files
       
} catch (e) {
    return "The error is: " + e;
}
    // return "Couldn't get Docs"
}