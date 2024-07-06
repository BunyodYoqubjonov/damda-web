import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  IconButton,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { CloseIcon } from '../icons/commonIcons'
import cls from './notificationsMenu.module.scss'
import { navigation } from '../../locales/navigation'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'

const list = [
  {
    title: 'Black Friday: Save 30% on Accommodation',
    description:
      'Offer valid for bookings made before 09:00 (UTC + 1) December 1, 2021. Terms and conditions apply.',
    image: 'images/hyatt_regency.jpg',
  },
  {
    title:
      'List your house, hotel or other accommodation on Damda.uz and earn.',
    description:
      'The earliest evidence of the phrase Black Friday originated in Philadelphia, dating back to 1961, where it was used by police to describe the heavy pedestrian and vehicular traffic that would occur on the day after Thanksgiving',
    image: 'images/hyatt_regency.jpg',
  },
  {
    title:
      'Looking for low prices? We have created a dedicated page where you can find great deals in your favoritecities.',
    description:
      'The earliest evidence of the phrase Black Friday originated in Philadelphia, dating back to 1961, where it was used by police to describe the heavy pedestrian and vehicular traffic that would occur on the day after Thanksgiving',
    image: 'images/hyatt_regency.jpg',
  },
]

export default function NotificationsMenu({ open, handleClose }) {
  const [currentItem, setCurrentItem] = useState(null)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()
  const handleAccordionItem = (index) => {
    setCurrentItem(index)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          padding: matches ? '50px !important' : '16px !important',
          margin: matches ? '25px' : '16px',
          maxWidth: matches ? 500 : '100%',
          height: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: matches ? 5 : 4,
          borderBottom: '1px solid #D2D2D7',
          paddingTop: matches ? 0 : 2,
        }}
      >
        {navigation[locale].notification}
        <span className={cls.badge}>3</span>
      </DialogTitle>
      <IconButton
        size='small'
        sx={{ position: 'absolute', top: 20, right: 12 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>

      <div className={cls.accordion}>
        {list.map((item, index) => (
          <div
            key={index}
            className={`${cls.item} ${index === currentItem ? cls.active : ''}`}
          >
            <div
              className={cls.wrapper}
              onClick={() => handleAccordionItem(index)}
            >
              <div className={cls.imgWrapper}>
                <img src={item.image} alt={item.title} />
              </div>
              <Typography className={cls.title}>{item.title}</Typography>
              <div className={cls.description}>
                <Typography variant='body2'>{item.description}</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant='contained' sx={{ marginTop: 'auto' }}>
        {common[locale].see_all}
      </Button>
    </Dialog>
  )
}
