import React from 'react'
import { Popover, Typography } from '@mui/material'
import cls from './roomAndGuestsPopover.module.scss'
import { MinusIcon, PlusIcon } from '../icons/commonIcons'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function RoomAndGuestsPopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  value,
  handleChange = () => {},
  list = [],
  name = '',
  isDacha,
}) {
  const { adult = 0, children = 0, room = 0 } = value
  const { locale } = useRouter()
  const increment = (key) => {
    let val = value[key] ? ++value[key] : 1
    handleChange(key, val)
  }

  const decrement = (key) => {
    if (value[key] == 1 && key !== 'children') {
      return
    }
    if (!value[key]) {
      return
    }
    let val = value[key] ? --value[key] : 0
    handleChange(key, val)
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
              {!isDacha && (
                <Typography variant='caption' className={cls.caption}>
                  {common[locale].between}
                </Typography>
              )}
              <Typography variant='body2'>{common[locale].rooms}</Typography>
            </div>
            <div className={cls.counter}>
              <button
                className={cls.roundBtn}
                onClick={() => decrement('room')}
              >
                <MinusIcon />
              </button>
              <Typography>{room}</Typography>
              <button
                className={cls.roundBtn}
                onClick={() => increment('room')}
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.item}>
              {!isDacha && (
                <Typography variant='caption' className={cls.caption}>
                  {common[locale].adultsAge}
                </Typography>
              )}
              <Typography variant='body2'>
                {isDacha ? common[locale].guests : common[locale].adults}
              </Typography>
            </div>
            <div className={cls.counter}>
              <button
                className={cls.roundBtn}
                onClick={() => decrement('adult')}
              >
                <MinusIcon />
              </button>
              <Typography>{adult}</Typography>
              <button
                className={cls.roundBtn}
                onClick={() => increment('adult')}
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {!isDacha && (
            <div className={cls.row}>
              <div className={cls.item}>
                <Typography variant='caption' className={cls.caption}>
                  {common[locale].childrenAge}
                </Typography>
                <Typography variant='body2'>
                  {common[locale].children}
                </Typography>
              </div>
              <div className={cls.counter}>
                <button
                  className={cls.roundBtn}
                  onClick={() => decrement('children')}
                >
                  <MinusIcon />
                </button>
                <Typography>{children}</Typography>
                <button
                  className={cls.roundBtn}
                  onClick={() => increment('children')}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          )}

          {/* <div className={cls.footer}>*/}
          {/*  <Typography variant='body2'>Children’s age (required) </Typography>*/}
          {/*  <div className={cls.row}>*/}
          {/*    <div className={cls.item}>*/}
          {/*      <select*/}
          {/*        name='child_age_1'*/}
          {/*        defaultValue={6}*/}
          {/*        className={cls.select}*/}
          {/*      >*/}
          {/*        <option value={6}>6 years old</option>*/}
          {/*        <option value={7}>7 years old</option>*/}
          {/*        <option value={8}>8 years old</option>*/}
          {/*      </select>*/}
          {/*    </div>*/}
          {/*    <div className={cls.item}>*/}
          {/*      <select*/}
          {/*        name='child_age_2'*/}
          {/*        defaultValue={8}*/}
          {/*        className={cls.select}*/}
          {/*      >*/}
          {/*        <option value={6}>6 years old</option>*/}
          {/*        <option value={7}>7 years old</option>*/}
          {/*        <option value={8}>8 years old</option>*/}
          {/*      </select>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div> */}
        </div>
      </div>
    </Popover>
  )
}
