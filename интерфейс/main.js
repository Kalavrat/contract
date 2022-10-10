const contractAddress = "0x225F632Fc6a5E2026d07a014461923CE63c3cF7e";
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
    name: "return_users",
    outputs: [
      {
        components: [
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
        internalType: "struct oplata.user",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
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
let body = document.querySelector(".body");
let vhod_reg = document.querySelector(".vhod_reg");
let form = document.querySelector(".form");
let enter = document.querySelector(".enter_btn");
let reg_btn = document.querySelector(".reg_btn");
let vhod_text = document.querySelector(".vhod_text");
let vhod_btn = document.querySelector(".vhod_btn");
let reg_text = document.querySelector(".reg_text");
let zareg_btn = document.querySelector(".zareg_btn");
let pas_inp = document.querySelector(".pas_inp");
let error_pas = document.querySelector(".error_pas");
let error_acc = document.querySelector(".error_acc");
let main = document.querySelector(".main");
let address_cont = document.querySelector(".address_cont");
let balance_cont = document.querySelector(".balance_cont");
let role_cont = document.querySelector(".role_cont");

let web3, accounts, balance;
let contractInstance;

async function network() {
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
  console.log(web3);
  contractInstance = new web3.eth.Contract(abi, contractAddress);
  vhod_btn.addEventListener("click", () => {
    error_pas.style.display = "none";
    error_acc.style.display = "none";
    vhod(contractInstance);
  });
}
network();

async function getAcc() {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  // getBal(accounts);
  getList(accounts);
}
getAcc();

async function getBal(acc) {
  balance = await web3.eth.getBalance(acc);
  console.log(balance);
}

enter.addEventListener("click", () => {
  console.log("enter");
  reg_text.style.display = "none";
  zareg_btn.style.display = "none";
  vhod_text.style.display = "flex";
  vhod_btn.style.display = "grid";
});
reg_btn.addEventListener("click", () => {
  console.log("reg");
  vhod_text.style.display = "none";
  vhod_btn.style.display = "none";
  reg_text.style.display = "flex";
  zareg_btn.style.display = "grid";
});

function getList(accounts) {
  let login_text = document.querySelector(".login_text");
  let select = document.createElement("select");
  select.className = "select";
  login_text.after(select);
  for (let i = 0; i < accounts.length; i++) {
    let option = document.createElement("option");
    option.className = "option";
    option.value = accounts[i];
    option.text = accounts[i];
    select.appendChild(option);
  }
}

async function vhod() {
  let select = document.querySelector(".select");
  console.log(select.value);
  let person = await contractInstance.methods
    .return_users()
    .call({ from: select.value });
  pas_inp.addEventListener("input", () => {
    error_pas.style.display = "none";
    error_acc.style.display = "none";
  });
  console.log(person);
  if (person.password == pas_inp.value) {
    vhod_reg.style.display = "none";
    console.log("Вход произведен");
    main.style.display = "block";
    address_cont.textContent = select.value;
    acc = select.value;
    balance = await web3.eth.getBalance(acc);
    balance_cont.textContent = `${web3.utils.fromWei(balance, "ether")} Eth`;
    console.log(person.role);
    if (person.role == "0") {
      role_cont.textContent = "User";
    } else {
      role_cont.textContent = "Admin";
    }
  } else if (
    person.password ==
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    console.log("Вы не зарегистрированы");
    error_acc.style.display = "flex";
  } else {
    console.log("Неверныый пароль");
    error_pas.style.display = "flex";
  }
}

async function registr() {
  let mas = await contractInstance.methods;
  console.log(mas);
  login = document.querySelector(".login_inp");
  password = document.querySelector(".pas_inp");
}
// registr();
