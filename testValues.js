let floorValues =
        {
            barVals: [, 1, 1, 0.997, 0.99, 0.9, 0.65],
            //barVals: [0.99, 0.97, 0.91, 0.85, 0.77, 0.73, 0.7],
            enemyValue: 0.97,
            bottomRowEnemies: [1, 5, 9],
            numberRows: 20,
            relicNumber: 1,
            floorNumber: 0,
            storeRelicPrice: 1500
        }

let screenwidthBlocks = 10; 

function generateValues (floorObj) {
    let middleLength = (screenwidthBlocks*floorObj.numberRows);
    let nextSquareEmpty = false;
    let valueCounter = 0;
    for (let j=0; j < middleLength; j++) {
        if (nextSquareEmpty === true){
            arrayObj.push("empty")
            nextSquareEmpty = false
        } else {
            let randomNumber = Math.random() 
            const isEnemy = Math.random()
            let enemyVal = (j < (screenwidthBlocks*3)) ? 1 : floorObj.enemyValue
            if (isEnemy > enemyVal && (j % screenwidthBlocks !== 0) && ((j+1) % screenwidthBlocks !== 0) && j-1 !== chosenSquare) {
                arrayObj.pop()
                arrayObj.push("empty")
                arrayObj.push("enemy")
                nextSquareEmpty = true;
            } else {
                if (randomNumber > floorObj.barVals[0]) {
                    valueCounter += 3000;
                } else if (randomNumber > floorObj.barVals[1]) {
                    valueCounter += 1500;
                } else if (randomNumber > floorObj.barVals[2]) {
                    valueCounter += 750;
                } else if (randomNumber > floorObj.barVals[3]) {
                    valueCounter += 300;
                } else if (randomNumber > floorObj.barVals[4]) {
                    valueCounter += 100;
                } else if (randomNumber > floorObj.barVals[5]) {
                    valueCounter += 50;
                } else if (randomNumber > floorObj.barVals[6]) {
                    valueCounter += 25
                } else if (randomNumber > 0.55) {
                    arrayObj.push("empty")
                } else {
                    arrayObj.push("0")
                }
            }
        }  
    }
    console.log(valueCounter)
    return valueCounter
}    

generateValues(floorValues)
