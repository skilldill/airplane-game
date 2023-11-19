import { getSceneContext } from './getSceneContext';
import { getTimerScene } from './getTimerScene';
import { initControls } from './initControls';
import { initResult } from './initResult';
import { BonusRenderer } from './renders/BonusRenderer';
import { CloudRenderer } from './renders/CloudRenderer';
import { OilRenderer } from './renders/OilRenderer';
import { PlaneRenderer } from './renders/PlaneRenderer';
import { PowerRenderer } from './renders/PowerRenderer';
import { clearScene } from './renders/clearScene';
import { SETTINGS } from './settings';
import { BONUSE_TEMPLATE_DEFAULT, BONUS_COLORS_MAP } from './templates/bonusTemplate';
import { CLOUDS_COLORS_MAP, CLOUD_TEMPLATE_DEFAULT } from './templates/cloudTemplates';
import { OIL_COLORS_MAP, OIL_TEMPLATE_DEFAULT } from './templates/oilTemplates';
import { PLANE_COLORS_MAP, PLANE_TEMPLATE_DEFAULT } from './templates/planeTemplates';
import { getRandomInt } from './utils';

const state = {
    airplanePosX: 40,
    airplanePosY: 300,
};

let controlsState = {
    verticalTouched: '',
    horizontalTouched: '',
};

function getState() {
    switch (controlsState.verticalTouched) {
        case 'up':
            state.airplanePosY -= 10;
            break;
        case 'down':
            state.airplanePosY += 10;
            break;
    }

    switch (controlsState.horizontalTouched) {
        case 'left':
            state.airplanePosX -= 5;
            break;
        case 'right':
            state.airplanePosX += 5;
            break;
    }

    return state;
}

function handleTouchControls(arrowState) {
    controlsState = arrowState;
}

let milles = 0;
let finished = false;
const millesDisplay = document.getElementById('milles-display');

export function initGame() {
    const sceneCtx = getSceneContext();
    const slowCloudRenderer = new CloudRenderer(
        sceneCtx,
        SETTINGS.sceneWidth,
        SETTINGS.sceneHeight,
        CLOUD_TEMPLATE_DEFAULT,
        CLOUDS_COLORS_MAP,
        'low'
    );

    const fastCloudRenderer = new CloudRenderer(
        sceneCtx,
        SETTINGS.sceneWidth,
        SETTINGS.sceneHeight,
        CLOUD_TEMPLATE_DEFAULT,
        CLOUDS_COLORS_MAP,
        'low'
    );

    const bonusRenderer = new BonusRenderer(
        sceneCtx,
        SETTINGS.sceneWidth,
        SETTINGS.sceneHeight,
        BONUSE_TEMPLATE_DEFAULT,
        BONUS_COLORS_MAP,
        'extra-low'
    );

    const oilRenderer = new OilRenderer(
        sceneCtx,
        SETTINGS.sceneWidth,
        SETTINGS.sceneHeight,
        OIL_TEMPLATE_DEFAULT,
        OIL_COLORS_MAP,
        'extra-low'
    );
    
    const powerRenderer = new PowerRenderer(sceneCtx, SETTINGS.sceneWidth);

    const planeRenderer = new PlaneRenderer(sceneCtx, PLANE_TEMPLATE_DEFAULT, PLANE_COLORS_MAP);

    let renderFns = [
        clearScene, 
        () => slowCloudRenderer.moveObjects(1, 2),
        () => fastCloudRenderer.moveObjects(2, 8),
        // () => bonusRenderer.moveObjects(3, 2),
        () => oilRenderer.moveObjects(4, 1),
        (_, currentState) => 
            planeRenderer.renderObject(
                currentState.airplanePosX, 
                currentState.airplanePosY, 
                3
            ),

        // HANDLE GET OILS
        (_, { airplanePosX, airplanePosY }) => {
            const foundOilIndex = 
                oilRenderer.objectsForRender.findIndex((oil) => {
                    return (oil.x >= airplanePosX && oil.x <= airplanePosX + 50) 
                        && (oil.y >= airplanePosY - 30 && oil.y <= airplanePosY + 80); 
                });
            
            if (foundOilIndex > -1) {
                const oil =  oilRenderer.objectsForRender[foundOilIndex];
                oil.x = oil.initX;
                oil.y = getRandomInt(SETTINGS.sceneHeight);
                powerRenderer.upPower();
            }
        },
        powerRenderer.renderPowerLine,
        () => { 
            if (!finished) {
                milles += 1; 

                if (milles % 50 === 0) {
                    millesDisplay.innerText = milles / 10;

                    powerRenderer.downPower(() => {
                        initResult(milles / 10);
                        finished = true;
                    });
                }
            }
        },
    ];

    initControls(handleTouchControls)

    const timerScene = getTimerScene(renderFns, sceneCtx, getState, SETTINGS.timerInterval);
    timerScene();
}
