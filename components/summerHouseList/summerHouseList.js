import React from 'react'
import { Container } from '@mui/system'
import cls from './summerHouseList.module.scss'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PlusIcon } from '../icons/commonIcons'
import { common } from '../../locales/common'
import MyResidenceCard from './myResidenceCard'

export default function SummerHouseList({ data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()

  return (
    <div className={cls.root}>
      <Container>
        <Typography variant='h2' className={cls.title}>
          {common[locale].my_summer_houses}
        </Typography>
        <Grid container spacing={matches ? 4 : 1.5} mt={matches ? 0 : 2}>
          <Grid item xs={12} sm={6} md={3}>
            <Link href='/account/dacha/create'>
              <a className={cls.wrapper}>
                <div className={cls.actionButton}>
                  <button className={cls.button}>
                    <PlusIcon />
                  </button>
                  <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                    {common[locale].Add_new} {common[locale].summer_house}
                  </Typography>
                </div>
              </a>
            </Link>
          </Grid>
          {data?.map((item, index) => (
            <MyResidenceCard key={index} data={item} />
          ))}
        </Grid>
      </Container>
    </div>
  )
}
