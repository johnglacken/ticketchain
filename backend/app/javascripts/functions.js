var accountList;

$(window).on("load", function(){

  web3.eth.getAccounts(function(err, accs) {
    accountList = accs;

    populateAccounts(accountList);
  });
});

$(document).on("click", "#populate", function(){

  web3.eth.getAccounts(function(err, accs) {
    accountList = accs;
    populateAccounts(accountList);
  });
});

$(document).on("click", "#transfer", function(){
  var fromAccount = $("#fromAccount").val();
  var toAccount = $("#toAccount").val();
  var amount = $("#amount").val();
  transferToAccount(fromAccount, toAccount, amount);
});


function populateAccounts(accounts) {
  $("#accounts").empty();
  $.each(accounts, function(index, acc){
    $("#accounts").append("<tr><td>" + acc + "</td><td>" + web3.fromWei(web3.eth.getBalance(acc)) + "</td></tr>");
    $("#fromAccount").append("<option>" + acc + "</option>");
    $("#toAccount").append("<option>" + acc + "</option>");
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
                           populateAccounts(accountList);
                           return t;
                         } else {
                           console.log("error:" + err);
                           return false;
                         }
                       });
}

function displayBlock(block) {


  console.log("number:" + block.number);
  console.log("difficulty:" + block.difficulty);
  console.log("miner:" + block.miner);


  if (block.miner === web3.eth.coinbase) {
    console.log("***********mined*************");
  }
}


function displayTransaction(t) {
  console.log("Block:" + t.blockNumber);
  console.log("From:" + t.from);
  console.log("To:" + t.to);
  console.log("Amount" + t.value);
}
