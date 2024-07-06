import React, { useState } from 'react'
import { Container } from '@mui/system'
import cls from './accountPaymentMethod.module.scss'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

const list = [
  {
    icon: '/icons/visa.svg',
    number: '4263 ***** ***** **99',
  },
  {
    icon: '/icons/uzcard.svg',
    number: '8600 ***** ***** **10',
  },
]

export default function AccountPaymentMethod() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const [selected, setSelected] = useState(1)
  const { locale } = useRouter()
  const handleClick = (event, index) => {
    event.preventDefault()
    setSelected(index)
  }

  return (
    <div className={cls.root}>
      <Container>
        <Typography variant='h2' className={cls.title}>
          {common[locale].Payment_method}
        </Typography>
        <Typography>{common[locale].Payment_Text}</Typography>
        <div className={cls.listContainer}>
          <Grid
            container
            spacing={4}
            mt={0}
            sx={{
              flexWrap: matches ? 'wrap' : 'nowrap',
            }}
          >
            {list.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <a
                  href='#'
                  className={`${cls.wrapper} ${
                    selected === index ? cls.active : ''
                  }`}
                  onClick={(event) => handleClick(event, index)}
                >
                  <div className={cls.cardBrand}>
                    <img src='/icons/sqb.png' alt='sanoat qurilish bank' />
                  </div>
                  <div className={cls.cardType}>
                    <img src={item.icon} alt='sanoat qurilish bank' />
                  </div>
                  <p className={cls.number}>{item.number}</p>
                  <div className={cls.footer}>
                    <div className={cls.item}>
                      <p className={cls.caption}>Card holder</p>
                      <Typography variant='body2' sx={{ fontWeight: 500 }}>
                        Tojiboyev Jovik
                      </Typography>
                    </div>
                    <div className={cls.item}>
                      <Typography variant='body2' sx={{ fontWeight: 500 }}>
                        10/20
                      </Typography>
                    </div>
                  </div>
                  <Typography className={cls.selectedCard}>
                    {common[locale].Selected_Card}
                  </Typography>
                </a>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  )
}
