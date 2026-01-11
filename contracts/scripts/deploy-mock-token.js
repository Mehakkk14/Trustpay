const hre = require("hardhat");

async function main() {
  console.log("🧪 Deploying Mock MNEE token for testing...");
  
  const signers = await hre.ethers.getSigners();
  if (!signers || signers.length === 0) {
    throw new Error("No signers found. Check your PRIVATE_KEY in .env file");
  }
  
  const deployer = signers[0];
  console.log("📍 Deployer:", deployer.address);
  
  // Deploy MockMNEE with 1 million initial supply
  const MockMNEE = await hre.ethers.getContractFactory("MockMNEE");
  const mnee = await MockMNEE.deploy(1000000); // 1M tokens
  
  await mnee.waitForDeployment();
  const mneeAddress = await mnee.getAddress();
  
  console.log("✅ Mock MNEE deployed to:", mneeAddress);
  console.log("💰 Initial supply: 1,000,000 MNEE");
  console.log("🎁 Deployer balance:", await mnee.balanceOf(deployer.address));
  
  console.log("\n📝 NOW DEPLOY ESCROW:");
  console.log("─────────────────────────────");
  console.log("1. Update MNEE_TOKEN_ADDRESS in contract-config.js to:", mneeAddress);
  console.log("2. Run: npm run deploy:base");
  console.log("3. Use the faucet() function to get test tokens!");
  
  // Wait for confirmations on live networks
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n⏳ Waiting for confirmations...");
    await mnee.deploymentTransaction().wait(5);
    
    try {
      await hre.run("verify:verify", {
        address: mneeAddress,
        constructorArguments: [1000000],
      });
      console.log("✅ Contract verified!");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
