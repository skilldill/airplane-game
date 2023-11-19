export function getTimerScene(fns, ctx, getState, interval = 100) {
    let startTime = 0;

    function timerScene(timeStamp = 0) {
        const deltaTime = timeStamp - startTime;

        if (deltaTime >= interval) {
            const currentState = getState();
            fns.forEach((renderFn) => renderFn(ctx, currentState));
            startTime = timeStamp;
        }

        requestAnimationFrame(timerScene);
    }

    return timerScene;
}