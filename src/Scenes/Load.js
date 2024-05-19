class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // Load character atlas
        this.load.atlas("platformer_characters", "./assets/kenney_pixel-platformer/Tilemap/tilemap-characters_packed.png", "assets/kenney_pixel-platformer/Tilemap/tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("base_tilemap_tiles", "./assets/kenney_pixel-platformer/Tilemap/tilemap_packed.png");                         
        this.load.image("farm_tilemap_tiles", "./assets/kenney_pixel-platformer-farm-expansion/Tilemap/tilemap_packed.png");
        this.load.image("backgrounds_tilemap_tiles", "./assets/kenney_pixel-platformer/Tilemap/tilemap-backgrounds_packed.png");
        this.load.tilemapTiledJSON("platformer-level-1", "./assets/platformer-level-1.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("base_tilemap_sheet", "./assets/kenney_pixel-platformer/Tilemap/tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        // Load the tilemap as a spritesheet
        this.load.spritesheet("farm_tilemap_sheet", "./assets/kenney_pixel-platformer-farm-expansion/Tilemap/tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        // Load the tilemap as a spritesheet
        this.load.spritesheet("backgrounds_tilemap_sheet", "./assets/kenney_pixel-platformer/Tilemap/tilemap-backgrounds_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        // Load particle multiatlas
        this.load.multiatlas("kenny-particles", "./assets/kenney_particle-pack/kenny-particles.json");

    }

}
