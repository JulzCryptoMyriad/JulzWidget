const {ethers} = require('hardhat');

//const provider = new ethers.providers.Web3Provider(ethereum);

async function getContract(data){
try {
    const contract = new ethers.Contract(data.address, `[{"type": "constructor", "inputs": [{"name": "_owner", "type": "address", "internalType": "address payable"}, {"name": "_monthly", "type": "bool", "internalType": "bool"}, {"name": "_covergas", "type": "bool", "internalType": "bool"}, {"name": "_treasury", "type": "address", "internalType": "address"}, {"name": "_withdrawToken", "type": "address", "internalType": "address"}], "stateMutability": "payable"}, {"name": "Paid", "type": "event", "inputs": [{"name": "", "type": "address", "indexed": false, "internalType": "address"}, {"name": "", "type": "uint256", "indexed": false, "internalType": "uint256"}], "anonymous": false}, {"name": "covergas", "type": "function", "inputs": [], "outputs": [{"name": "", "type": "bool", "internalType": "bool"}], "stateMutability": "view"}, {"name": "destruct", "type": "function", "inputs": [], "outputs": [], "stateMutability": "nonpayable"}, {"name": "lastWithdrawDate", "type": "function", "inputs": [], "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}], "stateMutability": "view"}, {"name": "monthly", "type": "function", "inputs": [], "outputs": [{"name": "", "type": "bool", "internalType": "bool"}], "stateMutability": "view"}, {"name": "treasury", "type": "function", "inputs": [], "outputs": [{"name": "", "type": "address", "internalType": "address"}], "stateMutability": "view"}, {"name": "withdraw", "type": "function", "inputs": [], "outputs": [], "stateMutability": "nonpayable"}, {"name": "withdrawToken", "type": "function", "inputs": [], "outputs": [{"name": "", "type": "address", "internalType": "contract IERC20"}], "stateMutability": "view"}, {"type": "receive", "stateMutability": "payable"}]`);
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