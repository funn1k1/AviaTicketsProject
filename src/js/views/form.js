import { getDatePickerInstance } from "../plugins/materialize";
import { getAutocompleteInstance } from "../plugins/materialize";

class FormUI {
  constructor(datePickerInstance, autoCompleteInstance) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.departDate = document.getElementById("datepicker-depart");
    this.returnDate = document.getElementById("datepicker-return");
    this.originAutocomplete = autoCompleteInstance(this.origin);
    this.destinationAutocomplete = autoCompleteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.departDate);
    this.returnDatePicker = datePickerInstance(this.returnDate);
  }

  get form() {
    return this._form;
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }

  getOriginValue() {
    return this.origin.value;
  }

  getDestinationValue() {
    return this.destination.value;
  }

  getDepartValue() {
    return this.departDatePicker.toString();
  }

  getReturnDateValue() {
    return this.returnDatePicker.toString();
  }
}

const formUI = new FormUI(getDatePickerInstance, getAutocompleteInstance);

export default formUI;
