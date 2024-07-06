import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FilterButton from '../filterButton/filterButton'
import FilterDateButton from '../filterButton/filterDateButton'
import cls from './bookingMobile.module.scss'
import { useRouter } from 'next/router'
import { vacants } from 'constants/mock'
import { format, parseISO } from 'date-fns'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  setBookingDate,
  setBookingInfo,
} from 'redux/actions/orderActions/orderActions'
import { common } from 'locales/common'
import FilterTimeButton from '../filterButton/filterTimeButton'
import axios from 'utils/axios'
import { toast } from 'react-toastify'
import SuccessModal from './successModal'
import { separateNumber } from '../numberSplice'
import { numberToPrice } from 'utils/numberToPrice'
import {
  orderBusinessDaysPriceSelector,
  orderHolidaysPriceSelector,
  orderTotalPriceSelector,
} from 'redux/selectors/orderSelector'
import bookingService from 'services/BookingService'
import InputSimple from 'components/inputSimple/inputSimple'
import InputPhone from 'components/inputSimple/inputPhone'

export default function BookingMobile({ data }) {
  const { locale } = useRouter()
  const router = useRouter()
  const [values, setValues] = useState({ vacants: 'family' })
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
  const [count, setCount] = useState()
  const [phone, setPhone] = useState(null)
  const [name, setName] = useState('')

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

    setLoading(true)
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
      registration_time: inOutData.outDate + ',' + inOutData.inDate,
      pick_up: false,
      airport_id: null,
      lang: locale,
      holidayDays: order.holidayDays,
      businessDays: order.businessDays,
      people_count: Number(count),
    }

    bookingService
      .create(postData)
      .then(() => {
        setOpenModal(true)
        clearAll()
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
    setCount('')
    dispatch(setBookingInfo(bookingInfo))
  }

  useEffect(() => {
    setDefaultBookingInfo()
  }, [])

  const clearAll = () => setDefaultBookingInfo()

  const userInfo = useSelector((state) => state.auth.user)

  const logOut = () => router.push('/login')

  // useEffect(() => {
  //   const dates = data?.reserved?.flatMap((item) => {
  //     return item?.flatMap((days) => {
  //       return new Date(days.year, days.month - 1, days.day)
  //     })
  //   })
  //   setDisableDays(dates)
  // }, [data])

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
      </div>
      <div className={cls.footer}>
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
          <div className={cls.row}>
            {order.holidays === 0 ? null : (
              <>
                <Typography>
                  {common[locale].price_per_holiday}/{order.holidays}{' '}
                  {common[locale].day}
                </Typography>
                <Typography>{numberToPrice(holidayPrice, locale)}</Typography>
              </>
            )}
          </div>
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
      </div>
      <SuccessModal
        open={openModal}
        handleClose={handleCloseModal}
        data={data}
      />
    </aside>
  )
}
