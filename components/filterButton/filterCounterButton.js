import React from 'react'
import { MinusIcon, PlusIcon } from '../icons/commonIcons'
import { Typography } from '@mui/material'
import cls from './filterButton.module.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  addToRooms,
  removeToRooms,
} from 'redux/actions/bookingActions/bookingActions'
import { toast } from 'react-toastify'
import { common } from 'locales/common'
import { useRouter } from 'next/router'

export default function FilterCounterButton({ data }) {
  const dispatch = useDispatch()
  const { days } = useSelector((state) => state.booking, shallowEqual)
  const { locale } = useRouter()

  const increment = (data) => {
    if (days === 0) {
      toast.warn(common[locale].choose_dates)
    } else {
      dispatch(addToRooms(data))
    }
  }

  const decrement = (data) => {
    dispatch(removeToRooms(data))
  }

  return (
    <div className={cls.outlinedButton}>
      <div className={cls.row}>
        <div className={cls.item}>
          <Typography variant='caption' className={cls.caption}>
            {common[locale].Number_of_rooms}
          </Typography>
          <Typography variant='body2'>{common[locale].rooms}</Typography>
        </div>
        <div className={cls.counter}>
          <button
            className={cls.roundBtn}
            disabled={data.cartQuantity === 0}
            onClick={() => decrement(data)}
          >
            <MinusIcon />
          </button>
          <Typography>{data.cartQuantity}</Typography>
          <button
            className={cls.roundBtn}
            disabled={data.cartQuantity == data.quantity}
            onClick={() => increment(data)}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
