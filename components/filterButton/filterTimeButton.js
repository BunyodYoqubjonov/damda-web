import React from 'react'
import cls from './filterButton.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import FilterCheckButton from './filterCheckButton'
import { checkIn, checkOut } from '../../constants/mock'
import { useDispatch, useSelector } from 'react-redux'
import {
  bookingInDate,
  bookingOutDate,
} from '../../redux/actions/orderActions/orderActions'

export default function FilterTimeButton() {
  const { locale } = useRouter()
  const dispatch = useDispatch()

  const handleChangeInData = (event) =>
    dispatch(bookingInDate(event.target.value))
  const handleChangeOutData = (event) =>
    dispatch(bookingOutDate(event.target.value))
  const value = useSelector((state) => state.order.order)

  return (
    <>
      <button className={cls.outlinedButton}>
        <div className={cls.wrapper}>
          <FilterCheckButton
            label={common[locale].check_in}
            value={value.inDate}
            name='checkIn'
            list={checkIn}
            handleChange={handleChangeInData}
            className={cls.checkIn}
          />
          <div style={{ marginRight: '10px' }} />
          <FilterCheckButton
            label={common[locale].check_out}
            value={value.outDate}
            name='checkOut'
            list={checkOut}
            handleChange={handleChangeOutData}
            className={cls.checkIn}
          />
        </div>
      </button>
    </>
  )
}
