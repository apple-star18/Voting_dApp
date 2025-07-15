require("dotenv").config();

module.exports = {
    privateKey: process.env.PRIVATE_KEY,
    contractAddress: process.env.CONTRACT_ADDRESS,
    rpcUrl: process.env.RPC_URL
};