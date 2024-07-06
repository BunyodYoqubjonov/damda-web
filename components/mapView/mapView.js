import React, { useState } from 'react'
import { CircularProgress, useMediaQuery } from '@mui/material'
import { GeoObject, Map, YMaps, ZoomControl } from 'react-yandex-maps'
import { ArrowDown, FilterIcon, SearchIcon } from '../icons/commonIcons'
import cls from './mapView.module.scss'
import MobileHotelsFilter from '../mobileHotelsFilter/mobileHotelsFilter'
import HotelCardVertical from '../hotelCardVertical/hotelCardVertical'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import NotFountText from '../hotelsList/notFountText'

export default function MapView({
  list,
  page,
  lastPage,
  loading,
  fetchResidences,
  facilities,
  setFacilities,
}) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale, query } = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isMobileFilter, setIsMobileFilter] = useState(false)

  const handleTriggerDrawer = () => setIsDrawerOpen(!isDrawerOpen)
  const handleClickFilter = () => setIsMobileFilter(!isMobileFilter)

  return (
    <div className={cls.root}>
      <button
        className={`${cls.drawerBtn} ${isDrawerOpen ? cls.open : ''}`}
        onClick={handleTriggerDrawer}
      >
        <ArrowDown />
      </button>

      <div className={`${cls.drawer} ${isDrawerOpen ? cls.open : ''}`}>
        <div style={{ padding: '0 10px', marginTop: 20, textAlign: 'center' }}>
          {list.map((item, index) => (
            <HotelCardVertical key={index} data={item} />
          ))}
          {list.length === 0 ? <NotFountText /> : ''}
          {!(page >= lastPage) && (
            <button
              className={cls.loadMoreBtn}
              onClick={() => fetchResidences(page + 1)}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color='inherit' size={22} />
              ) : (
                common[locale].view_more
              )}
            </button>
          )}
        </div>
      </div>
      <div className={cls.mobileFilters}>
        <button className={cls.filter} onClick={handleClickFilter}>
          <FilterIcon />
        </button>
      </div>
      <div className={cls.mapView}>
        <YMaps>
          <Map
            width='100%'
            height='100%'
            state={{
              center: [query.lat || 41.31, query.long || 69.31],
              zoom: 12,
            }}
            instanceRef={(ref) => {
              ref && ref.behaviors.disable('scrollZoom')
            }}
          >
            {list?.map((item, index) => (
              <GeoObject
                key={index}
                options={{ iconColor: '#F19204' }}
                geometry={{
                  type: 'Point',
                  coordinates: [
                    item?.location.latitude,
                    item?.location.longitude,
                  ],
                }}
                properties={{
                  hintContent: item?.translation
                    ? item.translation.title +
                      (item.type === 'cottage' ? `, ID ${item.id}` : '')
                    : common[locale].Noname,
                }}
                modules={['geoObject.addon.hint']}
              />
            ))}
            <ZoomControl
              options={{
                size: matches ? 'large' : 'small',
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
      <MobileHotelsFilter
        open={isMobileFilter}
        onClose={handleClickFilter}
        facilities={facilities}
        setFacilities={setFacilities}
      />
    </div>
  )
}
