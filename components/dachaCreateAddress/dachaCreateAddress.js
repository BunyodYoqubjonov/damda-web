import React from 'react'
import cls from './dachaCreateAddress.module.scss'
import { TextField, Typography } from '@mui/material'
import {
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from 'react-yandex-maps'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import { lang } from 'constants/lang'
import { MAP_API_KEY } from 'constants/env'

export default function DachaCreateAddress({
  formik,
  valueLang,
  mapState,
  onMapClick = () => {},
}) {
  const { locale } = useRouter()

  return (
    <div id='map' className={cls.container}>
      <div className={cls.header}>
        <Typography variant='h3' className={cls.title}>
          {common[locale].Address_Text}
        </Typography>
        {lang.map((item) => (
          <TextField
            key={`address.${item.value}`}
            className={cls.address}
            name={`address.${item.value}`}
            fullWidth
            autoComplete='on'
            label={
              <>
                {common[locale].Address} ({item.value})
              </>
            }
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.address[valueLang]}
            sx={{ display: item.value !== valueLang ? ' none' : 'block' }}
          />
        ))}
      </div>

      <div className={cls.mapView}>
        <YMaps
          query={{
            apikey: MAP_API_KEY,
          }}
        >
          <Map state={mapState} onClick={onMapClick} width='100%' height='100%'>
            <ZoomControl
              options={{
                size: 'auto',
                zoomDuration: 500,
              }}
            />
            <GeolocationControl />
            <Placemark
              options={{ iconColor: '#f19204' }}
              geometry={mapState.center}
              width={100}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  )
}
