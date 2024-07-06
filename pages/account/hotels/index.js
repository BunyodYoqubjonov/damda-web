import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import nookies from 'nookies'
import Breadcrumbs from '../../../components/breadcrumbs/breadcrumbs'
import SEO from '../../../components/SEO'
import { common } from '../../../locales/common'
import HotelsList from 'components/summerHouseList/hotelsList'
import axios from 'utils/axios'

export default function SummerHouses({ data, error }) {
  const { locale } = useRouter()

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
        ]}
        current={common[locale].my_hotels}
      />
      <HotelsList data={data} />
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
        type: 'hotel'
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
