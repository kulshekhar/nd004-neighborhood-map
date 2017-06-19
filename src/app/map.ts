import { defaultPlaces, defaultLocation } from "./util/places";
import { PlaceDetails, Place } from "./models/google-maps";

export class GMap {
  mapContainer = document.getElementById('map');
  map: google.maps.Map;
  detailList: PlaceDetails[] = [];
  places: Place[] = [];

  constructor() {
    this.map = new google.maps.Map(this.mapContainer, {
      center: defaultLocation,
      zoom: 14,
    });

    this.initializeMarkers();

    this.handleClicksOutside();
  }

  initializeMarkers() {
    this.places = defaultPlaces;

    defaultPlaces.forEach(p => {
      const marker = new google.maps.Marker({
        position: p.geometry.location,
        map: this.map,
        title: p.name
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${p.name}</h3>
        <p>${p.formatted_address}</p>
        `
      });

      const minimalInfoWindow = new google.maps.InfoWindow({
        content: `<b>${p.name}</b>`
      });

      marker.addListener('click', () => {
        this.closeAllInfoWindows();
        infoWindow.open(this.map, marker);
      });

      this.detailList.push({ place: p, infoWindow, marker, minimalInfoWindow });
    });
  }

  handleClicksOutside() {
    google.maps.event.addListener(this.map, 'click', (e) => {
      this.detailList.forEach(d => {
        d.infoWindow.close();
        d.minimalInfoWindow.close();
      });
    });
  }

  closeAllInfoWindows() {
    this.detailList.forEach(d => {
      d.infoWindow.close();
      d.minimalInfoWindow.close();
    });
  }

  showMatchingPlaces(name: string): number {
    name = name || '';
    let count = 0;
    this.detailList.forEach(d => {
      if (d.place.name.toLowerCase().indexOf(name.trim().toLowerCase()) >= 0) {
        d.marker.setMap(this.map);
        d.minimalInfoWindow.open(this.map, d.marker);
        count += 1;
      } else {
        d.marker.setMap(null);
      }
    });
    return count;
  }

  showAllMarkers() {
    this.detailList.forEach(d => {
      d.marker.setMap(this.map);
    });
  }

  choosePlace(place: Place) {
    this.detailList.forEach(d => {
      if (d.place === place) {
        this.closeAllInfoWindows();
        d.infoWindow.open(this.map, d.marker);
      }
    });
  }
}
