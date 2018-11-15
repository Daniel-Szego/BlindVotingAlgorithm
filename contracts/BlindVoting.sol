pragma solidity ^0.4.23;

contract BlindVoting {
 
  enum VotingStates {Init, Voting, Counting, Closed }
  VotingStates public votingState;
  string public version = "0.0.1";
  int public from;
  int public to;
  address public owner;
  
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
      bytes32 calcVote = sha256(strConcat(uint2str(uint(vote)),salt));
      bytes32 blindVoteBytes = stringToBytes32(blindVote);
      if (blindVoteBytes != calcVote) {
          votes[vote] = votes[vote] + 1;
      }     
  }

// INTERNAL TOOLS

function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    bytes memory _bc = bytes(_c);
    bytes memory _bd = bytes(_d);
    bytes memory _be = bytes(_e);
    string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
    bytes memory babcde = bytes(abcde);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
    for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
    for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
    for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
    for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
    return string(babcde);
}

function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
    return strConcat(_a, _b, _c, _d, "");
}

function strConcat(string _a, string _b, string _c) internal returns (string) {
    return strConcat(_a, _b, _c, "", "");
}

function strConcat(string _a, string _b) internal returns (string) {
    return strConcat(_a, _b, "", "", "");
}

function uint2str(uint i) internal pure returns (string){
    if (i == 0) return "0";
    uint j = i;
    uint length;
    while (j != 0){
        length++;
        j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint k = length - 1;
    while (i != 0){
        bstr[k--] = byte(48 + i % 10);
        i /= 10;
    }
    return string(bstr);
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
