var accounts;
var account;
var finished;

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

function refreshTickets() {
  var myTickets = document.getElementById("myTickets");
  var availableTickets = document.getElementById("availableTickets");
  var ticketChain = TicketChain.deployed();
  finished = false;
  for(var i = 1; i < 15; i++) {
    ticketChain.getTicketOwner.call(i).then(function(value) {
      if (value == 0) {
        finished = true;
      } else {
        if (value === account) {
          myTickets.innerHTML += "<li>"+value+"</li>";
        } else {
          availableTickets.innerHTML += "<li>"+value+"</li>";
        }
      }
    }).catch(function(e) {
      console.log(e);
      setStatus("Error see log.");
    });
  }
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
    refreshTickets();
    //refreshMyTickets(account[0]);
    //refreshTicketsAvailable();

    populateAccounts(web3);
  });
}

function populateAccounts(w3) {
  $.each(accounts, function(index, acc){
    $("#accounts").append("<tr><td>" + acc + "</td><td>" + web3.fromWei(web3.eth.getBalance(acc)) + "</td></tr>");
  });
}
