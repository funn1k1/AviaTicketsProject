import api from "../services/apiService";
import formatDate from "../helpers/date";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCities = [];
    this.lastSearch = {};
    this.airlines = {};
    this.formatDate = helpers.formatDate;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);
    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCitites(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    return response;
  }

  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      country.name = country.name || country.name_translations.en;
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCitites(cities) {
    return cities.reduce((acc, city) => {
      const countryName = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const fullName = `${city.name}, ${countryName}`;
      acc[city.code] = {
        ...city,
        countryName,
        fullName,
      };
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, airline) => {
      airline.logo = `https://pics.avs.io/200/200/${airline.code}.png`;
      airline.name = airline.name || airline.name_translations.en;
      acc[airline.code] = airline;
      return acc;
    }, {});
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : "";
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.fullName] = null;
      return acc;
    }, {});
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      (city) => city.fullName === key
    );
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket, key) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "yyyy MMM dd hh:mm"),
        return_at: this.formatDate(ticket.return_at, "yyyy MMM dd hh:mm"),
      };
    });
  }
}

const locations = new Locations(api, { formatDate });

export default locations;
