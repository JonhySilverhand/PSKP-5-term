const SquarePower = (num) => {
    return new Promise((resolve, reject) => {
       if(typeof num !== 'number'){
           reject('Invalid input! Type: not a number');
        } else{
           resolve(Math.pow(num, 2));
       }
    });
}

const CubePower = (num) => {
    return new Promise((resolve, reject) => {
        if(typeof num !== 'number'){
            reject('Invalid input! Type: not a number');
        } else{
            resolve(Math.pow(num, 3));
        }
    });
}

const FourthPower = (num) => {
    return new Promise((resolve, reject) => {
        if(typeof num !== 'number'){
            reject('Invalid input! Type: not a number');
        } else{
            resolve(Math.pow(num, 4));
        }
    });
}

const number = 2;

Promise.all([
    SquarePower(number),
    CubePower("ggg"),
    FourthPower(number),
])
.then((results) => {
    console.log(`SquarePow: ${results[0]}`);
    console.log(`CubePow: ${results[1]}`);
    console.log(`FourthPow: ${results[2]}`);
})
.catch((err) => {
    console.error(err);
})