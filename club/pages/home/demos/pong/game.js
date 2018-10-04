let config = {
    apiKey: "AIzaSyCHpDKehgESGNKBQbFTJ3XOMea9vPZlV9I",
    authDomain: "pong-demo-csc.firebaseapp.com",
    databaseURL: "https://pong-demo-csc.firebaseio.com",
    projectId: "pong-demo-csc",
    storageBucket: "",
    messagingSenderId: "847028439876"
};
firebase.initializeApp(config);

let paddle = {
    x: 0,
    y: window.innerHeight*0.85,
    w: window.innerWidth*0.3,
    h: window.innerHeight*0.1
};

window.addEventListener('mousemove', function(event) {
	paddle.x = event.clientX;
});

window.onload = () => {
    if(!firebase.auth().currentUser) {
        firebase.auth().signInAnonymously().catch(err => {
            location.reload();
        });
    }

};

window.onbeforeunload = function(){
   firebase.database().ref("users/"+firebase.auth().currentUser.uid+"/active").set(false);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.database().ref("users/"+user.uid+"/active").set(true);
    firebase.database().ref("users/"+user.uid+"/name").once("value", snap => {
      if(!snap.val())
        firebase.database().ref("users/"+user.uid+"/name").set(prompt("What is you name? "));
    });
    firebase.database().ref("users/"+user.uid+"/misses").once("value", snap => {
      if(!snap.val())
        firebase.database().ref("users/"+user.uid+"/misses").set(0);
    });
  } else {
    // No user is signed in.
  }
});

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);


    c.fillStyle = '#ffffff';

    c.fillRect(paddle.x - paddle.w/2, innerHeight*0.1, paddle.w, paddle.h);
}

animate();
