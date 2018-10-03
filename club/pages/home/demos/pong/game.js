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
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
            }).catch(error => {
                console.log(error);
        });
    }

};

drawText({text: "HI", x:100, y:100});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      drawText({
          text: user.displayName,
          x: 10,
          y: 10
      });
  } else {
    // No user is signed in.
  }
});
