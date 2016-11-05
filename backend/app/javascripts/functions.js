var web3 = require('web3');
var accounts;

$(document).on("ready", function(){
  web3 = new Web3(new Web3.providers.HttpProvider("http://blockhack.northeurope.cloudapp.azure.com:8545"));

  populateAccounts();
});

function populateAccounts() {

  web3.eth.getAccounts(function(err, accs) {

    accounts = accs;

    $.each(accounts, function(index, accounts){
      $("#accounts").append("<tr><td>" + acc + "</td><td>" + web3.fromWei(web3.eth.getBalance(acc)) + "</td></tr>");
    });

  });

}

function transferToAccount(fromAccount, toAccount, amount) {


    web3.eth.sendTransaction({from:fromAccount,
                         to:toAccount,
                         value: web3.toWei(amount, "ether"),
                         data:"caoimhe"
                       }, function(err, address){
                         console.log("sendTransaction complete");
                         if (!err) {
                           console.log("address:" + address);
                           var t = web3.eth.getTransaction(address);
                           displayTransaction(t);
                           return t;
                         } else {
                           console.log("error:" + err);
                           return false;
                         }
                       });
}
