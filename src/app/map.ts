const defaultLocation = { lat: 40.74135, lng: -73.99802 };

export class GMap {
  map: google.maps.Map;

  constructor() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 14,
    });

    var marker = new google.maps.Marker({
      position: defaultLocation,
      map: this.map,
      title: 'Some Position'
    });

    var infoWindow = new google.maps.InfoWindow({
      content: 'Some content'
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}

export function initializeMap() {

}
