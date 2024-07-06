import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import { StarSmile } from '../icons/commonIcons'
import cls from './orderInfo.module.scss'
import HotelCardSimple from '../hotelCardSimple/hotelCardSimple'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { common2 } from 'locales/common2'
import { format } from 'date-fns'
import { getLocale } from 'utils/getLocale'
import {
  setBookingItems,
  setBreakfastPrice,
} from 'redux/actions/bookingActions/bookingActions'

export default function OrderInfo({ data }) {
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const { bookingRooms, dates } = useSelector(
    (state) => state.booking,
    shallowEqual
  )
  const filteredBookingRooms = bookingRooms.filter((item) => item.cartQuantity)

  useEffect(() => {
    if (!bookingRooms.length) {
      const list = data.rooms.map((item) => ({
        ...item,
        cartQuantity: 0,
        cartChildren: 0,
        cartAdults: item.prices[0]?.person,
        isBreakfast: false,
      }))
      dispatch(setBookingItems(list))
      dispatch(setBreakfastPrice(Number(data.breakfast)))
    }
  }, [data])

  return (
    <div className={cls.root}>
      <div className={cls.wrapper}>
        <div className={cls.header}>
          <div className={cls.item}>
            <Typography variant='h2' sx={{ fontWeight: 500, mb: 1.25 }}>
              {data?.translation?.title}
            </Typography>
            <div className={cls.subtitle}>
              <span className={cls.rating}>
                <StarSmile /> {data?.reviews_avg?.total} (
                {data?.reviews?.length} {common2[locale].review})
              </span>
              <span className={cls.separator} />
              <Typography>
                {data?.address_title?.city_name?.translation?.title +
                  ', ' +
                  data?.address_title?.region_name?.translation?.title}
              </Typography>
            </div>
          </div>
          <div className={cls.item}>
            <Typography variant='h2' sx={{ fontWeight: 500, mb: 1.25 }}>
              {common2[locale].date}
            </Typography>
            {dates?.from && dates?.to ? (
              <Typography>
                {format(dates?.from, 'dd MMM', { locale: getLocale(locale) })} -{' '}
                {format(dates?.to, 'dd MMM yyy', { locale: getLocale(locale) })}
              </Typography>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={cls.body}>
          <Typography variant='h2' sx={{ fontWeight: 500, mb: 2.5 }}>
            {common2[locale].your_rooms}
          </Typography>
          {filteredBookingRooms.map((item, index) => (
            <div key={index} id='rooms'>
              <HotelCardSimple data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
