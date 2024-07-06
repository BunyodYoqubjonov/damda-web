import HotelRoomsCreate from 'components/hotelRoomsCreate/hotelRoomsCreate'
import SEO from 'components/SEO'
import React from 'react'
import axios from 'utils/axios'
import nookies from 'nookies'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'

const HotelRoomCreate = ({ data }) => {
  const { locale } = useRouter()
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
            title: data?.translation?.title,
            link: `/account/hotels/${data?.id}`,
          },
          {
            title: common[locale].rooms,
            link: `/account/hotels/${data?.id}/rooms`,
          },
        ]}
        current={common[locale].Add_new}
      />
      <HotelRoomsCreate residenceData={data} />
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

export default HotelRoomCreate
