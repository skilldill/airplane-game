import { SETTINGS } from "../settings";

export function clearScene(ctx) {
    ctx.fillStyle = SETTINGS.sceneBaseColor;
    ctx.fillRect(0, 0, SETTINGS.sceneWidth, SETTINGS.sceneHeight);
}
