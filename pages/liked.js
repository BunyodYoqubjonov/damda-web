import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Container, Grid, Stack, useMediaQuery } from '@mui/material'
import SEO from 'components/SEO'
import HotelCard from 'components/hotelCard/hotelCard'
import LikedFilter from 'components/likedFilter/likedFilter'

export default function Hotels() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { favorites } = useSelector((state) => state.favorite, shallowEqual)
  const [serviceType, setServiceType] = useState('cottage')

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Container>
        <Grid container spacing={3} pt={matches ? 10 : 5}>
          {matches && (
            <Grid item xs={12} md={3}>
              <LikedFilter
                data={favorites}
                serviceType={serviceType}
                setServiceType={setServiceType}
              />
            </Grid>
          )}
          <Grid item xs={12} md={9}>
            <Stack gap={2}>
              {favorites
                .filter((item) => item.type === serviceType)
                .map((item) => (
                  <HotelCard key={item.id} data={item} type={serviceType} />
                ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
