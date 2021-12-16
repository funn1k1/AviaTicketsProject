import dropdown from "../views/dropdown";
import locations from "./locations";

class FavoriteTickets {
  constructor() {
    this.tickets = {};
  }

  addFavoriteTicket(ticket) {
    if (localStorage.getItem("favTickets") === null) {
      this.tickets[ticket.flight_number] = ticket;
      localStorage.setItem("favTickets", JSON.stringify(this.tickets));
    } else {
      const item = JSON.parse(localStorage.getItem("favTickets"));
      item[ticket.flight_number] = ticket;
      this.tickets = item;
      localStorage.setItem("favTickets", JSON.stringify(item));
    }
  }

  getFavoriteTickets() {
    return this.tickets;
  }

  deleteFavoriteTicket(ticket) {
    const item = JSON.parse(localStorage.getItem("favTickets"));
    delete item[ticket.flight_number];
    this.tickets = item;
    localStorage.setItem("favTickets", JSON.stringify(this.tickets));
    dropdown.renderTickets(this.tickets);
  }
}

const favoriteTickets = new FavoriteTickets();
export default favoriteTickets;
