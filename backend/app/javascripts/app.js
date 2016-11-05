var accounts;
var account;
var finished;
var ticketChain = TicketChain.deployed();

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshTicketsAvailable() {
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
  var myTickets = $("#myTickets");
  var availableTickets = $("#availableTickets");
  var finished = false;
  fetchTicket(1);
};

function fetchTicket(index) {
  ticketChain.getTicketOwner.call(index).then(function(value) {
    if (value != 0) {
      if (value === account) {
        console.log("MINEM mNEINMNNEMINE");
        addTicket(value, index, true);
      } else {
      console.log(index);
        addTicket(value, index, false);
      }
      fetchTicket(++index);
    }
  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });
}

function addTicket(address, id, mine) {
  var ticketChain = TicketChain.deployed();
  var tr = $('<tr>').attr('id', id);
  if(mine) {
    $("#myTickets").append(tr);
  } else {
    $("#availableTickets").append(tr);
  }
  tr.append($('<td>').html(address));
  // Get Description
  ticketChain.getTicketDescription.call(id).then(function(value) {
    $('#' + id).append($('<td>').html(value));
    console.log(value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });

  // Get Price
  ticketChain.getTicketPrice.call(id).then(function(value) {
    $('#' + id).append($('<td>').html(value));
  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });

}


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

    //populateAccounts(web3);
  });
}

function populateAccounts(w3) {
  $.each(accounts, function(index, acc){
    $("#accounts").append("<tr><td>" + acc + "</td><td>" + web3.fromWei(web3.eth.getBalance(acc)) + "</td></tr>");
  });
}
