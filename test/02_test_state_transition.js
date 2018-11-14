var Voting = artifacts.require("BlindVoting");
var firstState;
var secondState;
var thirdState;
var forthState;



contract('Voting', function(accounts) {
    it("test of the voting contract state transition", function() {
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
            return VotingInstance.startCountingRound({from: accounts[0]});             
        }).then(function(result) {
            return VotingInstance.votingState({from: accounts[0]});
        }).then(function(result) {
            thirdState = result;
            return VotingInstance.finishVoting({from: accounts[0]});             
        }).then(function(result) {
            return VotingInstance.votingState({from: accounts[0]});
        }).then(function(result) {
            forthState = result;
            assert.equal(firstState, 0, "first state init");             
            assert.equal(secondState, 1, "second state Voting");             
            assert.equal(thirdState, 2, "third state Counting");             
            assert.equal(firstState, 0, "fourht state Finished");             
        });
    });
});