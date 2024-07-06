import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import {
  ArrowDown,
  HeartFilledIcon,
  HeartIcon,
  Location,
  PhotoIcon,
  ShareIcon,
  StarSmile,
} from '../icons/commonIcons'
import { Box } from '@mui/system'
import cls from './guideCardVertical.module.scss'
import { useRouter } from 'next/router'
import SharePopover from '../sharePopover/sharePopover'
import DateRangePopover from '../popover/dateRangePopover'
import { common } from '../../locales/common'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
  Apartment,
  BathroomOutlined,
  Home,
  MeetingRoom,
  People,
} from '@mui/icons-material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setToFavoritesAction } from '../../redux/actions/favoriteActions/favoriteActions'
import { BASE_URL } from 'constants/env'

export default function GuideCardVertical({ data }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const router = useRouter()
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.favorite, shallowEqual)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const open2 = Boolean(anchorEl2)
  const handleClickBooking = () => router.push(`/${data.slug}`)
  const addToFavorites = () => dispatch(setToFavoritesAction(data))

  const handleClickMap = () => {
    switch (data.type) {
      case 'hotel':
        router.push(`/hotel/map`)
        break
      case 'cottage':
        router.push(`/dacha/map`)
        break
      case 'zone':
        router.push(`/recreation-area/map`)
        break
      case 'sanatorium':
        router.push(`/sanatorium/map`)
    }
  }

  const handleClickShare = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseShare = () => {
    setAnchorEl(null)
  }
  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl2(null)
  }

  return (
    <div className={cls.root}>
      <div className={cls.wrapper}>
        <div className={cls.imgWrapper}>
          <LazyLoadImage
            alt={data?.translation?.title}
            src={
              data?.img !== null
                ? BASE_URL + data?.img
                : 'https://via.placeholder.com/800x600'
            }
          />

          <button className={cls.favouriteBtn} onClick={addToFavorites}>
            {!!favorites?.find((item) => item.id === data.id) ? (
              <HeartFilledIcon />
            ) : (
              <HeartIcon />
            )}
          </button>
          {data?.galleries_count !== 0 ? (
            <button className={cls.photosBtn}>
              <PhotoIcon /> {data?.galleries_count}
            </button>
          ) : null}
        </div>
        <div className={cls.title}>
          <Typography
            variant='h2'
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {data?.translation?.title}
          </Typography>
          <div className={cls.rating}>
            <StarSmile /> 4.9
          </div>
        </div>
        <div className={cls.subtitle}>
          <Typography variant='body2'>
            {data?.address_title?.city_name.translation?.title +
              ', ' +
              data?.address_title?.region_name.translation?.title}
          </Typography>
        </div>

        <div className={cls.numerical_info}>
          {data.type === 'hotel' && (
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
                {common[locale].number_of_floors}: {data?.number_of_floors || 0}
              </div>
            </>
          )}

          {data.type === 'zone' && (
            <>
              <div className={cls.items}>
                <MeetingRoom />
                {common[locale].dormitories}:{' '}
                {data?.rooms.reduce((acc, cur) => acc + cur.quantity, 0)}
              </div>
              <div className={cls.items}>
                <Home />
                {common[locale].total_area}: {data?.yard_area || 0}
              </div>
            </>
          )}

          {data.type === 'sanatorium' && (
            <>
              <div className={cls.items}>
                <MeetingRoom />
                {common[locale].dormitories}:{' '}
                {data?.rooms.reduce((acc, cur) => acc + cur.quantity, 0)}
              </div>
              <div className={cls.items}>
                <Home />
                {common[locale].total_area}: {data?.yard_area || 0}
              </div>
            </>
          )}

          {data.type === 'cottage' && (
            <>
              <div className={cls.item}>
                <MeetingRoom />
                {common[locale].dormitories}: {data?.number_of_rooms || 0}
              </div>
              <div className={cls.item}>
                <People />
                {common[locale].adult}: {data?.adult}
              </div>
              <div className={cls.item}>
                <Home />
                {common[locale].house_area}: {data.aria || 0}
              </div>
              <div className={cls.item}>
                <BathroomOutlined />
                {common[locale].bathroom}: {data.bathroom || 0}
              </div>
            </>
          )}
        </div>

        <Box className={cls.boxContainer}>
          <div className={cls.priceBlock}>
            {/*<Typography variant='body2'>Price</Typography>*/}
            <p className={cls.price}>
              {data?.type === 'cottage'
                ? data?.price
                : data.rooms[0]?.prices[0]?.resident_price === null
                ? data.rooms[0]?.prices[1]?.resident_price
                : data.rooms[0]?.prices[0]?.resident_price}
              / {common[locale]?.price_per_day}
            </p>
          </div>
          <div className={cls.priceBlock2}>
            {data?.type === 'cottage' ? (
              <button onClick={handleClick} className={cls.reservationDacha}>
                {common[locale].calendar} <ArrowDown />
              </button>
            ) : (
              <div className={cls.reservation}>
                <span> {data.rooms[0]?.room?.translation?.title} </span> <br />
                <span className={cls.date}> {data.rooms[0]?.bed} king bed</span>
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
  )
}
