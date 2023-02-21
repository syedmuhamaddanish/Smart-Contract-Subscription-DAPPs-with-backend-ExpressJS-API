const express = require('express');
const fileUpload = require('express-fileupload');
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(express.static(__dirname));
const ethers = require('ethers');
const path = require('path');

// Serves the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Function to define the API call from Redis
async function getSubscriberData(req, res) {

    var user = req.query.address; //Get address parameter from the query
    console.log(user)  
    let answer = false;    //Variable to see if the user is subscribed or not

      // initializing blockchain to call smart contract function 
        const API_URL = process.env.API_URL;
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        const CONTRACT_ADDRESS_1 = process.env.CONTRACT_ADDRESS;
        // Contract ABI
        const { abi } = require("./artifacts/contracts/Subscription.sol/Subscription.json");
        const provider = new ethers.providers.JsonRpcProvider(API_URL);
        // It calculates the blockchain address from private key
        const signer = new ethers.Wallet(PRIVATE_KEY, provider);
        //console.log(signer)
        const SubscriptionContract = new ethers.Contract(CONTRACT_ADDRESS_1, abi, signer);
    
        //Checking if user has subscribed to a service. It returns bool
        answer = await SubscriptionContract.subscriberList(user);

          //Send response to front-end
        res.send({answer});
    }
    

// API call to receive the cached data
app.get('/user', getSubscriberData);




app.listen(3000, function () {
    console.log('app listening on port 3000!')
})