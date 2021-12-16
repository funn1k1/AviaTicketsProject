
import currencyUI from "./currency";
import favoriteTickets from "../store/favorite_tickets";

class Dropdown {
  constructor(currency) {
    this.container = document.querySelector(".dropdown-content");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    let currencySymbol = this.getCurrencySymbol();
    this.clearContainer();

    for (const key in tickets) {
      if (tickets.hasOwnProperty(key)) {
        const fragment = Dropdown.ticketTemplate(tickets[key], currencySymbol);
        this.container.insertAdjacentHTML("beforeend", fragment);
        const nodes = this.container.querySelectorAll("a");
        nodes[nodes.length - 1].addEventListener("click", () => {
          favoriteTickets.deleteFavoriteTicket(tickets[key]);
        });
      }
    }
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  static ticketTemplate(ticket, currency) {
    ticket.airline_logo = ticket.airline_logo || "http://pics.avs.io/200/200/null.png";
    ticket.airline_name = ticket.airline_name || "Нет данных";
    return `
          <div class="favorite-item d-flex align-items-start">
          <img
            src="${ticket.airline_logo}"
            class="favorite-item-airline-img"
          />
          <div class="favorite-item-info d-flex flex-column">
            <div
              class="favorite-item-destination d-flex align-items-center"
            >
              <div class="d-flex align-items-center mr-auto">
                <span class="favorite-item-city">${ticket.origin_name}</span>
                <i class="medium material-icons">flight_takeoff</i>
              </div>
              <div class="d-flex align-items-center">
                <i class="medium material-icons">flight_land</i>
                <span class="favorite-item-city">${ticket.destination_name}</span>
              </div>
            </div>
            <div class="ticket-time-price d-flex align-items-center">
              <span class="ticket-time-departure">${ticket.departure_at}</span>
              <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
            </div>
            <div class="ticket-additional-info">
              <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
              <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
            </div>
            <a
              class="
                waves-effect waves-light
                btn-small
                pink
                darken-3
                delete-favorite
                ml-auto
              "
              >Delete</a
            >
          </div>
        </div>
    `;
  }
}

const dropdown = new Dropdown(currencyUI);
export default dropdown;