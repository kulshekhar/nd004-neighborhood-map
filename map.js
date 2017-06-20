function GMap() {
  this.mapContainer = document.getElementById('map');

  this.map = new google.maps.Map(this.mapContainer, {
    center: defaultLocation,
    zoom: 14,
  });

  // list of places
  this.places = [];

  // list of places with additional details
  this.detailList = [];

  this.initializeMarkers();

  // close any open info windows if the user clicks somewhere else
  this.handleClicksOutside();
}

GMap.prototype.initializeMarkers = function () {
  this.places = getDefaultPlaces();

  this.places.forEach(p => {
    // Create markers for each place
    var marker = new google.maps.Marker({
      position: p.geometry.location,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: p.name
    });



    // This info window is to be shown when a marker is clicked on
    var infoWindow = new google.maps.InfoWindow({
      content: '<h3>' + p.name + '</h3><p>' + p.formatted_address + '</p>'
    });

    // Fetch details from foursquare and update the 
    getPlaceContact(p).then(contact => {
      if (contact) {
        var additionalInfo = '';

        // Add twitter info if present
        if (contact.twitter) {
          additionalInfo += `<a target="_blank" class="info-icon" href="https://twitter.com/${contact.twitter}"><img src="https://upload.wikimedia.org/wikinews/en/f/f7/Twitter.png" alt="twitter"></a>`;
        }

        // Add facebook info if present
        if (contact.facebookName && contact.facebookUsername) {
          additionalInfo += `<a target="_blank" class="info-icon" href="https://facebook.com/${contact.facebookUsername}"><img src="https://www.codeproject.com/script/Membership/Images/facebook.png" alt="facebook"> </a>`;
        }

        // Add phone number if present
        if (contact.formattedPhone) {
          additionalInfo += `<p>Phone: ${contact.formattedPhone}</p>`;
        }

        infoWindow.setContent('<h3>' + p.name + '</h3>' + additionalInfo + '<p>' + p.formatted_address + '</p>');
      }
    });

    // This info window is to be shown when filtering the list of places
    var minimalInfoWindow = new google.maps.InfoWindow({
      content: '<b>' + p.name + '</b>'
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      this.animateMarker(marker);
      infoWindow.open(this.map, marker);
    });

    this.detailList.push({
      place: p,
      infoWindow,
      marker,
      minimalInfoWindow
    });

  });
};

GMap.prototype.animateMarker = function (marker) {
  if (marker.getAnimation()) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    // stop the marker from continuing to bounce like a mad person
    // 750ms is the time it takes for one bounce
    setTimeout(() => {
      marker.setAnimation(null);
    }, 750);
  }
};

GMap.prototype.handleClicksOutside = function () {
  google.maps.event.addListener(
    this.map,
    'click',
    this.closeAllInfoWindows.bind(this),
  );
};

GMap.prototype.closeAllInfoWindows = function () {
  this.detailList.forEach(d => {
    d.infoWindow.close();
    d.minimalInfoWindow.close();
  });
};

GMap.prototype.showMatchingPlaces = function (name) {
  name = name || ''; // prevent undefined/null related exceptions

  let count = 0;

  this.detailList.forEach(d => {
    // Close all existing info windows
    d.infoWindow.close();
    d.minimalInfoWindow.close();

    if (d.place.name.toLowerCase().indexOf(name.trim().toLowerCase()) >= 0) {
      // Show markers for places whose names match the filter
      d.marker.setMap(this.map);
      d.minimalInfoWindow.open(this.map, d.marker);
      count += 1;
    } else {
      // Remove markers for places whose names don't match the filter
      d.marker.setMap(null);
    }
  });

  return count;
};

GMap.prototype.showAllMarkers = function () {
  this.detailList.forEach(d => {
    d.marker.setMap(this.map);
  });
};

GMap.prototype.choosePlace = function (place) {
  this.detailList.forEach(d => {
    if (d.place === place) {
      // Close all open info windows
      this.closeAllInfoWindows();
      d.infoWindow.open(this.map, d.marker);
      this.animateMarker(d.marker);
    }
  });
};
