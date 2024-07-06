import React from 'react'
import { Popover, Typography } from '@mui/material'
import cls from './roomAndGuestsPopover.module.scss'
import { MinusIcon, PlusIcon } from '../icons/commonIcons'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  decrementAdult,
  decrementChildren,
  incrementAdult,
  incrementChildren,
} from 'redux/actions/bookingActions/bookingActions'

export default function RoomAndGuestsPopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  data,
}) {
  const { locale } = useRouter()
  const dispatch = useDispatch()

  const addAdult = () => {
    const adults = data.cartAdults + 1
    const canIncrement = !!data.prices.find((item) => item.person === adults)
    if (canIncrement) {
      dispatch(incrementAdult(data))
    }
  }

  const reduceAdult = () => {
    const adults = data.cartAdults - 1
    const canReduce = !!data.prices.find((item) => item.person === adults)
    if (canReduce) {
      dispatch(decrementAdult(data))
    }
  }

  const addChildren = () => {
    dispatch(incrementChildren(data))
  }

  const reduceChildren = () => {
    dispatch(decrementChildren(data))
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
        <div className={cls.wrapper}>
          <div className={cls.row}>
            <div className={cls.item}>
              <Typography variant='caption' className={cls.caption}>
                {common[locale].adultsAge}
              </Typography>
              <Typography variant='body2'>{common[locale].adults}</Typography>
            </div>
            <div className={cls.counter}>
              <button
                className={cls.roundBtn}
                disabled={1 == data.cartAdults}
                onClick={() => reduceAdult()}
              >
                <MinusIcon />
              </button>
              <Typography>{data.cartAdults ?? 0}</Typography>
              <button
                className={cls.roundBtn}
                disabled={data?.adult == data.cartAdults}
                onClick={() => addAdult()}
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.item}>
              <Typography variant='caption' className={cls.caption}>
                {common[locale].childrenAge}
              </Typography>
              <Typography variant='body2'>{common[locale].children}</Typography>
            </div>
            <div className={cls.counter}>
              <button
                className={cls.roundBtn}
                disabled={0 == data.cartChildren}
                onClick={() => reduceChildren()}
              >
                <MinusIcon />
              </button>
              <Typography>{data.cartChildren ?? 0}</Typography>
              <button
                className={cls.roundBtn}
                disabled={data?.children == data.cartChildren}
                onClick={() => addChildren()}
              >
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  )
}
