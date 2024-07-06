import React from 'react'
import cls from '../dachaImageUpload/dachaImageUpload.module.scss'
import { PlusIcon } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const UploadButton = () => {
  const { locale } = useRouter()
  return (
    <>
      <div className={cls.plusIcon}>
        <PlusIcon />
      </div>
      <Typography type='file'>{common[locale].Accommodation_photos}</Typography>
    </>
  )
}

export default UploadButton
