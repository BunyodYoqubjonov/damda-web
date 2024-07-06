import React, { useEffect, useState } from 'react'
import { SwipeableDrawer } from '@mui/material'
import Lightbox from 'react-image-lightbox'
import { BASE_URL } from 'constants/env'

export default function MobileGallery({ open, onClose, data, photoId }) {
  const initialPhotoIndex = data?.galleries?.findIndex(
    (item) => item.id === photoId
  )
  const [photoIndex, setPhotoIndex] = useState(
    initialPhotoIndex > 0 ? initialPhotoIndex : 0
  )
  const [images, setImages] = useState([])

  useEffect(() => {
    const list = data?.galleries?.map((item) => BASE_URL + item.path)
    if (data) setImages(list)
  }, [])

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px 12px 0 0',
          padding: '20px 15px',
          maxHeight: '90vh',
          zIndex: 999,
        },
      }}
      sx={{ zIndex: 999 }}
    >
      <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={() => onClose()}
        onMovePrevRequest={() =>
          setPhotoIndex((photoIndex + images.length - 1) % images.length)
        }
        onMoveNextRequest={() =>
          setPhotoIndex((photoIndex + 1) % images.length)
        }
      />
    </SwipeableDrawer>
  )
}
