import React from 'react'
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs'
import OrdersTable from '../../components/ordersTable/ordersTable'
import SEO from '../../components/SEO'
import axios from '../../utils/axios'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'

export default function Orders({ data, error }) {
  const { locale } = useRouter()

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: navigation[locale].home,
            link: '/',
          },
          {
            title: navigation[locale].cabinet,
            link: '/account',
          },
        ]}
        current={navigation[locale].order_history}
      />
      <OrdersTable data={data} error={error} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { locale, query } = ctx
  const cookies = nookies.get(ctx)

  const params = {
    ...query,
    perPage: 10,
    lang: locale,
  }
  if (query.state) {
    params[query.state] = 1
  } else {
    params.upcoming = 1
  }

  try {
    const data = await axios.get('/bookings/paginate', {
      headers: { Authorization: cookies.access_token },
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
