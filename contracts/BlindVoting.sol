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
  
  // EVENTS
  event VotingStarted();
  event CountingStarted();
  event VotingClosed(); 

  // MODIFIERS
  // modifier : can be executed only by the owner
  modifier isOwner(){
      require(msg.sender == owner);
      _;
  }

  modifier inInit(){
      require(votingState == VotingStates.Init);
      _;
  }

  modifier inVoting(){
      require(votingState == VotingStates.Voting);
      _;
  }

  modifier inCounting(){
      require(votingState == VotingStates.Counting);
      _;
  }

  modifier inClosed(){
      require(votingState == VotingStates.Closed);
      _;
  }

  // STATE CHANGE FUNCTIONS
  function startVotingRound() inInit() isOwner() {
      votingState = VotingStates.Voting;
      emit VotingStarted();
  }

  function startCountingRound() inVoting() isOwner() {
      votingState = VotingStates.Counting;
      emit CountingStarted();
  }

  function finishVoting() inCounting() isOwner() {
      votingState = VotingStates.Closed;
      emit VotingClosed();
  }


  // BASIC FUNCTIONS
  
  function vote(string blindVote) inVoting() public {
    if (bytes(blindVotes[msg.sender]).length == 0){  
          blindVotes[msg.sender] = blindVote;
          participants.push(msg.sender);
    }
  }


  function revealVote(uint vote, string salt) inCounting() public {

  }
}