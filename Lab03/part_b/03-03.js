const thirdJob = (data) => {
    return new Promise((resolve, reject) => {
        if(typeof data !== 'number') {
            reject('error');
        }
        else if(data % 2 === 1){
            setTimeout(() => {
                resolve('odd');
            }, 1000);
        }
        else if(data % 2 === 0){
            setTimeout(() => {
                resolve('even');
            }, 2000)
        }
    });
}

thirdJob(4)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });

async function processThirdJob(data) {
    try {
        const res = await thirdJob(data);
        console.log(res);
    }catch(err){
            console.error(err);
    }
}

processThirdJob("smurf");