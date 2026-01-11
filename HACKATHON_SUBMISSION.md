# 🏆 TrustPay - Hackathon Submission

## 📌 Project Overview

**Project Name:** TrustPay - Freelance Micro-Payment Escrow  
**Track:** Financial Automation  
**Live Demo:** https://trustpay-six.vercel.app  
**GitHub:** https://github.com/Mehakkk14/Trustpay  
**Network:** Base Sepolia Testnet (Chain ID: 84532)  

---

## 🎯 Problem Statement

Freelancers face major payment trust issues:
- ❌ Clients delay or refuse payment after work completion
- ❌ No guarantee of payment before starting work
- ❌ Traditional escrow services charge high fees (5-10%)
- ❌ Cross-border payments take days with high costs
- ❌ No transparent, automated solution

**Solution:** Smart contract escrow using MNEE stablecoin for instant, trustless freelance payments with zero platform fees.

---

## 💡 What We Built

A decentralized escrow platform where:
1. **Client** locks MNEE tokens in smart contract when creating job
2. **Freelancer** sees guaranteed payment before starting work
3. **Client** releases payment with one click after work completion
4. **Freelancer** receives MNEE instantly - no waiting, no middleman
5. **Blockchain** ensures transparency and trust

---

## 🔧 Technology Stack

**Smart Contracts:**
- Solidity 0.8.20
- Hardhat for development & deployment
- ERC-20 token integration (MNEE)
- Base Sepolia network

**Frontend:**
- React 18.2.0
- Ethers.js v5 for Web3 integration
- MetaMask wallet connection
- Responsive UI/UX

**Deployment:**
- Vercel (Frontend)
- Base Sepolia Testnet (Smart Contracts)

---

## 📝 Smart Contract Addresses

**FreelanceEscrow Contract:** `0x833fe7571F39212fD3C2B0d7223bEd5842E28427`  
**MockMNEE Token (Test):** `0x26DE39Fb7204a7581F87d4195134Fe77B25E4192`  
**Network:** Base Sepolia  
**Chain ID:** 84532  

**View on BaseScan:**  
https://sepolia.basescan.org/address/0x833fe7571F39212fD3C2B0d7223bEd5842E28427

---

## ✨ Key Features

✅ **MNEE Integration** - Uses MNEE stablecoin for payments  
✅ **Escrow Locking** - Funds secured in smart contract  
✅ **Instant Releases** - One-click payment to freelancer  
✅ **Refund System** - Cancel & refund if work not delivered  
✅ **Transparent** - All transactions on-chain  
✅ **Zero Fees** - No platform commission  
✅ **MetaMask Support** - Easy wallet connection  
✅ **Real-time Balance** - See MNEE balance live  

---

## 🏗️ How It Works (User Flow)

**Step 1: Connect Wallet**
- User connects MetaMask to Base Sepolia network
- App displays MNEE balance automatically

**Step 2: Create Job (Client)**
- Enter freelancer's wallet address
- Enter payment amount in MNEE
- Approve MNEE spending (transaction 1)
- Lock funds in escrow (transaction 2)
- Job created with unique ID

**Step 3: Work Completion**
- Freelancer completes the work
- Client verifies deliverables

**Step 4: Release Payment (Client)**
- Click "Release Payment" button
- MNEE transfers from escrow to freelancer instantly
- Job marked as complete

**Alternative: Cancel & Refund**
- If work not delivered, client can cancel
- MNEE returns to client's wallet

---

## 🎪 Why It Fits Financial Automation Track

✅ **Automated Escrow** - Smart contracts handle fund locking/release automatically  
✅ **Programmable Payments** - No manual intervention needed  
✅ **MNEE Stablecoin** - Uses required technology for payments  
✅ **Trust Automation** - Eliminates need for trusted third party  
✅ **Instant Settlement** - Payments released in seconds, not days  
✅ **Transparent Finance** - All transactions verifiable on blockchain  

---

## 🚀 Innovation Points

1. **Zero-Fee Model** - Unlike Upwork (10%) or Fiverr (20%), no platform fees
2. **Instant Payments** - Freelancer gets paid in seconds, not 14-30 days
3. **Global Access** - Anyone with MetaMask can use it, no KYC
4. **Trustless System** - Smart contract guarantees, no disputes
5. **MNEE Integration** - Stable payments without crypto volatility
6. **Base L2** - Low gas fees compared to Ethereum mainnet

---

## 📊 Business Impact

**Market Size:** $1.2 Trillion global freelance market  
**Target Users:** 70M+ freelancers worldwide  
**Problem Solved:** $9B lost annually in payment disputes  
**Cost Savings:** 90% cheaper than traditional escrow (Western Union, PayPal)  

---

## 🎬 Demo Instructions

1. Visit: https://trustpay-six.vercel.app
2. Connect MetaMask wallet
3. Switch to Base Sepolia network (app will prompt)
4. Import MNEE token: `0x26DE39Fb7204a7581F87d4195134Fe77B25E4192`
5. Get test MNEE (contact team or use faucet)
6. Create a test job with any address
7. Release payment to see instant transfer

---

## 📈 Future Enhancements

- Milestone-based payments (split payments)
- Dispute resolution with arbitrators
- Multi-token support (USDC, DAI, etc.)
- Freelancer reputation system
- Job templates and contracts
- Mobile app (React Native)
- Mainnet deployment (Base L2)

---

## 🔒 Security Features

- **Reentrancy Protection** - Smart contract security best practices
- **Access Control** - Only client can release payment
- **ERC-20 Standard** - Battle-tested token pattern
- **Event Logging** - All actions emit events for transparency
- **No Proxy Required** - Direct smart contract interaction

---

## 📚 Technical Documentation

**Smart Contract Functions:**
```solidity
createJob(address freelancer, uint256 amount) → uint256 jobId
releasePayment(uint256 jobId)
cancelJob(uint256 jobId)
getJob(uint256 jobId) → Job struct
```

**Frontend Integration:**
- Ethers.js for Web3 provider
- Contract ABIs in config
- Automatic network detection
- Transaction status tracking

---

## 🏅 Why TrustPay Should Win

1. ✅ **Fully Functional** - Working demo on testnet
2. ✅ **Real Problem** - Solves actual freelancer pain point
3. ✅ **MNEE Integration** - Properly uses required technology
4. ✅ **Clean Code** - Well-structured, documented
5. ✅ **Professional UI** - Polished user experience
6. ✅ **Production Ready** - Can deploy to mainnet immediately
7. ✅ **Scalable** - Handles unlimited users/transactions
8. ✅ **Innovation** - First MNEE-based freelance escrow

---

## 👨‍💻 Team

- Smart Contract Development
- Frontend Development
- Web3 Integration
- UI/UX Design

---

## 📞 Contact

**GitHub:** https://github.com/Mehakkk14/Trustpay  
**Live Demo:** https://trustpay-six.vercel.app  
**Video Demo:** [Add your demo video link]  
**Pitch Deck:** [Add your presentation link]

---

## 🎯 Hackathon Requirements Checklist

✅ Uses MNEE stablecoin contract  
✅ Deployed on Base network (Sepolia testnet)  
✅ Financial Automation track alignment  
✅ Working live demo  
✅ Open source code on GitHub  
✅ Smart contracts verified  
✅ Clear documentation  
✅ Solves real-world problem  
✅ Innovative approach  
✅ Production-ready quality  

---

**Built with ❤️ for Financial Automation Track**
