import currencyUI from "./currency";
import favoriteTickets from "../store/favorite_tickets";
import dropdown from "./dropdown";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-section .row");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    const currencySymbol = this.getCurrencySymbol();

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currencySymbol);
      this.container.insertAdjacentHTML("beforeend", template);
      const nodes = this.container.querySelectorAll("button");
      nodes[nodes.length - 1].addEventListener("click", () => {
        favoriteTickets.addFavoriteTicket.bind(favoriteTickets, ticket)();
        dropdown.renderTickets(favoriteTickets.getFavoriteTickets.bind(favoriteTickets)());
      });
    });

   
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    ticket.airline_logo =
      ticket.airline_logo || "http://pics.avs.io/200/200/null.png";
    ticket.airline_name = ticket.airline_name || "Нет данных";
    return `
          <div class="col s12 m6">
            <div class="card ticket-card">
              <div class="ticket-airline d-flex align-items-center">
                <img
                  src="${ticket.airline_logo}"
                  class="ticket-airline-img"
                />
                <span class="ticket-airline-name"
                  >${ticket.airline_name}</span
                >
              </div>
              <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="ticket-city">${ticket.origin_name} </span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${ticket.destination_name}</span>
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
              <button
              onclick=""
              class="btn waves-effect waves-light red"
              type="submit" style="margin-top: 10px;"
              name="action">
                <i class="material-icons center">favorite</i>
              </button>
            </div>
          </div>
        </div>
      `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
