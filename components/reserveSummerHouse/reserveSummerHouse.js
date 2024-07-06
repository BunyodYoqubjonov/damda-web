import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/system'
import cls from './reserveSummerHouse.module.scss'
import ReservationCalendar from '../reservationCalendar/reservationCalendar'
import { Grid, Tab, Tabs, Typography } from '@mui/material'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import profileService from 'services/profileService'
import Loading from 'components/loading'
import OwnerBookingInfo from 'components/bookingInfo/ownerBookingInfo'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function ReserveSummerHouse({ data }) {
  const { locale, push, query } = useRouter()
  const [value, setValue] = useState(query?.tab ? Number(query?.tab) : data[0]?.id)
  const [loading, setLoading] = useState(false)
  const [residence, setResidence] = useState({})

  const handleChange = (event, newValue) => {
    setValue(newValue)
    push(
      { query: { id: query?.id, tab: newValue } },
      { id: query?.id, tab: newValue },
      { shallow: true }
    )
  }

  useEffect(() => {
    if (value) {
      fetchResidence()
    }
  }, [value])

  function fetchResidence() {
    setLoading(true)
    profileService
      .getMyResidenceById(value)
      .then((res) => setResidence(res.data))
      .finally(() => setLoading(false))
  }

  return (
    <div className={cls.root}>
      <Container>
        <Typography variant='h1' className={cls.title}>
          {common[locale].Reserve_summer_house}
        </Typography>

        <div className={cls.tabContainer}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#000' } }}
          >
            {data.map((item) => (
              <Tab
                key={item.id}
                value={item.id}
                label={`${item.translation?.title || ''} ID ${item.id}`}
                {...a11yProps(item.id)}
              />
            ))}
          </Tabs>
        </div>

        {!loading ? (
          <Grid container columnSpacing={4}>
            <Grid item xs={12} md={8}>
              <ReservationCalendar showPricing={false} data={residence} />
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={cls.spacing} />
              <OwnerBookingInfo data={residence} />
            </Grid>
          </Grid>
        ) : (
          <Box height={200} display='flex' alignItems='center'>
            <Loading />
          </Box>
        )}
      </Container>
    </div>
  )
}
