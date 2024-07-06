import React, { useState } from 'react'
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import FilterDateButton from '../filterButton/filterDateButton'
import SwitchInput from '../switchInput/switchInput'
import cls from './orderPayment.module.scss'
import { useRouter } from 'next/router'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  getBookingRooms,
  totalPriceSelector,
} from 'redux/selectors/hotelOrderSelector'
import {
  bookingDate,
  clearBookingRooms,
  setAirport,
  setIsResident,
  setPickupFromAirport,
} from 'redux/actions/bookingActions/bookingActions'
import FilterCheckButton from 'components/filterButton/filterCheckButton'
import { common } from 'locales/common'
import InputSimple from 'components/inputSimple/inputSimple'
import { numberToPrice } from 'utils/numberToPrice'
import { airportList } from 'constants/mock'
import { common2 } from 'locales/common2'
import SuccessModal from 'components/bookingInfo/successModal'
import bookingService from 'services/BookingService'
import { format } from 'date-fns'
import InputPhone from 'components/inputSimple/inputPhone'

export default function OrderWithoutPay({ data }) {
  const { locale, push } = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(true)
  const [phone, setPhone] = useState(null)
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth, shallowEqual)
  const totalPrice = useSelector(
    (state) => totalPriceSelector(state),
    shallowEqual
  )
  const bookingRoomsList = useSelector(
    (state) => getBookingRooms(state),
    shallowEqual
  )
  const { dates, days, isResident, airport, pickup_from_airport } = useSelector(
    (state) => state.booking,
    shallowEqual
  )

  const setDays = (days) => dispatch(bookingDate(days))

  const handleRedirect = () => {
    let url
    switch (data.type) {
      case 'hotel':
        url = '/hotels'
        break
      case 'sanatorium':
        url = '/sanatorium'
        break
      case 'zone':
        url = '/recreation-area'
        break

      default:
        break
    }
    push(url)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    clearBooking()
    handleRedirect()
  }

  const filterBookinglist = bookingRoomsList.map((item) => ({
    residence_room_id: item.id,
    adults: item.cartAdults,
    children: item.cartChildren,
    breakfast: Number(item.isBreakfast),
    price: item.roomPrice,
    quantity: item.cartQuantity,
  }))

  const clearBooking = () => dispatch(clearBookingRooms())

  const handleClickBooking = () => {
    if (!dates) {
      toast.warning(common[locale].choose_arrival)
      return
    }
    if (bookingRoomsList.length === 0) {
      toast.warning(common[locale].choose_room)
      return
    }
    if (!user && (phone === null || name === '')) {
      toast.warning(common[locale].nameAndPhone)
      return
    }

    const date = [
      format(dates.from, 'yyyy-MM-dd'),
      format(dates.to, 'yyyy-MM-dd'),
    ]

    const payload = {
      residence_id: data.id,
      user_id: user?.id,
      status: 'created',
      price: totalPrice,
      registration_date: date.join(','),
      booking_details: filterBookinglist,
    }
    console.log('payload => ', payload)

    if (!user) {
      payload.name = name
      payload.phone = parseInt(phone)
    }

    setLoading(true)
    bookingService
      .create(payload)
      .then(() => setOpenModal(true))
      .finally(() => setLoading(false))
  }

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

  return (
    <div className={cls.wrapper} style={{ borderRadius: 15 }}>
      <FilterDateButton
        values={parseDateString(dates)}
        handleChange={setDays}
      />
      <Box pb={1.5} />
      <SwitchInput
        name='residence'
        label={common[locale].resident}
        value={isResident}
        onChanges={(event) => dispatch(setIsResident(event.target.checked))}
      />
      <Box pb={1.5} />
      <SwitchInput
        name='pick_up'
        label={common[locale].pick_up_from_the_airport}
        value={pickup_from_airport}
        onChanges={(event) =>
          dispatch(setPickupFromAirport(event.target.checked))
        }
      />
      <Box pb={1.5} />
      {pickup_from_airport && (
        <FilterCheckButton
          label={common[locale].airport_name}
          name='airport'
          value={airport}
          list={airportList}
          handleChange={(event) => dispatch(setAirport(event.target.value))}
        />
      )}
      {!user && (
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
      <div className={cls.priceSection}>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          {common[locale].price}
        </Typography>
        {bookingRoomsList.map((item, index) => (
          <div key={index + item.id} className={cls.row}>
            <Typography>
              {item?.room?.translation?.title} / {days} {common[locale].day}
            </Typography>
            <Typography className={cls.price}>
              {numberToPrice(item.roomPrice, locale)}
            </Typography>
          </div>
        ))}
      </div>
      <div className={cls.totalSection}>
        <div className={cls.row}>
          <Typography variant='h4'>{common[locale].total}</Typography>
          <Typography variant='h4'>
            {numberToPrice(totalPrice, locale)}
          </Typography>
        </div>
      </div>
      <div className={cls.checkboxWrapper}>
        <FormControlLabel
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          control={<Checkbox name='terms' defaultChecked />}
          label={
            <div>
              {common2[locale].i_agree_to_the}{' '}
              <a href='/terms' target='_blank' rel='noreferer noopener'>
                {common2[locale].terms_of_service}
              </a>
            </div>
          }
        />
      </div>
      <div className={cls.actions}>
        <Button
          fullWidth
          variant='contained'
          size='large'
          disabled={!agreed}
          onClick={handleClickBooking}
        >
          {loading ? (
            <CircularProgress color='inherit' size={18} />
          ) : (
            common[locale].booking
          )}
        </Button>
      </div>
      <SuccessModal
        open={openModal}
        handleClose={handleCloseModal}
        data={data}
      />
    </div>
  )
}
