import * as ko from 'knockout';
import * as gmal from 'google-maps-api-loader';

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
})();

gmal({
  libraries: ['places'],
  apiKey: 'AIzaSyDY3OIbf85-tpZ-rDCLiyhHY8vqjWo55sQ'
})
  .then(() => {
    const map = new GMap();
    ko.applyBindings(new MainViewModel(map));
  })
  .catch(e => {
    show('Unable to load Google maps. Please try again later.', {
      backgroundColor: 'red',
      duration: 10000
    });
  });
