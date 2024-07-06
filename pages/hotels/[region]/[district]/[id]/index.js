import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import HotelHero from 'components/hotelHero/hotelHero'
import HotelNavbar from 'components/hotelNavbar/hotelNavbar'
import HotelAbout from 'components/hotelAbout/hotelAbout'
import HouseRules from 'components/houseRules/houseRules'
import ReviewSection from 'components/reviewSection/reviewSection'
import HotelMapSection from 'components/hotelMapSection/hotelMapSection'
import RecommendedHotels from 'components/recommendedHotels/recommendedHotels'
import { navigation } from 'locales/navigation'
import { common } from 'locales/common'
import HotelRooms from 'components/hotelRooms/hotelRooms'
import BookingHotels from 'components/bookingInfo/bookingHotels'
import {
  setBookingItems,
  setBreakfastPrice,
} from 'redux/actions/bookingActions/bookingActions'
import BookingHotelMobile from 'components/bookingInfo/bookingHotelMobile'
import axios from 'utils/axios'
import { BASE_URL } from 'constants/env'
import AreaInfo from 'components/areaInfo/areaInfo'

export default function HotelSingle({ data, error }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()
  const dispatch = useDispatch()

  console.log('error => ', error)

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
  }, [])

  useEffect(() => {
    const list = data.rooms.map((item) => ({
      ...item,
      cartQuantity: 0,
      cartChildren: 0,
      cartAdults: item.prices[0]?.person || 0,
      isBreakfast: false,
    }))
    dispatch(setBookingItems(list))
    dispatch(setBreakfastPrice(Number(data.breakfast)))
  }, [data])

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO
        title={data.translation?.meta_title}
        description={data.translation?.meta_description}
        keywords={data.translation?.meta_keywords}
        image={BASE_URL + data.img}
      />
      <Breadcrumbs
        prevs={[
          {
            title: navigation[locale].home,
            link: '/',
          },
          {
            title: common[locale].hotel,
            link: '/hotels',
          },
        ]}
        current={data.translation?.title}
      />
      <HotelHero data={data} />
      <HotelNavbar data={data} />
      <Container>
        <Grid container columnSpacing={matches ? 4 : 0}>
          <Grid item xs={12} md={8}>
            <HotelAbout data={data} />
            <HotelRooms />
            <AreaInfo data={data} />
            <HouseRules data={data} />
            {matches ? null : <BookingHotelMobile data={data} />}
            <ReviewSection data={data} />
          </Grid>
          {matches ? (
            <Grid item xs={12} md={4}>
              <BookingHotels data={data} />
            </Grid>
          ) : null}
        </Grid>
        <HotelMapSection data={data} />
        <RecommendedHotels data={data} />
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
        key: query.id,
        data: data.data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        key: query.id,
        data: {},
        error: error.data,
      },
    }
  }
}
