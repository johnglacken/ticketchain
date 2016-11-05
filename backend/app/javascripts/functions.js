var web3 = require('web3');

$(document).on("ready", function(){
  alert(web3.eth.accounts[0]);
});
