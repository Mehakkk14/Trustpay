# 🚀 TrustPay - MNEE Freelance Escrow

> Hackathon Project: Financial Automation Track  
> Secure freelance payments using MNEE stablecoin on Base Network

## 🎯 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
# Smart Contracts
cd contracts
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Deploy (Choose One Option)

#### Option A: Use Existing MNEE Token
```bash
cd contracts
echo "PRIVATE_KEY=your_private_key" > .env
npm run deploy:base
# Save the deployed escrow address
```

#### Option B: Deploy Test Token First (if MNEE has no supply)
```bash
cd contracts
npm run deploy:mockToken
# Copy the MNEE token address
# Update frontend/src/config/contract-config.js with new address
npm run deploy:base
```

### 3. Update Frontend Config
Edit `frontend/src/config/contract-config.js`:
```javascript
export const ESCROW_CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_ADDRESS";
```

### 4. Run App
```bash
cd frontend
npm start
```

Open `http://localhost:3000` and connect your wallet!

---

## 📝 How It Works

1. **Client** connects wallet to Base network
2. **Client** creates job: enters freelancer address + MNEE amount
3. **MNEE** tokens are locked in smart contract escrow
4. **Freelancer** completes the work
5. **Client** releases payment → freelancer gets MNEE instantly!

---

## 🏗️ Project Structure

```
├── contracts/              # Solidity smart contracts
│   ├── FreelanceEscrow.sol # Main escrow contract
│   ├── MockMNEE.sol        # Test token (if needed)
│   └── scripts/            # Deployment scripts
├── frontend/               # React Web3 application
│   └── src/
│       ├── components/     # UI components
│       ├── config/         # Contract addresses & ABIs
│       └── utils/          # Web3 utilities
└── HACKATHON_GUIDE.md      # Detailed setup & demo guide
```

---

## 🎬 Demo Features

✅ Connect to Base Network  
✅ Display MNEE balance  
✅ Create escrow job with token approval  
✅ Lock MNEE in smart contract  
✅ Release payment to freelancer  
✅ View job status in real-time  
✅ Cancel & refund functionality  

---

## 📋 Smart Contract Details

**MNEE Token:** `0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`  
**Network:** Base (Chain ID: 8453)  
**Language:** Solidity 0.8.20

### Key Functions
- `createJob(address freelancer, uint256 amount)` - Lock MNEE
- `releasePayment(uint256 jobId)` - Release to freelancer
- `cancelJob(uint256 jobId)` - Refund client
- `getJob(uint256 jobId)` - View job details

---

## 🔒 Security Features

- ERC-20 approve/transferFrom pattern
- Client-only payment release
- No central authority
- Cancel & refund capability
- Event emissions for transparency

---

## 🎨 Tech Stack

- **Smart Contracts:** Solidity, Hardhat
- **Frontend:** React, Ethers.js v5
- **Blockchain:** Base (Ethereum L2)
- **Token:** MNEE Stablecoin (ERC-20)
- **Wallet:** MetaMask

---

## 🐛 Troubleshooting

**"Insufficient MNEE balance"**
→ Get MNEE tokens or use MockMNEE faucet

**"Wrong network"**
→ Switch to Base network in MetaMask

**"Approval failed"**
→ Ensure you have ETH for gas on Base

**"Contract not deployed"**
→ Check ESCROW_CONTRACT_ADDRESS in config

---

## 📚 Resources

- [Full Setup Guide](./HACKATHON_GUIDE.md)
- [BaseScan](https://basescan.org/)
- [Base Docs](https://docs.base.org/)
- [MNEE Contract](https://basescan.org/address/0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF)

---

## 🏆 Hackathon Alignment

✅ **Uses MNEE Contract:** Core payment token  
✅ **Financial Automation:** Programmable escrow  
✅ **Solves Real Problem:** Freelancer payment trust  
✅ **Production Ready:** Deployable to mainnet  
✅ **Clean UX:** Professional interface  

---

## 📸 Demo

1. Connect wallet → Switch to Base
2. See MNEE balance displayed
3. Create job (approve + create transactions)
4. Job locked status shown
5. Release payment to freelancer
6. Check BaseScan for transactions

---

##  License

MIT
