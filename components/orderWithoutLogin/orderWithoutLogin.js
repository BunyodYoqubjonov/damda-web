import React from 'react'
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material'
import cls from './orderWithoutLogin.module.scss'

export default function OrderWithoutLogin() {
  return (
    <div className={cls.root}>
      <div className={cls.wrapper}>
        <div className={cls.inputWrapper}>
          <label htmlFor='first_name' className={cls.label}>
            First name
          </label>
          <input
            id='first_name'
            name='first_name'
            className={cls.input}
            defaultValue='Magamed'
            autoComplete='off'
          />
        </div>
        <div className={cls.inputWrapper}>
          <label htmlFor='last_name' className={cls.label}>
            Last name
          </label>
          <input
            id='last_name'
            name='last_name'
            className={cls.input}
            defaultValue='Faradey'
            autoComplete='off'
          />
        </div>
        <div className={cls.inputWrapper}>
          <label htmlFor='phone_number' className={cls.label}>
            Phone number
          </label>
          <input
            id='phone_number'
            name='phone_number'
            className={cls.input}
            defaultValue='+998 90 000 00 00'
            autoComplete='off'
          />
        </div>

        <div className={cls.priceSection}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            Price
          </Typography>
          <div className={cls.row}>
            <Typography>Price per day / 2 day</Typography>
            <Typography>$400</Typography>
          </div>
          <div className={cls.row}>
            <Typography>Price for the holiday / 1 day</Typography>
            <Typography>$250</Typography>
          </div>
          <div className={cls.row}>
            <Typography>Special sale</Typography>
            <Typography sx={{ color: 'red' }}>-$20</Typography>
          </div>
        </div>
        <div className={cls.totalSection}>
          <div className={cls.row}>
            <Typography variant='h4'>Total</Typography>
            <Typography variant='h4'>$630</Typography>
          </div>
        </div>
        <div className={cls.checkboxWrapper}>
          <FormControlLabel
            control={<Checkbox name='terms' defaultChecked />}
            label='I agree to the terms of service'
          />
        </div>
        <div className={cls.actions}>
          <Button fullWidth variant='contained' size='large'>
            Save and continue
          </Button>
        </div>
      </div>

      <div className={cls.infoWrapper}>
        <p className={cls.text}>
          Damda coupons can not be redeemed for this booking. Prices include all{' '}
          <a href='#'>taxes and fees</a> charged by Damda.
        </p>
      </div>

      <div className={cls.infoWrapper}>
        <p className={cls.text}>
          *To cancel all payments or bookings, please read the{' '}
          <a href='#'>Cancellation Policy</a>.
        </p>
      </div>
    </div>
  )
}
