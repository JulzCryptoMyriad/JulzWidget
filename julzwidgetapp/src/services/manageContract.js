const {ethers} = require('hardhat');

//const provider = new ethers.providers.Web3Provider(ethereum);

async function getContract(address){
    const contract = new ethers.Contract(address, abi, provider);
    console.log('the contract i got', await contract);
    //const signer = provider.getSigner();   //set who is making the call     
    //await contract.connect(signer).approve();//calls contract function
}

module.exports = {
    getContract
  }