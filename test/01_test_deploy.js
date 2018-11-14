var Voting = artifacts.require("BlindVoting");
var VotingInstance;
var VotingVersion;
var from;
var to;
var owner;


contract('Voting', function(accounts) {
    it("test of the voting contract", function() {
        return Voting.deployed(10, 100).then(function(instance) {
            VotingInstance = instance;
            return VotingInstance.version({from: accounts[0]});             
        }).then(function(result) {
            VotingVersion = result;            
            return VotingInstance.from();
        }).then(function(result) {
            from = result;            
            return VotingInstance.to();
        }).then(function(result) {
            to = result;
            return VotingInstance.owner();
        }).then(function(result) {
            owner = result;              
            assert.equal(VotingVersion, "0.0.1", "Voting version is 0.0.1");            
            assert.equal(from, 10, "from parameter matching");            
            assert.equal(to, 100, "to parameter matching");            
            assert.equal(owner, accounts[0], "owner address matching");             
        });
    });
});