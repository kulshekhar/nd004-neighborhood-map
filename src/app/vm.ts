import { GMap } from "./map";
import { show } from "./util/snackbar";

export class MainViewModel {
  mvm: MainViewModel;

  constructor(private map: GMap) {
    // this is required to prevent the wrong scope from being used 
    // when onFilterChange is invoked from the Filter component
    this.mvm = this;
  }

  onFilterChange(s: string) {
    s = (s || '').trim();

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
}
