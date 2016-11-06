var accounts;
var account;
var finished;

var ticketChain = TicketChain.deployed();

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshTickets() {

  var myTickets = $("#myTickets");
  myTickets.empty();
  var availableTickets = $("#availableTickets");
  availableTickets.empty();

  ticketChain.getTotalTicketCount.call().then(function(ticketCount) {
    console.log('ticketCount: ' + ticketCount);

    for (var ticketIndex = 1; ticketIndex <= ticketCount; ticketIndex++) {
      fetchTicket(ticketIndex);
    }
  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });
};

// Load all tickets and filter into My Tickets or Available Tickets.
// All others will be hidden
function fetchTicket(ticketId) {
  console.log('fetchTicket: Entering');

  var ticketChain = TicketChain.deployed();

  ticketChain.getTicketDetails.call(ticketId).then(function(value) {
    var ticketDetails = parseTicketFromTicketDetailsResponse(value);

    if (ticketDetails.owner === account) {
      addMyTicket(ticketId, ticketDetails);
    } else if (ticketDetails.forSale) {
      addAvailableTicket(ticketId, ticketDetails);
    }

  }).catch(function(e) {
    console.log(e);
    setStatus("Error see log.");
  });
}

function parseTicketFromTicketDetailsResponse(ticketDetailsArray){
  var ticketDetails = {};
  ticketDetails.owner = ticketDetailsArray[0];
  ticketDetails.price = ticketDetailsArray[1];
  ticketDetails.forSale = ticketDetailsArray[2];
  ticketDetails.description = ticketDetailsArray[3];
  console.log('Returning ticket: ' + JSON.stringify(ticketDetails));
  return ticketDetails;
}

function prepareBuy(id, price) {
  $('#ticketid').val(id);
  $('#price').val(price);
  $("#ticketid").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $('#price').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function addMyTicket(ticketId, ticketDetails) {
  console.log("Adding ticket to the My Tickets list");

  var tr = $('<tr>').attr('id', ticketId);
  $("#myTickets").append(tr);
  tr.append($('<td>').html(ticketId));
  tr.append($('<td>').html(ticketDetails.owner));
  tr.append($('<td>').html(ticketDetails.description));
  tr.append($('<td>').html(ticketDetails.price.valueOf()));

  tr.append($('<td>').html('<button class="btn" onclick="openPrintTicketWindow(' + ticketId + ')">Print Ticket</button>'));

  if (ticketDetails.forSale) {
    tr.append($('<td>').html('<button class="btn" onclick="cancelSaleOfTicket('+ticketId+')">Cancel Sale</button>'));
  } else {
    tr.append($('<td>').html('<button class="btn" onclick="sellTicket('+ticketId+')">Sell</button>'));
  }
}

function openPrintTicketWindow(ticketId) {
  console.log('openPrintTicketWindow: Entering');

  window.open('printTicket.html?id=' + ticketId);
  return false;
}

function addAvailableTicket(ticketId, ticketDetails) {

  console.log("Adding ticket to the Available Tickets list");

  var tr = $('<tr>').attr('id', ticketId);
  $("#availableTickets").append(tr);
  tr.append($('<td>').html(ticketId));
  tr.append($('<td>').html(ticketDetails.owner));
  tr.append($('<td>').html(ticketDetails.description));
  tr.append($('<td>').html(ticketDetails.price.valueOf()));

  tr.append($('<td>').html('<button class="btn" onclick="prepareBuy('+ticketId+','+(parseInt(ticketDetails.price.valueOf())+1)+')">Buy it!</button>'));
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

// cancel sale of ticket
function cancelSaleOfTicket(id) {

  ticketChain.cancelTicketSale.sendTransaction(id, price, {from: account}).then(function() {
      setStatus("cancel complete!");
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

function validateTicket(ticketId, owner) {
  ticketChain.validateTicket.call(ticketId, owner).then(function(value) {
      $('#result').html("Ticket valid: " + value);
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

    var accountId = getUrlParameter('id') || 0;
    console.log('Logged on as account ID: ' + accountId);

    account = accounts[accountId];
    console.log('Account key: ' + account);
    var balance = web3.fromWei(web3.eth.getBalance(account));
    console.log('Account balance:' + balance);

    $('#validatelink').attr('href', "zxing://scan/?ret=" +
      encodeURIComponent(location.protocol + '//' + location.host + location.pathname
	+ "?id=" + accountId + "&function=validate&ticket={CODE}"));

    var qr_func = getUrlParameter('function');
    if(qr_func == "validate") {
      validateTicket(getUrlParameter('ticket'), account);
    }

    document.getElementById("yourAddress").innerHTML = account;
    document.getElementById("yourBalance").innerHTML = balance;
    //$('#yourBalance').html(balance[0]);
    refreshTickets();
  });
}
