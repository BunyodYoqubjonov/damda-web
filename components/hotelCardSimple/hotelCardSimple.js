import React, { useState } from 'react'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { ArrowDown, PhotoIcon } from '../icons/commonIcons'
import cls from './hotelCardSimple.module.scss'
import FilterRoomsButton2 from '../filterButton/filterRoomsButton2'
import FilterCounterButton from '../filterButton/filterCounterButton'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import SwitchInput from '../switchInput/switchInput'
import { setBreakfast } from 'redux/actions/bookingActions/bookingActions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import GalleryModal from '../galleryModal/galleryModal'
import MobileGallery from '../mobileGallery/mobileGallery'
import { numberToPrice } from 'utils/numberToPrice'
import { BASE_URL } from 'constants/env'

export default function HotelCardSimple({ data }) {
  const [isOffersVisible, setIsOffersVisible] = useState(false)
  const [openGallery, setGallery] = useState(false)
  const { locale } = useRouter()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const dispatch = useDispatch()

  const { breakfastPrice } = useSelector((state) => state.booking, shallowEqual)

  const handleClick = (event) => {
    event.preventDefault()
    setIsOffersVisible(!isOffersVisible)
  }

  const setBreakfastPilot = (e) =>
    dispatch(setBreakfast({ id: data.id, isBreakfast: e.target.checked }))

  const hideGallery = () => setGallery(false)

  const showGallery = (event) => {
    event.preventDefault()
    setGallery(true)
  }

  return (
    <div className={data.cartQuantity ? cls.roomBorder : cls.root}>
      <div className={cls.wrapper}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={8}>
            <div className={cls.filters}>
              <FilterCounterButton label='Number of rooms' data={data} />
              <FilterRoomsButton2 label={common[locale].guests} data={data} />
              {!breakfastPrice ? (
                ''
              ) : (
                <div className={cls.item}>
                  <Typography>
                    <SwitchInput
                      name='breakfast'
                      label={common[locale].breakfast}
                      value={data.isBreakfast}
                      onChanges={setBreakfastPilot}
                    />
                  </Typography>
                </div>
              )}
            </div>

            <div className={cls.info}>
              <div className={cls.item}>
                <Typography variant='caption' sx={{ mb: 0.75 }}>
                  {common[locale].Room_type}
                </Typography>
                <Typography>{data?.room?.translation?.title}</Typography>
              </div>
              <div className={cls.item}>
                <Typography variant='caption' sx={{ mb: 0.75 }}>
                  {common[locale].price}
                </Typography>
                <Typography>{numberToPrice(data.price, locale)}</Typography>
              </div>
              <div className={cls.item}>
                <Typography variant='caption' sx={{ mb: 0.75 }}>
                  {common[locale].BedsType}
                </Typography>
                <Typography>
                  {
                    data.attributes.find(
                      (attributes) => attributes.attribute_group_id === 3
                    )?.translation?.title
                  }
                </Typography>
              </div>
              {!breakfastPrice ? null : (
                <div className={cls.item}>
                  <Typography variant='caption' sx={{ mb: 0.75 }}>
                    {common[locale].breakfast}
                  </Typography>
                  <Typography>{breakfastPrice}</Typography>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={cls.imageWrapper}>
              <LazyLoadImage alt={data?.title} src={BASE_URL + data?.img} />
              {data.galleries?.length > 1 ? (
                <button className={cls.photosBtn} onClick={showGallery}>
                  <PhotoIcon />
                  {data.galleries.length}
                </button>
              ) : (
                ''
              )}
            </div>
          </Grid>
        </Grid>
      </div>
      <div
        className={`${cls.offerBlock} ${isOffersVisible ? cls.visible : ''}`}
      >
        {data?.attributes?.map((item, index) => (
          <Grid container xs={6} md={3} className={cls.offerItem} key={index}>
            <div className={cls.offer}>
              <div className={cls.imageWrapper}>
                <span className={item.icon} />
              </div>
              <p className={cls.text}>{item?.translation?.title}</p>
            </div>
          </Grid>
        ))}
      </div>
      <a
        href='#'
        className={`${cls.loadMore} ${isOffersVisible ? cls.collapsed : ''}`}
        onClick={handleClick}
      >
        <ArrowDown />
      </a>
      {matches ? (
        <GalleryModal
          open={openGallery}
          handleClose={hideGallery}
          data={data}
        />
      ) : (
        <MobileGallery open={openGallery} onClose={hideGallery} data={data} />
      )}
    </div>
  )
}
