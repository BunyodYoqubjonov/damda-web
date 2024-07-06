import React, { useState } from 'react'
import { Checkbox, Typography } from '@mui/material'
import { FilterIcon, SearchIcon, TrashIcon } from '../icons/commonIcons'
import cls from './paymentsFilter.module.scss'
import FilterButton from '../filterButton/filterButton'
import { serviceTypes } from '../../constants/mock'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const payments = [{ label: 'All system', value: 'all_system' }]
const dates = [{ label: 'Last', value: 'last' }]

export default function PaymentsFilter() {
  const { locale } = useRouter()
  const [values, setValues] = useState({
    date: 'last',
    service_type: 'hotel',
    payment_system: 'all_system',
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className={cls.root}>
      <Typography variant='h2' className={cls.title}>
        {common[locale].Payment_history}
      </Typography>
      <div className={cls.wrapper}>
        <div className={cls.actions}>
          <Checkbox name='select_all' color='secondary' disableRipple />
          <button className={cls.trashBtn}>
            <TrashIcon />
          </button>
        </div>
        <div className={cls.search}>
          <input
            name='search'
            className={cls.input}
            placeholder='Search hotels'
            autoComplete='off'
          />
          <button className={cls.searchIcon}>
            <SearchIcon />
          </button>
        </div>
        <div className={cls.item}>
          <FilterButton
            label='Date'
            name='date'
            value={values.date}
            list={dates}
            handleChange={handleChange}
          />
        </div>
        <div className={cls.item}>
          <FilterButton
            label='Service type'
            name='service_type'
            value={values.service_type}
            list={serviceTypes}
            handleChange={handleChange}
          />
        </div>
        <div className={cls.item}>
          <FilterButton
            label='Payment system'
            name='payment_system'
            value={values.payment_system}
            list={payments}
            handleChange={handleChange}
          />
        </div>
        <div className={cls.filter}>
          <button className={cls.outlinedBtn}>
            <FilterIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
