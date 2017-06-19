export type Location = {
  lat: number;
  lng: number;
};

export type Viewport = {
  south: number;
  west: number;
  north: number;
  east: number;
};

export type Geometry = {
  location?: Location;
  viewport?: Viewport;
};

export type Photo = {
  height: number;
  width: number;
  html_attributions?: string[];
};

export type PlaceType = string;

export type Place = {
  formatted_address?: string;
  geometry?: Geometry;
  icon?: string;
  id?: string;
  name?: string;
  photos?: Photo[];
  place_id?: string;
  types?: PlaceType[];
};

export type PlaceDetails = {
  place?: Place,
  infoWindow?: google.maps.InfoWindow;
  minimalInfoWindow?: google.maps.InfoWindow;
  marker?: google.maps.Marker;
  details?: any;
  contact?: Contact;
}

export type Contact = {
  phone?: string;
  formattedPhone?: string;
  twitter?: string;
  facebookName?: string;
  facebookUsername?: string;
};
