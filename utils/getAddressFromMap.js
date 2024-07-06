import axios from 'axios'
import { MAP_API_KEY, MAP_API_URL } from 'constants/env'

export const getAddressFromMap = (setAddress, data, key = 'address') => {
  axios
    .get(MAP_API_URL, {
      params: {
        format: 'json',
        apikey: MAP_API_KEY,
        geocode: data.join(','),
        lang: 'ru-RU',
        results: 3,
        sco: 'latlong',
      },
    })
    .then((body) => {
      var tempAddress =
        body.data.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.Address.Components
      let addressName = ''
      tempAddress.forEach((address, i) => {
        if (i !== 2) {
          addressName += address.name + ', '
        }
      })
      setAddress(key, addressName)
    })
}
