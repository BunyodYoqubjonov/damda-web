import React, { useEffect, useState } from 'react'
import { Dialog } from '@mui/material'
import styled from '@emotion/styled'
import 'react-image-gallery/styles/css/image-gallery.css'
import Lightbox from 'react-image-lightbox'
import { BASE_URL } from 'constants/env'

const CenteredDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
  },
  '& .MuiDialog-paper': {
    backgroundColor: 'transparent',
    padding: '20px 20px 20px 20px',
    maxWidth: '100%',
    '@media (max-width: 900px)': {
      padding: 15,
      maxWidth: '100%',
    },
  },
})

export default function GalleryModal({ open, handleClose, data, photoId }) {
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
    <>
      <CenteredDialog open={open} handleClose={handleClose}>
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => handleClose()}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      </CenteredDialog>
    </>
  )
}
