let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

let drawBall = ball => {
    c.beginPath();
    c.arc(ball.x - ball.r/2, ball.y - ball.r/2, ball.r, 0, Math.PI * 2, false);
    c.fillStyle = '#00ff00';
    c.fill();
    c.stroke();
    c.closePath();
};
