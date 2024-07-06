import React from 'react'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import cls from './orderDetails.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { numberToPrice } from '../../utils/numberToPrice'
import { differenceInCalendarDays } from 'date-fns'
import { CloseIcon } from '../icons/commonIcons'
import { BASE_URL } from 'constants/env'

const CenteredDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiDialog-paper': {
    padding: '70px 80px 80px 80px',
    minWidth: 370,
    maxWidth: 890,
    minHeight: 370,
    '@media (max-width: 900px)': {
      padding: 15,
      maxWidth: '100%',
      margin: 15,
    },
  },
})

export default function OrderDetails({ open, handleClose, list, loading }) {
  const { locale } = useRouter()
  const inDate = new Date(list?.registration_date?.in)
  const outDate = new Date(list?.registration_date?.out)
  const dates = differenceInCalendarDays(inDate, outDate) + 1

  return (
    <CenteredDialog onClose={handleClose} open={open}>
      {!loading ? (
        <>
          <DialogTitle
            sx={{
              paddingBottom: 5,
              borderBottom: 'none',
              fontSize: 50,
              fontWeight: 400,
            }}
          >
            {common[locale].order_details}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <div className={cls.wrapper}>
            <div className={cls.header}>
              <div className={cls.cardTitle}>
                <Typography className={cls.title}>
                  {list?.residence?.translation?.title}
                </Typography>
                <Typography className={cls.subtitle}>
                  {list?.residence?.address_title?.city_name.translation?.title}
                  <br />
                  {
                    list?.residence?.address_title?.region_name.translation
                      ?.title
                  }
                </Typography>
              </div>
              <div className={cls.item}>
                <Typography className={cls.title}>
                  {common[locale].Date}
                </Typography>
                <Typography className={cls.subtitle}>
                  {list?.registration_date?.in}
                  <br />
                  {list?.registration_date?.out}
                </Typography>
              </div>
            </div>
            {!!list?.residence?.user && (
              <div className={cls.owner}>
                <Typography className={cls.title}>
                  {common[locale].owner}
                </Typography>
                <Typography className={cls.subtitle}>
                  {list?.residence?.user?.firstname}{' '}
                  {list?.residence?.user?.lastname}{' '}
                  <a href={`tel:${list?.residence?.user?.phone}`}>
                    {list?.residence?.user?.phone}
                  </a>
                </Typography>
              </div>
            )}
            <div className={cls.body}>
              {list?.details?.map((item, index) => (
                <div key={index}>
                  <div className={cls.row}>
                    <div className={cls.infoBlock}>
                      <div className={cls.row}>
                        <Typography>
                          {common[locale].Number_of_guests} —{' '}
                          {item.adult + item.children}
                        </Typography>
                        <Typography>
                          {common[locale].Number_of_room} — {item.quantity}
                        </Typography>
                      </div>
                      <div className={cls.row}>
                        <div className={cls.item}>
                          <Typography className={cls.heading}>
                            Exulusive room
                          </Typography>
                          <Typography className={cls.price}>
                            {item.price}
                          </Typography>
                        </div>
                        <div className={cls.item}>
                          <Typography className={cls.heading}>
                            Large bed
                          </Typography>
                          <Typography className={cls.price}>2</Typography>
                        </div>
                        <div className={cls.item}>
                          <Typography className={cls.heading}>
                            {common[locale].breakfast}
                          </Typography>
                          <Typography className={cls.price}>
                            {item.breakfast !== 0 ? item.breakfast : 'Free'}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={cls.imageBlock}>
                      <div className={cls.imgWrapper}>
                        <img
                          src={
                            item.booking_room.img
                              ? BASE_URL + item.booking_room.img
                              : '/images/hotels.jpg'
                          }
                          alt='dacha'
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cls.priceSection}>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {common[locale].price}
                    </Typography>
                    <ul>
                      <li>
                        <Typography>
                          {item.booking_room?.room?.translation?.title} /{' '}
                          {dates} {common[locale].night}
                        </Typography>
                        <Typography>{item.price}</Typography>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
              {list?.residence?.type === 'cottage' && (
                <div>
                  <div className={cls.row}>
                    <div className={cls.infoBlock}>
                      <div className={cls.row}>
                        <Typography>
                          {common[locale].adult} — {list.residence.adult}
                        </Typography>
                        <Typography>
                          {common[locale].children} —{list.residence.children}
                        </Typography>
                      </div>
                      <div className={cls.row}>
                        <div className={cls.item}>
                          <Typography className={cls.heading}>
                            {common[locale].dormitories}
                          </Typography>
                          <Typography className={cls.price}>
                            {list.residence.number_of_rooms}
                          </Typography>
                        </div>
                        <div className={cls.item}>
                          <Typography className={cls.heading}>
                            {common[locale].yard_area}
                          </Typography>
                          <Typography className={cls.price}>
                            {list.residence.yard_area || 0}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={cls.imageBlock}>
                      <div className={cls.imgWrapper}>
                        <img
                          src={
                            list?.residence.img
                              ? BASE_URL + list?.residence.img
                              : '/images/hotels.jpg'
                          }
                          alt='dacha'
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cls.priceSection}>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {common[locale].price}
                    </Typography>
                    <ul>
                      <li>
                        <Typography>
                          {common[locale].price_per_day} /{' '}
                          {list?.holiday_days || 0} {common[locale].night}
                        </Typography>
                        <Typography>{list?.residence.price}</Typography>
                      </li>
                      <li>
                        <Typography>
                          {common[locale].price_per_holiday} /{' '}
                          {list?.business_days || 0} {common[locale].night}
                        </Typography>
                        <Typography>{list?.residence.holiday_price}</Typography>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <div className={cls.totalPrice}>
                <Typography>{common[locale].total}</Typography>
                <Typography>{numberToPrice(list?.price, locale)}</Typography>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          minHeight={370}
        >
          <CircularProgress />
        </Box>
      )}
    </CenteredDialog>
  )
}
