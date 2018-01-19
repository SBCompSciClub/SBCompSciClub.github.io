window.addEventListener("_event_onInitializeFirebase", (event) =>
{
    firebase.initializeApp(event.detail.configuration);
});
window.addEventListener("_event_onSetData", (event) =>
{
    firebase.database().ref(event.detail.reference).set(event.detail.data);
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
    }); 
});

let repeatedFunc = function ()
{
    window.dispatchEvent(new CustomEvent("_event_onRefresh", {}));
    setTimeout(repeatedFunc, 5000);
}
repeatedFunc();