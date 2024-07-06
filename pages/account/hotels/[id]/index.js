import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { toast } from 'react-toastify'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import { common } from 'locales/common'
import axios from 'utils/axios'
import HotelSingle from 'components/hotelSingle/hotelSingle'

export default function SummerHouseSingle({ data, error }) {
  const { locale } = useRouter()

  console.log(data)

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
        ]}
        current={data?.translation?.title}
      />
      <HotelSingle data={data} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { query, locale } = ctx
  const cookies = nookies.get(ctx)

  try {
    const res = await axios.get(`/users/residences/${query.id}`, {
      headers: {
        Authorization: cookies.access_token,
      },
      params: {
        lang: locale,
      },
    })
    return {
      props: {
        data: res.data,
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
