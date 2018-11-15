var Voting = artifacts.require("BlindVoting");
var hashInput100 = 'AD57366865126E55649ECB23AE1D48887544976EFEA46A48EB5D85A6EEB4D306';
var firstState;

contract('Voting', function(accounts) {
    it("test of the revealVote contract state transition", function() {
        return Voting.deployed(10, 100).then(function(instance) {
            VotingInstance = instance;
            return VotingInstance.votingState({from: accounts[0]});             
        }).then(function(result) {
            firstState = result;
            return VotingInstance.startVotingRound({from: accounts[0]});             
        }).then(function(result) {
            return VotingInstance.revealVote(100,"", {from: accounts[0]});                           
        }).catch(function(error) {
            errorMessage = error.toString();
            if (errorMessage.indexOf("revert")  > 0){
                assert(true, "Can not vote in Init state - error as expected");   
            }
            else{
                assert(false, "Can not vote in Init state - wrong error message");   
            }
        });
    });
});