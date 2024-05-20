class HUD extends Phaser.Scene {
    preload() {
        this.textConfig = {
            fontFamily: 'kenney-mini',
            fontSize: 50,
            color: white,
        }
    }
    constructor() {
        super("hudScene");
    }

    create(coins) {
        let text = this.add.text(0, 0, 'Score:' + coins, this.textConfig);
        text.visible = true;
    }

}