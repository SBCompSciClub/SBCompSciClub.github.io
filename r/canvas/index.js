const ARC_RADIUS = 10;
let mouseDown;
let canvasElement;
let canvasContext;
function main()
{
    canvasElement = document.getElementById("CanvasPainter");
    let canvasElementStyle = window.getComputedStyle(canvasElement);
    canvasElement.width = parseInt(canvasElementStyle.width);
    canvasElement.height = parseInt(canvasElementStyle.height);
    canvasContext = canvasElement.getContext("2d");
    if (!canvasContext)
    {
        alert("Error: Couldn't create canvasContext");
    }
    canvasElement.onmousedown = (event) =>
    {
        mouseDown = true;
        Draw(event);
    }
    canvasElement.onmousemove = (event) =>
    {
        if (mouseDown)
        {
            Draw(event);
        }    
    }
    canvasElement.onmouseup = (event) =>
    {
        mouseDown = false;
        Draw(event);
    }
}
function Draw(event)
{
    canvasContext.beginPath();
    canvasContext.arc(event.x, event.y, ARC_RADIUS, 0, Math.PI * 2);
    canvasContext.fill();
}
main();
