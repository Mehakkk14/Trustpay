// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title FreelanceEscrow
 * @dev Escrow contract for freelance payments using MNEE stablecoin
 * Perfect for hackathon demo - Financial Automation track
 */
contract FreelanceEscrow {
    IERC20 public mneeToken;
    uint256 public jobCounter;
    
    struct Job {
        uint256 jobId;
        address client;
        address freelancer;
        uint256 amount;
        bool isCompleted;
        bool isPaid;
        uint256 createdAt;
    }
    
    mapping(uint256 => Job) public jobs;
    mapping(address => uint256[]) public clientJobs;
    mapping(address => uint256[]) public freelancerJobs;
    
    event JobCreated(uint256 indexed jobId, address indexed client, address indexed freelancer, uint256 amount);
    event PaymentReleased(uint256 indexed jobId, address indexed freelancer, uint256 amount);
    event JobCancelled(uint256 indexed jobId, address indexed client, uint256 amount);
    
    constructor(address _mneeToken) {
        mneeToken = IERC20(_mneeToken);
    }
    
    /**
     * @dev Create a new escrow job
     * Client must approve this contract to spend MNEE tokens first
     */
    function createJob(address _freelancer, uint256 _amount) external returns (uint256) {
        require(_freelancer != address(0), "Invalid freelancer address");
        require(_freelancer != msg.sender, "Cannot hire yourself");
        require(_amount > 0, "Amount must be greater than 0");
        
        // Transfer MNEE tokens from client to this contract
        require(
            mneeToken.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed - did you approve?"
        );
        
        jobCounter++;
        
        jobs[jobCounter] = Job({
            jobId: jobCounter,
            client: msg.sender,
            freelancer: _freelancer,
            amount: _amount,
            isCompleted: false,
            isPaid: false,
            createdAt: block.timestamp
        });
        
        clientJobs[msg.sender].push(jobCounter);
        freelancerJobs[_freelancer].push(jobCounter);
        
        emit JobCreated(jobCounter, msg.sender, _freelancer, _amount);
        
        return jobCounter;
    }
    
    /**
     * @dev Release payment to freelancer
     * Only client can release payment
     */
    function releasePayment(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        
        require(job.client == msg.sender, "Only client can release payment");
        require(!job.isPaid, "Payment already released");
        require(job.amount > 0, "Invalid job");
        
        job.isPaid = true;
        job.isCompleted = true;
        
        // Transfer MNEE tokens to freelancer
        require(
            mneeToken.transfer(job.freelancer, job.amount),
            "Payment transfer failed"
        );
        
        emit PaymentReleased(_jobId, job.freelancer, job.amount);
    }
    
    /**
     * @dev Cancel job and refund client (only if not paid)
     * Only client can cancel
     */
    function cancelJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        
        require(job.client == msg.sender, "Only client can cancel");
        require(!job.isPaid, "Cannot cancel paid job");
        require(job.amount > 0, "Invalid job");
        
        uint256 refundAmount = job.amount;
        job.amount = 0;
        job.isCompleted = true;
        
        // Refund MNEE tokens to client
        require(
            mneeToken.transfer(job.client, refundAmount),
            "Refund transfer failed"
        );
        
        emit JobCancelled(_jobId, job.client, refundAmount);
    }
    
    /**
     * @dev Get job details
     */
    function getJob(uint256 _jobId) external view returns (
        address client,
        address freelancer,
        uint256 amount,
        bool isCompleted,
        bool isPaid,
        uint256 createdAt
    ) {
        Job memory job = jobs[_jobId];
        return (
            job.client,
            job.freelancer,
            job.amount,
            job.isCompleted,
            job.isPaid,
            job.createdAt
        );
    }
    
    /**
     * @dev Get all jobs for a client
     */
    function getClientJobs(address _client) external view returns (uint256[] memory) {
        return clientJobs[_client];
    }
    
    /**
     * @dev Get all jobs for a freelancer
     */
    function getFreelancerJobs(address _freelancer) external view returns (uint256[] memory) {
        return freelancerJobs[_freelancer];
    }
    
    /**
     * @dev Get contract's MNEE balance
     */
    function getContractBalance() external view returns (uint256) {
        return mneeToken.balanceOf(address(this));
    }
}
