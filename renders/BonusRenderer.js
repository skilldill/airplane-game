import { BaseRenderer } from "./BaseRenderer";

export class BonusRenderer extends BaseRenderer {
    constructor(ctx, sceneWidth, sceneHeight, template, colorsMap, density = 'normal') {
        super(ctx, sceneWidth, sceneHeight, template, colorsMap);
        this.generateObjects(3, 1, sceneWidth, density);
    }
}