

contractAddress = "0xfEA361a4bc6500e218019bBE1054a8ad5612f86E";
contractAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "name": "NewSubscription",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "setSubscriptionFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "subscribe",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "subscriberList",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "subscribers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "subscriptionFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const main1 = async() => {
    const decimals = 18;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await provider.send("eth_requestAccounts", [])
    address_new = await signer.getAddress();
    console.log(address_new)
    var element = document.getElementById("myPara1");
    element.innerHTML = "Metamask is connected " + account;
    var subfee = await document.getElementById("subfee");
    subfee = subfee.value
    const amountFormatted = ethers.utils.parseEther(subfee, decimals);
    var p1 = document.getElementById("p1");
    
    const SubscriptionContract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx =  await SubscriptionContract.setSubscriptionFee(amountFormatted);
    await tx.wait();
    p1.innerHTML = "Subscription fee is set to: " + amountFormatted;
    
}


const main2 = async() => {
    const decimals = 18;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await provider.send("eth_requestAccounts", [])
    address_new = await signer.getAddress();
    console.log(address_new)
    var element = document.getElementById("myPara2");
    element.innerHTML = "Metamask is connected " + account;
    var subfee = await document.getElementById("sub");
    subfee = subfee.value;
    const amountFormatted = ethers.utils.parseEther(subfee, decimals);
    var p2 = document.getElementById("p2");
    
    const SubscriptionContract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx =  await SubscriptionContract.subscribe({ value: amountFormatted });
    await tx.wait();
    p2.innerHTML = "Subscription done for the user " + address_new;
    
}