const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("buidlers");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  let txn = await domainContract.register("yannick", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("yannick");
  console.log("Owner of domain yannick:", address);

  txn = await domainContract.setRecord("yannick", "my first record");
  await txn.wait();

  const domainRecord = await domainContract.getRecord("yannick");
  console.log("Record of yannick.buidlers domain:", domainRecord);

  txn = await domainContract.setEmailAddress(
    "yannick",
    "yannick@yannick.yannick"
  );
  await txn.wait();

  const domainEmail = await domainContract.getEmailAddress("yannick");
  console.log("Email of yannick.buidlers domain:", domainEmail);

  // Trying to set a record that doesn't belong to me!
  /*
  txn = await domainContract
    .connect(randomPerson)
    .setRecord("yannick", "Haha my domain now!");
  await txn.wait();
  */

  // Genereous donation from a16z
  txn = await domainContract.register("a16z", {
    value: hre.ethers.utils.parseEther("1234"),
  });

  // How much money is in here?
  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  // Quick! Grab the funds from the contract! (as superCoder)
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("Could not rob contract");
  }

  // Let's look in their wallet so we can compare later
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log(
    "Balance of owner before withdrawal:",
    hre.ethers.utils.formatEther(ownerBalance)
  );

  // Oops, looks like the owner is saving their money!
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  // Fetch balance of contract & owner
  const contractBalance = await hre.ethers.provider.getBalance(
    domainContract.address
  );
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log(
    "Contract balance after withdrawal:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  console.log(
    "Balance of owner after withdrawal:",
    hre.ethers.utils.formatEther(ownerBalance)
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
