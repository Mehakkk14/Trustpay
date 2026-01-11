// MockMNEE Token on Base Sepolia (for testing)
export const MNEE_TOKEN_ADDRESS = "0x26DE39Fb7204a7581F87d4195134Fe77B25E4192";

// Escrow Contract on Base Sepolia
export const ESCROW_CONTRACT_ADDRESS = "0x833fe7571F39212fD3C2B0d7223bEd5842E28427";

// Base Sepolia Network Config (testnet)
export const BASE_CHAIN_ID = 84532;
export const BASE_RPC_URL = "https://sepolia.base.org";

// ERC-20 Token ABI (for MNEE)
export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() public view returns (uint8)",
  "function symbol() public view returns (string)"
];

// Escrow Contract ABI
export const ESCROW_ABI = [
  "function createJob(address _freelancer, uint256 _amount) external returns (uint256)",
  "function releasePayment(uint256 _jobId) external",
  "function cancelJob(uint256 _jobId) external",
  "function getJob(uint256 _jobId) external view returns (address client, address freelancer, uint256 amount, bool isCompleted, bool isPaid, uint256 createdAt)",
  "function getClientJobs(address _client) external view returns (uint256[])",
  "function getFreelancerJobs(address _freelancer) external view returns (uint256[])",
  "function jobCounter() public view returns (uint256)",
  "event JobCreated(uint256 indexed jobId, address indexed client, address indexed freelancer, uint256 amount)",
  "event PaymentReleased(uint256 indexed jobId, address indexed freelancer, uint256 amount)",
  "event JobCancelled(uint256 indexed jobId, address indexed client, uint256 amount)"
];