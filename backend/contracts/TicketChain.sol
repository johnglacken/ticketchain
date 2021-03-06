pragma solidity ^0.4.2;

contract TicketChain {

	struct Ticket {
		address owner;
		string description;
		uint price;
		bool forSale;
	}

	uint totalTicketCount = 10;

	mapping(uint => Ticket) tickets;

	function TicketChain() {
		newTicket(1, this, "Justin Bieber", 55);
		newTicket(2, this, "Justin Bieber", 55);
		newTicket(3, this, "Justin Bieber", 55);
		newTicket(4, this, "Justin Bieber", 55);
		newTicket(5, this, "Adele", 40);
		newTicket(6, this, "Adele", 40);
		newTicket(7, this, "Adele", 40);
		newTicket(8, this, "One Direction", 40);
		newTicket(9, this, "Blockchain Hackathon", 15000);
		newTicket(10, this, "Blockchain Hackathon", 15000);
	}

	function getTotalTicketCount() returns(uint) {
		return totalTicketCount;
	}

	function newTicket(uint _uid, address _owner, string _description, uint _price) {
		tickets[_uid] = Ticket(_owner, _description, _price, true);
	}

	function buyTicket(uint _uid) payable returns(bool) {
		Ticket ticket = tickets[_uid];
		if (msg.value <= ticket.price) throw; // this reverts the transfer if the money sent doesnt match the price
		if (!ticket.forSale) throw;
		bool x = ticket.owner.send(ticket.price);
		address originalOwner = ticket.owner;
		ticket.owner = msg.sender;
		ticket.forSale = false;
		return true;
	}

	function sellTicket(uint _uid, uint _price) returns(bool) {
		Ticket ticket = tickets[_uid];
		if (! (ticket.owner == msg.sender) ) throw;
		if (ticket.forSale) throw;
		ticket.price = _price;
		ticket.forSale = true;
	}

	function cancelTicketSale(uint _uid) returns(bool) {
		Ticket ticket = tickets[_uid];
		if (! (ticket.owner == msg.sender) ) throw;
		if (!ticket.forSale) throw;
		ticket.forSale = false;
	}

	function validateTicket(uint _uid, address owner) returns(bool) {
		return (tickets[_uid].owner == owner);
	}

	function getTicketDetails(uint _uid) returns(address owner, uint price, bool forSale, string description) {
	    owner = tickets[_uid].owner;
	    price = tickets[_uid].price;
	    forSale = tickets[_uid].forSale;
	    description = tickets[_uid].description;
	  }
}
