var web3 = require('web3');

$(document).on("ready", function(){

web3 = new Web3(new Web3.providers.HttpProvider("http://blockhack.northeurope.cloudapp.azure.com:8545"));
  web3.eth.getAccounts(function(err, accs) {

    alert(accs[0]);

  });
});
