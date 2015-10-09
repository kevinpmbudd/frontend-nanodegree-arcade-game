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
        this.x = 0;
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    allEnemies.forEach(function(enemy) {
            if (enemy.x == this.x  && enemy.y == this.y) {
                console.log("collision detected");
                Engine.reset();
            }
        });
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.x, this.y);
};

/* Check the players position to check if they have won the game
 * if they have won then display message and restart the game
 * a win count will be added next
 */
Player.prototype.checkForVictory = function() {

    if (this.y === -12) {
        //display message
        //ctx.drawImage(Resources.get('images/winner.jpg'), 200, 200);
        //reset position
        //this.x = 200;
        //this.y = 320;
        reset();
    }
};

// Handle input from the keyboard to control players movement
Player.prototype.handleInput = function (move) {
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
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 1; i < 4; i++){
    var enemy = new Enemy([-100, (83 * i) - 21]);
    allEnemies.push(enemy);
    console.log(enemy);
}

var player = new Player([200,320]);

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
