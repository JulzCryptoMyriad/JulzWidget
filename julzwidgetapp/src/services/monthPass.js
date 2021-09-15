
const thirtynDays = 30 * 24 * 60 * 60;
async function future(){
    await hre.network.provider.request({
    method: "evm_increaseTime",
    params: [thirtynDays]
    });
    console.log('Welcome to the future');
}

future();