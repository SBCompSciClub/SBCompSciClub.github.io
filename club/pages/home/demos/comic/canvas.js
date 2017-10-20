
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var mouse_x = 0;
var mouse_y = 0;
var maxRadius = 100;

var mouse = {
    x: undefined,
    y: undefined,
    click: false
}

window.addEventListener('mousemove',

    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener('mousedown',
    function(event) {
        mouse.click = true;
}
)


window.addEventListener('mouseup',
    function(event) {
        mouse.click = 'false'
    }
)

window.addEventListener('resize',
    function(event) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        var body_element = document.querySelector('body');
        body_element.style.setbackgroundSize(window.innerWidth+' '+window.innerHeight);
        init()
    }
)

// function class

function Circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
    this.minRadius = radius;
    this.entering = false;

	this.draw = function(){
		c.beginPath(); // seperates the line from the arc
		c.arc(this.x,this.y,this.radius,0, Math.PI*2,false);
		
		// changes the color 
		var gradient = c.createLinearGradient(0,500,0, 0);
		gradient.addColorStop(1, 'rgba(132,227,223,0.5)');
		gradient.addColorStop(0, 'rgba(36,139,146,0.5)');

		c.strokeStyle = '#84BEF0';
		c.stroke();
		c.fillStyle = gradient;
		c.fill();
	}
    
    this.pop = function() {
        this.y = Math.random()*(innerHeight-2*radius) + radius;
        if(this.dx>0)
            this.x = -2*this.radius;
        else
            this.x = innerWidth+2*radius;
        this.r = this.minRadius;
        this.entering = true;
    }
    
	// updates position
	this.update = function(){
		if ((this.x > innerWidth- this.radius || this.x < this.radius )&&this.entering==false){this.dx = -this.dx;}
		if (this.y > innerHeight - this.radius || this.y < this.radius) {this.dy = -this.dy;}
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50)
        {
            if(this.radius<maxRadius)
                this.radius+=2;
        }
        else if(this.radius>this.minRadius) {
            this.radius-=2;
        }
        if(mouse.click==true&&this.x-this.radius<mouse.x&&mouse.x<this.x+this.radius&&this.y-this.radius<mouse.y&&mouse.y<this.y+this.radius)
        {
            this.pop();
            console.log('pop')
        }
        if(this.x<innerWidth-this.radius&this.x-radius>0)
            this.entering = false;
        this.draw()
	}

}

var circleArray = [];
init()

function init()
{
    circleArray = [] ;
    //randomizes positions
    for (var i = 0; i <100; i++){
        var x = Math.random()*(innerWidth-2*radius) + radius;
        var y = Math.random()*(innerHeight-2*radius) + radius;
        var dx = (Math.random()-0.25)*4;
        var dy = (Math.random()-0.25)*4;
        var radius = (Math.random()*6) + 10;
        circleArray.push (new Circle(x,y,dx,dy,radius));
    }
}

function animate(){
	requestAnimationFrame(animate);
	//loop
	c.clearRect(0,0, innerWidth, innerHeight);
	for (var i=0; i< circleArray.length; i++){
		circleArray[i].update();
	}
}

animate();