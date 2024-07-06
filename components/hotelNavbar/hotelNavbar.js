import React from 'react'
import { Container } from '@mui/material'
import cls from './hotelNavbar.module.scss'
import { useRouter } from 'next/router'
import { navigation } from 'locales/navigation'
import Scrollspy from 'react-scrollspy'

export default function HotelNavbar({ data }) {
  const { locale } = useRouter()

  const list = [
    {
      title: `about_${data.type}`,
      link: '#about',
    },
    {
      title: 'offers',
      link: '#offers',
    },
    {
      title: `${data.type === 'cottage' ? 'reservation_calendar' : 'rooms'}`,
      link: `${data.type === 'cottage' ? '#reservation_calendar' : '#rooms'}`,
    },
    {
      title: 'area_info',
      link: '#area-info',
    },
    {
      title: 'house_rules',
      link: '#rules',
    },
    {
      title: 'rating_reviews',
      link: '#rating-reviews',
    },
    {
      title: 'on_map',
      link: '#map',
    },
    {
      title: 'recommended',
      link: '#recommended',
    },
  ]

  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.navbar}>
          <Scrollspy
            items={
              data.type === 'cottage'
                ? [
                    'about',
                    'offers',
                    'reservation_calendar',
                    'area-info',
                    'rules',
                    'rating-reviews',
                    'map',
                    'recommended',
                  ]
                : [
                    'about',
                    'offers',
                    'rooms',
                    'area-info',
                    'rules',
                    'rating-reviews',
                    'map',
                    'recommended',
                  ]
            }
            currentClassName='isCurrent'
            className={cls.navItem}
          >
            {list.map((item, index) => (
              <a key={index} href={item.link} className={cls.navbarNav}>
                {navigation[locale][item.title]}
              </a>
            ))}
          </Scrollspy>
        </div>
      </Container>
    </div>
  )
}
