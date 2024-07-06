import React, { useEffect } from 'react'
import SEO from '../../../../components/SEO'
import Breadcrumbs from '../../../../components/breadcrumbs/breadcrumbs'
import HotelHero from '../../../../components/hotelHero/hotelHero'
import HotelNavbar from '../../../../components/hotelNavbar/hotelNavbar'
import { Grid, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import HotelAbout from '../../../../components/hotelAbout/hotelAbout'
import HouseRules from '../../../../components/houseRules/houseRules'
import RatingSection from '../../../../components/ratingSection/ratingSection'
import ReviewSection from '../../../../components/reviewSection/reviewSection'
import HotelMapSection from '../../../../components/hotelMapSection/hotelMapSection'
import RecommendedHotels from '../../../../components/recommendedHotels/recommendedHotels'
import { fetchMultipleUrls } from '../../../../utils/fetchMultipleUrls'
import { useRouter } from 'next/router'
import { navigation } from '../../../../locales/navigation'
import { common } from '../../../../locales/common'
import HotelRooms from '../../../../components/hotelRooms/hotelRooms'
import BookingHotels from '../../../../components/bookingInfo/bookingHotels'
import {
  setBookingItems,
  setBreakfastPrice,
} from '../../../../redux/actions/bookingActions/bookingActions'
import { useDispatch } from 'react-redux'
import AreaInfo from '../../../../components/areaInfo/areaInfo'
import BookingHotelMobile from '../../../../components/bookingInfo/bookingHotelMobile'

export default function DachaSingle({ data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const list = data.rooms.map((item) => ({
      ...item,
      cartQuantity: 0,
      cartChildren: 0,
      cartAdults: item.prices[0].person,
      isBreakfast: false,
    }))
    dispatch(setBookingItems(list))
    dispatch(setBreakfastPrice(Number(data.breakfast)))
  }, [data])

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
            title: common[locale].hotel,
            link: '/hotels',
          },
        ]}
        current={data?.translation?.title}
      />
      <HotelHero data={data} />
      <HotelNavbar data={data} />
      <Container>
        <Grid container columnSpacing={matches ? 4 : 0}>
          <Grid item xs={12} md={8}>
            <HotelAbout data={data} />
            {matches ? null : <BookingHotelMobile data={data} />}
            <HotelRooms />
            <AreaInfo data={data} />
            <HouseRules data={data} />
            <RatingSection />
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

export async function getServerSideProps(ctx) {
  const { query, locale } = ctx
  const [data] = await fetchMultipleUrls([
    `/residences/${query?.id}?lang=${locale}`,
  ])

  return {
    props: {
      data: data?.data,
    },
  }
}
