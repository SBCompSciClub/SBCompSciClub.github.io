let config = {
    apiKey: "AIzaSyCHpDKehgESGNKBQbFTJ3XOMea9vPZlV9I",
    authDomain: "pong-demo-csc.firebaseapp.com",
    databaseURL: "https://pong-demo-csc.firebaseio.com",
    projectId: "pong-demo-csc",
    storageBucket: "",
    messagingSenderId: "847028439876"
};
firebase.initializeApp(config);

let curUser = null;


window.onload = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(result => {

            curUser = result.user;

        }).catch(error => {
            console.log(error);
    });


};
