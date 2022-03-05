const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  let txn = await domainContract.register("doom");
  await txn.wait();

  const domainOwner = await domainContract.getAddress("doom");
  console.log("Owner of domain:", domainOwner);

  txn = await domainContract.setRecord("doom", "my first record");
  await txn.wait();

  const domainRecord = await domainContract.getRecord("doom");
  console.log("Record of doom domain:", domainRecord);

  txn = await domainContract.setEmailAddress("doom", "doom@doom.doom");
  await txn.wait();

  const domainEmail = await domainContract.getEmailAddress("doom");
  console.log("Email of doom domain:", domainEmail);

  // Trying to set a record that doesn't belong to me!
  txn = await domainContract
    .connect(randomPerson)
    .setRecord("doom", "Haha my domain now!");
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
