let snakeBoard = document.getElementById('gameBoard');
let row = 16,
    containerRow = row * row;

for (let i = 0; i < containerRow; i++) {
    let tiles = document.createElement('div');
    tiles.classList.add('snake');
    snakeBoard.appendChild(tiles);
}

let snakeBoardItems = document.getElementsByClassName('snake');
let x = 1;
let y = 16;

for (let i = 0; i < snakeBoardItems.length; i++) {
    if (x > 16) {
        x = 1;
        y--; 
    }
    snakeBoardItems[i].setAttribute('posX', x);
    snakeBoardItems[i].setAttribute('posY', y);
    x++;
}

function generateSnake() {
    let posX = 9;
    let posY = 9;
    return [posX, posY];
}

let cordinates = generateSnake();

let snakeBody = [document.querySelector('[posX = "' + cordinates[0] + '"][posY = "' + cordinates[1] + '"]'),
    document.querySelector('[posX = "' + (cordinates[0] -1) + '"][posY = "' + cordinates[1] + '"]'),
    document.querySelector('[posX = "' + (cordinates[0] -2) + '"][posY = "' + cordinates[1] + '"]')];


for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let mouse;
let max = 16;
function createMouse() {
    function generateMouse() {
        let posX = Math.round(Math.random() * (16 - 1) + 1);
        let posY = Math.round(Math.random() * (16 - 1) + 1);
        return [posX, posY];
    }
    
    let mouseCordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    while (mouse.classList.contains('snakeBody')) {
        let mouseCordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    }

    mouse.classList.add('food');
}

createMouse();

let direction = 'right';
let steps = false;


function move() {
    let snakeCordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction === 'right') {
        if (snakeCordinates[0] < 16) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] +1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCordinates[1] + '"]'));
        } 
    } else if (direction === 'left') {
        if (snakeCordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] -1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "16"][posY = "' + snakeCordinates[1] + '"]'));
        } 
    } else if (direction === 'up') {
        if (snakeCordinates[1] < 16) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1] +1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "1"]'));
        } 
    } else if (direction === 'down') {
        if (snakeCordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1]-1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "16"]'));
        } 
    }

    if (snakeBody[0].getAttribute('posX') === mouse.getAttribute('posX') &&
        snakeBody[0].getAttribute('posY') === mouse.getAttribute('posY')
    ) {
        mouse.classList.remove('food');
        let a = snakeBody[snakeBody.length -1].getAttribute('posX');
        let b = snakeBody[snakeBody.length -1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a +'"][posY = "' + b +'"]'));
        createMouse();
    }
    
    if (snakeBody[0].classList.contains('snakeBody')) {
        clearInterval(interval);
        window.location.reload();
    }

    snakeBody[0].classList.add('head');

    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}

let interval = setInterval(move, 200); 

window.addEventListener('keydown', function(event) {
    if (steps === true) {
        if (event.keyCode === 37 && direction !== 'right') {
            direction = 'left';
            steps = false;
        } else if (event.keyCode === 38 && direction !== 'down') {
            direction = 'up';
            steps = false;
        } else if (event.keyCode === 39 && direction !== 'left') {
            direction = 'right';
            steps = false;
        } else if (event.keyCode === 40 && direction !== 'up') {
            direction = 'down';
            steps = false;
        }
    }
    
});