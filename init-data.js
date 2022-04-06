const { initializeApp, applicationDefault, cert } = require('firebase-admin/lib/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/lib/firestore');
const { getAuth } = require('firebase-admin/lib/auth');

async function init(){
    console.log("Setting things up...")
    const serviceAccount = require('./path/to/service-key.json'); //Change this to your service account key

    initializeApp({
        credential: cert(serviceAccount)
      });
      
    const db = getFirestore();
    const auth = getAuth();
    let user = await auth.createUser({
        email: 'admin@admin.com',
        password: 'password'
    })
    let uid = user.uid;

    const docRef = db.collection('users').doc(uid);

    await docRef.set({
        email: 'admin@admin.com',
        name: 'Admin',
        permissions: ['admin']
    });

    const docRef2 = db.collection('profiles').doc(uid);

    await docRef2.set({
        name: 'Admin',
        questions: []
    });

    const docRef3 = db.collection('public').doc('questions');

    await docRef3.set({
        questions: [
            {
                category: "identifying-info",
                id: 1,
                name: "Test Question",
                options: [],
                question: "Test",
                type: "SA"
            }
        ]
    });

    const docRef4 = db.collection('public').doc('resources');

    await docRef4.set({
        resources: [],
    });

    console.log("Done! Your app has been set up test information! Admin credentials - email: admin@admin.com password: password")


    


}

init()