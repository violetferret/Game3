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
        this.ACCELERATION = 400;
        this.DRAG = 500;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
    }

    create() {
        // Create new tilemap game object
        // this.map = this.add.tilemap("platformer-level-1", 18, 18, 245, 45);
        this.map = this.make.tilemap({key : "platformer-level-1"});

        // Load tileset
        this.base_tileset = this.map.addTilesetImage("base_tilemap", "base_tilemap_tiles");
        this.farm_tileset = this.map.addTilesetImage("farm_tilemap", "farm_tilemap_tiles");
        this.backgrounds_tileset =  this.map.addTilesetImage("backgrounds_tilemap", "backgrounds_tilemap_tiles");

        // Layers
        this.backgroundLayer =  this.map.createLayer("Background", this.backgrounds_tileset, 0, 0);
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

        // Animate
        this.animatedTiles.init(this.map);

        // Find coins in the "Objects" layer in Phaser
        // Look for them by finding objects with the name "coin"
        // Assign the coin texture from the tilemap_sheet sprite sheet
        // Phaser docs:
        // https://newdocs.phaser.io/docs/3.80.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects

        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
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
        my.sprite.player = this.physics.add.sprite(30, 345, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });
    }

    update() {

    }
}