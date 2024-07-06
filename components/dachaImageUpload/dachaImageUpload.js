import React, { useState } from 'react'
import cls from './dachaImageUpload.module.scss'
import { useRouter } from 'next/router'
import { CircularProgress, Button } from '@mui/material'
import { DeleteOutlineRounded, StarOutlineRounded } from '@mui/icons-material'
import UploadButton from '../uploadButton/uploadButton'
import profileService from '../../services/profileService'
import { common2 } from '../../locales/common2'
import { CDN_URL } from 'constants/env'

export default function DachaImageUpload({ images, setImages, type }) {
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setLoading(true)
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('img', file)
    formData.append('type', type || 'residences/cottages')
    profileService
      .fileUpload(formData)
      .then((res) =>
        setImages([
          ...images,
          {
            path: res.data.type + '/' + res.data.title,
            isMain: images.length === 0,
          },
        ])
      )
      .finally(() => setLoading(false))
  }

  const handleDelete = (filename) => {
    const newImages = images.filter((item) => item.path !== filename)
    setImages(newImages)
  }
  const handleSetMain = (filename) => {
    const newImages = [...images]
    const current = newImages.findIndex((item) => item.isMain)
    const main = newImages.findIndex((item) => item.path === filename)
    if (current > -1) newImages[current].isMain = false
    newImages[main].isMain = true
    setImages(newImages)
  }

  return (
    <div className={cls.root}>
      <div className={cls.uploadContainer}>
        {images?.map((file, index) => (
          <div key={index} className={cls.imageContainer}>
            <img
              src={CDN_URL + file.path}
              className={cls.images}
              alt='images'
            />
            {file.isMain && (
              <div className={cls.badge}>
                <StarOutlineRounded className={cls.icon} />
                <span>{common2[locale].main}</span>
              </div>
            )}
            <div className={cls.overlay}>
              <Button
                onClick={() => handleSetMain(file.path)}
                className={cls.starBtn}
              >
                <StarOutlineRounded className={cls.icon} />
              </Button>
              <Button
                onClick={() => handleDelete(file.path)}
                className={cls.deleteBtn}
              >
                <DeleteOutlineRounded className={cls.icon} />
              </Button>
            </div>
          </div>
        ))}
        <label htmlFor='file' className={cls.fileInput}>
          <div className={cls.uploadButton}>
            <input hidden id='file' type='file' onChange={handleChange} />
            {loading ? <CircularProgress size={22} /> : <UploadButton />}
          </div>
        </label>
      </div>
    </div>
  )
}
