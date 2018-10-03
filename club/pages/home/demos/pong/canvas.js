let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

window.addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

let paddle = {
    x: 0
}

let drawBall = ball => {
    c.beginPath();
    c.arc(ball.x - ball.r/2, ball.y - ball.r/2, ball.r, 0, Math.PI * 2, false);
    c.fillStyle = '#00ff00';
    c.fill();
    c.stroke();
    c.closePath();
};

let drawText = text => {
    c.font="20px Georgia";
    c.fillText(text.text,text.x,text.y);

    c.font="30px Verdana";
    let gradient=c.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    c.fillStyle=gradient;
};
