import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Grid, Typography } from '@mui/material'
import {
  ArrowDown,
  CrownIcon,
  HeartFilledIcon,
  HeartIcon,
  Location,
  PhotoIcon,
  RouteIcon,
  ShareIcon,
  StarSmile,
} from '../icons/commonIcons'
import { Box } from '@mui/system'
import cls from './hotelCard.module.scss'
import { useRouter } from 'next/router'
import SharePopover from '../sharePopover/sharePopover'
import { numberToPrice } from '../../utils/numberToPrice'
import { common } from '../../locales/common'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Apartment, Home, MeetingRoom, People } from '@mui/icons-material'
import { setToFavoritesAction } from '../../redux/actions/favoriteActions/favoriteActions'
import FallbackImage from 'components/fallbackImage/fallbackImage'
import { BASE_URL } from 'constants/env'

export default function HotelCard({ data, top, type }) {
  const [isOffersVisible, setIsOffersVisible] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { push, locale, pathname, query } = useRouter()
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.favorite, shallowEqual)
  const handleClick = (event) => {
    event.preventDefault()
    setIsOffersVisible(!isOffersVisible)
  }
  const handleClickBooking = () =>
    push({
      pathname: data?.slug,
    })

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

  const handleClickShare = (event) => setAnchorEl(event?.currentTarget)

  const handleCloseShare = () => setAnchorEl(null)

  const addToFavorites = () => dispatch(setToFavoritesAction(data))

  return (
    <Grid item xs={12}>
      <div className={`${cls.root} ${top ? cls.top : ''}`} id={`#${data.id}`}>
        <div className={cls.wrapper}>
          <Grid
            container
            spacing={2}
            sx={{
              '@media (max-width: 576px)': {
                flexDirection: 'column-reverse',
              },
            }}
          >
            <Grid item xs={12} sm={6}>
              <Link href={data.slug}>
                <a className={cls.title}>
                  <Typography variant='h2'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          (data?.translation
                            ? data.translation.title
                            : common[locale].Noname) +
                          (data.type === 'cottage' ? `, ID ${data.id}` : ''),
                      }}
                    />
                  </Typography>
                  {pathname === '/dacha' || type === 'cottage' ? null : (
                    <div className={cls.rating}>
                      <StarSmile />{' '}
                      <span className={cls.text}>{data?.hotel_star || 0}</span>
                    </div>
                  )}
                </a>
              </Link>

              <div className={cls.subtitle}>
                <Typography variant='body2'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.address_title?.city_name.translation?.title +
                        ', ' +
                        data.address_title?.region_name.translation?.title +
                        `${
                          data.address_title?.village_name
                            ? `, ${data.address_title?.village_name?.translation?.title}`
                            : ''
                        }`,
                    }}
                  />
                </Typography>
                {pathname === '/dacha' ||
                !data?.city_center_km ||
                type === 'cottage' ? null : (
                  <>
                    <span className={cls.dot} />
                    <p className={cls.caption}>
                      <RouteIcon />
                      {data?.city_center_km} {common[locale].center}
                    </p>
                  </>
                )}
              </div>

              <div className={cls.numerical_info}>
                {(pathname === '/hotels' || type === 'hotel') && (
                  <>
                    <div className={cls.item}>
                      <MeetingRoom />
                      {common[locale].dormitories}:{' '}
                      {data?.rooms.reduce((acc, cur) => acc + cur.quantity, 0)}
                    </div>
                    <div className={cls.item}>
                      <Apartment />
                      {common[locale].rooms_type}: {data?.rooms.length || 0}
                    </div>
                    <div className={cls.item}>
                      <Apartment />
                      {common[locale].number_of_floors}:{' '}
                      {data?.number_of_floors || 0}
                    </div>
                  </>
                )}

                {(pathname === '/recreation-area' || type === 'zone') && (
                  <>
                    <div className={cls.items}>
                      <MeetingRoom />
                      <span>
                        {common[locale].dormitories}:{' '}
                        {data?.rooms.reduce(
                          (acc, cur) => acc + cur.quantity,
                          0
                        )}
                      </span>
                    </div>
                    <div className={cls.items}>
                      <Home />
                      <span>
                        {common[locale].total_area}: {data?.yard_area || 0}m
                        <sup>2</sup>
                      </span>
                    </div>
                  </>
                )}

                {(pathname === '/sanatorium' || type === 'sanatorium') && (
                  <>
                    <div className={cls.items}>
                      <MeetingRoom />
                      {common[locale].dormitories}:{' '}
                      {data?.rooms.reduce((acc, cur) => acc + cur.quantity, 0)}
                    </div>
                    <div className={cls.items}>
                      <Home />
                      <span>
                        {common[locale].total_area}: {data?.yard_area || 0}m
                        <sup>2</sup>
                      </span>
                    </div>
                  </>
                )}

                {(pathname === '/dacha' || type === 'cottage') && (
                  <>
                    <div className={cls.item}>
                      <MeetingRoom />
                      {common[locale].number_of_bedrooms}:{' '}
                      {data?.number_of_rooms || 0}
                    </div>
                    <div className={cls.item}>
                      <People />
                      {common[locale].adult}: {data?.adult}
                    </div>
                    <div className={cls.item}>
                      <Home />
                      <span>
                        {common[locale].house_area}: {data?.aria || 0}m
                        <sup>2</sup>
                      </span>
                    </div>
                    {/* <div className={cls.item}>
                      <BathroomOutlined />
                      {common[locale].bathroom}: {data.bathroom || 0}
                    </div> */}
                  </>
                )}
              </div>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-beetwen',
                  width: '100%',
                }}
              >
                <div className={cls.priceBlock}>
                  {pathname === '/dacha' || type === 'cottage' ? (
                    <p className={cls.price}>
                      {numberToPrice(data?.price, locale)}
                    </p>
                  ) : (
                    <p className={cls.price}>
                      {numberToPrice(
                        data.rooms[0]?.prices[0]?.resident_price ||
                          data?.price ||
                          0,
                        locale
                      )}
                    </p>
                  )}
                  <Typography>{common[locale]?.price_per_day}</Typography>
                </div>

                <div className={cls.reservationBlock}>
                  {pathname === '/dacha' || type === 'cottage' ? null : (
                    <div className={cls.reservation}>
                      <span> {data.rooms[0]?.room?.translation?.title}</span>{' '}
                      <br />
                      <span className={cls.date}>
                        {' '}
                        {data.rooms[0] &&
                          data.rooms[0].attributes.find(
                            (attributes) => attributes.attribute_group_id === 3
                          )?.translation?.title}
                      </span>
                    </div>
                  )}
                </div>

                {(pathname === '/dacha' || type === 'cottage') && (
                  <div className={cls.priceBlock}>
                    <p className={cls.price}>
                      {numberToPrice(data?.holiday_price, locale)}
                    </p>
                    <Typography variant='body2'>
                      {common[locale].price_per_holiday}
                    </Typography>
                  </div>
                )}
              </Box>
              <div className={cls.actions}>
                <Button variant='contained' onClick={handleClickBooking}>
                  {common[locale].booking}
                </Button>
                <Button
                  variant='outlined'
                  className={cls.iconButtons}
                  startIcon={<Location />}
                  onClick={handleClickMap}
                >
                  <Typography variant='body2'>
                    {common[locale].on_map}
                  </Typography>
                </Button>
                <Button
                  variant='outlined'
                  className={cls.iconButton}
                  onClick={handleClickShare}
                >
                  <ShareIcon />
                </Button>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                '@media (max-width: 576px)': {
                  minHeight: 210,
                },
              }}
            >
              <div className={cls.imageContainer}>
                <Link href={data.slug}>
                  <a style={{ display: 'block' }}>
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
                <button className={cls.photosBtn} onClick={handleClickBooking}>
                  <PhotoIcon />
                  {data.galleries_count}
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
        <div
          className={`${cls.offerBlock} ${isOffersVisible ? cls.visible : ''}`}
        >
          {data.attributes?.map((item) => (
            <div key={item.id} className={cls.offer}>
              <div className={cls.imageWrapper}>
                <span className={item?.icon} />
              </div>
              <p className={cls.attributeText}>{item.translation?.title}</p>
            </div>
          ))}
        </div>

        <a
          href='#'
          className={`${cls.loadMore} ${isOffersVisible ? cls.collapsed : ''}`}
          onClick={handleClick}
        >
          <p>{common[locale].Amenities}</p>
          <ArrowDown />
        </a>

        <SharePopover
          data={data}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseShare}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </div>
    </Grid>
  )
}
