import React, { useEffect, useState } from 'react'
import { Box, Container, Tabs } from '@mui/material'
import cls from './hero.module.scss'
import { CustomTab } from '../tabs/customTab'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import TempPanel from './HeroTable'
import { navigation } from '../../locales/navigation'

const initialValues = {
  country: undefined,
  region: undefined,
  district: undefined,
}

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
      {value === index && (
        <Box
          className={cls.tabPanel}
          sx={{ p: 3, borderRadius: value ? 3 : '0 12px 12px 12px' }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Hero() {
  const [tab, setTab] = useState(0)
  const [resident, setResident] = useState('hotels')
  const [value, setValue] = useState(initialValues)
  const { locale } = useRouter()
  const handleChange = (event, newValue) => {
    setTab(newValue)
    setResident(event?.target?.name)
  }

  useEffect(() => {
    setValue(initialValues)
  }, [resident])

  return (
    <Container>
      <div className={cls.root}>
        <div className={cls.hero}>
          <span className={cls.childText}>{common[locale].hero_title}</span>
          {common[locale].online_booking}
        </div>

        <Box sx={{ width: '100%', mt: 6 }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label='basic tabs example'
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
            className={cls.tabs}
          >
            <CustomTab
              name='hotels'
              label={navigation[locale].hotels}
              {...a11yProps(1)}
            />
            <CustomTab
              name='dacha'
              label={navigation[locale].summer_house}
              {...a11yProps(2)}
            />
            <CustomTab
              name='recreation-area'
              label={navigation[locale].resorts}
              {...a11yProps(3)}
            />
            <CustomTab
              name='sanatorium'
              label={navigation[locale].sanatorium}
              {...a11yProps(0)}
            />
            {/*<CustomTab label='Tour' {...a11yProps(4)} />*/}
            {/*<CustomTab label='Guide' {...a11yProps(5)} />*/}
            {/*<CustomTab label='Restaurant' {...a11yProps(6)} />*/}
            {/*<CustomTab label='Transport' {...a11yProps(7)} />*/}
          </Tabs>

          <TabPanel value={tab} index={0}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
          <TabPanel value={tab} index={4}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
          <TabPanel value={tab} index={5}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
          <TabPanel value={tab} index={6}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
          <TabPanel value={tab} index={7}>
            <TempPanel
              initialValues={initialValues}
              values={value}
              resident={resident}
              setValues={setValue}
            />
          </TabPanel>
        </Box>
      </div>
    </Container>
  )
}
