window.addEventListener("_event_onRequestFile", (event) =>
{
    let request = new XMLHttpRequest();
    request.open("GET", event.detail.path, true);
    request.onreadystatechange = function()
    {
        if (this.readyState == 4)
        {
            if (this.status == 200)
            {
                event.detail.onLoaded(request.responseText);
            }
        }
    }
    request.send();
});