import React, { useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import {
  HeartFilledIcon,
  HeartIcon,
  PhotoIcon,
  ShareIcon,
  StarSmile,
} from '../icons/commonIcons'
import { Box } from '@mui/system'
import cls from './guideCard.module.scss'
import { useRouter } from 'next/router'
import SharePopover from '../sharePopover/sharePopover'
import { numberToPrice } from '../../utils/numberToPrice'
import { common } from '../../locales/common'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { setToFavoritesAction } from '../../redux/actions/favoriteActions/favoriteActions'
import { BASE_URL } from 'constants/env'

export default function GuideCard({ data }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { push, locale, pathname } = useRouter()
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.favorite, shallowEqual)

  const handleClickBooking = () =>
    push({
      pathname: data?.slug,
    })

  const handleClickShare = (event) => setAnchorEl(event?.currentTarget)

  const handleCloseShare = () => setAnchorEl(null)

  const addToFavorites = () => dispatch(setToFavoritesAction(data))

  return (
    <div className={cls.root} id={`#${data.id}`}>
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
            <div
              className={cls.title}
              onClick={handleClickBooking}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant='h2'>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.translation === null
                        ? common[locale].Noname
                        : 'Kristin Watson',
                  }}
                />
              </Typography>
              {pathname === '/dacha' ? null : (
                <div className={cls.rating}>
                  <StarSmile /> {data?.hotel_star || 0}
                </div>
              )}
            </div>

            <div className={cls.subtitle}>
              <Typography variant='body2'>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.address_title?.city_name.translation?.title +
                      ', ' +
                      data.address_title?.region_name.translation?.title,
                  }}
                />
              </Typography>
            </div>

            <div className={cls.languages}>
              <Button className={cls.flag}>
                <img
                  src='/images/gb_1.svg'
                  alt='img'
                  className={cls.flagImage}
                />
                English
              </Button>
              <Button className={cls.flag}>
                <img
                  src='/images/gb_3.svg'
                  alt='img'
                  className={cls.flagImage}
                />
                English
              </Button>
              <div className={cls.more}>+3</div>
            </div>

            <Box className={cls.footerBlog}>
              <div className={cls.priceBlock}>
                <p className={cls.price}>
                  {numberToPrice(data?.price, locale)}
                </p>
                <span className={cls.date}>
                  {common[locale]?.price_per_day}
                </span>
              </div>

              <div className={cls.priceBlock}>
                <p className={cls.price}>10 years</p>
                <span className={cls.date}>Experience</span>
              </div>

              <div className={cls.priceBlock}>
                <p className={cls.price}>310 trips</p>
                <span className={cls.date}>15 diffirent cities</span>
              </div>
            </Box>

            <div className={cls.actions}>
              <Button variant='contained' onClick={handleClickBooking}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={cls.imageContainer}>
              <LazyLoadImage
                alt={data?.translation?.title}
                src={
                  data?.img !== null
                    ? BASE_URL + data.img
                    : 'https://via.placeholder.com/800x600'
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
          </Grid>
        </Grid>
      </div>

      <SharePopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseShare}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  )
}
