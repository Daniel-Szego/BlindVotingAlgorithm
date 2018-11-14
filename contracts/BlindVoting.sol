pragma solidity ^0.4.23;

contract BlindVoting {
 
  enum VotingStates {Init, Voting, Counting, Closed }
  VotingStates public votingState;
  string public version = "0.0.1";
  int public from;
  int public to;
  address public owner;
  string private intCalc;
  
  address[] participants;
  mapping(address => string) public blindVotes;
  mapping(int => int) votes;

  // new contract -> new voting round -> voting on numbers
  constructor(int _from, int _to){
      from = _from;
      to = _to;
      owner = msg.sender;
      votingState = VotingStates.Init;
  }
  
  // EVENTS
  event VotingStarted();
  event CountingStarted();
  event VotingClosed(int256 result); 

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
      // counting votes
      int result = -1;
      int highestVoteNumber = -1;
      for (int i = from; i <= to; i++){
          if (votes[i] > highestVoteNumber){
             highestVoteNumber = votes[i];
             result = i;
          }
      }
      // updating state
      votingState = VotingStates.Closed;
      emit VotingClosed(result);
  }

  // BASIC FUNCTIONS
  // voting based on a sha256 value of the number and the salt
  function vote(string blindVote) inVoting() public {
    if (bytes(blindVotes[msg.sender]).length == 0){  
          blindVotes[msg.sender] = blindVote;
          participants.push(msg.sender);
    }
  }

  // revealing the vote in the voting round
  function revealVote(int vote, string salt) inCounting() public {
      string blindVote = blindVotes[msg.sender];
      if (compareStrings(blindVote,intCalc)) {
          votes[vote] = votes[vote] + 1;
      }     
  }

function compareStrings (string a, string b) view returns (bool){
        bytes32  aa = stringToBytes32(a);
        bytes32  bb = stringToBytes32(b);
        bytes32 x = aa[1];
        bytes32 z = bb[1];
        
       return x == z;
 }

function stringToBytes32(string memory source) returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
}
}
