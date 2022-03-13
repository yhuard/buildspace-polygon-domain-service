const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("automated");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  let txn = await domainContract.register("life", {
    value: hre.ethers.utils.parseEther("0.3"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("life");
  console.log("Owner of domain life:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  txn = await domainContract.setRecord("life", "my first record");
  await txn.wait();

  const domainRecord = await domainContract.getRecord("life");
  console.log("Record of life.automated domain:", domainRecord);

  txn = await domainContract.setEmailAddress("life", "life@life.life");
  await txn.wait();

  const domainEmail = await domainContract.getEmailAddress("life");
  console.log("Email of life.automated domain:", domainEmail);

  // Trying to set a record that doesn't belong to me!
  txn = await domainContract
    .connect(randomPerson)
    .setRecord("life", "Haha my domain now!");
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
