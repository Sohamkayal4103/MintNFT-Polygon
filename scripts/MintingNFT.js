require('dotenv').config();
const Web3 = require("web3");
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = process.env.MNEMONIC;
const clientURI = "https://rpc-mumbai.maticvigil.com";
const provider = new HDWalletProvider(mnemonic, clientURI);
const web3 = new Web3(provider);

const data = require("../build/contracts/mintContract.json");
const abiArray = data.abi;
const contract_address = process.env.CONTRACT_ADDRESS;

const deploy = async() =>{
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account",accounts[0]);

  const contract = await new web3.eth.Contract(abiArray,contract_address);
  const tokenURI = 'https://ipfs.io/ipfs/QmSRGoQZNHsD4trD2cshi2Pk6fJYgUt4ZeyzwWjQkHJCBu';
  await contract.methods.mintNFT(tokenURI).send({from: accounts[0], gas: "3000000"});

  console.log("NFT minted Successfully");
}

deploy();