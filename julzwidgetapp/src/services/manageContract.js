const {ethers} = require('hardhat');

//const provider = new ethers.providers.Web3Provider(ethereum);

async function getContract(data){
try {
    const contract = new ethers.Contract(data.address, data.abi);
    console.log('the contract i got', await contract);
    //const signer = provider.getSigner();   //set who is making the call     
    //await contract.connect(signer).approve();//calls contract function
} catch (error) {
    console.log('getContract failed',error);
}

}

module.exports = {
    getContract
  }