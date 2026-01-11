# 🎯 TrustPay - Visual Flow Diagrams

## 📊 System Architecture

```
┌─────────────┐
│   Client    │ (Has MNEE tokens)
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Connect Wallet
       ▼
┌─────────────┐
│  MetaMask   │ → Base Network
└──────┬──────┘
       │
       │ 2. Approve MNEE
       │ 3. Create Job
       ▼
┌─────────────────┐
│ FreelanceEscrow │ ← Smart Contract
│    Contract     │    (Holds MNEE)
└─────────────────┘
       │
       │ 4. Release Payment
       ▼
┌─────────────┐
│ Freelancer  │ (Receives MNEE)
└─────────────┘
```

---

## 🔄 User Flow

### Step 1: Connect Wallet
```
User → Click "Connect" → MetaMask Popup → Approve → Connected ✅
```

### Step 2: Create Escrow Job
```
Enter Address → Enter Amount → Click Create
        ↓
    Approve MNEE (Transaction 1)
        ↓
    Lock in Escrow (Transaction 2)
        ↓
    Job Created ✅ (MNEE Locked)
```

### Step 3: Release Payment
```
Freelancer Completes Work
        ↓
Client Reviews
        ↓
Click "Release Payment"
        ↓
MNEE Transferred to Freelancer ✅
```

---

## 🎨 UI States

### State 1: Not Connected
```
┌────────────────────────┐
│   TrustPay             │
│   MNEE Escrow          │
│                        │
│  [Connect to Base]     │
└────────────────────────┘
```

### State 2: Connected, No Job
```
┌────────────────────────┐
│   TrustPay             │
│   Connected: 0x1234... │
│   💰 Balance: 500 MNEE │
│                        │
│   Freelancer: [____]   │
│   Amount: [____] MNEE  │
│   [Create Job]         │
└────────────────────────┘
```

### State 3: Job Locked
```
┌────────────────────────┐
│   TrustPay             │
│   🔒 Job #123          │
│   100 MNEE Locked      │
│                        │
│   Freelancer: 0x5678...│
│   Status: In Escrow    │
│   [Release Payment]    │
└────────────────────────┘
```

### State 4: Payment Released
```
┌────────────────────────┐
│   TrustPay             │
│   ✅ Payment Released  │
│   100 MNEE sent!       │
│                        │
│   Job #123 Complete    │
│   [Create New Job]     │
└────────────────────────┘
```

---

## 🔐 Smart Contract Logic

```solidity
createJob(freelancer, amount)
    ↓
Check: Client approved MNEE? → Yes
    ↓
Transfer MNEE from Client to Contract
    ↓
Store: jobId, client, freelancer, amount
    ↓
Emit: JobCreated event
    ↓
Return: jobId

releasePayment(jobId)
    ↓
Check: Is caller the client? → Yes
Check: Is job already paid? → No
    ↓
Transfer MNEE from Contract to Freelancer
    ↓
Mark job as paid
    ↓
Emit: PaymentReleased event
```

---

## 💰 Token Flow Diagram

```
Initial State:
┌─────────┐
│ Client  │ 1000 MNEE
└─────────┘

Create Job (100 MNEE):
┌─────────┐              ┌──────────┐
│ Client  │ 900 MNEE  →  │ Escrow   │ 100 MNEE
└─────────┘              └──────────┘

Release Payment:
┌─────────┐              ┌──────────┐              ┌────────────┐
│ Client  │ 900 MNEE     │ Escrow   │ 0 MNEE   →   │ Freelancer │ 100 MNEE
└─────────┘              └──────────┘              └────────────┘
```

---

## 🌐 Network Interaction

```
Frontend (React)
      ↓
Ethers.js Provider
      ↓
MetaMask Wallet
      ↓
Base Network (L2)
      ↓
┌─────────────────────────┐
│  Smart Contracts        │
│  • MNEE Token (ERC-20)  │
│  • Escrow Contract      │
└─────────────────────────┘
```

---

## 🎭 Demo Sequence

```
Time    Action                      What Judges See
─────────────────────────────────────────────────────
0:00    Open app                    Clean UI loads
0:10    Connect wallet              MetaMask popup
0:15    Connected                   Shows MNEE balance
0:20    Enter job details           Address + amount filled
0:25    Click Create Job            MetaMask: Approve MNEE
0:35    Approve transaction         Pending...
0:40    Approval confirmed          MetaMask: Create Job
0:50    Create job transaction      Pending...
1:00    Job created                 "🔒 100 MNEE Locked"
1:10    Click Release Payment       MetaMask: Release
1:20    Release transaction         Pending...
1:30    Payment released            "✅ Payment Released"
1:40    Check BaseScan              Show live transactions
```

---

## 🏗️ Technology Stack Layers

```
┌─────────────────────────────────┐
│  Presentation Layer             │
│  • React Components             │
│  • Custom CSS                   │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│  Application Layer              │
│  • Ethers.js                    │
│  • Web3 Integration             │
│  • State Management             │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│  Blockchain Layer               │
│  • Base Network (L2)            │
│  • Low gas fees                 │
│  • Fast finality                │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│  Smart Contract Layer           │
│  • FreelanceEscrow.sol          │
│  • MNEE Token (ERC-20)          │
│  • Solidity 0.8.20              │
└─────────────────────────────────┘
```

---

## 🎯 Value Proposition Map

```
Problem:          Solution:           Technology:
Freelancers   →   Escrow System   →   Smart Contract
don't trust       locks funds         on Base
delayed
payments

Payment       →   Instant         →   MNEE Stablecoin
disputes          release             (no volatility)

High fees     →   Low gas fees    →   Base L2
                                       (Ethereum scaling)

Manual        →   Automated       →   Programmable
processes         logic                money
```

---

## 📈 Scalability Vision

```
Phase 1 (Hackathon):          Phase 2 (MVP):           Phase 3 (Scale):
┌──────────────┐              ┌──────────────┐         ┌──────────────┐
│ Single Job   │    →         │ Multi-Job    │    →    │ Marketplace  │
│ Escrow       │              │ Management   │         │ Integration  │
└──────────────┘              └──────────────┘         └──────────────┘
                              • Job History            • API Access
                              • Milestones             • Reputation
                              • Disputes               • Auto-release
```

---

## 🔒 Security Model

```
Attack Vector             Protection
──────────────────────────────────────────
Reentrancy            →   CEI Pattern
Unauthorized Release  →   Client-only check
Double Spending       →   isPaid flag
Front-running         →   ERC-20 approval
Stuck Funds           →   Cancel & refund
```

---

Use these diagrams in your presentation! 📊
Print this file or keep it open during demo! 🖨️
