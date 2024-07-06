import React from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import { common } from 'locales/common'
import SubscriptionsTable from 'components/subscriptionsTable/subscriptionsTable'
import { common2 } from 'locales/common2'
import nookies from 'nookies'
import axios from 'utils/axios'

export default function Subscriptions({ data, error }) {
  const { query, locale } = useRouter()

  console.log('data => ', data)

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
        current={common2[locale].subscriptions}
      />
      <SubscriptionsTable data={data} error={error} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { query, locale } = ctx
  const cookies = nookies.get(ctx)

  const params = {
    ...query,
    perPage: 10,
    lang: locale,
  }

  try {
    const data = await axios.get('/subscriptions', {
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
