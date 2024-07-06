import React from 'react'
import { Typography } from '@mui/material'
import cls from './likedFilter.module.scss'
import { navigation } from '../../locales/navigation'
import { useRouter } from 'next/router'

const navMenu = [
  {
    name: 'hotels',
    type: 'hotel',
  },
  {
    name: 'summer_house',
    type: 'cottage',
  },
  {
    name: 'resorts',
    type: 'zone',
  },
  {
    name: 'sanatorium',
    type: 'sanatorium',
  },
  // {
  //   name: 'tour',
  //   type: 'tour',
  // },
  // {
  //   name: 'guide',
  //   type: 'guide',
  // },
  // {
  //   name: 'restaurant',
  //   type: 'restaurant',
  // },
  // {
  //   name: 'transport',
  //   type: 'transport',
  // },
]

export default function LikedFilter({ data, serviceType, setServiceType }) {
  const { locale } = useRouter()

  const handleClick = (event, item) => {
    event.preventDefault()
    setServiceType(item.type)
  }

  return (
    <div className={cls.root}>
      <Typography variant='h1' className={cls.title}>
        {navigation[locale].liked} - {data.length}
      </Typography>
      <ul className={cls.list}>
        {navMenu.map((item) => (
          <li key={item.type} className={cls.listItem}>
            <a
              href='#'
              className={`${cls.item} ${
                item.type === serviceType ? cls.active : ''
              }`}
              onClick={(event) => handleClick(event, item)}
            >
              {navigation[locale][item.name]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
