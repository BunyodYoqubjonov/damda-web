import React, { useState } from 'react'
import { Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import cls from './areaInfo.module.scss'
import { Box } from '@mui/system'
import { navigation } from 'locales/navigation'
import { useRouter } from 'next/router'
import AreaInfoPanelRow from './areaInfoPanelRow'

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
        <Box className={cls.tabPanel} sx={{ p: 2 }}>
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
    value: index,
  }
}

export default function AreaInfo({ data }) {
  const areaTypes = data.residence_area_type || []
  const [value, setValue] = useState(areaTypes.length ? areaTypes[0].id : 0)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const list = data.area_info || []
  const { locale } = useRouter()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  if (areaTypes.length) {
    return (
      <div id='area-info' className={cls.root}>
        <Typography variant='h6' sx={{ marginBottom: matches ? 1.5 : 1 }}>
          {navigation[locale].area_info}
        </Typography>

        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#000' } }}
          >
            {areaTypes.map((item) => (
              <Tab
                key={item.id}
                label={item.translation?.title}
                {...a11yProps(item.id)}
              />
            ))}
          </Tabs>
          {areaTypes.map((item) => (
            <TabPanel key={'panel' + item.id} value={value} index={item.id}>
              {list
                .filter((el) => el?.residence_area_type_id === item.id)
                .map((item, index) => (
                  <AreaInfoPanelRow key={index} item={item} matches={matches} />
                ))}
            </TabPanel>
          ))}
        </Box>
      </div>
    )
  } else {
    return <div></div>
  }
}
