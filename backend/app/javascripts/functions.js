var web3 = require('web3');

$(document).on("ready", function(){

  web3.eth.getAccounts(function(err, accs) {

    alert(accs[0]);

  });
});
