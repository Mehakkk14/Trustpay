const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("🚀 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());
  
  // MockMNEE Token address on Base Sepolia
  const MNEE_TOKEN_ADDRESS = "0x26DE39Fb7204a7581F87d4195134Fe77B25E4192";
  
  console.log("\n📝 Deploying FreelanceEscrow...");
  
  const FreelanceEscrow = await hre.ethers.getContractFactory("FreelanceEscrow");
  const escrow = await FreelanceEscrow.deploy(MNEE_TOKEN_ADDRESS);
  
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  
  console.log("✅ FreelanceEscrow deployed to:", escrowAddress);
  console.log("🪙 MNEE Token address:", MNEE_TOKEN_ADDRESS);
  
  console.log("\n📋 SAVE THESE FOR FRONTEND:");
  console.log("─────────────────────────────");
  console.log("Escrow Contract:", escrowAddress);
  console.log("MNEE Token:", MNEE_TOKEN_ADDRESS);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);
  
  // Wait for block confirmations on live networks
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n⏳ Waiting for 5 block confirmations...");
    await escrow.deploymentTransaction().wait(5);
    
    console.log("\n🔍 Verifying contract on BaseScan...");
    try {
      await hre.run("verify:verify", {
        address: escrowAddress,
        constructorArguments: [MNEE_TOKEN_ADDRESS],
      });
      console.log("✅ Contract verified!");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
    }
  }
  
  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
