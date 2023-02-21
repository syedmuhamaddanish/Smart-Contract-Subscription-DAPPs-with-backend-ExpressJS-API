const express = require('express');
const fileUpload = require('express-fileupload');
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(express.static(__dirname));
const ethers = require('ethers');
const path = require('path');

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Function to define the API call from Redis
async function getSubscriberData(req, res) {
    var user = req.query.address;
    console.log(user)  //Search corresponding IPFS hash from a certain date
    let answer = false;    //Variable to see if the result is from Cache or not

      // initializing blockchain to call smart contract function to retreive IPFS hash
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
    
        //Checking if data is already available for certain date and address
        answer = await SubscriptionContract.subscriberList(user);

          //Send response to front-end with cached data
        res.send({answer});
    }
    

// API call to receive the cached data
app.get('/user', getSubscriberData);




app.listen(3000, function () {
    console.log('app listening on port 3000!')
})