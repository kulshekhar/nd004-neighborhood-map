function MainViewModel(map) {

  return {
    map,

    // Filter related section

    filter: ko.observable(''),


    onKeyDown: function (data, e) {
      if (e.keyCode === 27 || e.key === 'Escape' || e.code === 'Escape' || e.which === 27) {
        // Clear the filter if the user presses the escape key
        this.filter('');
        this.onFilterChange();
        return false;
      }
      return true;
    },

    onFilterChange: function () {
      var s = this.filter();

      if (s) {
        const count = this.map.showMatchingPlaces(s);

        if (count === 0) {
          show('No matching places found', { backgroundColor: 'red' });
        }
      } else {
        this.map.showAllMarkers();
        this.map.closeAllInfoWindows();
      }

      this.updateFilter();
    },

    // List related section

    places: map.places || [],

    // This array is used to display the list
    filteredPlaces: ko.observableArray(map.places || []),

    showList: (window.innerWidth < 600
      ? ko.observable(false)
      : ko.observable(true)
    ),

    toggleList: function () {
      this.showList(!this.showList());
    },

    onPlaceSelect: function (place) {
      this.map.choosePlace(place);
    },

    updateFilter: function () {
      var s = this.filter();

      this.filteredPlaces(this.places.filter(
        p => p.name.toLowerCase().indexOf(s.toLowerCase()) >= 0
      ));
    },

    onLocationClickFactory: function (parent) {
      return (place) => {
        this.onPlaceSelect(place);
      };
    },

  };
}

