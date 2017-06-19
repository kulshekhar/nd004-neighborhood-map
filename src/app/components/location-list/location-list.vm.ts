import * as ko from 'knockout';
import { Place } from "../../types/google-maps";

export class LocationListVM {
  message: KnockoutObservable<String>;
  greeting: KnockoutObservable<String>;
  places: Place[] = [];
  filteredPlaces = ko.observableArray<Place>([]);
  showList = ko.observable(true);
  onPlaceSelect: (Place) => void;

  constructor(params: {
    greeting?: string,
    places?: Place[],
    filter?: KnockoutObservable<string>,
    onPlaceSelect?: (Place) => void
  }) {

    if (window.innerWidth < 600) {
      // hide the list of places by default for smaller screens
      this.showList(false);
    }
    this.onPlaceSelect = params.onPlaceSelect;
    this.places = params.places || [];
    this.message = ko.observable(params.greeting || '');

    this.greeting = ko.computed(() =>
      this.message() && this.message().trim()
        ? this.message().trim()
        : ''
    );

    this.handleFilter(params.filter);
    this.updateFilter(params.filter());
  }

  updateFilter(s: string) {
    s = (s || '').trim();

    this.filteredPlaces(this.places.filter(
      (p: Place) => p.name.toLowerCase().indexOf(s.toLowerCase()) >= 0
    ));
  }

  handleFilter(filter: KnockoutObservable<string>) {
    filter.subscribe(this.updateFilter.bind(this));
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
