import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favoriteTickets from "./store/favorite_tickets";
import dropdown from "./views/dropdown";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });


  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
    if (localStorage.getItem("favTickets") !== null) {
      dropdown.renderTickets(JSON.parse(localStorage.getItem("favTickets")));
    }
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.getOriginValue());
    const destination = locations.getCityCodeByKey(formUI.getDestinationValue());
    const departDateValue = formUI.getDepartValue();
    const returnDateValue = formUI.getReturnDateValue();
    const currency = currencyUI.getCurrencyValue();
    await locations.fetchTickets({
      origin,
      destination,
      depart_date: departDateValue,
      return_date: returnDateValue,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);

  }
});