var Voting = artifacts.require("BlindVoting");
var VotingInstance;
var VotingVersion;


contract('Voting', function(accounts) {
    it("test of the voting contract", function() {
        return Voting.deployed().then(function(instance) {
            VotingInstance = instance;
            return VotingInstance.version({from: accounts[0]});             
        }).then(function(result) {
            VotingVersion = result;
            assert.equal(VotingVersion, "0.0.1", "Voting version is 0.0.1");            
        });
    });
});