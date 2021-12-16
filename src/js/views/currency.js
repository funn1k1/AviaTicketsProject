class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency"
    );
    this.dictionary = new Map([
      ["USD", "$"],
      ["EUR", "€"]
    ])
  }

  getCurrencyValue() {
    return this.currency.value;
  }

  getCurrencySymbol() {
    return this.dictionary.get(this.getCurrencyValue());
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;