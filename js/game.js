// The game properties object that currently only contains the screen dimensions
var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,

    dashSize: 5,

    paddleLeft_x: 50,
    paddleRight_x: 590,
}

var graphicAssets = {
  ballURL: 'assets/ball.png',
  ballName: 'ball',

  paddleURL: 'assets/paddle.png',
  paddleName: 'paddle'
};

var soundAssets = {
  ballBounceURL: 'assets/ballBounce',
  ballBounceName: 'ballBounce',

  ballHitURL: 'assets/ballHit',
  ballHitName: 'ballHit',

  ballMissedURL: 'assets/ballMissed',
  ballMissedName: 'ballMissed',

  mp4URL: '.m4a',
  oggURL: '.ogg'
};

// The main state that contains our game. Think of states like pages or screens such as the splash screen, main menu, game screen, high scores, inventory, etc.
var mainState = function(game) {
  this.backgroundGraphics;
  this.ballSprite;
  this.paddleLeftSprite;
  this.paddleRightSprite;
};

mainState.prototype = {
    // The preload function is use to load assets into the game
    preload: function () {
      game.load.image(graphicAssets.ballName, graphicAssets.ballURL);
      game.load.image(graphicAssets.paddleName, graphicAssets.paddleURL);

      game.load.audio(soundAssets.ballBounceName, [soundAssets.ballBounceURL+soundAssets.mp4URL, soundAssets.ballBounceURL+soundAssets.oggURL]);
      game.load.audio(soundAssets.ballHitName, [soundAssets.ballHitURL+soundAssets.mp4URL, soundAssets.ballHitURL+soundAssets.oggURL]);
      game.load.audio(soundAssets.ballMissedName, [soundAssets.ballMissedURL+soundAssets.mp4URL, soundAssets.ballMissedURL+soundAssets.oggURL]);
    },

    // The create function is called after all assets are loaded and ready for use. This is where we add all our sprites, sounds, levels, text, etc.
    create: function () {
      this.initGraphics();
    },

    // The update function is run every frame. The default frame rate is 60 frames per second, so the update function is run 60 times per second
    update: function () {

    },

    initGraphics: function() {
      this.backgroundGraphics = game.add.graphics(0, 0);
      this.backgroundGraphics.lineStyle(2, 0xFFFFFF, 1);

      for (var y = 0; y < gameProperties.screenHeight; y += gameProperties.dashSize * 2) {
          this.backgroundGraphics.moveTo(game.world.centerX, y);
          this.backgroundGraphics.lineTo(game.world.centerX, y + gameProperties.dashSize);
      }

      this.ballSprite = game.add.sprite(game.world.centerX, game.world.centerY, graphicAssets.ballName);
      this.ballSprite.anchor.set(0.5, 0.5);

      this.paddleLeftSprite = game.add.sprite(gameProperties.paddleLeft_x, game.world.centerY, graphicAssets.paddleName);
      this.paddleLeftSprite.anchor.set(0.5, 0.5);

      this.paddleRightSprite = game.add.sprite(gameProperties.paddleRight_x, game.world.centerY, graphicAssets.paddleName);
      this.paddleRightSprite.anchor.set(0.5, 0.5);
    },
};

// Initialise the Phaser framework by creating an instance of a Phaser.Game object and assigning it to a local variable called 'game'.
// The first two arguments are the width and the height of the canvas element. In this case 640 x 480 pixels. You can resize this in the gameProperties object above.
// The third argument is the renderer that will be used. Phaser.AUTO is used to automatically detect whether to use the WebGL or Canvas renderer.
// The fourth argument is 'gameDiv', which is the id of the DOM element we used above in the index.html file where the canvas element is inserted.
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

// Here we declare and add a state to the game object.
// The first argument is the state name that will is used to switch between states
// The second argument is the object name that will used when a state name is called
game.state.add('main', mainState);

// We are using the 'main' state name as the argument to load our new state.
game.state.start('main');
