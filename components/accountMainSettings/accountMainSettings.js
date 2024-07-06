import React, { useState } from 'react'
import { Box, Container } from '@mui/system'
import { Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cls from './accountMainSettings.module.scss'
import { Hotels, ProfileIcon, Sun } from '../icons/navIcons'
import { common } from '../../locales/common'

const list = [
  {
    title: 'my_orders_history',
    description: 'personal_settings_desc',
    icon: <Hotels />,
    link: '/account/orders',
  },
  {
    title: 'personal_settings',
    description: 'personal_settings_desc',
    icon: <ProfileIcon />,
    link: '/account/settings',
  },
]

const services = [
  {
    title: 'my_summer_houses',
    description: 'personal_settings_desc',
    icon: <Sun />,
    link: '/account/dacha',
    onlyDachaOwner: true
  },
  {
    title: 'my_hotels',
    description: 'personal_settings_desc',
    icon: <Hotels />,
    link: '/account/hotels',
    onlyHotelOwner: true
  },
]

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className={cls.tabPanel}>{children}</Box>}
    </div>
  )
}

const MainSettings = ({ locale }) => (
  <Grid container columnSpacing={3.8} rowSpacing={1.5} mt={0}>
    {list.map((item, index) => (
      <Grid key={index} item xs={12} sm={6} md={3}>
        <Link href={item.link}>
          <a className={cls.wrapper}>
            <div className={cls.iconWrapper}>{item.icon}</div>
            <Typography sx={{ fontWeight: 500, mb: 1.5 }}>
              {common[locale][item.title]}
            </Typography>
            <Typography variant='body2' sx={{ color: 'secondary.main' }}>
              {common[locale][item.description]}
            </Typography>
          </a>
        </Link>
      </Grid>
    ))}
  </Grid>
)

const ObjectsServices = ({ locale, isDachaOwner, isHotelOwner }) => (
  <Grid container columnSpacing={3.8} rowSpacing={1.5} mt={0}>
    {services.map((item, index) => ((isDachaOwner && item.onlyDachaOwner) || (isHotelOwner && item.onlyHotelOwner)) ? (
      <Grid key={index} item xs={12} sm={6} md={3}>
        <Link href={item.link}>
          <a className={cls.wrapper}>
            <div className={cls.iconWrapper}>{item.icon}</div>
            <Typography sx={{ fontWeight: 500, mb: 1.5 }}>
              {common[locale][item.title]}
            </Typography>
            <Typography variant='body2' sx={{ color: 'secondary.main' }}>
              {common[locale][item.description]}
            </Typography>
          </a>
        </Link>
      </Grid>
    ) : null)}
  </Grid>
)

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function AccountMainSettings({ data }) {
  const [value, setValue] = useState(0)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()
  const isDachaOwner = Boolean(data?.dacha_owner)
  const isHotelOwner = Boolean(data?.hotel_owner)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={cls.root}>
      {matches ? (
        <Container>
          <Typography variant='h6'>{common[locale].main_settings}</Typography>
          <MainSettings locale={locale} />
          <Box mt={5} />
          {(isDachaOwner || isHotelOwner) && (
            <>
              <Typography variant='h6'>
                {common[locale].my_objects_services}
              </Typography>
              <ObjectsServices isDachaOwner={isDachaOwner} isHotelOwner={isHotelOwner} locale={locale} />
            </>
          )}
        </Container>
      ) : (
        <Container>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#000' } }}
          >
            <Tab
              label={common[locale].main_settings}
              {...a11yProps(0)}
              className={cls.tab}
            />
            {(isDachaOwner || isHotelOwner) && (
              <Tab
                label={common[locale].my_objects_services}
                {...a11yProps(1)}
                className={cls.tab}
              />
            )}
          </Tabs>
          <TabPanel value={value} index={0}>
            <MainSettings locale={locale} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {(isDachaOwner || isHotelOwner) && <ObjectsServices isDachaOwner={isDachaOwner} isHotelOwner={isHotelOwner} locale={locale} />}
          </TabPanel>
        </Container>
      )}
    </div>
  )
}
