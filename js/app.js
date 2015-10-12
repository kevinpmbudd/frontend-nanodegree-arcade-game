// Enemies our player must avoid
var Enemy = function(pos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = pos[0];
    this.y = pos[1];
    this.speed = Math.floor(Math.random() * 150) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x > 505) {
        this.x = -100;
    }
    // create a space in shape of square that represents the enemies kill zone
    var bugXBufferLeft = this.x - 60,
        bugXBufferRight = this.x + 60,
        bugYBufferTop = this.y - 60,
        bugYBufferBottom = this.y + 60;

    // if the player enters an enemies kill zone the are killed and the player is reset
    if (player.x > bugXBufferLeft && player.x < bugXBufferRight && player.y > bugYBufferTop && player.y < bugYBufferBottom) {
        player.resetPlayer();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log("Enemy x and y " + this.x + " " + this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(pos) {
    this.sprite = 'images/char-boy.png';
    this.x = pos[0];
    this.y = pos[1];
}


// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.x, this.y);
};

// Reset the player to its original location
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 320;
};

// Handle input from the keyboard to control players movement
Player.prototype.handleInput = function(move) {
    switch (move) {
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 100;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y = this.y - 83;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x = this.x + 100;
            }
            break;
        case 'down':
            if (this.y < 350) {
                this.y = this.y + 83;
            }
            break;
        case 'enter':
            if(this.y === -12) {
                this.resetPlayer();
            }
            break;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// each loop of the for loop places two new enemies on that row
var allEnemies = [];
for (var i = 1; i < 4; i++) {
    var enemy1 = new Enemy([-100, (83 * i) - 21]);
    var enemy2 = new Enemy([-300, (83 * i) - 21]);
    allEnemies.push(enemy1, enemy2);
}

// Place the player object in a variable called player and initialize them at the
// starting position
var player = new Player([200, 320]);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});