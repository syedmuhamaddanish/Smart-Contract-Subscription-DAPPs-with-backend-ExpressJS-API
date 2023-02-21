// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Subscription {
    address payable public owner;
    mapping(address => SubscriptionData) public subscribers;
    mapping(address => bool) public subscriberList;
    uint256 public subscriptionFee;
    mapping(address => uint256) public balances;
    
    event NewSubscription(address subscriber, uint256 startTime, uint256 endTime);

    struct SubscriptionData {
        uint256 startTime;
        uint256 endTime;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function setSubscriptionFee(uint256 fee) public {
        require(msg.sender == owner, "Only the owner can set the subscription fee.");
        subscriptionFee = fee;
    }

    function subscribe() public payable {
        require(msg.value >= subscriptionFee, "Payment amount is incorrect.");
        balances[msg.sender] = msg.value;
        require(subscribers[msg.sender].endTime < block.timestamp, "You are already subscribed and your subscription is not expired.");
        uint256 startTime = block.timestamp;
        uint256 endTime = block.timestamp + 30 days; // Change the subscription period as per your requirement
        subscribers[msg.sender] = SubscriptionData(startTime, endTime);
        subscriberList[msg.sender] = true;
        emit NewSubscription(msg.sender, startTime, endTime);

    }

}
