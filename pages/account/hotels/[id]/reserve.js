import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import { common } from 'locales/common'
import nookies from 'nookies'
import axios from 'utils/axios'
import { toast } from 'react-toastify'
import ReserveHotel from 'components/reserveHotel/reserveHotel'

export default function Reserve({ data, error }) {
  const { query, locale } = useRouter()

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
    console.log('data => ', data)
  }, [data])

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
        current={common[locale].Reserve}
      />
      <ReserveHotel data={data} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { locale } = ctx
  const cookies = nookies.get(ctx)

  try {
    const data = await axios.get('/users/residences', {
      headers: {
        Authorization: cookies.access_token,
      },
      params: {
        lang: locale,
        perPage: 1000,
      },
    })
    return {
      props: {
        data: data.data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        data: [],
        error: error.data,
      },
    }
  }
}
