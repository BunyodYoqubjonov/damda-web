import React, { useState } from 'react'
import { Tabs } from '@mui/material'
import cls from './orderPayment.module.scss'
import { Box } from '@mui/system'
import { CustomTab } from '../tabs/customTab'
import OrderWithoutPay from './orderWithoutPay'
import OrderInstallment from './orderInstallment'
import OrderWithPay from './orderWithPay'

function a11yProps(index) {
  return {
    id: `order-payment-${index}`,
    'aria-controls': `order-payment-tabpanel-${index}`,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          className={cls.tabPanel}
          sx={{ borderRadius: value ? 3 : '0 12px 12px 12px' }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

export default function OrderPayment() {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={cls.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='order payment tab'
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <CustomTab label='Full pay' {...a11yProps(0)} />
        <CustomTab label='Installment' {...a11yProps(1)} />
        <CustomTab label='Without pay' {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <OrderWithPay />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderInstallment />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderWithoutPay />
      </TabPanel>
    </div>
  )
}
