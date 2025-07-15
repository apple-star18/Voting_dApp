const Web3 = require("web3");
const { contractAddress, privateKey, rpcUrl } = require("../config/config");
const contractJson = require("../abi/Voting.json");

const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const contract = new web3.eth.Contract(contractJson.abi, contractAddress);

async function addCandidate(name) {
    return contract.methods.addCandidate(name).send({
        from: account.address,
        gas: 3000000
    });
}

async function getCandidates() {
    return contract.methods.getCandidates().call();    
}

async function vote(candidateIndex, voterAddress) {
    return contract.methods.vote(candidateIndex).send({
        from: voterAddress,
        gas: 3000000
    });
}

async function getWinner() {
    return contract.methods.getWinner.call();
}

module.exports = {
    addCandidate,
    getCandidates,
    vote,
    getWinner
};