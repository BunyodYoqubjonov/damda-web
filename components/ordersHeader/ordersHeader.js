import React, { useState } from 'react'
import cls from './ordersHeader.module.scss'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'

export default function OrdersHeader() {
  const { locale, query, push } = useRouter()
  const [currentTab, setCurrentTab] = useState(query.state || 'upcoming')

  const handleClick = (event, tab) => {
    event.preventDefault()
    setCurrentTab(tab)
    push({
      pathname: '',
      query: {
        state: tab,
      },
    })
  }

  return (
    <div className={cls.root}>
      <div className={cls.header}>
        <Typography variant='h1' className={cls.title}>
          {navigation[locale].order_history}
        </Typography>
        <div className={cls.tabs}>
          <a
            href='#upcoming'
            className={`${cls.tab} ${
              currentTab === 'upcoming' ? cls.active : ''
            }`}
            onClick={(event) => handleClick(event, 'upcoming')}
          >
            {navigation[locale].upcoming}
          </a>
          <a
            href='#completed'
            className={`${cls.tab} ${
              currentTab === 'completed' ? cls.active : ''
            }`}
            onClick={(event) => handleClick(event, 'completed')}
          >
            {navigation[locale].completed}
          </a>
        </div>
      </div>
    </div>
  )
}
