const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("buidl");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  let txn = await domainContract.register("yannick", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("yannick");
  console.log("Owner of domain yannick:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  txn = await domainContract.setRecord("yannick", "my first record");
  await txn.wait();

  const domainRecord = await domainContract.getRecord("yannick");
  console.log("Record of yannick.buidl domain:", domainRecord);

  txn = await domainContract.setEmailAddress(
    "yannick",
    "yannick@yannick.yannick"
  );
  await txn.wait();

  const domainEmail = await domainContract.getEmailAddress("yannick");
  console.log("Email of yannick.buidl domain:", domainEmail);

  // Trying to set a record that doesn't belong to me!
  txn = await domainContract
    .connect(randomPerson)
    .setRecord("yannick", "Haha my domain now!");
  await txn.wait();
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
