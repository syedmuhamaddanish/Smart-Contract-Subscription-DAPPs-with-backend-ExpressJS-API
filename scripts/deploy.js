async function main() {
  const Subscription = await ethers.getContractFactory("Subscription");

  // Start deployment, returning a promise that resolves to a contract object
  const Subscription_ = await Subscription.deploy();
  console.log("Contract address:", Subscription_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });