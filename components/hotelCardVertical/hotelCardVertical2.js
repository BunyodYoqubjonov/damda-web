import React, { useState } from 'react'
import { Button, Grid, Typography, Box } from '@mui/material'
import Link from 'next/link'
import {
  CrownIcon,
  HeartFilledIcon,
  HeartIcon,
  Location,
  PhotoIcon,
  RouteIcon,
  ShareIcon,
  StarSmile,
} from '../icons/commonIcons'
import cls from './hotelCardVertical2.module.scss'
import { useRouter } from 'next/router'
import SharePopover from '../sharePopover/sharePopover'
import { common } from '../../locales/common'
import DateRangePopover from '../popover/dateRangePopover'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setToFavoritesAction } from '../../redux/actions/favoriteActions/favoriteActions'
import { numberToPrice } from '../../utils/numberToPrice'
import FallbackImage from 'components/fallbackImage/fallbackImage'
import { BASE_URL } from 'constants/env'

export default function HotelCardVertical2({ data, top }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const open = Boolean(anchorEl)
  const open2 = Boolean(anchorEl2)
  const router = useRouter()
  const { pathname, locale, query, push } = useRouter()
  const { favorites } = useSelector((state) => state.favorite, shallowEqual)
  const dispatch = useDispatch()
  const handleClickBooking = () => router.push('/' + data.slug)
  const handleClickMap = () => {
    let pathname
    switch (data.type) {
      case 'hotel':
        pathname = '/hotels/map'
        break
      case 'cottage':
        pathname = '/dacha/map'
        break
      case 'zone':
        pathname = '/recreation-area/map'
        break
      case 'sanatorium':
        pathname = '/sanatorium/map'
    }
    push({
      pathname,
      query: {
        ...query,
        lat: data.location.latitude,
        long: data.location.longitude,
      },
    })
  }
  const handleClickShare = (event) => setAnchorEl(event.currentTarget)
  const handleClick = (event) => setAnchorEl2(event.currentTarget)
  const handleClose = () => setAnchorEl2(null)
  const handleCloseShare = () => setAnchorEl(null)
  const addToFavorites = () => dispatch(setToFavoritesAction(data))

  return (
    <Grid item xs={12} md={6} lg={4}>
      <div className={`${cls.root} ${top ? cls.top : ''}`}>
        <div className={cls.wrapper}>
          <div className={cls.imgWrapper}>
            <Link href={data.slug}>
              <a style={{ display: 'block', width: '100%', height: '100%' }}>
                <FallbackImage
                  alt={data?.translation?.title}
                  src={BASE_URL + data.img}
                />
              </a>
            </Link>
            {top ? <CrownIcon className={cls.crownIcon} /> : ''}
            <button className={cls.favouriteBtn} onClick={addToFavorites}>
              {!!favorites?.find((item) => item.id === data.id) ? (
                <HeartFilledIcon />
              ) : (
                <HeartIcon />
              )}
            </button>
            <button className={cls.photosBtn}>
              <PhotoIcon />
              {data.galleries_count}
            </button>
          </div>
          <Link href={data.slug}>
            <a className={cls.title}>
              <p className={cls.paragraph}>
                {data?.translation?.title}{' '}
                {data.type === 'cottage' ? `(${data.id})` : ''}
              </p>
              <div className={cls.rating}>
                <StarSmile />{' '}
                <span className={cls.text}>{data?.hotel_star || 0}</span>
              </div>
            </a>
          </Link>
          <div className={cls.subtitle}>
            <Typography variant='body2'>
              {data?.address_title?.city_name.translation.title +
                ' / ' +
                data?.address_title?.region_name.translation.title +
                `${
                  data.address_title?.village_name
                    ? `, ${data.address_title?.village_name?.translation?.title}`
                    : ''
                }`}
            </Typography>
            {data.type !== 'cottage' ? (
              <>
                <span className={cls.dot} />
                <p className={cls.caption}>
                  <RouteIcon />
                  3.1 km
                </p>
              </>
            ) : (
              ''
            )}
          </div>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: 2,
            }}
          >
            <div className={cls.priceBlock}>
              <p className={cls.price}>
                {pathname === '/dacha'
                  ? data?.price
                  : numberToPrice(
                      data.rooms[0]?.prices[0]?.resident_price || 0,
                      locale
                    )}{' '}
                / {common[locale].per_day}
              </p>
            </div>

            <div className={cls.reservationBlock}>
              {pathname === '/dacha' ? (
                // <button onClick={handleClick} className={cls.reservation}>
                //   {common[locale].calendar} <ArrowDown />
                // </button>
                ''
              ) : (
                <div className={cls.reservation}>
                  <span> {data.rooms[0]?.room?.translation?.title}</span> <br />
                  <span className={cls.date}>
                    {' '}
                    {data.rooms[0]?.bed} {data.rooms[0] && 'king bed'}
                  </span>
                </div>
              )}
            </div>
          </Box>
          <div className={cls.actions}>
            <Button fullWidth variant='contained' onClick={handleClickBooking}>
              {common[locale].booking}
            </Button>
            <Button
              variant='outlined'
              className={cls.iconButton}
              onClick={handleClickMap}
            >
              <Location />
            </Button>
            <Button
              variant='outlined'
              className={cls.iconButton}
              onClick={handleClickShare}
            >
              <ShareIcon />
            </Button>
          </div>
        </div>
        <SharePopover
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseShare}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
        <DateRangePopover
          open={open2}
          onClose={handleClose}
          anchorEl={anchorEl2}
          handleChange={handleClick}
        />
      </div>
    </Grid>
  )
}
