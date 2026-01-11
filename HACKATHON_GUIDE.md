# 🏆 TrustPay Hackathon - Complete Setup Guide

## 🎯 Project Overview
**TrustPay** - Freelance Micro-Payment Tool using MNEE Stablecoin on Base Network

**Track:** Financial Automation  
**Problem:** Freelancers don't trust delayed payments  
**Solution:** Escrow-based payment system with MNEE stablecoin

---

## ⚡ Quick Setup (30 Minutes)

### Step 1: Prerequisites (2 mins)
1. Install [MetaMask](https://metamask.io/)
2. Add Base network to MetaMask
3. Get some Base ETH for gas (from faucet or bridge)
4. Get MNEE tokens (or use test tokens)

### Step 2: Deploy Smart Contract (10 mins)

```bash
# Navigate to contracts folder
cd contracts

# Install dependencies
npm install

# Create .env file
# Add your private key
echo "PRIVATE_KEY=your_private_key_here" > .env
echo "BASESCAN_API_KEY=your_api_key_here" >> .env

# Compile contract
npm run compile

# Deploy to Base (mainnet or testnet)
npm run deploy:base
# OR for testnet:
npm run deploy:baseSepolia

# ⚠️ SAVE THE DEPLOYED CONTRACT ADDRESS!
```

### Step 3: Update Frontend Config (3 mins)

Open `frontend/src/config/contract-config.js` and update:

```javascript
export const ESCROW_CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_ADDRESS_HERE";
```

### Step 4: Run Frontend (5 mins)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Your app will open at `http://localhost:3000`

---

## 📱 Demo Flow

### For Judges/Demo:

1. **Connect Wallet**
   - Click "Connect to Base Network"
   - MetaMask will prompt to switch to Base
   - Approve the connection

2. **Check MNEE Balance**
   - You'll see your MNEE balance at the top
   - If you don't have MNEE, you'll need to get some

3. **Create Escrow Job**
   - Enter freelancer's wallet address
   - Enter amount in MNEE (e.g., 100 MNEE)
   - Click "Create Job & Lock MNEE"
   - **First time:** Approve MNEE spending (2 transactions)
   - **After:** Only 1 transaction needed

4. **Job is Locked**
   - MNEE is now in the smart contract
   - Freelancer cannot access it yet
   - Job ID is displayed

5. **Release Payment**
   - Once work is complete
   - Client clicks "Release MNEE Payment"
   - Freelancer receives MNEE instantly!

---

## 🎬 Demo Script (For Presentation)

### Opening (30 seconds)
> "Hi! I'm presenting TrustPay - a micro-payment escrow system for freelancers using MNEE stablecoin on Base. The problem? Freelancers don't trust delayed payments. Our solution? Lock payments in smart contract escrow."

### Live Demo (2 minutes)

**Step 1:** "First, I connect my wallet to Base network" → *Click connect*

**Step 2:** "I can see my MNEE balance here - 500 MNEE available"

**Step 3:** "Let's say I want to hire a freelancer for $100 worth of work"
- *Enter freelancer address*
- *Enter 100 MNEE*
- *Click Create Job*

**Step 4:** "The system requests approval for MNEE tokens" → *Approve in MetaMask*

**Step 5:** "Now the 100 MNEE is locked in escrow. The freelancer can't touch it, but neither can I withdraw it."

**Step 6:** "Once the freelancer completes the work, I simply click Release Payment" → *Click Release*

**Step 7:** "And instantly, the 100 MNEE goes to the freelancer's wallet!"

### Closing (30 seconds)
> "This solves trust issues in freelance payments. No middleman, no chargebacks, fully automated. This fits perfectly in the Financial Automation track using the MNEE stablecoin contract provided."

---

## 🛠️ If You Don't Have MNEE Tokens

### Option 1: Create Mock MNEE for Testing
If the MNEE contract has no supply, deploy a test ERC-20:

```bash
cd contracts
# Create a simple ERC20 token for testing
npm run deploy:testToken
```

### Option 2: Use Another Stablecoin
Temporarily use USDC or another ERC-20 on Base for demo:
- USDC on Base: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

Just update `MNEE_TOKEN_ADDRESS` in config!

---

## 🔍 Smart Contract Features

### Security
- ✅ Reentrancy protection
- ✅ Access control (only client can release)
- ✅ Cancel & refund functionality
- ✅ No owner privileges (fully decentralized)

### Functions
- `createJob(address freelancer, uint256 amount)` - Lock MNEE in escrow
- `releasePayment(uint256 jobId)` - Release to freelancer
- `cancelJob(uint256 jobId)` - Cancel & refund client
- `getJob(uint256 jobId)` - View job details

---

## 🎨 Key Features Highlight

1. **ERC-20 Integration** - Uses MNEE stablecoin (not native ETH)
2. **Approval Pattern** - Standard ERC-20 approve → transferFrom
3. **Base Network** - Low gas fees, fast transactions
4. **Clean UI** - Shows balance, job status, clear CTAs
5. **Real-time Updates** - Status indicators at each step

---

## 🐛 Common Issues & Fixes

### Issue: "Insufficient MNEE balance"
**Fix:** Get MNEE tokens or use test tokens

### Issue: "Transaction failed"
**Fix:** Ensure you're on Base network and have gas

### Issue: "Contract not deployed"
**Fix:** Check ESCROW_CONTRACT_ADDRESS in config

### Issue: "Approval failed"
**Fix:** Try increasing gas limit in MetaMask

---

## 📊 Judging Criteria Alignment

✅ **Innovation:** Escrow automation with stablecoin  
✅ **Technical Implementation:** Solid smart contract + React frontend  
✅ **Use of MNEE:** Core to the entire payment system  
✅ **Financial Automation:** Programmable escrow logic  
✅ **User Experience:** Clean, intuitive interface  
✅ **Practical Use Case:** Solves real freelancer trust issues

---

## 📸 Screenshots for Submission

1. Connected wallet with MNEE balance
2. Creating a job (with approval)
3. Job locked status
4. Releasing payment
5. BaseScan showing transactions

---

## 🚀 What Makes This Win-Worthy

1. **Fully Functional** - Not just a prototype
2. **Uses Required Contract** - MNEE token integration
3. **Solves Real Problem** - Freelancer payment trust
4. **Professional UI** - Looks production-ready
5. **Well Documented** - Easy for judges to test
6. **Live on Base** - Actually deployed and working

---

## 🎯 Final Checklist

- [ ] Contract deployed to Base
- [ ] Frontend updated with contract address
- [ ] App running on localhost
- [ ] Can connect MetaMask
- [ ] Can create job
- [ ] Can release payment
- [ ] Screenshots taken
- [ ] Demo script practiced

---

## 💡 Bonus: Future Enhancements (Mention in Pitch)

- Multi-job tracking
- Dispute resolution with arbitrator
- Milestone-based payments
- Auto-release after deadline
- Reputation system
- Integration with freelance platforms

---

## 🎊 You're Ready!

Your project demonstrates:
- ✅ Smart contract development
- ✅ ERC-20 token integration
- ✅ React + Web3 frontend
- ✅ Base network deployment
- ✅ Real-world use case

**Good luck with your hackathon! 🚀**

---

## 🆘 Need Help?

**Quick Test Command:**
```bash
# Test everything is working
cd frontend && npm start
# Then connect wallet and try creating a job
```

**Check Contract on BaseScan:**
```
https://basescan.org/address/YOUR_ESCROW_CONTRACT_ADDRESS
```
