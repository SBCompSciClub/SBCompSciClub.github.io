let config = {
    apiKey: "AIzaSyCHpDKehgESGNKBQbFTJ3XOMea9vPZlV9I",
    authDomain: "pong-demo-csc.firebaseapp.com",
    databaseURL: "https://pong-demo-csc.firebaseio.com",
    projectId: "pong-demo-csc",
    storageBucket: "pong-demo-csc.appspot.com",
    messagingSenderId: "847028439876"
};
firebase.initializeApp(config);
let ref = firebase.database().ref('users');
ref.on("value", snap => {

    let temp = "";
    let arr = Object.values(snap.val());

    arr.sort((a, b) => {
        return b.misses - a.misses;
    });

    for(i in arr){
        temp += '<tr><td>'+arr[i].name+'</td><td>'+arr[i].misses+'</td></tr>';

    }
    document.getElementById('tbody').innerHTML = temp;
});
