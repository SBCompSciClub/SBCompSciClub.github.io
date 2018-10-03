let config = {
    apiKey: "AIzaSyCHpDKehgESGNKBQbFTJ3XOMea9vPZlV9I",
    authDomain: "pong-demo-csc.firebaseapp.com",
    databaseURL: "https://pong-demo-csc.firebaseio.com",
    projectId: "pong-demo-csc",
    storageBucket: "",
    messagingSenderId: "847028439876"
};
firebase.initializeApp(config);



window.onload = () => {
    if(!firebase.auth().currentUser) {
        console.log("HI");
        firebase.auth().signInAnonymously().catch(err => {
            // location.reload();
        });
    }

};

window.onbeforeunload = function(){
   firebase.database().ref("users/"+firebase.auth().currentUser.uid+"/active").set(false);
}

drawText({text: "HI", x:100, y:100});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.database().ref("users/"+user.uid+"/active").set(true);
    firebase.database().ref("users/"+user.uid+"/name").once("value", snap => {
      if(!snap.val())
        firebase.database().ref("users/"+user.uid+"/name").set(prompt("What is you name? "));
    });
  } else {
    // No user is signed in.
  }
});
