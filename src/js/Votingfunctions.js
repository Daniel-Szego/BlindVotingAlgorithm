
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545/"));

    var TestTokenABI = [
      {
        "constant": true,
        "inputs": [],
        "name": "to",
        "outputs": [
          {
            "name": "",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "version",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "votingState",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "winnerValue",
        "outputs": [
          {
            "name": "",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "from",
        "outputs": [
          {
            "name": "",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "blindVotes",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_from",
            "type": "int256"
          },
          {
            "name": "_to",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "VotingStarted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "CountingStarted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "result",
            "type": "int256"
          }
        ],
        "name": "VotingClosed",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "startVotingRound",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "startCountingRound",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "finishVoting",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "blindVote",
            "type": "string"
          }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "vote",
            "type": "int256"
          },
          {
            "name": "salt",
            "type": "string"
          }
        ],
        "name": "revealVote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "source",
            "type": "string"
          }
        ],
        "name": "stringToBytes32",
        "outputs": [
          {
            "name": "result",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    
    var TestTokenAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
    var TestTokenContract = web3.eth.contract(TestTokenABI).at(TestTokenAddress);
    var OwnerAddress = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
    
    refreshVisibility();  

    $("#voteButton").click(function(){
        vote();
     });

     $("#revealVoteButton").click(function(){
      revealVote();
     });

     $("#startVoting").click(function(){
      startVoting();
     });

     $("#startCounting").click(function(){
      startCounting();
     });

     $("#finishVote").click(function(){
      finishVote();
     });

     //UI

    function refreshVisibility(){
      var accountAddress = getAccountAddress();
      var votingState = getVotingState();
      var votingFrom = getVotingFrom();
      var votingTo = getVotingTo();
      var winner = getWinner();

      $("#TTAddress").val(accountAddress);
      $("#TTVoting").val(votingState);
      $("#TTfrom").val(votingFrom);
      $("#TTto").val(votingTo);
      $("#TTWinner").val(winner);      
    }


    // Ethereum services

    // READ
    function getAccountAddress(){

    }

    function getVotingState(){

    }

    function getVotingFrom(){

    }

    function getVotingTo(){

    }

    function getWinner() {

    }

    //WRITE
    function vote(){

    }

    function revealVote(){

    }

    function startVoting() {

    }

    function startCounting(){

    }

    function finishVote(){

    }
