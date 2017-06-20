import { defaultPlaces, defaultLocation } from "./util/places";
import { PlaceDetails, Place, Contact } from "./types/google-maps";
import { getPlaceContact } from "./util/foursquare";

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

    defaultPlaces.forEach(async (p) => {
      const marker = new google.maps.Marker({
        position: p.geometry.location,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: p.name
      });

      let contact: Contact;
      let additionalInfo = '';
      try {
        contact = await getPlaceContact(p);
        if (contact) {
          if (contact.twitter) {
            additionalInfo += `<a target="_blank" class="info-icon" href="https://twitter.com/${contact.twitter}"><img src="https://upload.wikimedia.org/wikinews/en/f/f7/Twitter.png" alt="twitter"></a>`;
          }
          if (contact.facebookName && contact.facebookUsername) {
            additionalInfo += `<a target="_blank" class="info-icon" href="https://facebook.com/${contact.facebookUsername}"><img src="https://www.codeproject.com/script/Membership/Images/facebook.png" alt="facebook"> </a>`;
          }
          if (contact.formattedPhone) {
            additionalInfo += `<p>Phone: ${contact.formattedPhone}</p>`
          }
        }
      } catch (e) {
        additionalInfo = `<p class="info-unavailable">Contact information is currently unavailable</p>`;
      }

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${p.name}</h3>
        ${additionalInfo}
        <p>${p.formatted_address}</p>
        `
      });

      const minimalInfoWindow = new google.maps.InfoWindow({
        content: `<b>${p.name}</b>`
      });

      marker.addListener('click', () => {
        this.closeAllInfoWindows();
        this.animateMarker(marker);
        infoWindow.open(this.map, marker);
      });

      this.detailList.push({ place: p, infoWindow, marker, minimalInfoWindow });
    });
  }

  animateMarker(marker: google.maps.Marker) {
    if (marker.getAnimation()) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      // stop the marker from continuing to bounce like a mad person
      setTimeout(() => {
        marker.setAnimation(null);
      }, 750);
    }
  }

  handleClicksOutside() {
    google.maps.event.addListener(
      this.map,
      'click',
      this.closeAllInfoWindows.bind(this),
    );
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
      d.infoWindow.close();
      d.minimalInfoWindow.close();
      if (d.place.name.toLowerCase().indexOf(name.trim().toLowerCase()) >= 0) {
        d.marker.setVisible(true);
        d.minimalInfoWindow.open(this.map, d.marker);
        count += 1;
      } else {
        d.marker.setVisible(false);
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
        this.animateMarker(d.marker);
      }
    });
  }
}
