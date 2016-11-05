pragma solidity ^0.4.2;

contract TicketChain {

	struct Ticket {
		address owner;
		uint price;
	}

	mapping(uint => Ticket) tickets;
	//Ticket[] tickets;

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
		tickets[_uid] = Ticket(_owner, _price);
	}

	function buyTicket(uint _uid) payable returns(bool) {
		Ticket ticket = tickets[_uid];
		if (!(msg.value == ticket.price)) throw; // this reverts the transfer if the money sent doesnt match the price
		//if(!ticket.owner.send(ticket.price)) throw;

		address originalOwner = ticket.owner;
		ticket.owner = msg.sender;

		return true;
	}

	//function sellTicket(uint currentTicket) returns(bool sufficient) {
	//	if (balances[msg.sender] < amount) return false;
	//	balances[msg.sender] -= amount;
	//	balances[receiver] += amount;
	//	Transfer(msg.sender, receiver, amount);
	//	return true;
	//}

	/*function getListOfTicketIds(address owner) returns (string) {
		string result = "";
		for(uint i = 0; i < 10000; i++) {
			if(tickets[i].owner == owner){
				result += string(i);
			}
		}
		return result;
	}

	function getAvailableTicketIds() returns (string) {
		return getListOfTicketIds(this);
	}*/

	function getTicketOwner(uint _uid) returns(address) {
		return tickets[_uid].owner;
	}

	function getTicketPrice(uint _uid) returns(uint) {
		return tickets[_uid].price;
	}
}
