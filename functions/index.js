const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.signUp = functions.database.ref("/signup/{key}").onCreate( (snap, context) => {
    let data = snap.val()[Object.keys(snap.val())[0]];
    let keys = Object.keys(data);

    if(keys.includes("email") && keys.includes("name") && keys.includes("id") && Object.keys(data.name).includes("first") && Object.keys(data.name).includes("last"))
    {
        return admin.database().ref("/").once("value", database => {
            let dbVal = database.val();
            let id = data.id;
            let member = {};
            let year = 0;
            Object.keys(dbVal).forEach( (key) => {
                if(!isNaN(parseInt(key)))
                {
                    if(parseInt(key) > year)
                        year = parseInt(key);
                }
            });
            member.contact = {};
            member.contact.email = data.email;
            member.name = {};
            member.name.first = data.name.first;
            member.name.last = data.name.last;
            if(data.github)
                member.contact.github = data.github;
            if(data.grade)
                member.grade = data.grade.charAt(0).toUpperCase() + data.grade.slice(1).toLowerCase();
            if(data.section)
                member.section = data.section;
            member.position = "Member";
            member.requirements = {
                dues: "$0",
                ptp: "$0"
            }

            admin.database().ref("/"+year+"/members/"+id).set(member);
            admin.database().ref("signUp/"+Object.keys(snap.val())[0]);
        })
    }
    else
    {
        return 0;
    }
});
