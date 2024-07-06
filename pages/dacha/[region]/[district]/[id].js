import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import { toast } from 'react-toastify'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import HotelHero from 'components/hotelHero/hotelHero'
import HotelNavbar from 'components/hotelNavbar/hotelNavbar'
import HotelAbout from 'components/hotelAbout/hotelAbout'
import BookingInfo from 'components/bookingInfo/bookingInfo'
import ReservationCalendar from 'components/reservationCalendar/reservationCalendar'
import HouseRules from 'components/houseRules/houseRules'
import ReviewSection from 'components/reviewSection/reviewSection'
import HotelMapSection from 'components/hotelMapSection/hotelMapSection'
import RecommendedHotels from 'components/recommendedHotels/recommendedHotels'
import { navigation } from 'locales/navigation'
import { common } from 'locales/common'
import BookingMobile from 'components/bookingInfo/bookingMobile'
import axios from 'utils/axios'
import { BASE_URL } from 'constants/env'
import AreaInfo from 'components/areaInfo/areaInfo'

export default function DachaSingle({ data, error }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
  }, [])

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
            title: common[locale].cottage,
            link: '/dacha',
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
            <ReservationCalendar data={data} />
            <AreaInfo data={data} />
            <HouseRules data={data} />
            <ReviewSection data={data} />
            {matches ? null : <BookingMobile data={data} />}
          </Grid>
          {matches ? (
            <Grid item xs={12} md={4}>
              <BookingInfo data={data} />
            </Grid>
          ) : null}
        </Grid>
        <HotelMapSection data={data} />
        <RecommendedHotels data={data} />
      </Container>
    </div>
  )
}

export async function getServerSideProps({ query, locale }) {
  const params = {
    lang: locale,
  }

  try {
    const data = await axios.get(`/residences/show/${query.id}`, { params })
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
