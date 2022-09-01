let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const screenWidth = document.documentElement.scrollWidth; //find out the size of the site
const screenHeight = document.documentElement.scrollHeight;

const blockSize = 12; //size one block

//resize the canvas so that the canvas size is an even number bloockSize
let i = 0;
while(screenWidth % blockSize - i != 0)
{
    i++;
    canvas.width = screenWidth - i;
}
i = 0;
while(screenHeight % blockSize - i != 0)
{
    i++;
    canvas.height = screenHeight - i;
}

const width = canvas.width;
const height = canvas.height;

const blockAllWidth = width / blockSize; //all blocks in latitude and heightу
const blockAllHeight = height / blockSize;
const blockAll = blockAllWidth + blockAllHeight; //find out how many blocks are on the canvas

let time = null;
let inGame = true;
let apples = 0;
let run = true;

var circle =function(x,y,radius) {
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2,false);
	ctx.fill();
}

let Snake = function() 
{ //make class snake
    if(blockAll % 2 == 0) 
        this.x = blockAllWidth / 2 * blockSize - blockSize/2;
    else if(blockAll % 2 != 0)
        this.x = blockAllWidth / 2 * blockSize - blockSize;
    this.y = blockAllHeight / 2 * blockSize - blockSize/2;
    this.tail = [];
    this.tail[0] = {
        x: this.x,
        y: this.y,
        width: blockSize,
        height: blockSize
    }
    for(let i=0;i<2;i++)
    {
        this.tail.push({
            x: this.x - blockSize * (i+1),
            y: this.y,
            width: blockSize,
            height: blockSize
        });
    }

    this.right = true;
    this.left = false;
    this.down = false;
    this.up = false;
};

Snake.prototype.checkColision = function()
{
    for(let i=1;i<this.tail.length;i++)
    {
        if(this.tail[0].x == this.tail[i].x && this.tail[0].y == this.tail[i].y)
            inGame = false;
    }

    if(this.tail[0].x<0)
            this.tail[0].x = width - blockSize;
        else if(this.tail[0].x>width - blockSize)
            this.tail[0].x = 0;
        if(this.tail[0].y<0)
            this.tail[0].y = height - blockSize;
        else if(this.tail[0].y>height - blockSize)
            this.tail[0].y = 0;
};

Snake.prototype.logic = function()
{
    for(let i=this.tail.length-1;i>0;i--)
    {
        this.tail[i].x = this.tail[i-1].x;
        this.tail[i].y = this.tail[i-1].y;
    }

    if(this.right)
        this.tail[0].x += blockSize;
    else if(this.left)
        this.tail[0].x -= blockSize;
    else if(this.down)
        this.tail[0].y += blockSize;
    else if(this.up)
        this.tail[0].y -= blockSize;
};

Snake.prototype.draw = function() 
{ // creating a method to draw a snake on a canvas
    ctx.fillStyle = "green";
    for(let i=0;i<snake.tail.length;i++)
    {
        ctx.fillRect(this.tail[i].x, this.tail[i].y, this.tail[i].width, this.tail[i].height);
    }
};

let Apple = function()
{
    this.x = Math.floor(Math.random() * blockAllWidth - 2) * blockSize;
    this.y = Math.floor(Math.random() * blockAllHeight - 2) * blockSize;

    if(this.x < 0)
        this.x = 0;
    if(this.y < 0)
        this.y = 0;
    if(this.x > width || this.x == width)
        this.x = width - blockSize;
    if(this.y > height || this.y == height)
        this.y = height - blockSize;
}

Apple.prototype.draw = function()
{
    ctx.fillStyle="red";
    circle(this.x + blockSize / 2, this.y + blockSize / 2, blockSize / 2);
}

let snake = new Snake();
let apple = new Apple();

function checkColision()
{
    if(apple.x == snake.tail[0].x && apple.y == snake.tail[0].y)
    {
        apples++;

        snake.tail.push({
            x: 0,
            y: 0,
            width: blockSize,
            height: blockSize
        });

        apple.x = Math.floor(Math.random() * blockAllWidth) * blockSize - blockSize;
        apple.y = Math.floor(Math.random() * blockAllHeight) * blockSize - blockSize;

        if(this.x < 0)
            this.x = 0;
        if(this.y < 0)
            this.y = 0;
        if(this.x > width || this.x == width)
            this.x = width - blockSize;
        if(this.y > height || this.y == height)
            this.y = height - blockSize;
    }

    snake.checkColision();
}

function logic()
{
    snake.logic();
}

function draw()
{
    ctx.clearRect(0, 0, width, height);

    apple.draw();
    snake.draw();
}

function main()
{
    if(inGame)
    {
        checkColision();
        logic();
        draw();
    } else {
        clearInterval(time);
        ctx.font = "26px Arial";
        ctx.fillText("Game Over(((", width / 2, height / 2);
    }

    ctx.font = "24px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("количество яблок: " + apples, 1, 18);

    run = true;
}

document.addEventListener("keydown", function(e) {
    if(run)
        if(e.keyCode === 39 &&! snake.left)
        {
            snake.right = true;
            snake.down = false;
            snake.up = false;
            run = false;
        } else if(e.keyCode === 37 &&! snake.right)
        {
            snake.left = true;
            snake.down = false;
            snake.up = false;
            run = false;
        } else if(e.keyCode === 40 &&! snake.up)
        {
            snake.down = true;
            snake.right = false;
            snake.left = false;
            run = false;
        } else if(e.keyCode === 38 &&! snake.up)
        {
            snake.up = true;
            snake.right = false;
            snake.left = false;
            run = false;
        }
});

time = setInterval(main, 1000/5);
