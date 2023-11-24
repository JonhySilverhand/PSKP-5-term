const secondJob = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('- job');
        }, 3000);
    });
}

secondJob()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
       console.error(err);
    });

async function processSecondJob() {
    try {
        const res = await secondJob();
        console.log(res);
    }catch(err){
        console.error(err);
    }
}

processSecondJob();