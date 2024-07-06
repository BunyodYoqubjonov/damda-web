import React from 'react'
import cls from './filterButton.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import FilterCheckButton from './filterCheckButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  bookingInDate,
  bookingOutDate,
} from '../../redux/actions/orderActions/orderActions'

export default function FilterTimeButton({ regions }) {
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
            label={common[locale].from}
            value={value.inDate}
            name='from'
            list={regions}
            handleChange={handleChangeInData}
            className={cls.checkIn}
          />
          <div style={{ marginRight: '10px' }} />
          <FilterCheckButton
            label={common[locale].to}
            value={value.outDate}
            name='to'
            list={regions}
            handleChange={handleChangeOutData}
            className={cls.checkIn}
          />
        </div>
      </button>
    </>
  )
}
