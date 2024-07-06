import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import {
  HeartFilledIcon,
  HeartIcon,
  ShareIcon,
  StarSmile,
} from '../icons/commonIcons'
import cls from './guideCardVertical2.module.scss'
import { useRouter } from 'next/router'
import SharePopover from '../sharePopover/sharePopover'
import { common } from '../../locales/common'
import DateRangePopover from '../popover/dateRangePopover'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setToFavoritesAction } from '../../redux/actions/favoriteActions/favoriteActions'
import { BASE_URL } from 'constants/env'

export default function GuideCardVertical2({ data }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const open = Boolean(anchorEl)
  const open2 = Boolean(anchorEl2)
  const router = useRouter()
  const { locale } = useRouter()
  const { favorites } = useSelector((state) => state.favorite, shallowEqual)
  const dispatch = useDispatch()
  const handleClickBooking = () => router.push('/' + data.slug)
  const handleClickShare = (event) => setAnchorEl(event.currentTarget)
  const handleClick = (event) => setAnchorEl2(event.currentTarget)
  const handleClose = () => setAnchorEl2(null)
  const handleCloseShare = () => setAnchorEl(null)
  const addToFavorites = () => dispatch(setToFavoritesAction(data))

  return (
    <div className={cls.root}>
      <div className={cls.wrapper}>
        <div className={cls.imgWrapper}>
          <LazyLoadImage
            alt={data.translation?.title}
            src={
              data?.img !== null
                ? BASE_URL + data.img
                : 'https://via.placeholder.com/300x200'
            }
            onClick={handleClickBooking}
          />
          <button className={cls.favouriteBtn} onClick={addToFavorites}>
            {!!favorites?.find((item) => item.id === data.id) ? (
              <HeartFilledIcon />
            ) : (
              <HeartIcon />
            )}
          </button>
        </div>
        <div className={cls.title} onClick={handleClickBooking}>
          <p className={cls.paragraph}>Kristin Watson</p>
          <div className={cls.rating}>
            <StarSmile /> {data?.hotel_star || 0}
          </div>
        </div>
        <div className={cls.subtitle}>
          <Typography variant='body2'>
            {data?.address_title?.city_name.translation.title +
              ' / ' +
              data?.address_title?.region_name.translation.title}
          </Typography>
        </div>

        <div className={cls.actions}>
          <Button fullWidth variant='contained' onClick={handleClickBooking}>
            {common[locale].booking}
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
