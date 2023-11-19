import { SETTINGS } from "./settings";

export function getSceneContext() {
    const sceneCanvas = document.getElementById('scene');
    sceneCanvas.setAttribute('width', SETTINGS.sceneWidth);
    sceneCanvas.setAttribute('height', SETTINGS.sceneHeight);

    return sceneCanvas.getContext('2d');
}