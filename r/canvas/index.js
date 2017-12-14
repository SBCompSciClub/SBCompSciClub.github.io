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
        Draw();
    }
    canvasElement.onmousemove = (event) =>
    {
        if (mouseDown)
        {
            Draw();
        }    
    }
    canvasElement.onmouseup = (event) =>
    {
        mouseDown = false;
        Draw();
    }
}
function Draw()
{
    canvasContext.beginPath();
    canvasContext.arc(event.x, event.y, ARC_RADIUS, 0, Math.PI * 2);
    canvasContext.fill();
}
main();