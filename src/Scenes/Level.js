class Level extends Phaser.Scene {
    preload() {
        // Load animation plugin
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');

        // Load character atlas
        this.load.atlas("platformer_characters", "assets/kenney_pixel-platformer/Tilemap/tilemap-characters_packed.png", "assets/kenney_pixel-platformer/Tilemap/tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("base_tilemap_tiles", "assets/kenney_pixel-platformer/Tilemap/tilemap_packed.png");                         
        this.load.image("farm_tilemap_tiles", "assets/kenney_pixel-platformer-farm-expansion/Tilemap/tilemap_packed.png");
        this.load.image("backgrounds_tilemap_tiles", "assets/kenney_pixel-platformer/Tilemap/tilemap-backgrounds_packed.png");
        this.load.tilemapTiledJSON("platformer-level-1", "assets/platformer-level-1.tmj");   // Tilemap in JSON
    }

    constructor() {
        super("level");
    }

    create() {
        // Create new tilemap game object
        this.map = this.add.tilemap("platformer-level-1", 18, 18, 245, 45);

        // Load tileset
        this.base_tileset = this.map.addTilesetImage("base_tilemap", "base_tilemap_tiles");
        this.farm_tileset = this.map.addTilesetImage("farm_tilemap", "farm_tilemap_tiles");
        this.backgrounds_tileset =  this.map.addTilesetImage("backgrounds_tilemap", "backgrounds_tilemap_tiles");

        // Layers
        this.backgroundLayer =  this.map.createLayer("Background", this.bg_tileset, 0, 0);
        this.groundLayer = this.map.createLayer("Ground-Platforms", this.farm_tileset, 0, 0);
        this.plantsLayer = this.map.createLayer("Plants", this.farm_tileset, 0, 0);
        this.waterLayer = this.map.createLayer("Water", this.base_tileset, 0, 0);
        this.buildingsLayer = this.map.createLayer("Buildings", this.farm_tileset, 0, 0);
        this.collectiblesLayer = this.map.createLayer("Collectibles", this.base_tileset, 0, 0);

        this.backgroundLayer.setScale(2);
        this.groundLayer.setScale(2);
        this.plantsLayer.setScale(2);
        this.waterLayer.setScale(2);
        this.buildingsLayer.setScale(2);
        this.collectiblesLayer.setScale(2);
        
        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        // Make it collidable
        this.plantsLayer.setCollisionByProperty({
            collides: true
        });

        this.animatedTiles.init(this.map);

    }

    update() {

    }
}