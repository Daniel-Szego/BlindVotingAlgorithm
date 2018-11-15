var Voting = artifacts.require("BlindVoting");
var firstState;



contract('Voting', function(accounts) {
    it("test of the voting contract state transition", function() {
        return Voting.deployed(10, 100).then(function(instance) {
            VotingInstance = instance;
            return VotingInstance.startVotingRound({from: accounts[0]});             
        }).then(function(result) {


            assert.equal(firstState, 0, "fourht state Finished");             
        });
    });
});