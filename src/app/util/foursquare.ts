import { Place, Contact } from "../types/google-maps";
import { get } from "./load";

export async function getPlaceContact(p: Place): Promise<Contact> {
  const url = `https://api.foursquare.com/v2/venues/search?ll=${p.geometry.location.lat},${p.geometry.location.lng}&client_id=C5IARL1R1SRT13F2BDPIVJPXHC2LAPCNFSQ5W5CNGMLFUJLH&client_secret=2ZFAO2LR1NM0RPQHAUF4CXPOI2PFB0TH5A3HSJTCNXSNGITC&v=20170620`;

  const resultString = await get(url);
  const obj = JSON.parse(resultString);
  const response = obj.response;
  if (response && response.venues && Array.isArray(response.venues)) {
    for (let i = 0; i < response.venues.length; i++) {
      const venue = response.venues[i];
      const name = venue.name;

      if (
        name && typeof name === 'string' &&
        name.trim().toLowerCase().indexOf(p.name.trim().toLowerCase()) >= 0) {

        return venue.contact;
      }
    }
  }

}
