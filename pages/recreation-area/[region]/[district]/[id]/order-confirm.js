import React, { useEffect } from 'react'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import OrderInfo from 'components/orderInfo/orderInfo'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import axios from 'utils/axios'
import { toast } from 'react-toastify'
import { common2 } from 'locales/common2'
import OrderWithoutPay from 'components/orderPayment/orderWithoutPay'

export default function RecreatinAreaOrderConfirm({ data, error }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
  }, [])

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: 'Home',
            link: '/',
          },
          {
            title: common[locale].hotel,
            link: '/recreation-area',
          },
          {
            title: data?.translation?.title,
            link: data?.slug || '/',
          },
        ]}
        current={common2[locale].order_confirm}
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
          {common2[locale].order_confirm}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={8}>
            <OrderInfo data={data} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <OrderWithoutPay data={data} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export async function getServerSideProps({ locale, query }) {
  const params = {
    lang: locale,
  }

  try {
    const data = await axios.get(`/residences/${query.id}`, { params })
    return {
      props: {
        data: data.data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        data: {},
        error: error.data,
      },
    }
  }
}
