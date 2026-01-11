// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MockMNEE
 * @dev Mock MNEE token for testing purposes only
 * Use this if the actual MNEE token has no supply yet
 */
contract MockMNEE {
    string public name = "Mock MNEE Stablecoin";
    string public symbol = "MNEE";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Insufficient allowance");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    // Faucet function for testing - anyone can mint 1000 tokens once
    mapping(address => bool) public hasClaimed;
    
    function faucet() public {
        require(!hasClaimed[msg.sender], "Already claimed");
        uint256 amount = 1000 * 10 ** decimals;
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        hasClaimed[msg.sender] = true;
        emit Transfer(address(0), msg.sender, amount);
    }
}
