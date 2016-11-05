pragma solidity ^0.4.2;

contract TicketChain {

	struct Ticket {
		address owner;
		uint price;
		bool forSale;
	}

	mapping(uint => Ticket) tickets;

	function TicketChain() {
		newTicket(1, this, 10);
		newTicket(2, this, 20);
		newTicket(3, this, 11);
		newTicket(4, this, 10);
		newTicket(5, this, 10);
		newTicket(6, this, 10);
		newTicket(7, this, 10);
		newTicket(8, this, 10);
		newTicket(9, this, 10);
		newTicket(10, this, 10);
	}

	function newTicket(uint _uid, address _owner, uint _price) {
		tickets[_uid] = Ticket(_owner, _price, true);
	}

	function buyTicket(uint _uid) payable returns(bool) {
		Ticket ticket = tickets[_uid];
		if (msg.value <= ticket.price) throw; // this reverts the transfer if the money sent doesnt match the price
		bool x = ticket.owner.send(ticket.price);
		address originalOwner = ticket.owner;
		ticket.owner = msg.sender;
		ticket.forSale = false;
		return true;
	}

	function sellTicket(uint _uid) returns(bool) {
		Ticket ticket = tickets[_uid];
		if (! (ticket.owner == msg.sender) ) throw;
		if (ticket.forSale) throw;
		ticket.forSale = true;
	}

	function getTicketOwner(uint _uid) returns(address) {
		return tickets[_uid].owner;
	}

	function getTicketPrice(uint _uid) returns(uint) {
		return tickets[_uid].price;
	}
}
