import React from 'react'
import { Checkbox, FormControlLabel, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import FilterButton from '../filterButton/filterButton'
import FilterDateButton from '../filterButton/filterDateButton'
import SwitchInput from '../switchInput/switchInput'
import cls from './orderPayment.module.scss'

export default function OrderWithPay() {
  return (
    <>
      <div className={cls.wrapper} style={{ borderRadius: '0 15px 15px 15px' }}>
        <FilterDateButton start_date='Fri, 12 Aug' end_date='Sat, 13 Aug' />
        <Box pb={1.5} />
        <SwitchInput label='Pick up from the airport' value='Yes' />
        <Box pb={1.5} />
        <FilterButton
          label='Airport name'
          value='Tashkent International Airport'
        />
        <Box pb={1.5} />
        <div className={cls.inputWrapper}>
          <label htmlFor='coupon' className={cls.label}>
            Enter a coupon
          </label>
          <input
            id='coupon'
            name='coupon'
            className={cls.input}
            defaultValue='DAMDA2021'
            autoComplete='off'
          />
        </div>
        <FilterButton label='Payment type' value='Credit  or debit card' />
        <Box pb={1.5} />
        <div
          className={cls.inputWrapper}
          style={{ padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <div className={cls.item}>
            <label htmlFor='card_number' className={cls.label}>
              Card number
            </label>
            <input
              id='card_number'
              name='card_number'
              className={cls.input}
              defaultValue='8600 1309 0029 0945'
              autoComplete='off'
            />
          </div>
          <div className={cls.item}>
            <label htmlFor='expiration_date' className={cls.label}>
              Expiration
            </label>
            <input
              id='expiration_date'
              name='expiration_date'
              className={cls.input}
              defaultValue='04/28'
              autoComplete='off'
            />
          </div>
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
            Pay
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
    </>
  )
}
