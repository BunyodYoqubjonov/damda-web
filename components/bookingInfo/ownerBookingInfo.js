import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FilterDateButton from '../filterButton/filterDateButton'
import cls from './bookingInfo.module.scss'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns'
import { numberToPrice } from 'utils/numberToPrice'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { common } from 'locales/common'
import FilterTimeButton from '../filterButton/filterTimeButton'
import { toast } from 'react-toastify'
import { separateNumber } from '../numberSplice'
import {
  setBookingDate,
  setBookingInfo,
} from 'redux/actions/orderActions/orderActions'
import {
  orderBusinessDaysPriceSelector,
  orderHolidaysPriceSelector,
  orderTotalPriceSelector,
} from 'redux/selectors/orderSelector'
import bookingService from 'services/BookingService'
import { common2 } from 'locales/common2'

export default function OwnerBookingInfo({ data }) {
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.order, shallowEqual)
  const { user } = useSelector((state) => state.auth, shallowEqual)
  const price = useSelector((state) => orderBusinessDaysPriceSelector(state))
  const holidayPrice = useSelector((state) => orderHolidaysPriceSelector(state))
  const totalPrice = useSelector((state) => orderTotalPriceSelector(state))
  const setDays = (days) => dispatch(setBookingDate(days))
  const inOutData = useSelector((state) => state.order.order, shallowEqual)

  useEffect(() => {
    setDefaultBookingInfo()
  }, [data])

  function parseDateString(date) {
    if (date) {
      const { from, to } = date
      return {
        from: typeof from === 'string' ? parseISO(from) : from,
        to: typeof to === 'string' ? parseISO(to) : to,
      }
    } else {
      return
    }
  }

  const handleClickBooking = () => {
    if (!order.dates) {
      toast.warning(common[locale].choose_arrival)
      return
    }
    if (!inOutData.inDate) {
      toast.warning(common[locale].choose_checkOut)
      return
    }
    if (!inOutData.outDate) {
      toast.warning(common[locale].choose_checkOut)
      return
    }
    
    const dates = Object.values(parseDateString(order.dates))
    const registration_date = dates
      .map((item) => format(item, 'yyyy-MM-dd'))
      .join(',')

    const postData = {
      residence_id: order?.residence_id,
      user_id: user?.id,
      status: 'approved',
      price: totalPrice,
      registration_date,
      registration_time: inOutData.inDate + ',' + inOutData.outDate,
      holidayDays: order.holidayDays,
      businessDays: order.businessDays,
    }
    bookingCreate(postData)
  }

  const clearAll = () => setDefaultBookingInfo()

  function bookingCreate(payload) {
    setLoading(true)
    bookingService
      .create(payload)
      .then(() => {
        clearAll()
        toast.success(common2[locale].successfully_booked)
      })
      .finally(() => setLoading(false))
  }

  function setDefaultBookingInfo() {
    const bookingInfo = {
      residence_id: data?.id,
      adult: 0,
      children: 0,
      apartment: null,
      price: data?.price,
      holidayPrice: data?.holiday_price,
      inDate: null,
      outDate: null,
      businessDays: 0,
      holidays: 0,
      dates: null,
    }
    dispatch(setBookingInfo(bookingInfo))
  }

  useEffect(() => {
    clearAll()
  }, [])

  return (
    <aside className={cls.root}>
      <div className={cls.aside}>
        <FilterDateButton
          values={parseDateString(order.dates)}
          handleChange={setDays}
        />
        <Box mb={1.5} />
        <FilterTimeButton />

        <div className={cls.actions}>
          <div className={cls.row}>
            <Button
              fullWidth
              variant='contained'
              onClick={handleClickBooking}
            >
              {loading ? (
                <CircularProgress color='inherit' size={18} />
              ) : (
                common[locale].booking
              )}
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={clearAll}
              sx={{ whiteSpace: 'normal' }}
            >
              {common[locale].clear_all}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
