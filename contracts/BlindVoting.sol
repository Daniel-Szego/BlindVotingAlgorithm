pragma solidity ^0.4.23;

contract BlindVoting {
 
  string public version = "0.0.1";
  uint public from;
  uint public to;
  address public owner;

  // new contract -> new voting round -> voting on numbers
  constructor(uint _from, uint _to){
      from = _from;
      to = _to;
      owner = msg.sender;
  }



}