window.addEventListener("_event_onInitializeFirebase", (event) =>
{
    firebase.initializeApp(event.detail.configuration);
    firebase.auth().onAuthStateChanged(event.detail.authChanged);
});
window.addEventListener("_event_onSetData", (event) =>
{
    firebase.database().ref(event.detail.reference).set(event.detail.data);
});
window.addEventListener("_event_onAppendData", (event) =>
{
    firebase.database().ref(event.detail.reference).push().set(event.detail.data, (err) =>
    {
        if (err)
        {
            event.detail.onError();
        }
        else
        {
            event.detail.onComplete();
        }
    });
});
window.addEventListener("_event_onUpdateData", (event) =>
{
    firebase.database().ref(event.detail.reference).update(event.detail.data);
});
window.addEventListener("_event_onGetData", (event) =>
{
    let sent = false;
    firebase.database().ref(event.detail.reference).on("value", (e) =>
    {
        if (!sent)
        {
            sent = true;
            event.detail.callback(e.val());
        }
        
        try {
            if(!createdDownloadButton)
                createAttendanceButton();
        } catch(e) {
            console.log(e)
        }
        
    });
});
window.addEventListener("_event_onDataChanged", (event) =>
{
    let ref = firebase.database().ref(event.detail.reference);
    ref.on("child_added", (e) =>
    {
        event.detail.callback();
    });
    ref.on("child_changed", (e) =>
    {
        event.detail.callback();
    });
    ref.on("child_removed", (e) =>
    {
        event.detail.callback();
    });
});
window.addEventListener("_event_onSignIn", (event) =>
{
    firebase.auth().signInWithEmailAndPassword(event.detail.email, event.detail.password).catch((error) =>
    {
        let errCode = error.code;
        let errMess = error.message;
        alert(errMess);
    });
});
window.addEventListener("_event_onSignOut", (event) =>
{
    firebase.auth().signOut();
});