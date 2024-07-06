import React from 'react'
import { Popover, Typography } from '@mui/material'
import cls from './popover.module.scss'
import { DayPicker } from 'react-day-picker'
import ru from 'date-fns/locale/ru'
import uz from 'date-fns/locale/uz'
import uzk from 'date-fns/locale/uz-Cyrl'
import en from 'date-fns/locale/en-US'
import { useRouter } from 'next/router'
import { common2 } from '../../locales/common2'
import { format } from 'date-fns'

export default function DateRangePopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  value = '',
  handleChange = () => {},
  disabled,
}) {
  const { locale } = useRouter()
  const StartDatePlaceholder = () => (
    <span className={cls.placeholderText}>
      {common2[locale].Select_start_date}
    </span>
  )

  const EndDatePlaceholder = () => (
    <span className={cls.placeholderText}>
      {common2[locale].Select_end_date}
    </span>
  )

  const getLocale = (key) => {
    switch (key) {
      case 'uz':
        return uz
      case 'ru':
        return ru
      case 'uzk':
        return uzk

      default:
        return en
    }
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      <div className={cls.root}>
        <div className={`${cls.wrapper} ${cls.datepickerWrapper}`}>
          <DayPicker
            fromDate={new Date()}
            disabled={disabled}
            className='datepicker'
            mode='range'
            selected={value}
            onSelect={handleChange}
            locale={getLocale(locale)}
            showOutsideDays
          />
          <div className={cls.footer}>
            <Typography>
              {value?.from ? (
                format(value.from, 'dd MMM yyyy', { locale: ru })
              ) : (
                <StartDatePlaceholder />
              )}{' '}
              &#8212;{' '}
              {value?.to ? (
                format(value.to, 'dd MMM yyyy', { locale: ru })
              ) : (
                <EndDatePlaceholder />
              )}
            </Typography>
          </div>
        </div>
      </div>
    </Popover>
  )
}
