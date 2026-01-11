const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Sending MNEE from:", deployer.address);
  
  const mnee = await hre.ethers.getContractAt(
    "MockMNEE", 
    "0x26DE39Fb7204a7581F87d4195134Fe77B25E4192"
  );
  
  const userAddress = "0xe310fF4C0A68188573aDD88B294c44182014D54e";
  const amount = hre.ethers.parseEther("5000");
  
  console.log("Sending 5000 MNEE to:", userAddress);
  
  const tx = await mnee.transfer(userAddress, amount);
  await tx.wait();
  
  console.log("✅ Successfully sent 5000 MNEE!");
  console.log("Transaction:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
