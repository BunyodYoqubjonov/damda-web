import React from 'react'
import { SwipeableDrawer, Typography } from '@mui/material'
import cls from './mobileHotelsFilter.module.scss'
import HotelFilters from '../hotelFilters/hotelFilters'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function MobileHotelsFilter({
  open,
  onClose,
  facilities,
  setFacilities,
}) {
  const { locale } = useRouter()

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px 12px 0 0',
          padding: '20px 15px',
        },
      }}
    >
      <div className={cls.wrapper}>
        <Typography className={cls.title}>{common[locale].Filter}</Typography>
        <HotelFilters
          onClose={onClose}
          facilities={facilities}
          setFacilities={setFacilities}
        />
      </div>
    </SwipeableDrawer>
  )
}
