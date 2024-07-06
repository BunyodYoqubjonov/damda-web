import React from 'react'
import { Container } from '@mui/system'
import PaymentsFilter from '../paymentsFilter/paymentsFilter'
import cls from './paymentsTable.module.scss'
import { Checkbox, Typography } from '@mui/material'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const rows = [
  {
    service_type: 'Hotel',
    status: 'success',
    price: '$350',
    payment_type: 'Uzcard',
  },
  {
    service_type: 'Summer house',
    status: 'success',
    price: '$470',
    payment_type: 'Wallet',
  },
  {
    service_type: 'Hotel',
    status: 'failed',
    price: '$230',
    payment_type: 'Visa',
  },
  {
    service_type: 'Resort',
    status: 'success',
    price: '$380',
    payment_type: 'Visa',
  },
  {
    service_type: 'Sanatorium',
    status: 'success',
    price: '$700',
    payment_type: 'Uzcard',
  },
]

export default function PaymentsTable() {
  const { locale } = useRouter()
  return (
    <div className={cls.root}>
      <Container>
        <PaymentsFilter />

        <div className={cls.wrapper}>
          {rows.map((item, index) => (
            <div key={index} className={cls.row}>
              <div className={cls.title}>
                <Checkbox
                  name='select'
                  defaultChecked
                  color='secondary'
                  disableRipple
                />
                <div className={cls.name}>
                  <Typography className={cls.heading}>
                    {item.service_type}
                  </Typography>
                  <Typography variant='caption'>
                    {common[locale].Service_type}
                  </Typography>
                </div>
              </div>
              <div className={cls.item} style={{ flex: '0 0 14%' }}>
                <Typography className={cls.heading}>Aug 12, 2021</Typography>
                <Typography variant='caption'>
                  {common[locale].Payment_date}
                </Typography>
              </div>
              <div className={cls.item} style={{ flex: '0 0 17%' }}>
                <Typography className={cls.heading}>
                  9860 **** **** **01
                </Typography>
                <Typography variant='caption'>Tojiboyev Jovik </Typography>
              </div>
              <div className={cls.item} style={{ flex: '0 0 14%' }}>
                <Typography className={cls.heading}>
                  {item.payment_type}
                </Typography>
                <Typography variant='caption'>
                  {common[locale].Payment_system}
                </Typography>
              </div>

              <div className={cls.item} style={{ flex: '0 0 9%' }}>
                <Typography className={cls.heading}>{item.price}</Typography>
                <Typography variant='caption'>
                  {common[locale].price}
                </Typography>
              </div>

              <div className={cls.item} style={{ flex: '0 0 14%' }}>
                <Typography className={cls.heading}>
                  {common[locale].Description}
                </Typography>
                <Typography variant='caption'>I paid for the hotel</Typography>
              </div>

              <div className={cls.item} style={{ flex: '0 0 12%' }}>
                <Typography
                  className={cls.heading}
                  sx={{
                    textTransform: 'capitalize',
                    color:
                      item.status === 'failed' ? 'common.red' : 'common.green',
                  }}
                >
                  {item.status}
                </Typography>
                <Typography variant='caption'>
                  {common[locale].Payment_status}
                </Typography>
              </div>
            </div>
          ))}

          {rows.map((item, index) => (
            <div key={index} className={cls.card}>
              <Checkbox
                name='select'
                defaultChecked
                color='secondary'
                disableRipple
              />
              <div className={cls.wrapper}>
                <div className={cls.header}>
                  <div className={cls.name}>
                    <Typography className={cls.heading}>
                      9860 **** **** **01
                    </Typography>
                    <Typography variant='caption'>Tojiboyev Jovik </Typography>
                  </div>
                  <div className={cls.price}>
                    <Typography className={cls.heading}>
                      {item.price}
                    </Typography>
                    <Typography variant='caption'>
                      {common[locale].price}
                    </Typography>
                  </div>
                </div>
                <div className={cls.body}>
                  <div className={cls.row}>
                    <div className={cls.item}>
                      <Typography className={cls.heading}>
                        {item.service_type}
                      </Typography>
                      <Typography variant='caption'>
                        {common[locale].Service_type}
                      </Typography>
                    </div>

                    <div className={cls.item}>
                      <Typography className={cls.heading}>
                        Aug 12, 2021
                      </Typography>
                      <Typography variant='caption'>
                        {common[locale].Payment_date}
                      </Typography>
                    </div>

                    <div className={cls.item}>
                      <Typography
                        className={cls.heading}
                        sx={{
                          textTransform: 'capitalize',
                          color:
                            item.status === 'failed'
                              ? 'common.red'
                              : 'common.green',
                        }}
                      >
                        {item.status}
                      </Typography>
                      <Typography variant='caption'>
                        {common[locale].Payment_status}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
