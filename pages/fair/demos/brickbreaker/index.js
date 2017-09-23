class Point
{
    constructor(_x, _y)
    {
        this.X = _x;
        this.Y = _y;
    }
    add(_point)
    {
        return new Point(this.X + _point.X, this.Y + _point.Y);
    }
    sub(_point)
    {
        return new Point(this.X - _point.X, this.Y - _point.Y);
    }
    mul(_point)
    {
        return new Point(this.X * _point.X, this.Y * _point.Y);
    }
    div(_point)
    {
        return new Point(this.X / _point.X, this.Y / _point.Y);
    }
}
class Color
{
    constructor(r, g, b, a)
    {
        this.R = r;
        this.G = g;
        this.B = b;
        if (a)
        {
            this.A = a;
        }
        else
        {
            this.A = 255;
        }
    }
}
class Canvas
{
    constructor(id, onRender)
    {
        this._canvas = document.getElementById(id);
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this.Device = this._canvas.getContext("2d");
        this.onRender = onRender;
        window.addEventListener("resize", (e) =>
        {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
        });
    }
    render()
    {
        this.clear();
        this.onRender(this);
    }
    clear()
    {
        this.Device.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    drawCircle(location, radius, color)
    {
        this.setColor(color);
        this.Device.beginPath();
        this.Device.arc(location.X, location.Y, radius, 0, 2 * Math.PI);
        this.Device.stroke();
    }
    fillCircle(location, radius, color)
    {
        this.setColor(color);
        this.Device.beginPath();
        this.Device.arc(location.X, location.Y, radius, 0, 2 * Math.PI);
        this.Device.fill();
    }
    drawRectangle(location, size, color)
    {
        this.setColor(color);
        this.Device.strokeRect(location.X, location.Y, size.X, size.Y);
    }
    fillRectangle(location, size, color)
    {
        this.setColor(color);
        this.Device.fillRect(location.X, location.Y, size.X, size.Y);
    }
    drawString(location, string, font, color)
    {
        this.setColor(color);
        this.Device.font = font;
        this.Device.fillText(string, location.X, location.Y);
    }
    setColor(color)
    {
        this.Device.fillStyle = "rgba(" + color.R + ", " + color.G + ", " + color.B + ", " + (color.A / 255) + ")";
        this.Device.strokeStyle = "rgba(" + color.R + ", " + color.G + ", " + color.B + ", " + (color.A / 255) + ")";
    }
}
class Ball
{
    constructor(location, radius, color, direction, speed, onLost)
    {
        this.location = location;
        this.radius = radius;
        this.color = color;
        this.direction = direction;
        this.speed = speed;
        this.velocity = new Point(0, 0);
        this.onLost = onLost;
    }
    forward()
    {
        let y = Math.sin(this.direction * Math.PI / 180) * this.speed;
        let x = Math.cos(this.direction * Math.PI / 180) * this.speed;
        this.location = this.location.add(new Point(x, y));
    }
    move()
    {
        this.location = this.location.add(this.velocity);
        if (this.location.X <= 0)
        {
            this.velocity.X *= -1;
            this.location.X = 1;
        }
        if (this.location.X >= window.innerWidth)
        {
            this.velocity.X *= -1;
            this.location.X = window.innerWidth - 1;
        }
        if (this.location.Y <= 0)
        {
            this.velocity.Y *= -1;
            this.location.Y = 1;
        }
        if (this.location.Y >= window.innerHeight)
        {
            this.onLost();
        }
        if (Math.abs(this.velocity.X) > 10)
        {
            this.velocity.X = 10 * (this.velocity.X / Math.abs(this.velocity.X));
        }
    }
    render(canvas)
    {
        canvas.fillCircle(this.location, this.radius, this.color);
    }
}
class Brick
{
    constructor(location, size, color)
    {
        this.location = location;
        this.size = size;
        this.color = color;
        this.moving = false;
    }
    collide(ball, forceX)
    {
        let bLoc = ball.location;
        let bSiz = ball.radius;
        let pLoc = this.location;
        let pSiz = this.size;
        if (!this.moving)
        {
            if (bLoc.Y + bSiz >= pLoc.Y - (pSiz.Y / 2))
            {
                if (bLoc.Y - bSiz <= pLoc.Y + (pSiz.Y / 2))
                {
                    let good = false;
                    if (bLoc.X + (bSiz) - 10 >= pLoc.X - (pSiz.X / 2))
                    {
                        if (bLoc.X - (bSiz) + 10 <= pLoc.X + (pSiz.X / 2))
                        {
                            ball.velocity.Y *= -1;
                            ball.velocity.X += forceX;
                            good = true;
                            return true;
                        }
                    }
                    if (!good)
                    {
                        if (bLoc.X + bSiz >= pLoc.X - (pSiz.X / 2))
                        {
                            if (bLoc.X - bSiz <= pLoc.X + (pSiz.X / 2))
                            {
                                if (!this.moving)
                                {
                                    ball.velocity.X *= -1;
                                    return true;
                                }
                                else 
                                {
                                    ball.velocity.Y *= -1;
                                    ball.velocity.X += forceX;
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if (bLoc.Y + bSiz >= pLoc.Y - (pSiz.Y / 2))
            {
                if (bLoc.Y - bSiz <= pLoc.Y + (pSiz.Y / 2))
                {
                    if (bLoc.X + (bSiz) >= pLoc.X - (pSiz.X / 2))
                    {
                        if (bLoc.X - (bSiz) <= pLoc.X + (pSiz.X / 2))
                        {
                            ball.velocity.Y *= -1;
                            ball.location.Y = pLoc.Y - pSiz.Y - bSiz - 1;
                            ball.velocity.X += forceX;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    render(canvas)
    {
        let s = this.location.sub(this.size.div(new Point(2, 2)));
        canvas.fillRectangle(s, this.size, this.color);
    }
}
let mainball;
let paddle;
let bricks = [];
let gravity = 0.5;
let MouseLocation = new Point(0, 0);
let PreviousMouseLocation = new Point(0, 0);
let DeltaMouseLocation = new Point(0, 0);
let previousLoc = [];
let maxScore = 0;
let mode = 3;
let maxLives = 5;
let lives = maxLives;
function entry()
{
    let canvasObject = new Canvas("renderer", (canvas) =>
    {
        render(canvas);
    });
    mainball = new Ball(new Point(window.innerWidth / 2, 1), 10, new Color(255, 255, 255), 0, 1, () =>
    {
        lives--;
        mainball.location = new Point(window.innerWidth / 2, 1);
        mainball.velocity = new Point(0, 0);
    });
    mainball.velocity = new Point(0, 0);
    let paddleHeight = 20;
    let paddlePadding = 0;
    paddle = new Brick(new Point(0, window.innerHeight - (paddleHeight / 2) - paddlePadding), new Point(150, paddleHeight), new Color(0, 100, 200));
    paddle.moving = true;
    for (let j = 1; j < 10; j++)
    {
        for (let i = 1; i < 10; i++)
        {
            bricks.push(new Brick(new Point((window.innerWidth / 2) - (55 * i) - 10, 50 + (j * 55)), new Point(50, 50), new Color(i + j * 10, j + i * 20 + 10, i * 10)));
            bricks.push(new Brick(new Point((window.innerWidth / 2) + (55 * i) + 10, 50 + (j * 55)), new Point(50, 50), new Color(i + j * 10, j + i * 20 + 10, i * 10)));
        }
    }    
    maxScore = bricks.length;
    console.log(maxScore);
    canvasObject._canvas.addEventListener("mousemove", (e) =>
    {
        MouseLocation = new Point(e.offsetX, e.offsetY);
        DeltaMouseLocation = MouseLocation.sub(PreviousMouseLocation);
        PreviousMouseLocation = new Point(MouseLocation.X, MouseLocation.Y);
    });
    window.addEventListener("keydown", (e) =>
    {
        if (mode != 0)
        {
            mode = 0;
            lives = maxLives;
            bricks = [];
            for (let j = 1; j < 10; j++)
            {
                for (let i = 1; i < 10; i++)
                {
                    bricks.push(new Brick(new Point((window.innerWidth / 2) - (55 * i) - 10, 50 + (j * 55)), new Point(50, 50), new Color(i + j * 10, j + i * 20 + 10, i * 10)));
                    bricks.push(new Brick(new Point((window.innerWidth / 2) + (55 * i) + 10, 50 + (j * 55)), new Point(50, 50), new Color(i + j * 10, j + i * 20 + 10, i * 10)));
                }
            }    
            maxScore = bricks.length;
        }    
    });
    window.addEventListener("resize", () =>
    {
        paddle.location.Y = window.innerHeight - (paddleHeight / 2) - paddlePadding;
    });
    let mainLoop = () =>
    {
        requestAnimationFrame(mainLoop);
        canvasObject.render();
    };
    mainLoop();
    let upLoop = () =>
    {
        requestAnimationFrame(upLoop);
        update();
        DeltaMouseLocation = new Point(0, 0);
    };
    upLoop();
}
function update()
{
    if (lives <= 0)
    {
        mode = 1;
    }    
    else if (bricks.length > 0)
    {
        if (mode === 0)
        {
            paddle.location.X = MouseLocation.X;
            mainball.velocity.Y += gravity;
            mainball.move();
            previousLoc.push(mainball.location);
            paddle.collide(mainball, DeltaMouseLocation.X);
            for (let i = bricks.length - 1; i >= 0; i--)
            {
                if (bricks[i].collide(mainball, 0))
                {
                    bricks.splice(i, 1);
                }
            }
        }    
    }
    else 
    {
        mode = 2;
    }    
}
function render(canvas)
{
    canvas.fillRectangle(new Point(0, 0), new Point(window.innerWidth, window.innerHeight), new Color(0, 0, 0));
    for (let i = bricks.length - 1; i >= 0; i--)
    {
        bricks[i].render(canvas);
    }
    for (let i = 0; i < previousLoc.length; i++)
    {
        canvas.fillCircle(previousLoc[i], 2, new Color(i, i, i));
    }
    if (previousLoc.length > 100)
    {
        previousLoc.shift();
    }
    mainball.render(canvas);
    paddle.render(canvas);
    canvas.drawString(new Point(0, 20), "Lives: " + lives, "20px Tahoma", new Color(200, 100, 000));
    canvas.drawString(new Point(0, 40), "Score: " + (maxScore - bricks.length), "20px Tahoma", new Color(100, 200, 100));
    if (mode === 1)
    {
        canvas.fillRectangle(new Point(0, 0), new Point(window.innerWidth, window.innerHeight), new Color(255, 0, 0, 100));
        canvas.drawString(new Point((window.innerWidth / 2) - 250, 100), "You Lost!", "100px Consolas", new Color(255, 0, 0));
        canvas.drawString(new Point((window.innerWidth / 2) - 240, 150), "< Press Any Key To Restart >", "30px Consolas", new Color(255, 100, 0));
    }    
    else if (mode === 2)
    {
        canvas.fillRectangle(new Point(0, 0), new Point(window.innerWidth, window.innerHeight), new Color(0, 255, 0, 100));
        canvas.drawString(new Point((window.innerWidth / 2) - 215, 100), "You Won!", "100px Consolas", new Color(0, 255, 0));
        canvas.drawString(new Point((window.innerWidth / 2) - 240, 150), "< Press Any Key To Restart >", "30px Consolas", new Color(0, 255, 100));
    }    
    else if (mode === 3)
    {
        canvas.fillRectangle(new Point(0, 0), new Point(window.innerWidth, window.innerHeight), new Color(255, 255, 0, 100));
        canvas.drawString(new Point((window.innerWidth / 2) - 140, 100), "Begin", "100px Consolas", new Color(255, 255, 0));
        canvas.drawString(new Point((window.innerWidth / 2) - 215, 150), "< Press Any Key To Start >", "30px Consolas", new Color(255, 255, 100));
    }    
}