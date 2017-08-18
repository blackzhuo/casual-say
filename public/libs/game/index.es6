var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', '/source/phaser/bg4.png');
    game.load.image('gmover', '/source/phaser/gmover.png');
    game.load.image('ground', '/source/phaser/platform.png');
    game.load.image('star', '/source/phaser/star.png');
    game.load.image('diamond', '/source/phaser/diamond.png');
    game.load.image('firstaid', '/source/phaser/firstaid.png');
    game.load.spritesheet('dude', '/source/phaser/dude.png', 32, 48);
    game.load.spritesheet('baddie', '/source/phaser/baddie.png', 32, 32);
    game.load.image('bullet', '/source/phaser/bullet.png');
    game.load.spritesheet('blood', '/source/phaser/blood.png');

}
var sky;
var player;
var gmover;
var baddie3;
var baddies;
var baddie1;
var baddie2;
var stars;
var diamonds;
var firstaids;
var platforms;
var blood;
var cursors;
var mouse;

var bullets;
var bulletTime = 0;
var fireButton;

var score = 0;
var scoreText;
var gameOverText;

let step = 0;
let step1 = 760;
let step2 = 350;
let dir = 'right';
let dir1 = 'left';
let dir2 = 'left';

let over = false;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // game.world.setBounds(-1000, -1000, 2000, 2000);

    sky = game.add.tileSprite(0, 0, 800, 600, 'sky');

    //  A simple background for our game
    // game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    ground.fixedToCamera = true;
    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    
    
    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);



    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    baddies = game.add.group();
    baddies.enableBody = true;
    baddie1 = baddies.create(760, game.world.height - 150, 'baddie');
    game.physics.arcade.enable(baddie1);
    baddie1.body.gravity.y = 300;
    baddie1.body.bounce.y = 0.2;
    baddie1.body.collideWorldBounds = true;
    baddie1.animations.add('left', [0, 1], 10, true);
    baddie1.animations.add('right', [2, 3], 10, true);

    baddie2 = baddies.create(760, game.world.height - 400, 'baddie');
    game.physics.arcade.enable(baddie2);
    baddie2.body.gravity.y = 300;
    baddie2.body.bounce.y = 0.2;
    baddie2.body.collideWorldBounds = true;
    baddie2.animations.add('left', [0, 1], 10, true);
    baddie2.animations.add('right', [2, 3], 10, true);

    baddie3 = baddies.create(32, game.world.height - 400, 'baddie');
    game.physics.arcade.enable(baddie3);
    baddie3.body.gravity.y = 300;
    baddie3.body.bounce.y = 0.2;
    baddie3.body.collideWorldBounds = true;
    baddie3.animations.add('left', [0, 1], 10, true);
    baddie3.animations.add('right', [2, 3], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }


    diamonds = game.add.group();
    diamonds.enableBody = true;
    var diamond1 = diamonds.create(400, 20, 'diamond');


    firstaids = game.add.group();
    firstaids.enableBody = true;
    var diamond1 = firstaids.create(500, 20, 'firstaid');

    // blood = game.add.sprite(0, 0, 'blood');
    // game.physics.arcade.enable(blood);
    // blood.body.bounce.y = 0.6;
    // blood.body.gravity.y = 300;
    // blood.body.collideWorldBounds = true;
    // blood.scale.setTo(0.1, 0.1);

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bullets, platforms);
    game.physics.arcade.collide(baddies, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(gmover, platforms);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    baddie3.body.velocity.x = 0;
    baddie1.body.velocity.x = 0;
    baddie2.body.velocity.x = 0;

    sky.tilePosition.x -= 1;

    if(over){
        return false;
    }


    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    game.physics.arcade.overlap(player, baddies, kills, null, this);

    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);

    game.physics.arcade.overlap(player, firstaids, collectFirstaids, null, this);

    game.physics.arcade.overlap(bullets, baddies, killBaddies, null, this);

    
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');

        if (fireButton.isDown)
        {
            fireBullet('left');
        }
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');

        if (fireButton.isDown)
        {
            fireBullet('right');
        }
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

    if (fireButton.isDown)
    {
        fireBullet('right');
    }

    if(step > 200){
        dir = 'left';
    } else if(step < 0){
        dir = 'right';
    }
    if(dir === 'left'){
        step--;
        baddie3.body.velocity.x -= 50;
        baddie3.animations.play('left');
    } else{
        step++;
        baddie3.body.velocity.x += 50;
        baddie3.animations.play('right');
    }

    if(step1 > 760){
        dir1 = 'left';
    } else if(step1 < 0){
        dir1 = 'right';
    }
    if(dir1 === 'left'){
        step1--;
        baddie1.body.velocity.x -= 50;
        baddie1.animations.play('left');
    } else{
        step1++;
        baddie1.body.velocity.x += 50;
        baddie1.animations.play('right');
    }

    if(step2 > 350){
        dir2 = 'left';
    } else if(step2 < 0){
        dir2 = 'right';
    }
    if(dir2 === 'left'){
        step2--;
        baddie2.body.velocity.x -= 50;
        baddie2.animations.play('left');
    } else{
        step2++;
        baddie2.body.velocity.x += 50;
        baddie2.animations.play('right');
    }
}

function killBaddies(bullet, baddie){
    bullet.kill();
    baddie.kill();
}

function fireBullet (dire) {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        var bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 10, player.y + 42);
            if(dire === 'left'){
                //  And fire it
                bullet.body.velocity.x = -400;
            } else{
                //  And fire it
                bullet.body.velocity.x = 400;
            }
            bulletTime = game.time.now + 200;
            
        }
    }
}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function collectDiamond (player, diamond) {

    diamond.kill();

    score += 50;
    scoreText.text = 'Score: ' + score;
}

function collectFirstaids (player, firstaid) {

    firstaid.kill();

    
}


function kills (player, baddie) {
    gameOver();
}

function gameOver(){
    over = true;
    // baddie.animations.stop();
    // baddie1.animations.stop();
    // baddie2.animations.stop();
    // gameOverText = game.add.text(320,200, 'Game Over', { fontSize: '32px', fill: '#000' });

    gmover = game.add.sprite(200, 0, 'gmover');
    game.physics.arcade.enable(gmover);
    gmover.body.bounce.y = 0.6;
    gmover.body.gravity.y = 300;
    gmover.body.collideWorldBounds = true;
    gmover.scale.setTo(0.1, 0.1);

    game.input.onTap.addOnce(restart,this);
}


function restart () {
    stars.removeAll();
    diamonds.removeAll();
    firstaids.removeAll();
    baddies.removeAll();
    gmover.kill();
    player.kill();
    scoreText.text = 'Score: 0';

    player.revive();
}