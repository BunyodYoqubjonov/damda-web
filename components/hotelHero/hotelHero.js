import React, { useState } from 'react'
import { Button, Container, Typography, useMediaQuery } from '@mui/material'
import {
  HeartFilledIcon,
  HeartIcon,
  MapIcon,
  ShareIcon,
  ShowAllIcon,
  StarSmile,
} from '../icons/commonIcons'
import cls from './hotelHero.module.scss'
import { useRouter } from 'next/router'
import { common } from 'locales/common'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setToFavoritesAction } from 'redux/actions/favoriteActions/favoriteActions'
import FallbackImage from 'components/fallbackImage/fallbackImage'
import { BASE_URL } from 'constants/env'
import dynamic from 'next/dynamic'

const SharePopover = dynamic(() => import('../sharePopover/sharePopover'))
const GalleryCount = dynamic(() => import('../galleryModal/gallaryCount'))
const GalleryModal = dynamic(() => import('../galleryModal/galleryModal'))
const MobileGallery = dynamic(() => import('../mobileGallery/mobileGallery'))

export default function HotelHero({ data }) {
  const [openGallery, setGallery] = useState(null)
  const [openGalleryCount, setGalleryCount] = useState(false)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale, pathname } = useRouter()
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.favorite, shallowEqual)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const addToFavorites = () => dispatch(setToFavoritesAction(data))

  const showGalleryCount = (event) => {
    event.preventDefault()
    setGalleryCount(true)
  }
  const hideGalleryCount = () => setGalleryCount(false)

  const showGallery = (id) => setGallery(id)
  const hideGallery = () => setGallery(null)

  const handleClickShare = (event) => setAnchorEl(event?.currentTarget)
  const handleCloseShare = () => setAnchorEl(null)

  return (
    <Container>
      <div className={cls.header}>
        <div>
          <Typography variant='h1' className={cls.title}>
            <div
              dangerouslySetInnerHTML={{
                __html: `${data?.translation?.title || ""} ${
                  pathname.startsWith('/dacha') ? ` ID ${data?.id}` : ''
                }`,
              }}
            />
          </Typography>
          <p className={cls.subtitle}>
            <span className={cls.rating}>
              <StarSmile />
              {data.reviews_avg?.total} ({data.reviews?.length} {common[locale].review})
            </span>
            <span className={cls.separator} />
            <span>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data.address_title?.city_name.translation?.title +
                    ', ' +
                    data.address_title?.region_name.translation?.title +
                    `${
                      data.address_title?.village_name
                        ? `, ${data.address_title?.village_name?.translation?.title}`
                        : ''
                    }`,
                }}
              />
            </span>
          </p>
        </div>
        <div className={cls.actions}>
          <Button
            variant='outlined'
            onClick={handleClickShare}
            className={cls.iconButton}
          >
            <ShareIcon />
          </Button>
          <Button
            variant='outlined'
            className={cls.iconButton}
            onClick={addToFavorites}
          >
            {!!favorites.find((item) => item.id === data.id) ? (
              <HeartFilledIcon />
            ) : (
              <HeartIcon />
            )}
          </Button>
        </div>
        <div className={cls.mobileActions}>
          <Button
            variant='outlined'
            className={cls.iconButton}
            startIcon={<MapIcon />}
          >
            <p> {common[locale].show_on_map}</p>
          </Button>
          <Button
            variant='outlined'
            className={cls.iconButton}
            startIcon={<ShareIcon />}
            onClick={handleClickShare}
          >
            <p>{common[locale].share}</p>
          </Button>
          <Button
            variant='outlined'
            className={cls.iconButton}
            startIcon={
              !!favorites.find((item) => item.id === data.id) ? (
                <HeartFilledIcon fill='#000' />
              ) : (
                <HeartIcon fill='#000' />
              )
            }
            onClick={addToFavorites}
          >
            <p>{common[locale].like}</p>
          </Button>
        </div>
      </div>
      <div className={cls.heroSection}>
        <div className={cls.main}>
          <div
            className={cls.imageWrapper}
            onClick={() => showGallery(data.galleries?.at(0)?.id)}
          >
            <FallbackImage
              alt={data.translation?.title}
              src={BASE_URL + data.galleries?.at(0)?.path}
            />
          </div>
          {data.galleries?.length > 1 ? (
            <div className={cls.floatBtn}>
              <a className={cls.showAll} href='#' onClick={showGalleryCount}>
                <ShowAllIcon />
                <span>{common[locale].show_all}</span>
              </a>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={cls.secondary}>
          <div
            className={cls.imageWrapper}
            onClick={() => showGallery(data.galleries?.at(1)?.id)}
          >
            <FallbackImage
              alt={data.translation?.title}
              src={BASE_URL + data.galleries?.at(1)?.path}
            />
          </div>
          <div
            className={cls.imageWrapper}
            onClick={() => showGallery(data.galleries?.at(2)?.id)}
          >
            <FallbackImage
              alt={data.translation?.title}
              src={BASE_URL + data.galleries?.at(2)?.path}
            />
          </div>
        </div>
      </div>
      <SharePopover
        data={data}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseShare}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
      {matches && !!openGallery && (
        <GalleryModal
          open={Boolean(openGallery)}
          handleClose={hideGallery}
          data={data}
          photoId={openGallery}
        />
      )}
      {!matches && !!openGallery && (
        <MobileGallery
          open={Boolean(openGallery)}
          onClose={hideGallery}
          data={data}
          photoId={openGallery}
        />
      )}

      <GalleryCount
        open={openGalleryCount}
        handleClose={hideGalleryCount}
        data={data}
      />
    </Container>
  )
}
