const contractAddress = "0xF775f817682112D98c1a9996834eF67C6F519205";
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
let error_already = document.querySelector(".error_already");
let error_vved = document.querySelector(".error_vved");
let main = document.querySelector(".main");
let exit = document.querySelector(".exit");
let address_cont = document.querySelector(".address_cont");
let balance_cont = document.querySelector(".balance_cont");
let role_cont = document.querySelector(".role_cont");
let perevod_btn = document.querySelector(".perevod_btn");
let div_per = document.querySelector(".div_per");
let div_send = document.querySelector(".div_send");
let rec_inp = document.querySelector(".rec_inp");
let summa_inp = document.querySelector(".summa_inp");
let cat_inp = document.querySelector(".cat_inp");
let slovo_inp = document.querySelector(".slovo_inp");
let rec_error = document.querySelector(".rec_error");
let summa_error = document.querySelector(".summa_error");
let malo_error = document.querySelector(".malo_error");
let cat_error = document.querySelector(".cat_error");
let slovo_error = document.querySelector(".slovo_error");
let type_tranz = document.querySelector(".type_tranz");

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
  zareg_btn.addEventListener("click", () => {
    registr(contractInstance);
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
  pas_inp.value = "";

  error_already.style.display = "none";
  error_vved.style.display = "none";

  reg_text.style.display = "none";
  zareg_btn.style.display = "none";

  vhod_text.style.display = "flex";
  vhod_btn.style.display = "grid";
});
reg_btn.addEventListener("click", () => {
  pas_inp.value = "";

  error_pas.style.display = "none";
  error_acc.style.display = "none";

  vhod_text.style.display = "none";
  vhod_btn.style.display = "none";

  reg_text.style.display = "flex";
  zareg_btn.style.display = "grid";
});
exit.addEventListener("click", () => {
  main.style.display = "none";
  div_send.style.display = "none";
  vhod_reg.style.display = "block";
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
  if (
    person.password ==
    web3.utils.soliditySha3({ type: "string", value: pas_inp.value })
  ) {
    vhod_reg.style.display = "none";
    console.log("Вход произведен");
    main.style.display = "block";
    div_send.style.display = "block";
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
    pas_inp.value = "";
    error_acc.style.display = "flex";
  } else {
    error_pas.style.display = "flex";
  }
}

async function registr() {
  error_already.style.display = "none";
  error_vved.style.display = "none";
  let select = document.querySelector(".select");
  console.log(select.value);
  let person = await contractInstance.methods
    .return_users()
    .call({ from: select.value });
  pas_inp.addEventListener("input", () => {
    error_already.style.display = "none";
    error_vved.style.display = "none";
  });
  console.log(person);
  if (
    person.password ==
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    if (pas_inp.value != "") {
      let new_acc = await contractInstance.methods
        .regestration(pas_inp.value)
        .send({ from: select.value });
      reg_text.style.display = "none";
      zareg_btn.style.display = "none";

      vhod_text.style.display = "flex";
      vhod_btn.style.display = "grid";
      pas_inp.value = "";

      alert("Аккаунт зарегистрирован");
    } else {
      error_vved.style.display = "flex";
    }
  } else {
    pas_inp.value = "";
    error_already.style.display = "flex";
  }
}

perevod_btn.addEventListener("click", () => {
  create_per();
});

async function create_per() {
  let error = 0;

  rec_inp.addEventListener("input", () => {
    rec_error.style.display = "none";
  });
  summa_inp.addEventListener("input", () => {
    summa_error.style.display = "none";
    malo_error.style.display = "none";
  });
  cat_inp.addEventListener("input", () => {
    cat_error.style.display = "none";
  });
  slovo_inp.addEventListener("input", () => {
    slovo_error.style.display = "none";
  });

  if (rec_inp.value == "") {
    rec_error.style.display = "flex";
    error++;
  }
  if (summa_inp.value == "") {
    summa_error.style.display = "flex";
    error++;
  }
  if (cat_inp.value == "") {
    cat_error.style.display = "flex";
    error++;
  }
  if (slovo_inp.value == "") {
    slovo_error.style.display = "flex";
    error++;
  }
  if (error == 0) {
    let balance = await web3.eth.getBalance(address_cont.textContent);
    if (
      Number(web3.utils.fromWei(balance, "ether")) > Number(summa_inp.value)
    ) {
      let perevod = await contractInstance.methods
        .perevod(
          rec_inp.value,
          summa_inp.value,
          cat_inp.value,
          slovo_inp.value,
          type_tranz.value
        )
        .send({ from: address_cont.textContent });
      console.log(type_tranz.value);
    } else {
      malo_error.style.display = "flex";
    }
  }
}
