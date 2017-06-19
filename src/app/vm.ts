import * as ko from 'knockout';
import { GMap } from "./map";
import { show } from "./util/snackbar";
import { Place } from "./models/google-maps";

export class MainViewModel {
  mvm: MainViewModel;
  filter = ko.observable<string>('');

  constructor(private map: GMap) {
    // this is required to prevent the wrong scope from being used 
    // when onFilterChange is invoked from the Filter component
    this.mvm = this;
  }

  onFilterChange(s: string) {
    s = (s || '').trim();
    this.filter(s);

    if (s) {
      const count = this.map.showMatchingPlaces(s);
      if (count === 0) {
        show('No matching places found', { backgroundColor: 'red' });
      }
    } else {
      this.map.showAllMarkers();
      this.map.closeAllInfoWindows();
    }
  }

  onPlaceSelect(p: Place) {
    this.map.choosePlace(p);
  }
}
