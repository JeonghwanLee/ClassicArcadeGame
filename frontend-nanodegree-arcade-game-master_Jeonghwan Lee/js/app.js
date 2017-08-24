// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //speed * dt = movement
    this.x += this.speed * dt;    
    //When enemies are out of canvas, reset to Enemy.x = 0
    if ((this.x >= 505)){
        this.x = 0;
    }
};  

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Update the Player's position, required method for game
Player.prototype.update = function() {
    // When player is off canvas, call reset()
    if ((this.x < 0) || (this.x > 405) || (this.y >= 435)) {
        this.reset();
    }
    // Call collide() function
    this.collide();
    // Call change() function
    this.change();
};  
 
// Draw Player on the screen, required method for game
Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Convert key press intput to Player movement
Player.prototype.handleInput = function(keyCode) {
    switch (keyCode){
        case 'left': 
            this.x += -99;
            break;
        case 'right': 
            this.x += 99;
            break;
        case 'up': 
            this.y += -86;
            break;
        case 'down': 
            this.y += 86;
            break;
    }
};

// Player reset method, prototypal classes
Player.prototype.reset = function() {
    this.x = 205;
    this.y = 410;
};

// Method for collision dectecion & reset location function, use Math.abs() to calulate a distance between a player and each of enemies
Player.prototype.collide = function() { 
    for (var i= 0 ; i < allEnemies.length ; i++) {
        var xgap = Math.abs(allEnemies[i].x - this.x);
        var ygap = Math.abs((allEnemies[i].y * 1.5) - (this.y * 1.5));
        if ((xgap < 70) && (ygap < 70)) {
            // Reset allenemies & player location
            this.reset();
            allEnemies.forEach(function(enemy) {
                enemy.x =0;
            });
        }
    }
};

// Method to change a character after a player wins
Player.prototype.change = function() { 
    if (this.y < -7) {
        this.reset();
        countChar += 1;
        switch (countChar) {
            case 1: 
                this.sprite = 'images/char-cat-girl.png';
                break;
            case 2: 
                this.sprite = 'images/char-horn-girl.png';
                break;
            case 3: 
                this.sprite = 'images/char-pink-girl.png';
                break;
            case 4: 
                this.sprite = 'images/char-princess-girl.png';
                break;
            case 5: 
                this.sprite = 'images/Gem Blue.png';
                break;    
            case 6: 
                this.sprite = 'images/Gem Green.png';
                break;   
            case 7: 
                this.sprite = 'images/Gem Orange.png';
                break;               
        }
    }
    //If all characters are shown, the player character become char-boy, the initial character. 
    if (countChar > 7) {
        countChar = 0;
        this.sprite = 'images/char-boy.png';
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the Player object in a variable called player
// 'couterChar' is a global variable to count of win or character change
var countChar = 0; 
var player = new Player(205, 406);
var allEnemies = [];
var enemy1 = new Enemy(0, 50, 250);
var enemy2 = new Enemy(0, 140, 100);
var enemy3 = new Enemy(0, 230, 80);
var enemy4 = new Enemy(0, 230, 30);
var enemy5 = new Enemy(0, 320, 150);
var enemy6 = new Enemy(0, 320, 50);
var enemy7 = new Enemy(0, 50, 100);
var enemy9 = new Enemy(0, 140, 60);
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy9);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
