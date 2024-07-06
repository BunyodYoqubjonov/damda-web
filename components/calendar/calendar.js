import React, { useState } from 'react'
import CalendarTable from './calendarTable'
import CalendarCaption from './calendarCaption'
import { addMonths } from 'date-fns'

export default function Calendar({ disabled, locale }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const goToPrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1))
  }

  return (
    <div className='datepicker'>
      <div className='rdp-months'>
        <div className='rdp-month rdp-caption_start rdp-caption_end'>
          <CalendarCaption
            locale={locale}
            date={currentMonth}
            goToNextMonth={goToNextMonth}
            goToPrevMonth={goToPrevMonth}
          />
          <CalendarTable
            locale={locale}
            date={currentMonth}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}
