const firstJob = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello World");
        }, 2000);
    });
}

firstJob()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.error(err);
    });

async function processFirstJob() {
    try {
        const res = await firstJob();
        console.log(res);
    }catch(err){
        console.error(err);
    }
}

processFirstJob();