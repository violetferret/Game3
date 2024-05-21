class End extends Phaser.Scene {
    preload() {

        this.load.image("farm_tilemap_tiles", "./assets/kenney_pixel-platformer-farm-expansion/Tilemap/tilemap_packed.png");
        this.load.image("backgrounds_tilemap_tiles", "./assets/kenney_pixel-platformer/Tilemap/tilemap-backgrounds_packed.png");
        this.load.tilemapTiledJSON("platformer-end", "./assets/platformer-end.tmj");   // Tilemap in JSON

        this.textConfig = {
            fontFamily: 'kenney-mini',
            fontSize: 60,
            color: "orange",
        }  
    }

    constructor() {
        super("endScene");
    }

    create() {
        this.scene.stop("hudScene");
        this.scene.stop("levelScene");
        game.sound.stopAll();

        this.map = this.make.tilemap({ key: "platformer-end" });

        this.farm_tileset = this.map.addTilesetImage("tilemap_packed", "farm_tilemap_tiles");
        this.backgrounds_tileset = this.map.addTilesetImage("tilemap-backgrounds_packed", "backgrounds_tilemap_tiles");

        this.backgroundLayer = this.map.createLayer("Background", this.backgrounds_tileset, 0, 0).setScrollFactor(0.25);
        this.groundLayer = this.map.createLayer("Everything", this.farm_tileset, 0, 0);
        this.backgroundLayer.setScale(2);
        this.groundLayer.setScale(2);

        this.levelScene = this.scene.get("levelScene");

        this.text = this.add.text(250, 60, 'Congratulations! Your score is:', this.textConfig);
        this.score = this.add.text(650, 100, this.levelScene.coins_amount, this.textConfig);
        this.score.setFontSize(150);
        this.score.setColor("white");

        this.text.visible = true;
        this.score.visible = true;

        this.sound.play("congrats");

        this.playAgain = this.add.text(580, 255, 'Play again?', this.textConfig,).setInteractive().on('pointerdown', () => this.scene.start("levelScene") );
        this.playAgain.setFontSize(50);
        this.playAgain.setColor("white");
        this.playAgain.visible = true;


    }

    update() {
        
    }
}