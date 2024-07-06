import React, { useEffect, useState } from 'react'
import { Checkbox, Grid, Typography, useMediaQuery } from '@mui/material'
import cls from './hotelCreateOffers.module.scss'
import residenceService from 'services/residenceService'
import { useRouter } from 'next/router'
import { common } from 'locales/common'

export default function HotelCreateOffers({ options, setOptions }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()
  const [data, setData] = useState([])

  const getAttributesList = () => {
    residenceService.getAttributes({ type: 'hotel', perPage: 1000 }).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getAttributesList()
  }, [locale])

  const handleChange = (event) => {
    if (event.target.checked === true) {
      setOptions([...options, parseInt(event.target.value)])
    } else if (event.target.checked === false) {
      setOptions(
        options.filter((item) => item !== parseInt(event.target.value))
      )
    }
  }

  return (
    <div id='offers' className={cls.container}>
      <Typography variant='h6'>
        {common[locale].what_this_place_offers}
      </Typography>
      <Grid container>
        <Grid
          item
          container
          xs={12}
          md={12}
          sm={12}
          mt={1.5}
          columnSpacing={matches ? 10 : 0}
        >
          {data.map((item) => (
            <Grid item lg={4} md={12} sm={12} key={item.alias + item.id}>
              <div className={cls.item}>
                <Checkbox
                  id={item.alias}
                  onChange={handleChange}
                  name={item.id}
                  value={item.id}
                  checked={options?.includes(item.id)}
                />
                <label htmlFor={item.alias} className={cls.label}>
                  <div className={cls.iconWrapper}>
                    <i className={`${item.icon} font-size-lg mr-1`} />
                  </div>
                  <p>{item.translation.title}</p>
                </label>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}
