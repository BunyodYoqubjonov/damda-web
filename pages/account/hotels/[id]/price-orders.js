import React from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import { common } from 'locales/common'
import axios from 'utils/axios'
import MyResidenceBookings from 'components/myResidenceBookings/myResidenceBookings'

export default function PriceAndOrders({ data, error }) {
  const { query, locale } = useRouter()

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: common[locale].Home,
            link: '/',
          },
          {
            title: common[locale].Cabinet,
            link: '/account',
          },
          {
            title: common[locale].my_hotels,
            link: '/account/hotels',
          },
          {
            title: query.id,
            link: `/account/hotels/${query.id}`,
          },
        ]}
        current={common[locale].Price_orders}
      />
      <MyResidenceBookings data={data} error={error} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { query, locale } = ctx
  const cookies = nookies.get(ctx)

  const params = {
    residence_id: query?.id,
    perPage: 10,
    lang: locale,
  }

  try {
    const data = await axios.get('/bookings/residences/paginate', {
      headers: {
        Authorization: cookies.access_token,
      },
      params,
    })

    return {
      props: {
        data,
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
