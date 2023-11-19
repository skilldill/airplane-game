import { BaseRenderer } from "./BaseRenderer";

export class PowerRenderer extends BaseRenderer {
    constructor(ctx, sceneWidth) {
        super(ctx, sceneWidth);
        this.baseLineWidth = this.sceneWidth - 40;
        this.power = 100;
    }

    renderPowerLine = () => {
        this.ctx.fillStyle = '#0f0';
        const powerLineWidth = (this.baseLineWidth / 100) * this.power;
        this.ctx.fillRect(20, 20, powerLineWidth, 20);
    }

    downPower = (onFinish) => {
        this.power -= 5;

        if (this.power <= 0) onFinish();
    }

    upPower = () => {
        this.power += 10;

        if (this.power > 100)
            this.power = 100;
    }
}