import { getRandomInt } from "../utils";

export class BaseRenderer {
    objectsForRender = []; // { x, y, initX }
    
    constructor(
        ctx, 
        sceneWidth, 
        sceneHeight, 
        template, 
        colorsMap,
    ) {
        this.ctx = ctx;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        this.template = template;
        this.colorsMap = colorsMap;
    }

    getRandomInt = (max) => {
        return getRandomInt(max);
    }
    
    /**
     * Возвращате true или false в зависимости
     * от заданной плотности
     * @param {*} density low | normal | high
     */
    checkIsRandomConditions = (density) => {
        let randomMax = 10000;
        let trigger = [100];

        switch(density) {
            case 'extra-low':
                randomMax = 900000;
                break;

            case 'low':
                randomMax = 200000;
                break;

            case 'high':
                randomMax = 1000;
                trigger = [10, 100];
                break;

            case 'normal':
            default:
                break;
        }

        const random = this.getRandomInt(randomMax);
        return trigger.includes(random);
    }

    generateObjects = (
        coefByX = 1, 
        coefByY = 1, 
        startX = 0,
        density = 'normal'
    ) => {
        const maxWidth = this.sceneWidth * coefByX;
        const maxHeight = this.sceneHeight * coefByY;

        for (let y = 0; y < maxHeight; y++) {
            for (let x = startX; x < maxWidth; x++) {
                if (this.checkIsRandomConditions(density)) {
                    this.objectsForRender.push({ x, y, initX: x });
                }
            }
        }
    }

    renderObject = (x, y, coef) => {
        for (let j = 0; j < this.template.length; j++) {
            const row = this.template[j];

            for (let i = 0; i < row.length; i++) {
                const cell = row[i];

                if (cell === 0) continue;

                this.ctx.fillStyle = this.colorsMap[cell];
                this.ctx.fillRect(x + (i * coef), y + (j * coef), coef, coef);
            }
        }
    }

    moveObjects = (
        steps = 1, 
        sizeCoef = 1,
        isInfinity = true,
    ) => {
        this.objectsForRender.forEach((objectForRender) => {
            if (isInfinity && objectForRender.x < -this.template[0].length * sizeCoef) {
                if (objectForRender.initX < this.sceneWidth) {
                    objectForRender.x = objectForRender.initX + this.sceneWidth;
                } else {
                    objectForRender.x = objectForRender.initX;
                }
                objectForRender.y = this.getRandomInt(this.sceneHeight);
            }
            else objectForRender.x -= steps;
            this.renderObject(objectForRender.x, objectForRender.y, sizeCoef);
        });
    } 
}
