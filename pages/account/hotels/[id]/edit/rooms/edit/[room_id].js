import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import HotelRoomsCreate from 'components/hotelRoomsCreate/hotelRoomsCreate'
import nookies from 'nookies'
import SEO from 'components/SEO'
import axios from 'utils/axios'
import { useRouter } from 'next/router'
import React from 'react'
import { common } from 'locales/common'

const HotelRoomEdit = ({ residenceData, data }) => {
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
            title: residenceData?.translation?.title,
            link: `/account/hotels/${residenceData?.id}`,
          },
          {
            title: common[locale].rooms,
            link: `/account/hotels/${residenceData?.id}/rooms`,
          },
        ]}
        current={common[locale].Add_new}
      />
      <HotelRoomsCreate residenceData={residenceData} data={data} />
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
    const room = await axios.get(`/residences/rooms/${query.room_id}`, {
      headers: {
        Authorization: cookies.access_token,
      },
      params: {
        lang: locale,
      },
    })
    return {
      props: {
        residenceData: res.data,
        data: room.data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        data: {},
        residenceData: {},
        error: error.data,
      },
    }
  }
}

export default HotelRoomEdit
