const BASEURL = "/club";
let state = "home";

window.addEventListener("_event_onRequestFile", (event) =>
{
    let request = new XMLHttpRequest();
    request.open("GET", event.detail.path, true);
    request.onreadystatechange = function()
    {
        let err = false;
        if (this.readyState == 4)
        {
            if (this.status == 200)
            {
                event.detail.onLoaded(request.responseText);
				state = event.detail.path.split("/")[3];
				activateScripts(state);
            }
            else
            {
                err = true;
            }
        }
        if (err)
        {
            console.log("ERROR", this.status, event.detail.path);
            if (event.back)
            {
                event.detail.onLoaded(null);
            }
        }
    }
    request.send();
});
window.addEventListener("_event_onGetBase", (event) =>
{
    event.detail.callback(BASEURL);
});
