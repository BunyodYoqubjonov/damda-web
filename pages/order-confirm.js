import React from 'react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import OrderInfo from '../components/orderInfo/orderInfo'
import OrderPayment from '../components/orderPayment/orderPayment'

export default function OrderConfirm() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: 'Home',
            link: '/',
          },
        ]}
        current='Order confirm'
      />
      <Container>
        <Typography
          variant='h1'
          sx={{
            pt: matches ? 1 : 0,
            pb: 3,
            fontSize: matches ? 40 : 28,
            lineHeight: matches ? '65px' : '32px',
            fontWeight: 400,
          }}
        >
          Order confirm
        </Typography>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} sm={6} md={8}>
            <OrderInfo />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <OrderPayment />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
