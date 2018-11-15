var Voting = artifacts.require("BlindVoting");
var firstState;
var secondState;
var thirdState;
var fourthState;
var winnerValue;
var hashInput100 = 'AD57366865126E55649ECB23AE1D48887544976EFEA46A48EB5D85A6EEB4D306';
var hashInput99 = '8C1F1046219DDD216A023F792356DDF127FCE372A72EC9B4CDAC989EE5B0B455';
var hashOutput;

contract('Voting', function(accounts) {
    it("test of the voting functionality", function() {
        return Voting.deployed(10, 100).then(function(instance) {
            VotingInstance = instance;
            return VotingInstance.votingState({from: accounts[0]});                         
        }).then(function(result) {
            firstState = result;            
            return VotingInstance.startVotingRound({from: accounts[0]});             
        }).then(function(result) {
            return VotingInstance.votingState({from: accounts[0]});             
        }).then(function(result) {
            secondState = result;
            return VotingInstance.vote(hashInput100, {from: accounts[0]});             
        }).then(function(result) {
            return VotingInstance.blindVotes(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            hashOutput = result;
            return VotingInstance.vote(hashInput99, {from: accounts[1]});             
        }).then(function(result) {
            return VotingInstance.vote(hashInput99, {from: accounts[2]});             
        }).then(function(result) {    
            return VotingInstance.startCountingRound({from: accounts[0]});                          
        }).then(function(result) {
            return VotingInstance.votingState({from: accounts[0]});             
        }).then(function(result) {            
            thirdState = result;            
            return VotingInstance.revealVote(100,"", {from: accounts[0]});        
        }).then(function(result) {   
            return VotingInstance.revealVote(99,"", {from: accounts[1]});        
        }).then(function(result) {   
            return VotingInstance.revealVote(99,"", {from: accounts[2]});        
        }).then(function(result) {               
            return VotingInstance.finishVoting({from: accounts[0]});                          
        }).then(function(result) {  
            return VotingInstance.votingState({from: accounts[0]}); 
        }).then(function(result) {  
            fourthState = result;
            return VotingInstance.winnerValue({from: accounts[0]}); 
        }).then(function(result) {  
            winnerValue = result;
            assert.equal(firstState, 0, "first state init");             
            assert.equal(secondState, 1, "second state Voting");             
            assert.equal(thirdState, 2, "third state Counting");             
            assert.equal(fourthState, 3, "fourth state Counting");             
            assert.equal(hashOutput, hashInput100, "hash input and outputs are the same");             
            assert.equal(winnerValue, 99, "winner is 100");                         
        });
    });
});