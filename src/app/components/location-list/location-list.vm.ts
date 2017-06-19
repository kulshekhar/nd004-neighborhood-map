import * as ko from 'knockout';
import { Place } from "../../models/google-maps";

export class LocationListVM {
  message: KnockoutObservable<String>;
  greeting: KnockoutObservable<String>;
  places: Place[] = [];
  showList = ko.observable(true);
  onPlaceSelect: (Place) => void;

  constructor(params: {
    greeting?: string,
    places?: Place[],
    onPlaceSelect?: (Place) => void
  }) {

    if (screen.width < 600) {
      // hide the list of places by default for smaller screens
      this.showList = ko.observable(false);
    }

    this.onPlaceSelect = params.onPlaceSelect;
    this.places = params.places || [];
    this.message = ko.observable(params.greeting || '');

    this.greeting = ko.computed(() =>
      this.message() && this.message().trim()
        ? this.message().trim()
        : ''
    );
  }

  toggleList() {
    this.showList(!this.showList());
  }

  onLocationClickFactory(parent) {
    return (place) => {
      this.onPlaceSelect && this.onPlaceSelect(place);
    };
  }
}
