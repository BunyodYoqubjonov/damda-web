import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material'
import { common } from 'locales/common'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import React from 'react'
import cls from './hotelRoomsCreate.module.scss'

const HotelRoomsPrice = ({ formik, activeStep, handleBack, handleNext }) => {
  const { locale } = useRouter()
  return (
    <div
      className='activeStep'
      style={{ display: activeStep === 1 ? 'block' : 'none' }}
    >
      <div className={cls.root}>
        <Grid container spacing={4}>
          {Array.from({ length: formik.values?.adult }, (v, i) => i + 1).map(
            (item) => (
              <React.Fragment key={item}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    name={`prices[${item}].person`}
                    label={common[locale].person}
                    variant='standard'
                    fullWidth
                    type='number'
                    defaultValue={item}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    name={`prices[${item - 1}].resident_price`}
                    onChange={formik.handleChange}
                    value={
                      formik.values?.prices &&
                      formik.values?.prices[item - 1]?.resident_price
                    }
                    label={common[locale].resident_price}
                    variant='standard'
                    fullWidth
                    type='number'
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    name={`prices[${item - 1}].nonresident_price`}
                    onChange={formik.handleChange}
                    value={
                      formik.values?.prices &&
                      formik.values?.prices[item - 1]?.nonresident_price
                    }
                    label={common[locale].nonresident_price}
                    variant='standard'
                    fullWidth
                    type='number'
                  />
                </Grid>
              </React.Fragment>
            )
          )}
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

export default HotelRoomsPrice
