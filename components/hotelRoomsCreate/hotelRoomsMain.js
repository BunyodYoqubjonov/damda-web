import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import cls from './hotelRoomsCreate.module.scss'
import axios from 'utils/axios'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import { common2 } from 'locales/common2'

const HotelRoomsMain = ({ handleNext, activeStep, formik }) => {
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)
  const [roomTypes, setRoomTypes] = useState([])
  useEffect(() => {
    setLoading(true)
    axios
      .get('/residences/rooms')
      .then((res) => {
        console.log(res)
        setRoomTypes(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      className='activeStep'
      style={{ display: activeStep === 0 ? 'block' : 'none' }}
    >
      <div className={cls.root}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              id='asynchronous-demo'
              isOptionEqualToValue={(option, value) => {
                return option.id === value
              }}
              getOptionLabel={(option) => {
                return (
                  roomTypes.find((type) => type.id === option)?.translation
                    ?.title || option.translation?.title
                )
              }}
              options={roomTypes}
              value={formik.values?.room_id}
              onChange={(e, value) => {
                formik.setFieldValue('room_id', value?.id)
              }}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={common[locale].room_type}
                  fullWidth
                  name='room_type'
                  variant='standard'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color='inherit' size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <div className={cls.error}>
              {formik.errors?.room_id ? formik.errors?.room_id : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              variant='standard'
              name='quantity'
              type='number'
              value={formik.values?.quantity}
              onChange={formik.handleChange}
              label={common[locale].quantity}
            />
            <div className={cls.error}>
              {formik.errors?.quantity ? formik.errors?.quantity : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name='area'
              fullWidth
              type='number'
              variant='standard'
              value={formik.values?.area}
              onChange={formik.handleChange}
              label={common[locale].area}
            />
            <div className={cls.error}>
              {formik.errors?.area ? formik.errors?.area : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name='children'
              fullWidth
              variant='standard'
              type='number'
              value={formik.values?.children}
              onChange={formik.handleChange}
              label={common[locale].children}
            />
            <div className={cls.error}>
              {formik.errors?.children ? formik.errors?.children : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name='adult'
              fullWidth
              variant='standard'
              value={formik.values?.adult}
              type='number'
              onChange={formik.handleChange}
              label={common[locale].adult}
            />
            <div className={cls.error}>
              {formik.errors?.adult ? formik.errors?.adult : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name='bed'
              fullWidth
              variant='standard'
              type='number'
              value={formik.values?.bed}
              onChange={formik.handleChange}
              label={common[locale].bedsCount}
            />
            <div className={cls.error}>
              {formik.errors?.bed ? formik.errors?.bed : null}
            </div>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant='contained'
            onClick={() =>
              formik.validateForm().then((res) => {
                if (Object.keys(res).length === 0) {
                  handleNext()
                }
              })
            }
            type='button'
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

export default HotelRoomsMain
