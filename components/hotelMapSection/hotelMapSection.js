import React, { useState } from 'react'
import { Typography } from '@mui/material'
import cls from './hotelMapSection.module.scss'
import { GeoObject, Map, YMaps, ZoomControl } from 'react-yandex-maps'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function HotelMapSection({ data }) {
  const [mapState] = useState({
    center: [data.location?.latitude, data.location?.longitude],
    zoom: 12,
  })
  const { locale } = useRouter()

  return (
    <div id='map' className={cls.root}>
      <Typography variant='h6' sx={{ mb: 1.5 }}>
        {common[locale].map_title}
      </Typography>
      <Typography sx={{ mb: 2 }}>{data.translation?.address}</Typography>
      <div className={cls.mapView}>
        <YMaps>
          <Map
            width='100%'
            height='100%'
            state={mapState}
            instanceRef={(ref) => {
              ref && ref.behaviors.disable('scrollZoom')
            }}
          >
            <GeoObject
              options={{ iconColor: '#F19204' }}
              geometry={{
                type: 'Point',
                coordinates: mapState.center,
              }}
              properties={{ hintContent: data.translation?.title }}
              modules={['geoObject.addon.hint']}
            />
            <ZoomControl
              options={{
                size: 'small',
                zoomDuration: 500,
                position: {
                  bottom: 50,
                  right: 50,
                },
              }}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  )
}
