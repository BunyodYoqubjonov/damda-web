import React, { useEffect, useState } from 'react'
import { format, getHours, isPast, isSameDay, isToday } from 'date-fns'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'

export default function CalendarDay({ day, disabledDays = [] }) {
  const [disabled, setDisabled] = useState('')
  const { locale } = useRouter()
  const today = isToday(day)
  const past = isPast(day)
  const disabledHalfDay =
    disabled === 'disabled_half_top' || disabled === 'disabled_half_bottom'

  useEffect(() => {
    const thisDay = disabledDays.find((item) => isSameDay(day, item))
    if (thisDay) {
      const hour = getHours(thisDay)
      setDisabled(defineDisabledDays(hour))
    }
  }, [day])

  function defineDisabledDays(hour) {
    switch (hour) {
      // check_in times: [10, 19]
      case 10:
        return 'disabled'
      case 19:
        return 'disabled_half_bottom'
      // check_out times: [9, 17]
      case 9:
        return ''
      case 17:
        return 'disabled_half_top'

      default:
        return 'disabled'
    }
  }

  return (
    <button
      className={`rdp-button_reset rdp-button rdp-day ${
        (today) ? 'rdp-day_today' : 'rdp-day_outside'
      } rdp-day_${disabled} ${(past && !today) ? "rdp-day_disabled" :""}`}
      type='button'
      disabled
    >
      <span>{format(day, 'd')}</span>
      {disabledHalfDay && (
        <span className='half_day_text'>{common2[locale].half_day}</span>
      )}
    </button>
  )
}
