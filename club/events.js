const BASEURL = "/club";
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
            }
            else
            {
                err = true;
            }
        }
        if (err)
        {
            console.log("ERROR");
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