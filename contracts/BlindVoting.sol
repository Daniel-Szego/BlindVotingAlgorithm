pragma solidity ^0.4.23;

contract BlindVoting {
 
  enum VotingStates {Init, Voting, Counting, Closed }
  VotingStates public votingState;
  string public version = "0.0.1";
  uint public from;
  uint public to;
  address public owner;
  
  address[] participants;
  mapping(address => string) public blindVotes;

  // new contract -> new voting round -> voting on numbers
  constructor(uint _from, uint _to){
      from = _from;
      to = _to;
      owner = msg.sender;
      votingState = VotingStates.Init;
  }
  
  modifier isOwner(){
      require(msg.sender == owner);
      _;
  }

  function vote (string blindVote){
      if (bytes(blindVotes[msg.sender]).length == 0){  
          blindVotes[msg.sender] = blindVote;
          participants.push(msg.sender);
      }
      else {

      } 
  }

}