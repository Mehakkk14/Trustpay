# 🔧 TrustPay - Troubleshooting Guide

## 🚨 Emergency Fixes (When Demo Day Crashes)

### Problem: App Won't Start

**Error:** `npm start` fails in frontend

**Fix:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

**Still broken?**
```bash
# Use Node v18 or v16
node --version
# If wrong version, install nvm and switch
```

---

### Problem: MetaMask Not Detecting

**Symptoms:** "MetaMask not installed" even though it is

**Fix:**
1. Refresh the page (Ctrl+R)
2. Make sure MetaMask is unlocked
3. Try in incognito/private window
4. Restart browser
5. Check MetaMask is enabled for localhost

**In MetaMask:**
Settings → Advanced → Show test networks → ON

---

### Problem: Wrong Network

**Symptoms:** App says "Please switch to Base"

**Fix (Auto):**
- Click connect button - it should auto-switch

**Fix (Manual):**
1. Open MetaMask
2. Click network dropdown
3. Select "Base" or "Base Mainnet"
4. If not there, click "Add Network" → Search "Base"

**Base Network Details:**
- Network Name: Base
- RPC URL: https://mainnet.base.org  
- Chain ID: 8453
- Currency: ETH
- Explorer: https://basescan.org

---

### Problem: No MNEE Tokens

**Symptoms:** Balance shows 0 MNEE

**Quick Fix for Demo:**
```bash
# Deploy mock token
cd contracts
npm run deploy:mockToken

# Get the deployed address
# Update frontend/src/config/contract-config.js
# Line 2: export const MNEE_TOKEN_ADDRESS = "0xYOUR_NEW_ADDRESS"

# Call faucet to get 1000 MNEE
# In MetaMask → Send → Contract Interaction
# Address: Your MockMNEE address
# Function: faucet()
# Or use BaseScan "Write Contract" tab
```

**Long-term Fix:**
Get real MNEE tokens or bridge USDC to use instead

---

### Problem: Insufficient Gas

**Symptoms:** Transaction fails with "insufficient funds"

**Fix:**
1. You need Base ETH for gas fees
2. Bridge ETH to Base: https://bridge.base.org/
3. OR use Base Sepolia testnet with faucet

**Base Sepolia Faucet:**
https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

---

### Problem: Contract Not Deployed

**Symptoms:** "Contract not deployed" or address errors

**Fix:**
```bash
cd contracts
npm install
npm run compile
npm run deploy:base

# Copy the deployed address
# Update frontend/src/config/contract-config.js
# Line 5: export const ESCROW_CONTRACT_ADDRESS = "0xYOUR_ADDRESS"
```

**Check deployment:**
```
https://basescan.org/address/YOUR_ESCROW_ADDRESS
```

---

### Problem: Approval Transaction Fails

**Symptoms:** First transaction (approve) fails

**Common Causes:**
1. Insufficient MNEE balance
2. Insufficient gas (need Base ETH)
3. Already approved (try higher amount)

**Fix:**
```bash
# Check MNEE balance
# Open MetaMask → Assets → Import Tokens
# Token Address: YOUR_MNEE_ADDRESS
# Should show balance

# Check ETH balance for gas
# Need at least 0.0001 ETH on Base
```

---

### Problem: Job Creation Fails

**Symptoms:** Second transaction (createJob) fails

**Debug Steps:**
1. Check approval went through first
2. Check you have enough MNEE balance
3. Check freelancer address is valid
4. Check amount is not 0

**Emergency Console Check:**
```javascript
// Open browser DevTools (F12)
// In Console tab:
const mnee = getMNEEContract();
const balance = await mnee.balanceOf("YOUR_ADDRESS");
console.log(ethers.utils.formatEther(balance));
// Should show your MNEE balance
```

---

### Problem: Release Payment Fails

**Symptoms:** "Only client can release" or transaction reverts

**Common Issues:**
1. Not connected with client wallet
2. Job already paid
3. Invalid job ID

**Fix:**
- Make sure you're using the SAME wallet that created the job
- Check job ID is correct
- Look at BaseScan for error message

---

## 🐛 Frontend Issues

### Problem: Balance Shows NaN or undefined

**Fix:** Update CreateJob.jsx line 22-27:
```javascript
const balance = await mneeContract.balanceOf(account);
const formatted = window.ethers.utils.formatEther(balance);
setMNEEBalance(formatted);
```

---

### Problem: Transaction Pending Forever

**Symptoms:** Loading spinner never stops

**Fix:**
1. Check MetaMask - might be waiting for confirmation
2. Look at BaseScan - transaction might have failed
3. Refresh page and try again
4. Increase gas limit if network is congested

**Reset State:**
```javascript
// In browser console (F12)
localStorage.clear();
// Then refresh page
```

---

### Problem: Events Not Parsing

**Symptoms:** "Cannot read property 'args' of undefined"

**Fix in CreateJob.jsx:**
```javascript
const receipt = await tx.wait();
const jobCreatedEvent = receipt.events?.find(e => e.event === 'JobCreated');
const newJobId = jobCreatedEvent?.args?.jobId?.toNumber() || Math.floor(Date.now() / 1000);
```

---

## 📱 Smart Contract Issues

### Problem: Contract Won't Compile

**Error:** Solidity compilation fails

**Fix:**
```bash
cd contracts
rm -rf cache artifacts
npm run compile
```

**If still failing:**
- Check Solidity version in contract (0.8.20)
- Check hardhat.config.js has matching version
- Update hardhat: `npm install --save-dev hardhat@latest`

---

### Problem: Deployment Fails

**Common Errors:**

**"Insufficient funds"**
→ Need Base ETH for gas. Bridge from mainnet or use faucet.

**"Invalid private key"**
→ Check .env file has PRIVATE_KEY="0x..." format

**"Network unreachable"**
→ Check RPC URL in hardhat.config.js

**"Gas estimation failed"**
→ Constructor might have error. Check MNEE token address is valid.

---

### Problem: Verification Fails

**Symptoms:** BaseScan verification errors

**Fix:**
```bash
# Manual verification
npx hardhat verify --network base YOUR_CONTRACT_ADDRESS "MNEE_TOKEN_ADDRESS"

# Example:
npx hardhat verify --network base 0x123... "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF"
```

---

## 🔍 Debugging Tools

### Check Contract Status
```bash
# In contracts directory
npx hardhat console --network base

# Then in console:
const Escrow = await ethers.getContractFactory("FreelanceEscrow");
const escrow = await Escrow.attach("YOUR_ESCROW_ADDRESS");
const jobCount = await escrow.jobCounter();
console.log("Total jobs:", jobCount.toString());
```

### Check Token Balance
```bash
# Using cast (foundry)
cast call YOUR_MNEE_ADDRESS "balanceOf(address)" YOUR_WALLET_ADDRESS --rpc-url https://mainnet.base.org

# OR in browser console:
const provider = new ethers.providers.Web3Provider(window.ethereum);
const mnee = new ethers.Contract(MNEE_ADDRESS, ERC20_ABI, provider);
const bal = await mnee.balanceOf("YOUR_ADDRESS");
console.log(ethers.utils.formatEther(bal));
```

### View Contract Events
Go to BaseScan:
```
https://basescan.org/address/YOUR_ESCROW_ADDRESS#events
```

Should see:
- JobCreated events
- PaymentReleased events

---

## ⚡ Performance Issues

### Problem: App is Slow

**Causes:**
- Too many RPC calls
- Large state updates
- Network congestion

**Fix:**
1. Add loading states
2. Debounce balance checks
3. Cache contract instances
4. Use local RPC node (Alchemy/Infura)

---

## 🎯 Nuclear Option: Start Fresh

If everything is broken and demo is in 10 minutes:

```bash
# 1. Clean everything
rm -rf contracts/node_modules frontend/node_modules
rm -rf contracts/cache contracts/artifacts

# 2. Redeploy (5 mins)
cd contracts
npm install
npm run deploy:mockToken
# Copy MNEE address
npm run deploy:base
# Copy Escrow address

# 3. Update config (1 min)
# Edit frontend/src/config/contract-config.js
# Update both addresses

# 4. Fresh frontend (2 mins)
cd ../frontend
npm install
npm start

# 5. Test (2 mins)
# Connect wallet
# Call faucet() on MockMNEE
# Create job
# Release payment

# Total: 10 minutes to working demo
```

---

## 📞 Last Resort

### If Nothing Works During Demo:

**Option 1: Show Code**
- Walk through smart contract
- Explain the logic
- Show UI mockups

**Option 2: Video Demo**
- Record a working demo beforehand
- Play the video
- Explain while it plays

**Option 3: Live Code Review**
- Show the contracts on BaseScan
- Explain architecture
- Highlight key features

**Remember:** Judges understand tech fails. Stay calm and show you know your stuff!

---

## ✅ Pre-Demo Checklist

Run this 15 minutes before presenting:

```bash
# Test everything
cd frontend
npm start

# Open http://localhost:3000
# Can you connect wallet? ✓
# Does balance show? ✓
# Can you create job? ✓
# Can you release payment? ✓
# Is BaseScan showing transactions? ✓
```

If all ✓ → You're ready! 🚀

If any ✗ → Use this guide to fix it!

---

## 🆘 Contact Info

**During Hackathon:**
- Check Discord/Slack for help
- Ask fellow participants
- Find a mentor

**Post-Hackathon:**
- GitHub Issues: document problems
- Base Discord: network-specific issues
- Hardhat Discord: contract issues

---

**Remember:** Every great demo has survived a crash. You got this! 💪
