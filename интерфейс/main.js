const contractAddress = "0x7FfBE0934A0072361A2449D0f5a8d560D7509Cc8";
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "trans_id",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "admin_agree",
        type: "bool",
      },
    ],
    name: "admin_check",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "summa",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "string",
        name: "kod_slovo",
        type: "string",
      },
      {
        internalType: "bool",
        name: "safe_trans",
        type: "bool",
      },
    ],
    name: "perevod",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "recipient_agree",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "trans_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "kod_slovo",
        type: "string",
      },
    ],
    name: "recipient_acc",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
    ],
    name: "regestration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "bytes32",
        name: "password",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let web3, accounts, balance;
let contractInstance;

async function network() {
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
  console.log(web3);
  contractInstance = new web3.eth.Contract(abi, contractAddress);
}
network();

async function getAcc() {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  getBal(accounts);
}
getAcc();

async function getBal(accounts) {
  balance = await web3.eth.getBalance(accounts[0]);
  console.log(balance);
}

async function registr() {
  let mas = await contractInstance.methods;
  console.log(mas);
  login = document.querySelector(".login_inp");
  password = document.querySelector(".pas_inp");
}
registr();
