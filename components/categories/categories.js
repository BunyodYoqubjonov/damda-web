import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import cls from './categories.module.scss'
import Link from 'next/link'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'
import residenceService from '../../services/residenceService'
import { separateNumber } from '../numberSplice'

export default function Categories() {
  const [categories, setCategories] = useState([])

  const getStatistics = () => {
    residenceService.statistics().then((res) => {
      setCategories(res.data)
    })
  }

  useEffect(() => {
    getStatistics()
  }, [])

  const list = [
    {
      count: categories?.hotel,
      title: 'hotels',
      link: '/hotels',
      // price: separateNumber(Math.floor(categories.hotel_price) || 0),
      price: '100 000',
    },
    {
      count: categories?.cottage,
      title: 'summer_house',
      link: '/dacha',
      price: separateNumber(Math.floor(categories.cottage_price) || 0),
    },
    {
      count: categories?.zone,
      title: 'resorts',
      link: '/recreation-area',
      // price: separateNumber(Math.floor(categories.zone_price) || 0)
      price: '800 000',
    },
    {
      count: categories?.sanatorium,
      title: 'sanatorium',
      price: separateNumber(Math.floor(categories.sanatorium_price) || 0),
      link: '/sanatorium',
    },
    // {
    //   count: 156,
    //   title: 'Tour',
    //   price: '800 000 sum',
    // },
    // {
    //   count: 24,
    //   title: 'Guide',
    //   price: '250 000 sum',
    // },
    // {
    //   count: 38,
    //   title: 'Restaurant',
    //   price: '2 100 000 sum',
    // },
    // {
    //   count: 156,
    //   title: 'Transport',
    //   price: '800 000 sum',
    // },
  ]

  const { locale } = useRouter()
  return (
    <section className={cls.root}>
      <Container>
        <Grid container spacing={4}>
          {list.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Link href={`${item.link}`}>
                <a className={cls.card}>
                  <img
                    src='./images/hotels.jpg'
                    alt='hotels'
                    className={cls.bgImage}
                  />
                  <span className={cls.count}>{item?.count}</span>
                  <div className={cls.cardInfo}>
                    <Typography variant='h3'>
                      {navigation[locale][item?.title]}
                    </Typography>
                    <div className={cls.priceBlock}>
                      <Typography>{common[locale].starting_price}</Typography>
                      <span className={cls.price}>
                        {item?.price} / {common[locale].per_day}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
