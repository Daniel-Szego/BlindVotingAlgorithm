# Simple blind voting algorithm realized by solidity - Ethereum

The voting is based on the BlindVoting smart contract
The values to be voted on are integers in the from to range

The voting has the following stages:
- Init: 
    the voting smart contract is created and initialzed but it is still not possible to vote
- Voting:
    Votes are calculated, but based on secret hash values
- Counting
    Votes are revealed.
- Closed
    Votes are calculated a winner was announced by the VotingClosed(result) event and can be read out from the winnerValue public property as well

The voting pocess:
- create sha256 hash of the choosen value and a certain salt string
- vote with the given hash value
- in the counting phase reveal the choosen value and the salt with the revealVote call

