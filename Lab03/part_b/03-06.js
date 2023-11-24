const SquarePowerWithDelay = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof num !== 'number'){
                reject('Invalid input! Type: not a number');
            } else{
                resolve(Math.pow(num, 2));
            }
        }, 2000);
    });
}

const CubePowerWithDelay = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof num !== 'number'){
                reject('Invalid input! Type: not a number');
            } else{
                resolve(Math.pow(num, 3));
            }
        }, 4000);
    });
}

const FourthPowerWithDelay = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof num !== 'number'){
                reject('Invalid input! Type: not a number');
            } else{
                resolve(Math.pow(num, 4));
            }
        }, 3000);
    });
}

Promise.race([
    SquarePowerWithDelay("sa"),
    CubePowerWithDelay(3),
    FourthPowerWithDelay(3),
])
    .then((result) => {
        console.log(`1st resolved result: ${result}`);
    })
    .catch((err) => {
        console.error(`ERROR: ${err}`);
    });
Promise.any([
    SquarePowerWithDelay("sdsvf"),
    CubePowerWithDelay("fhfh"),
    FourthPowerWithDelay("sds"),
])
    .then((result) => {
        console.log(`1st resolved result: ${result}`);
    })
    .catch((err) => {
        console.error(`ERROR: ${err}`);
    });