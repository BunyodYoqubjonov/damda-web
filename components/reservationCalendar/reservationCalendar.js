import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import cls from './reservationCalendar.module.scss'
import { navigation } from 'locales/navigation'
import { useRouter } from 'next/router'
import { common } from 'locales/common'
import { numberToPrice } from 'utils/numberToPrice'
import { getLocale } from 'utils/getLocale'
import { stringToDate } from 'utils/stringToDate'
import Calendar from 'components/calendar/calendar'

const defaultState = {
  from: '',
  to: '',
  enteredTo: '', // Keep track of the last day for mouseEnter.
}

export default function ReservationCalendar({ data, showPricing = true }) {
  const [state, setState] = useState(defaultState)
  const [disabledDays, setDisabledDays] = useState([])
  const { locale } = useRouter()

  function handleDayClick(day) {
    console.log('click day => ', day)
  }

  useEffect(() => {
    if (data.bookings?.length) {
      getReservedDays(data.bookings)
    }
  }, [data])

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
    setDisabledDays(days)
  }

  return (
    <div id='reservation_calendar' className={cls.root}>
      <Typography variant='h6'>
        {navigation[locale].reservation_calendar}
      </Typography>
      <div className={cls.wrapper}>
        {/* <DayPicker
          className='datepicker'
          disabled={disabledDays}
          locale={getLocale(locale)}
          selectedDays={[state.from, { from: state.from, to: state.enteredTo }]}
          modifiers={{ start: state.from, end: state.enteredTo }}
          onDayClick={handleDayClick}
          showOutsideDays
        /> */}
        <Calendar
          className='datepicker'
          disabled={disabledDays}
          locale={getLocale(locale)}
          selectedDays={[state.from, { from: state.from, to: state.enteredTo }]}
          modifiers={{ start: state.from, end: state.enteredTo }}
          onDayClick={handleDayClick}
          showOutsideDays
        />
        {showPricing && (
          <table className={cls.priceInfo}>
            <thead />
            <tbody>
              <tr>
                <td style={{ paddingBottom: '10px' }}>
                  <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>
                    {common[locale].price_updated}:{' '}
                  </Typography>
                </td>
                <td
                  style={{ paddingBottom: '10px' }}
                  className={cls.secondColumn}
                >
                  <Typography variant='caption'>
                    {common[locale].price_per_day} /{' '}
                    {data?.holiday_price && common[locale].holiday}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography>
                    {stringToDate(data?.updated_at, locale)}
                  </Typography>
                </td>
                <td className={cls.secondColumn}>
                  <Typography
                    sx={{
                      fontSize: 26,
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {numberToPrice(data?.price, locale)}
                    {data?.holiday_price &&
                      ' / ' + numberToPrice(data?.holiday_price, locale)}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
