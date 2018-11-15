
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545/"));

    var TestTokenABI = [
        {
          "constant": true,
          "inputs": [],
          "name": "name",
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
          "constant": false,
          "inputs": [
            {
              "name": "_spender",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_from",
              "type": "address"
            },
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "INITIAL_SUPPLY",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
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
          "constant": false,
          "inputs": [
            {
              "name": "_spender",
              "type": "address"
            },
            {
              "name": "_subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseApproval",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
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
          "constant": false,
          "inputs": [
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_spender",
              "type": "address"
            },
            {
              "name": "_addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseApproval",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            },
            {
              "name": "_spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        }
      ];
    
    var TestTokenAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
    var TestTokenContract = web3.eth.contract(TestTokenABI).at(TestTokenAddress);
    var OwnerAddress = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
    var OwnerPsW = "psw";
    var MinWeiBalance = 1000000;
    
    refreshVisibility();  

    $("#createWalletButton").click(function(){
        createAccount();
     });

     $("#transferTokenButton").click(function(){
      transferToken();
     });

     $("#backupWalletButton").click(function(){
      backupWallet();
     });

    //UI

    function refreshVisibility(){
      var walletName = getCookie("walletname");
      var walletAddress = getCookie("walletaddress");
      
      $("#TTWallet" ).text(walletName);
      $("#TTAddress" ).text(walletAddress);

      if (walletName !== null && walletName !== ''){
        $("#DIVCreate").hide();
        $("#DIVTransfer").show();
        $("#DIVBackup").show();
        getEtherBalances();
        getTokenBalances();    
      }
      else{
        $("#DIVCreate").show();
        $("#DIVTransfer").hide();
        $("#DIVBackup").hide();
      }
    }

    function showPassword(){
      var x = document.getElementById("TTWalletPW");
      if (x.type === "password") {
          x.type = "text";
      } else {
          x.type = "password";
      }
    }

    //cookie help function

    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    }

    // Ethereum services

    function createAccount(){
      var walletName = $('#TTWalletID').val();
      var walletPassword = $('#TTWalletPW').val();
      
      web3.personal.newAccount(walletPassword, function (error, result) {
          if (!error){
            $("#TTWallet" ).val(walletName);
            $("#TTAddress" ).val(result);
            setCookie("walletname", walletName, 5);
            setCookie("walletaddress", result, 5);
            setCookie("walletpsw", walletPassword, 5);
            
            transferEtherFromDefaultAccount();
            transferTokenFromDefaultAccount();
            
            alert("Account creation has been succeeded!");              
            
          }else{
            alert("An error happened at creating the account" + error);              
          }
        });
  }

  function getEtherBalances(){
          var account =  getCookie("walletaddress");
          var balance = web3.eth.getBalance(account);       
          $("#TTBalanceEther").text(balance);  
          return balance;
  }

  function getTokenBalances () {
    var account =  getCookie("walletaddress");
    var balance = TestTokenContract.balanceOf(account, function(error, result){
              $("#TTBalanceToken").text(result);                
        });
    return balance;
  }

  function transferToken(){

    var fromAddress = getCookie("walletaddress");
    var fromPassword = getCookie("walletpsw");
    var toAddress = $("#TTTransferTokenAddress").val();
    var transferValue = $("#TTTransferTokenAmount").val();

    web3.personal.unlockAccount(fromAddress, fromPassword);    
    var retVal = TestTokenContract.transfer.sendTransaction(toAddress,transferValue, 
      {from: fromAddress},
      function(error, result){
      if (!error){
        alert("Token transfer has been succeeded");
        $("#TTTransferTokenAddress").val("");
        $("#TTTransferTokenAmount").val("");
        refreshVisibility();          
      } else {
        console.log(error);
      }
    });
    return retVal;
  }

  function transferEtherFromDefaultAccount(){

    var fromAddress = OwnerAddress;
    var fromPassword = OwnerPsW;
    var toAddress = getCookie("walletaddress");
    var transferValue = MinWeiBalance;

    web3.personal.unlockAccount(fromAddress, fromPassword);    
    var retVal = web3.eth.sendTransaction({
      from: fromAddress,
      to: toAddress, 
      value: MinWeiBalance, 
  }, function(err, transactionHash) {
      if (err) { 
          console.log(err); 
      } else {
          console.log(transactionHash);
      }
  });
    
  return retVal;
  }

  function transferTokenFromDefaultAccount(){

    var fromAddress = OwnerAddress;
    var fromPassword = OwnerPsW;
    var toAddress = getCookie("walletaddress");
    var transferValue = $("#TTWalletTokenNr").val();

    web3.personal.unlockAccount(fromAddress, fromPassword);    
    var retVal = TestTokenContract.transfer.sendTransaction(toAddress,transferValue, 
      {from: fromAddress},
      function(error, result){
      if (!error){
        refreshVisibility();          
      } else {
        console.log(error);
      }
    });
    return retVal;
  }
  function backupWallet(){


  }