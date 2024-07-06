import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import styled from '@emotion/styled'
import cls from './galleryModal.module.scss'
import { CloseIcon } from '../icons/commonIcons'
import Lightbox from 'react-image-lightbox'
import { BASE_URL } from 'constants/env'

const CenteredDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiDialog-paper': {
    padding: '70px 70px 70px 52px',
    minWidth: 900,
    maxWidth: 930,
    '@media (max-width: 900px)': {
      padding: 15,
      minWidth: '100%',
      maxWidth: '100%',
    },
  },
})

export default function GalleryCount({ open, handleClose, data }) {
  const [isOpenGallery, setOpenGallery] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const [images, setImages] = useState([])

  useEffect(() => {
    const list = data.galleries.map((item) => BASE_URL + item.path)
    if (data) setImages(list)
  }, [])

  const handleClick = (event, index) => {
    event.preventDefault()
    setOpenGallery(true)
    setPhotoIndex(index)
  }

  const handleCloseGallery = () => {
    setOpenGallery(false)
  }

  return (
    <>
      <CenteredDialog onClose={handleClose} open={open}>
        <DialogTitle
          sx={{
            paddingBottom: 5,
            borderBottom: 'none',
          }}
        >
          {data.translation?.title}
        </DialogTitle>
        <IconButton
          size='small'
          sx={{
            position: 'absolute',
            top: matches ? 20 : 15,
            right: matches ? 12 : 15,
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <div className={cls.wrapper}>
          <Grid container spacing={1.5}>
            {images.map((item, index) => (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <a
                  href='#'
                  className={cls.imgWrapper}
                  onClick={(event) => handleClick(event, index)}
                >
                  <img src={item} alt={item} />
                </a>
              </Grid>
            ))}
          </Grid>
        </div>
      </CenteredDialog>
      {isOpenGallery && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => handleCloseGallery()}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  )
}
