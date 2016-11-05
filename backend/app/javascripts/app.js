var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshTicketsAvailable() {
  var ticketChain = TicketChain.deployed();
  ticketChain.getAvailableTicketIds.call().then(function(value) {
    var availableTickets = document.getElementById("availableTickets");
    for(var i = 0; i < value.length; i++){
      availableTickets.innerHTML += "<li>"+value[i]+"</li>";
    }
  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });
};

function refreshMyTickets(address) {
  var ticketChain = TicketChain.deployed();
  ticketChain.getListOfTicketIds.call(address).then(function(value) {
    var myTickets = document.getElementById("myTickets");
    for(var i = 0; i < value.length; i++){
      myTickets.innerHTML += "<li>"+value[i]+"</li>";
    }
  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });
};

function buyTicket() {
  var ticketChain = TicketChain.deployed();

  var price = parseInt(document.getElementById("price").value);
  var ticketid = document.getElementById("ticketid").value;

  setStatus("Initiating transaction... (please wait)");

  ticketChain.buyTicket.sendTransaction(ticketid, {from: account, value: price}).then(function() {
    setStatus("Transaction complete!");
    }).catch(function(e) {
    console.log(e);
    setStatus("An error occured; see log.");
  });

};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }



    accounts = accs;
    account = accounts[0];

    document.getElementById("yourAddress").innerHTML = account;
    refreshMyTickets(account[0]);
    refreshTicketsAvailable();
  });
}

$(document).on("ready", function(){
  populateAccounts();
});

function populateAccounts() {

  web3.eth.getAccounts(function(err, accs) {
    alert(accs.length);
  });

  //$("#accounts").empty();
  //web3.eth.getAccounts(function(err, accs){

    //$.each(accs, function(index, acc){
      //$("#accounts").append("<tr><td>" + acc + "</td><td>" + web3.fromWei(web3.eth.getBalance(acc)) + "</td></tr>");


    //});

  //});
}
