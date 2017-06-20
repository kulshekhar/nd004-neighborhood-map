function getPlaceContact(place) {
  var url = 'https://api.foursquare.com/v2/venues/search?ll=' + place.geometry.location.lat + ',' + place.geometry.location.lng + '&client_id=C5IARL1R1SRT13F2BDPIVJPXHC2LAPCNFSQ5W5CNGMLFUJLH&client_secret=2ZFAO2LR1NM0RPQHAUF4CXPOI2PFB0TH5A3HSJTCNXSNGITC&v=20170620';

  return getUrl(url).then(resultString => {
    var obj = JSON.parse(resultString);
    var response = obj.response;

    if (response && response.venues && Array.isArray(response.venues)) {
      for (let i = 0; i < response.venues.length; i++) {
        var venue = response.venues[i];
        var name = venue.name;

        if (
          name && typeof name === 'string' &&
          name.trim().toLowerCase().indexOf(place.name.trim().toLowerCase()) >= 0) {

          return venue.contact;
        }
      }
    }

  });
}
