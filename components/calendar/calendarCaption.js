import React from 'react'
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material'
import { format } from 'date-fns'

export default function CalendarCaption({
  date,
  locale,
  goToNextMonth,
  goToPrevMonth,
}) {
  return (
    <div className='rdp-caption'>
      <h2 className='rdp-caption_label'>
        {format(date, 'LLLL y', { locale })}
      </h2>
      <div className='rdp-nav'>
        <button
          type='button'
          className='rdp-button_reset rdp-button rdp-nav_button rdp-nav_button_previous'
          onClick={goToPrevMonth}
        >
          <ArrowBackIosNewOutlined />
        </button>
        <button
          type='button'
          className='rdp-button_reset rdp-button rdp-nav_button rdp-nav_button_next'
          onClick={goToNextMonth}
        >
          <ArrowForwardIosOutlined />
        </button>
      </div>
    </div>
  )
}
