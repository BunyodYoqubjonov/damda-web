import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FilterButton from '../filterButton/filterButton'
import FilterDateButton from '../filterButton/filterDateButton'
import cls from './bookingInfo.module.scss'
import { useRouter } from 'next/router'
import { vacants } from '../../constants/mock'
import { format, parseISO } from 'date-fns'
import { numberToPrice } from '../../utils/numberToPrice'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { common } from '../../locales/common'
import FilterTimeButton from '../filterButton/filterTimeButton'
import { toast } from 'react-toastify'
import SuccessModal from './successModal'
import { separateNumber } from '../numberSplice'
import InputSimple from '../inputSimple/inputSimple'
import {
  setBookingDate,
  setBookingInfo,
} from '../../redux/actions/orderActions/orderActions'
import {
  orderBusinessDaysPriceSelector,
  orderHolidaysPriceSelector,
  orderTotalPriceSelector,
} from '../../redux/selectors/orderSelector'
import InputPhone from '../inputSimple/inputPhone'
import bookingService from '../../services/BookingService'

export default function BookingInfo({ data }) {
  const { locale } = useRouter()
  const [values, setValues] = useState({ vacants: '' })
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disableDays, setDisableDays] = useState([])
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.order, shallowEqual)
  const { user } = useSelector((state) => state.auth, shallowEqual)
  const price = useSelector((state) => orderBusinessDaysPriceSelector(state))
  const holidayPrice = useSelector((state) => orderHolidaysPriceSelector(state))
  const totalPrice = useSelector((state) => orderTotalPriceSelector(state))
  const setDays = (days) => dispatch(setBookingDate(days))
  const inOutData = useSelector((state) => state.order.order, shallowEqual)
  const [phone, setPhone] = useState(null)
  const [name, setName] = useState('')
  const [count, setCount] = useState()
  useEffect(() => {
    setDefaultBookingInfo()
  }, [data])

  const handleCloseModal = () => setOpenModal(false)

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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleClickBooking = () => {
    console.log(phone)
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
    if (!userInfo && (phone === null || name === '' || phone === '')) {
      toast.warning(common[locale].nameAndPhone)
      return
    }
    if (!count) {
      toast.warn(common[locale].enter_count)
      return
    }

    const dates = Object.values(parseDateString(order.dates))
    const registration_date = dates
      .map((item) => format(item, 'yyyy-MM-dd'))
      .join(',')

    const postData = {
      residence_id: order?.residence_id,
      user_id: user?.id,
      adult: order.adult,
      children: order.children,
      apartment: null,
      status: 'created',
      price: totalPrice,
      registration_date,
      registration_time: inOutData.inDate + ',' + inOutData.outDate,
      pick_up: false,
      airport_id: null,
      holidayDays: order.holidayDays,
      businessDays: order.businessDays,
      name: name,
      phone: phone.replace(/\s/g, ''),
      people_count: Number(count),
    }
    bookingCreate(postData)
  }

  function bookingCreate(payload) {
    setLoading(true)
    bookingService
      .create(payload)
      .then(() => {
        setOpenModal(true)
        clearAll()
      })
      .finally(() => setLoading(false))
  }

  function getReservedDays(bookings) {
    const reserved = bookings
      .filter((item) => item.reserve)
      .flatMap((item) => item.reserve)

    const days = []
    reserved.forEach((item) => {
      const check_in = Number(item.check_in) || 0
      const check_out = Number(item.check_out) || 0
      let hour = Math.max(check_in, check_out)
      const day = new Date(
        Number(item.year),
        Number(item.month) - 1,
        Number(item.day),
        hour,
        0,
        0
      )
      days.push(day)
    })
    setDisableDays(days)
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
    setName('')
    setPhone('')
    setCount('')
    dispatch(setBookingInfo(bookingInfo))
  }

  useEffect(() => {
    setDefaultBookingInfo()
    getReservedDays(data?.bookings)
  }, [])

  const clearAll = () => setDefaultBookingInfo()

  const userInfo = useSelector((state) => state.auth.user)

  return (
    <aside className={cls.root}>
      <div className={cls.aside}>
        <FilterDateButton
          values={parseDateString(order.dates)}
          handleChange={setDays}
          disabled={disableDays}
        />
        <Box mb={1.5} />
        <FilterTimeButton />
        <Box mb={1.5} />
        <FilterButton
          label={common[locale].for_whom}
          name='vacants'
          value={values?.vacants}
          list={vacants}
          handleChange={handleChange}
        />
        {userInfo ? (
          ''
        ) : (
          <>
            <Box mb={1.5} />
            <InputSimple
              label={common[locale].first_name}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Box mb={1.5} />
            <InputPhone
              label={common[locale].phone}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <Box mb={1.5} />
          </>
        )}
        <Box mb={1.5} />
        <InputSimple
          type='number'
          min={0}
          label={common[locale].people_count}
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <div className={cls.priceSection}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            {common[locale].price}
          </Typography>

          <div className={cls.row}>
            <Typography>
              {common[locale].price_per_day}/{order.businessDays}{' '}
              {common[locale].day}
            </Typography>
            <Typography>{numberToPrice(price, locale)}</Typography>
          </div>
          {order.holidays ? (
            <div className={cls.row}>
              <Typography>
                {common[locale].price_per_holiday}/{order.holidays}{' '}
                {common[locale].day}
              </Typography>
              <Typography>{numberToPrice(holidayPrice, locale)}</Typography>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={cls.totalSection}>
          <div className={cls.row}>
            <Typography variant='h4'>{common[locale].total}</Typography>
            <Typography variant='h4'>{separateNumber(totalPrice)}</Typography>
          </div>
        </div>
        <div className={cls.actions}>
          <div className={cls.row}>
            <Button
              fullWidth
              variant='contained'
              endIcon={<span className='mdi mdi-phone' />}
              onClick={handleClickBooking}
            >
              {loading ? (
                <CircularProgress color='inherit' size={18} />
              ) : (
                common[locale].contact
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
        <SuccessModal
          open={openModal}
          handleClose={handleCloseModal}
          data={data}
        />
      </div>
    </aside>
  )
}
