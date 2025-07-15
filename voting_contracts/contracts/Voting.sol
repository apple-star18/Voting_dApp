// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // Address of the contract owner (deployer)
    address public owner;

    /// @notice Represents a candidate running in the election
    struct Candidate {
        string name;      
        uint voteCount; 
    }

    // Dynamic array to store all candidates
    Candidate[] private candidates;

    // Track whether an address has voted (to enforce one vote per user)
    mapping(address => bool) public hasVoted;

    // Modifier to restrict access only to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /// @notice Constructor sets the deployer as the contract owner
    constructor() {
        owner = msg.sender;
    }

    /// @notice Add a new candidate to the election
    function addCandidate(string calldata name) external onlyOwner {
        candidates.push(Candidate(name, 0));
    }

    /// @notice Vote for a candidate by index
    function vote(uint256 candidateIndex) external {
        require(candidateIndex < candidates.length, "Invalid candidate index");
        require(!hasVoted[msg.sender], "You have already voted");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;
    }

    /// @notice Retrieve all candidates and their vote counts
    /// @return An array of candidates with their names and vote counts
    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    /// @notice Get the winner's name (the candidate with the highest votes)
    /// @dev Returns "No votes cast" if no votes have been made, or "It's a tie" if tied.
    /// @return winnerName The name of the winning candidate or relevant message
    function getWinner() external view returns (string memory winnerName) {
        uint256 highestVotes = 0;
        uint256 winnerIndex = 0;
        bool tie = false;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > highestVotes) {
                highestVotes = candidates[i].voteCount;
                winnerIndex = i;
                tie = false;
            } else if (candidates[i].voteCount == highestVotes && highestVotes != 0) {
                tie = true;
            }
        }

        if (highestVotes == 0) {
            return "No votes cast";
        } else if (tie) {
            return "It's a tie";
        } else {
            return candidates[winnerIndex].name;
        }
    }
}
