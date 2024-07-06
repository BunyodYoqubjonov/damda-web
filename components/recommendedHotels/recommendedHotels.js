import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import cls from './recommendedHotels.module.scss'
import HotelCardVertical from '../hotelCardVertical/hotelCardVertical'
import residenceService from '../../services/residenceService'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function RecommendedHotels({ data }) {
  const [hotels, setHotels] = useState([])
  const { locale, push } = useRouter()

  const fetchResidences = () => {
    residenceService.getResidences(data.type).then((res) => setHotels(res.data))
  }

  useEffect(() => {
    fetchResidences()
  }, [locale])

  const handleClickMap = () => {
    switch (data.type) {
      case 'hotel':
        push(`/hotels`)
        break
      case 'cottage':
        push(`/dacha`)
        break
      case 'zone':
        push(`/recreation-area`)
        break
      case 'sanatorium':
        push(`/sanatorium`)
      default:
        break
    }
  }

  const TypeText = () => {
    switch (data.type) {
      case 'hotel':
        return common[locale].Recommended_hotels
      case 'cottage':
        return common[locale].Recommended_summer_houses
      case 'zone':
        return common[locale].Recommended_zone
      case 'sanatorium':
        return common[locale].Recommended_sanatorium
    }
  }

  return (
    <div id='recommended' className={cls.root}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6'>{TypeText()}</Typography>
        <button className={cls.outlinedButton} onClick={handleClickMap}>
          {common[locale].view_more}
        </button>
      </Box>

      <Grid
        container
        spacing={4}
        mt={4}
        sx={{ flexWrap: 'nowrap', overflowX: 'auto' }}
      >
        {hotels.map((item, index) => (
          <Grid key={index} xs={12} sm={6} md={4} mt={5}>
            <HotelCardVertical data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
