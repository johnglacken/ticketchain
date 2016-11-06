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

// Load all tickets and filter into My Tickets or Available Tickets.
// All others will be hidden
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

function parseTicketFromTicketDetailsResponse(ticketDetailsArray)
{
  var ticketDetails = {};
  ticketDetails.owner = ticketDetailsArray[0];
  ticketDetails.price = ticketDetailsArray[1];
  ticketDetails.forSale = ticketDetailsArray[2];
  ticketDetails.description = ticketDetailsArray[3];

  console.log('Returning ticket: ' + JSON.stringify(ticketDetails));
  return ticketDetails;
}

function addTicket(address, id, mine) {
  var ticketChain = TicketChain.deployed();
  var tr = $('<tr>').attr('id', id);
  if(mine) {
    $("#myTickets").append(tr);
  } else {
    $("#availableTickets").append(tr);
  }
  tr.append($('<td>').html(id));
  tr.append($('<td>').html(address));

  // Get Description
  ticketChain.getTicketDetails.call(id).then(function(value) {
    console.log('value: ' + value);

    var ticketDetails = parseTicketFromTicketDetailsResponse(value);
    $('#' + id).append($('<td>').html(ticketDetails.description));
    $('#' + id).append($('<td>').html(ticketDetails.price));

    if(mine)
    {
      tr.append($('<td>').html('<button class="btn" onclick="sellTicket('+id+')">Sell</button>'));
    }

    if(!mine && ticketDetails.forSale)
    {
      tr.append($('<td>').html('<button class="btn" onclick="buyTicket('+id+')">Buy it!</button>'));
    }

  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });
}

// Buy button action
function buyTicket() {
  var ticketChain = TicketChain.deployed();

  var price = parseInt(document.getElementById("price").value);
  var ticketid = document.getElementById("ticketid").value;

  setStatus("Initiating transaction... (please wait)");

  ticketChain.buyTicket.sendTransaction(ticketid, {from: account, value: price}).then(function() {
      setStatus("Transaction complete!");
      refreshTickets();
    }).catch(function(e) {
      console.log(e);
      setStatus("An error occured; see log.");
  });

};

// Sell Button action
function sellTicket(id) {
  var price = prompt("Please enter a price");
  ticketChain.sellTicket.sendTransaction(id, price, {from: account}).then(function() {
      setStatus("Transaction complete!");
      refreshTickets();
    }).catch(function(e) {
      console.log(e);
      setStatus("An error occured; see log.");
  });
}

// TODO A button beside a ticket that I own should be available in the view that calls this
function cancelTicketSale(ticketId) {

  console.log("cancelTicketSale: Entering");

  var ticketChain = TicketChain.deployed();

  ticketChain.cancelTicketSale.call(ticketId).then(function(value) {

      console.log("Have result of cancelTicketSale");

      console.log(value);
      console.log(value.description);

      // TODO Update the screen with the ticket NOT being for sale

    }).catch(function(e) {
    console.log(e);
    setStatus("An error occured; see log.");
  });
};

// UNUSED. Demonstrates getting the details of a single ticket in JS
function displaySingleTicket(ticketId) {

  console.log("displaySingleTicket: Entering");

  var ticketChain = TicketChain.deployed();

  var singleTicketlement = document.getElementById("single_ticket").value;

  ticketChain.getTicketDetails.call(ticketId).then(function(value) {

      console.log("Have result of getTicketDetails");

      console.log(value);
      console.log(value.description);

      document.getElementById("single_ticket").innerHTML = value;

    }).catch(function(e) {
    console.log(e);
    setStatus("An error occured; see log.");
  });
};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
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

    var accountId = getUrlParameter('id');
    console.log('Logged on as account ID: ' + accountId);

    account = accounts[accountId];
    console.log('Account key: ' + account);
    var balance = web3.fromWei(web3.eth.getBalance(account));
    console.log('Account balance:' + balance);

    document.getElementById("yourAddress").innerHTML = account;
    document.getElementById("yourBalance").innerHTML = balance;
    //$('#yourBalance').html(balance[0]);
    refreshTickets();
    //refreshMyTickets(account[0]);
    //refreshTicketsAvailable();

    //populateAccounts(web3);
  });
}
