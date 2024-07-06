import React from 'react'
import { Popover, Typography } from '@mui/material'
import cls from './dachaGuestsPopover.module.scss'
import { MinusIcon, PlusIcon } from '../icons/commonIcons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  decrementAdults,
  decrementChildren,
  incrementAdults,
  incrementChildren,
} from '../../redux/actions/orderActions/orderActions'

export default function DachaGuestsPopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
}) {
  const dispatch = useDispatch()
  const { adult, children } = useSelector(
    (state) => state.order.order,
    shallowEqual
  )

  const addAdults = () => {
    dispatch(incrementAdults())
  }

  const addChildren = () => {
    dispatch(incrementChildren())
  }

  const reduceAdults = () => {
    dispatch(decrementAdults())
  }

  const reduceChildren = () => {
    dispatch(decrementChildren())
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
                Ages 18 or above
              </Typography>
              <Typography variant='body2'>Adults</Typography>
            </div>
            <div className={cls.counter}>
              <button className={cls.roundBtn} onClick={reduceAdults}>
                <MinusIcon />
              </button>
              <Typography>{adult}</Typography>
              <button className={cls.roundBtn} onClick={addAdults}>
                <PlusIcon />
              </button>
            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.item}>
              <Typography variant='caption' className={cls.caption}>
                Ages 0-17
              </Typography>
              <Typography variant='body2'>Children</Typography>
            </div>
            <div className={cls.counter}>
              <button className={cls.roundBtn} onClick={reduceChildren}>
                <MinusIcon />
              </button>
              <Typography>{children}</Typography>
              <button className={cls.roundBtn} onClick={addChildren}>
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  )
}
