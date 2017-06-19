import * as ko from 'knockout';

import '../style/style.scss';
import '../index.html';

import { get } from './util/load';
import { show } from "./util/snackbar";
import { GMap } from "./map";
import { initLocationList } from "./components/location-list/location-list.c";
import { initHello } from "./components/hello/hello.c";
import { initPlaceFilter } from "./components/place-filter/place-filter.c";
import { MainViewModel } from "./vm";

(async () => {
  try {
    // Initialize all the components
    await Promise.all([
      initHello(),
      initLocationList(),
      initPlaceFilter(),
    ]);


  } catch (e) {
    show(e.toString(), { backgroundColor: 'red' });
    console.error(e);
  }

  // Set the callback function for google maps
  window['initMap'] = initializeMap;
})();

function initializeMap() {
  const map = new GMap();
  ko.applyBindings(new MainViewModel(map));
}
