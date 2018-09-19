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
    firebase.database().ref(event.detail.reference).once("value", (e) =>
    {
        event.detail.callback(e.val());
    });
});
window.addEventListener("_event_onDataChanged", (event) =>
{
    firebase.database().ref(event.detail.reference).on("value", (e) =>
    {
        event.detail.callback();
    });
});
window.addEventListener("_event_onDeleteData", (event) =>
{
    firebase.database().ref(event.detail.reference).remove();
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
