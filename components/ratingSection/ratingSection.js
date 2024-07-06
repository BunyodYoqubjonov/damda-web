import React from 'react'
import { CircularProgress, Typography, useMediaQuery } from '@mui/material'
import cls from './ratingSection.module.scss'
import { StarSmile } from '../icons/commonIcons'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'

const list = [
  {
    title: 'Value for money',
    image: '/icons/wallet.png',
    value: 90,
    grade: 'Excellent (4.8/5.0)',
  },
  {
    title: 'Location',
    image: '/icons/location.png',
    value: 80,
    grade: 'Very good (4.4/5.0)',
  },
  {
    title: 'Building',
    image: '/icons/building.png',
    value: 75,
    grade: 'Very good (4.3/5.0)',
  },
  {
    title: 'Food',
    image: '/icons/kitchen.svg',
    value: 50,
    grade: 'Good (3.2/5.0)',
  },
  {
    title: 'Rooms',
    image: '/icons/rooms.png',
    value: 30,
    grade: 'Excellent (4.8/5.0)',
  },
  {
    title: 'Breakfast',
    image: '/icons/breakfast.png',
    value: 60,
    grade: 'Okay (3.4/5.0)',
  },
]

export default function RatingSection() {
  const { locale } = useRouter()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <div id='rating-reviews' className={cls.root}>
      <Typography variant='h6'>{common[locale].Rating_and_Reviews}</Typography>
      <div className={cls.wrapper}>
        <div className={cls.ratingCircle}>
          <div className={cls.circleWrapper}>
            <CircularProgress
              variant='determinate'
              value={100}
              size={matches ? 140 : 160}
            />
            <span className={cls.ratingFloat}>
              <StarSmile />0
            </span>
          </div>
          <div className={cls.titleBlock}>
            <p className={cls.title}>Excellent</p>
            <p className={cls.subtitle}>0 reviews</p>
          </div>
        </div>
        <div className={cls.ratingInfo}>
          {list.map((item, index) => (
            <div key={index} className={cls.row}>
              <div className={cls.item}>
                <img src={item.image} alt={item.title} />
                <Typography variant='body2'>{item.title}</Typography>
              </div>
              <div className={cls.progress}>
                <div
                  className={cls.indicator}
                  style={{ width: item.value + '%' }}
                />
              </div>
              <Typography variant='body2' sx={{ color: '#00000090' }}>
                {item.grade}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
