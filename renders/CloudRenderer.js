import { BaseRenderer } from "./BaseRenderer";

export class CloudRenderer extends BaseRenderer {
    constructor(ctx, sceneWidth, sceneHeight, template, colorsMap, density = 'normal') {
        super(ctx, sceneWidth, sceneHeight, template, colorsMap);
        this.generateObjects(5, 1, 0, density);
    }
}