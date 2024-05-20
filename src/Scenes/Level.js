class Level extends Phaser.Scene {
    preload() {
        // Load animation plugin
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    constructor() {
        super("levelScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 300;
        this.DRAG = 4000;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1300;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;

        // extra gameplay stuff
        this.coins = 0;

    }

    create() {
        // Create new tilemap game object
        // this.map = this.add.tilemap("platformer-level-1", 18, 18, 245, 45);
        this.map = this.make.tilemap({ key: "platformer-level-1" });
        this.physics.world.setBounds(0, 0, 245 * 18, 45 * 18);

        // Load tileset
        this.base_tileset = this.map.addTilesetImage("base_tilemap", "base_tilemap_tiles");
        this.farm_tileset = this.map.addTilesetImage("farm_tilemap", "farm_tilemap_tiles");
        this.backgrounds_tileset = this.map.addTilesetImage("backgrounds_tilemap", "backgrounds_tilemap_tiles");

        // Layers
        this.backgroundLayer = this.map.createLayer("Background", this.backgrounds_tileset, 0, 0);
        this.groundLayer = this.map.createLayer("Ground-Platforms", this.farm_tileset, 0, 0);
        this.plantsLayer = this.map.createLayer("Plants", this.farm_tileset, 0, 0);
        this.waterLayer = this.map.createLayer("Water", this.base_tileset, 0, 0);
        this.buildingsLayer = this.map.createLayer("Buildings", this.farm_tileset, 0, 0);

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        this.plantsLayer.setCollisionByProperty({
            collides: true
        });

        this.waterLayer.setCollisionByProperty({
            collides: true
        });

        this.buildingsLayer.setCollisionByProperty({
            collides: true
        });

        // FIX???
        //this.matter.world.convertTilemapLayer(this.buildingsLayer);

        // Animate
        this.animatedTiles.init(this.map);

        // Find coins in the "Objects" layer in Phaser
        // Look for them by finding objects with the name "coin"
        // Assign the coin texture from the tilemap_sheet sprite sheet
        // Phaser docs:
        // https://newdocs.phaser.io/docs/3.80.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects

        this.coins = this.map.createFromObjects("Coins", {
            name: "coin",
            key: "base_tilemap_sheet",
            frame: 151
        });

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);

        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.coinGroup = this.add.group(this.coins);

        this.animatedTiles.init(this.map);

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(30, 530, "platformer_characters", "tile_0006.png");
        my.sprite.player.flipX = true;
        my.sprite.player.setCollideWorldBounds(true);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);
        this.physics.add.collider(my.sprite.player, this.plantsLayer);
        this.physics.add.collider(my.sprite.player, this.waterLayer);
        this.physics.add.collider(my.sprite.player, this.buildingsLayer);

        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.rKey = this.input.keyboard.addKey('R');

        this.physics.world.drawDebug = false;
        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // movement vfx

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_03.png', 'smoke_09.png'],
            // frame: ['circle_05'],
            // TODO: Try: add random: true
            scale: { start: 0.01, end: 0.05 },
            // TODO: Try: maxAliveParticles: 8,
            lifespan: 350,
            // TODO: Try: gravityY: -400,
            alpha: { start: 1, end: 0.1 },
        });

        my.vfx.walking.stop();

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);


    }

    update() {
        if (cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();


            }

        } else if (cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);

            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if (!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if (my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }

        //console.log(my.sprite.player.y)

        // Handle water collision
        if (my.sprite.player.y >= 780) {

            let timer1 = this.time.delayedCall(0, function () {
                this.sound.play("drown", {
                    volume: 1
                });
            }, [], this);

            let timer2 = this.time.delayedCall(500, function () {
                my.sprite.player.setPosition(50, 500);
                my.sprite.player.flipX = true;
            }, [], this);



        }
    }
}