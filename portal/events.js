let hacksb;

window.addEventListener("_event_onInitializeFirebase", (event) => {
    firebase.initializeApp(event.detail.configuration[0]);
    hacksb = firebase.initializeApp(event.detail.configuration[1], "secondary");
    firebase.auth().onAuthStateChanged(event.detail.authChanged);
    // console.log("BEFORE");
    // hacksb.database().ref("/").once("value", (e) => {
    //     console.log("ERROR")
    //     console.log(e.val());
    // })
});
window.addEventListener("_event_onSetData", (event) => {
    ((event.detail.project === "hacksb") ? hacksb : firebase).database().ref(event.detail.reference).set(event.detail.data);
});
window.addEventListener("_event_onAppendData", (event) => {
    ((event.detail.project === "hacksb") ? hacksb : firebase).database().ref(event.detail.reference).push().set(event.detail.data, (err) => {
        if (err) {
            event.detail.onError();
        } else {
            event.detail.onComplete();
        }
    });
});
window.addEventListener("_event_onUpdateData", (event) => {
    ((event.detail.project === "hacksb") ? hacksb : firebase).database().ref(event.detail.reference).update(event.detail.data);
});
window.addEventListener("_event_onGetData", (event) => {
    ((event.detail.project === "hacksb") ? hacksb : firebase).database().ref(event.detail.reference).once("value", (e) => {
        event.detail.callback(e.val());
    });
});
window.addEventListener("_event_onDataChanged", (event) => {
    ((event.detail.project === "hacksb") ? hacksb : firebase).database().ref(event.detail.reference).on("value", (e) => {
        event.detail.callback();
    });
});
window.addEventListener("_event_onDeleteData", (event) => {
    ((event.detail.project === "hacksb") ? hacksb : firebase).database().ref(event.detail.reference).remove();
});
window.addEventListener("_event_onSignIn", (event) => {
    firebase.auth().signInWithEmailAndPassword(event.detail.email, event.detail.password).catch((error) => {
        let errCode = error.code;
        let errMess = error.message;
        alert(errMess);
    });

    hacksb.auth().signInWithEmailAndPassword(event.detail.email, event.detail.password).catch((error) => {
        let errCode = error.code;
        let errMess = error.message;
        alert(errMess);
    });
});
window.addEventListener("_event_onSignOut", (event) => {
    firebase.auth().signOut();
    hacksb.auth().signOut();
});