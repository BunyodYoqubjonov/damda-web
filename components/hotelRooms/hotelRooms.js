import React from 'react'
import { Typography } from '@mui/material'
import cls from './hotelRooms.module.scss'
import HotelCardSimple from '../hotelCardSimple/hotelCardSimple'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import SwitchInput from '../switchInput/switchInput'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setIsResident } from 'redux/actions/bookingActions/bookingActions'

export default function HotelRooms() {
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const { isResident, bookingRooms } = useSelector(
    (state) => state.booking,
    shallowEqual
  )

  return (
    <div className={cls.root}>
      <div className={cls.wrapper}>
        <div className={cls.header}>
          <div className={cls.body}>
            <Typography variant='h2' sx={{ fontWeight: 500, mb: 2.5 }}>
              {common[locale].youRooms}
            </Typography>
            <div className={cls.item}>
              <Typography>
                <SwitchInput
                  name='residence'
                  label={common[locale].resident}
                  value={isResident}
                  onChanges={(event) =>
                    dispatch(setIsResident(event.target.checked))
                  }
                />
              </Typography>
            </div>
            {bookingRooms.map((item, index) => (
              <div key={index} id='rooms'>
                <HotelCardSimple data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
