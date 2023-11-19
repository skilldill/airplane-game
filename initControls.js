const arrowUp = document.getElementById('btn-arrow-up');
const arrowRight = document.getElementById('btn-arrow-right');
const arrowDown = document.getElementById('btn-arrow-down');
const arrowLeft = document.getElementById('btn-arrow-left');

function cancelContextMenu(event) {
    event.preventDefault();
}

export function initControls(onTouchControls) {
    arrowUp.addEventListener('contextmenu', cancelContextMenu);
    arrowRight.addEventListener('contextmenu', cancelContextMenu);
    arrowDown.addEventListener('contextmenu', cancelContextMenu);
    arrowLeft.addEventListener('contextmenu', cancelContextMenu);

    let controlsState = {
        horizontalTouched: '',
        verticalTouched: '',
    }

    // UP
    arrowUp.addEventListener('touchstart', () => {
        controlsState.verticalTouched = 'up';
        onTouchControls(controlsState);
    });
    arrowUp.addEventListener('touchend', () => {
        controlsState.verticalTouched = '';
        onTouchControls(controlsState);
    });

    // RIGHT
    arrowRight.addEventListener('touchstart', () => {
        controlsState.horizontalTouched = 'right';
        onTouchControls(controlsState);
    });
    arrowRight.addEventListener('touchend', () => {
        controlsState.horizontalTouched = '';
        onTouchControls(controlsState);
    });

    // DOWN
    arrowDown.addEventListener('touchstart', () => {
        controlsState.verticalTouched = 'down';
        onTouchControls(controlsState);
    });
    arrowDown.addEventListener('touchend', () => {
        controlsState.verticalTouched = '';
        onTouchControls(controlsState);
    });

    // LEFT
    arrowLeft.addEventListener('touchstart', () => {
        controlsState.horizontalTouched = 'left';
        onTouchControls(controlsState);
    });
    arrowLeft.addEventListener('touchend', () => {
        controlsState.horizontalTouched = '';
        onTouchControls(controlsState);
    });
}