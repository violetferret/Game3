class HUD extends Phaser.Scene {
    preload() {
        this.textConfig = {
            fontFamily: 'kenney-mini',
            fontSize: 50,
            color: "white",
        }  
    }

    constructor() {
        super("hudScene");
    }

    create(Level) {
        this.text = this.add.text(0, 0, 'Score: 0', this.textConfig);
        this.levelScene = this.scene.get("levelScene");
        this.text.visible = true;
    }

    update() {
        this.text.setText("Score: " + this.levelScene.coins_amount);
        this.text.visible = true;
    }
}