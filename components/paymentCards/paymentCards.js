import React, { useState } from 'react'
import { Container } from '@mui/system'
import cls from './paymentCards.module.scss'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { PlusIcon } from '../icons/commonIcons'
import AddNewCard from '../addNewCard/addNewCard'
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

export default function PaymentCards() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const [openAddCard, setOpenAddCard] = useState(false)

  const handleOpenAddCard = (event) => {
    event.preventDefault()
    setOpenAddCard(true)
  }
  const handleClose = () => {
    setOpenAddCard(false)
  }
  const { locale } = useRouter()
  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.header}>
          <Typography variant='h2' className={cls.title}>
            {common[locale].My_cards}
          </Typography>
          <a href='#' className={cls.actionButton} onClick={handleOpenAddCard}>
            <button className={cls.button}>
              <PlusIcon />
            </button>
            <Typography>{common[locale].Add_card}</Typography>
          </a>
        </div>
        <Grid
          container
          spacing={matches ? 4 : 1.5}
          mt={matches ? 0 : 2}
          sx={{ flexWrap: matches ? 'wrap' : 'nowrap', overflowX: 'auto' }}
        >
          {matches && (
            <Grid item xs={12} sm={4} md={3}>
              <a href='#' className={cls.wrapper} onClick={handleOpenAddCard}>
                <div className={cls.actionButton}>
                  <button className={cls.button}>
                    <PlusIcon />
                  </button>
                  <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                    {common[locale].Add_new_payment_card}
                  </Typography>
                </div>
              </a>
            </Grid>
          )}
          {list.map((item, index) => (
            <Grid key={index} item xs={11} sm={4} md={3}>
              <div className={cls.wrapper}>
                <div className={cls.cardBrand}>
                  <img src='/icons/sqb.png' alt='sanoat qurilish bank' />
                </div>
                <div className={cls.cardType}>
                  <img src={item.icon} alt='sanoat qurilish bank' />
                </div>
                <p className={cls.number}>{item.number}</p>
                <div className={cls.footer}>
                  <div className={cls.item}>
                    <p className={cls.caption}>{common[locale].Card_holder}</p>
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
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <AddNewCard open={openAddCard} handleClose={handleClose} />
    </div>
  )
}
