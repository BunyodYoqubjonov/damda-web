import React from 'react'
import { Container } from '@mui/system'
import cls from './summerHouseList.module.scss'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { PlusIcon } from '../icons/commonIcons'
import Link from 'next/link'
import { IOSSwitch } from '../customSwitch/customSwitch'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'
import { BASE_URL } from 'constants/env'

export default function HotelsList({ data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()

  return (
    <div className={cls.root}>
      <Container>
        <Typography variant='h2' className={cls.title}>
          {common[locale].my_hotels}
        </Typography>
        <Grid container spacing={matches ? 4 : 1.5} mt={matches ? 0 : 2}>
          <Grid item xs={12} sm={6} md={3}>
            <Link href='/account/hotels/create'>
              <a className={cls.wrapper}>
                <div className={cls.actionButton}>
                  <button className={cls.button}>
                    <PlusIcon />
                  </button>
                  <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                    {common[locale].Add_new} {common[locale].hotel}
                  </Typography>
                </div>
              </a>
            </Link>
          </Grid>

          {data?.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <div className={cls.wrapper}>
                <div className={cls.card}>
                  <Link href={`/account/hotels/${item?.id}`}>
                    <a className={cls.header}>
                      <div className={cls.imgWrapper}>
                        <img
                          src={
                            item?.img !== null
                              ? BASE_URL + item?.img
                              : 'https://via.placeholder.com/300x200'
                          }
                          alt={item?.translation?.title}
                        />
                      </div>

                      <div className={cls.name}>
                        <Typography>
                          {item?.translation?.title
                            ? item.translation.title
                            : common[locale].Noname}
                        </Typography>
                      </div>
                    </a>
                  </Link>
                  <div className={cls.body}>
                    <Typography variant='body2' className={cls.subtitle}>
                      {item?.address_title?.region_name.translation?.title}
                    </Typography>
                  </div>
                  <div className={cls.footer}>
                    <div className={cls.item}>
                      <Typography variant='caption'>
                        {common[locale].booking}
                      </Typography>
                      <Typography className={cls.number}>
                        250+ (10 waiting)
                      </Typography>
                    </div>
                    <div className={cls.item}>
                      <IOSSwitch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
