import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FilterDateButton from '../filterButton/filterDateButton'
import cls from './bookingMobile.module.scss'
import { useRouter } from 'next/router'
import { airportList } from 'constants/mock'
import { parseISO } from 'date-fns'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { common } from 'locales/common'
import { toast } from 'react-toastify'
import SwitchInput from '../switchInput/switchInput'
import FilterCheckButton from '../filterButton/filterCheckButton'
import {
  getBookingRooms,
  totalPriceSelector,
} from 'redux/selectors/hotelOrderSelector'
import {
  bookingDate,
  clearBookingRooms,
  setAirport,
  setPickupFromAirport,
} from 'redux/actions/bookingActions/bookingActions'
import { numberToPrice } from 'utils/numberToPrice'

export default function BookingHotelMobile({ data }) {
  const { locale, push } = useRouter()
  const dispatch = useDispatch()
  const { dates, days, pickup_from_airport, airport } = useSelector(
    (state) => state.booking,
    shallowEqual
  )
  const totalPrice = useSelector(
    (state) => totalPriceSelector(state),
    shallowEqual
  )
  const bookingRoomsList = useSelector(
    (state) => getBookingRooms(state),
    shallowEqual
  )

  const setDays = (days) => dispatch(bookingDate(days))

  const handleClickBooking = () => {
    if (!days) {
      toast.warning(common[locale].choose_arrival)
      return
    }
    if (bookingRoomsList.length === 0) {
      toast.warning(common[locale].choose_room)
      return
    }
    push(`${data.slug}/order-confirm`)
  }

  const clearBooking = () => dispatch(clearBookingRooms())

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
    <aside className={cls.root}>
      <div className={cls.aside}>
        <FilterDateButton
          values={parseDateString(dates)}
          handleChange={setDays}
        />
        {data.type === 'hotel' && (
          <Grid item xs={12} sm={12}>
            <Box mb={1.5} />
            <SwitchInput
              name='pickup_from_airport'
              label={common[locale].pick_up_from_the_airport}
              value={pickup_from_airport}
              onChanges={(event) =>
                dispatch(setPickupFromAirport(event.target.checked))
              }
            />
            <Box mb={1.5} />
            {pickup_from_airport && (
              <FilterCheckButton
                label={common[locale].airport_name}
                name='airport'
                value={airport}
                list={airportList}
                handleChange={(event) =>
                  dispatch(setAirport(event.target.value))
                }
              />
            )}
          </Grid>
        )}
      </div>
      <div className={cls.priceSection}>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          {common[locale].price}
        </Typography>
        <div className={cls.rowItem}>
          {bookingRoomsList.map((item, index) => (
            <div key={index + item.id} className={cls.roomItem}>
              <Typography>
                {item?.room?.translation?.title} / {days} {common[locale].day}
              </Typography>
              <Typography className={cls.price}>
                {numberToPrice(item.roomPrice, locale)}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={cls.footer}>
        <div className={cls.totalSection}>
          <div className={cls.row}>
            <Typography variant='h4'>{common[locale].total}</Typography>
            <Typography variant='h4'>
              {numberToPrice(totalPrice, locale)}
            </Typography>
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
              {common[locale].contact}
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={clearBooking}
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
