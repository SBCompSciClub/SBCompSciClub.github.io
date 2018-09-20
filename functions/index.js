const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.signUp = functions.database.ref("/signup").onCreate( (snap, context) => {
    let data = snap.val();
    let keys = Object.keys(data);

    console.log(data)


    if(keys.includes("email") && keys.includes("name") && keys.includes("id") && Object.keys(data.name).includes("first") && Object.keys(data.name).includes("last"))
    {
        admin.database().ref("test").set("COOL");
        return true;
    }
    return false;
});
