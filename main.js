function initMap() {
  var map = new GMap();
  ko.applyBindings(new MainViewModel(map))
}
