var BlindVoting = artifacts.require("./BlindVoting.sol");

module.exports = function(deployer) {
  deployer.deploy(BlindVoting);
};
