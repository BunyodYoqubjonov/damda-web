import { Box, Button, Checkbox, Grid, useMediaQuery } from '@mui/material'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import residenceService from 'services/residenceService'
import cls from './hotelRoomsCreate.module.scss'

const HotelRoomsAttributes = ({
  activeStep,
  handleBack,
  handleNext,
  setOptions,
  options,
}) => {
  const [data, setData] = useState([])
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()

  const getAttributesList = () => {
    residenceService
      .getAttributes({ type: 'room', attribute_group_id: 2 })
      .then((res) => {
        setData(res.data)
      })
  }

  const handleChange = (event) => {
    if (event.target.checked === true) {
      setOptions([...options, parseInt(event.target.value)])
    } else if (event.target.checked === false) {
      setOptions(
        options.filter((item) => item !== parseInt(event.target.value))
      )
    }
  }

  useEffect(() => {
    getAttributesList()
  }, [locale])

  return (
    <div
      className='activeStep'
      style={{ display: activeStep === 2 ? 'block' : 'none' }}
    >
      <div className={cls.root}>
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
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}>
          <Button
            type='button'
            variant='outlined'
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            {common2[locale].Back}
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant='contained'
            onClick={handleNext}
            sx={{
              backgroundColor: 'common.green',
              '&:hover': { backgroundColor: 'common.green' },
            }}
          >
            {common2[locale].next}
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default HotelRoomsAttributes
