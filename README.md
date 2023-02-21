# Sample smart contract based subscription project using backend ExpressJS API

This project demonstrates a very simple usage of how we can implement a subscription system using a smart contract.  

This DAPP allows customers to subscribe to any service using smart contract. The contract also mentions the start time and end time of subscription. The code also provides a backend API written in ExpressJS, which tells if the user is subscribed or not. Moreover, it gives a frontend in HTML, which allows you to set the subscription fee or subscribe to the service.

To run this project, you first need to run the following commands 

```shell
npm install
```

To uplaod smart contract, run the following commands

```shell
npx hardhat compile
npx hardhat run --network volta scripts/deploy.js
```

Once the contract is uploaded to the blockchain, copy the contract address and copy it in the .env file. You can also use another blockchain by writing the blockchain's endpoint in truffle-config.

Once you have pasted your private key and contract address in the .env file, simply run command

```shell
node index.js
```

and go to http://localhost:3000 to subscribe to the smart contract. 

Moreover, to use the API, use the following link 

http://localhost:3000/user?address=0xBa8237590d73524b292b559DBef3D0250d8Ba67D

It will return a bool, where true means user has subscribed to a service in the smart contract.
