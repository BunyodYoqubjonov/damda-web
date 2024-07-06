import React, { useEffect } from 'react'
import {
  Grid,
  ListItemText,
  Select,
  TextField,
  Checkbox,
  Rating,
  Typography,
} from '@mui/material'
import SelectInput from '../selectInput/selectInput'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import cls from './hotelCreateMain.module.scss'
import MenuItem from '@mui/material/MenuItem'
import { forWhomData } from 'constants/ForWhom'
import { useTheme } from '@mui/material/styles'
import InputNumber from 'components/inputNumber/inputNumber'
import ReactInputMask from 'react-input-mask'

export default function HotelCreateMain({
  setSelect,
  select,
  formik,
  valueLang,
  lang,
  allCities,
  setCities,
  cities,
  regions,
  setCountry,
  country,
  error,
  countries,
  star,
  setStar,
  setRegions,
}) {
  const { locale } = useRouter()

  const handleChange = (event) => {
    setSelect({
      ...select,
      [event.target.name]: event.target.value,
    })
  }

  function handleChangeRegions(value) {
    console.log({ value, select, country })
    const dataFilter = countries
      .find((item) => item.id === country || select.country_id)
      ?.cities.filter((item) => item.parent_id === value)
    const data = dataFilter?.map((item) => ({
      value: item.id,
      label: item.translation?.title,
    }))
    setCities(data)
  }

  function handleChangeCountry(value) {
    setCountry(value)
    const dataFilter = countries
      .find((item) => item.id === value)
      ?.cities.filter((item) => item.parent_id === 0)
    const data = dataFilter?.map((item) => ({
      value: item.id,
      label: item.translation?.title,
    }))
    setRegions(data)
  }

  useEffect(() => {
    handleChangeRegions(parseInt(select.city_id))
    handleChangeCountry(parseInt(select.country_id))
  }, [select, locale])

  return (
    <Grid container spacing={4} mt={0} className={cls.inputWrapper}>
      <Grid item xs={12} sm={6} md={4}>
        {lang.map((item) => (
          <div key={`title.${item.value}`}>
            <TextField
              name={`title.${item.value}`}
              fullWidth
              autoComplete='on'
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
              value={formik.values.title[valueLang]}
              label={
                <>
                  {common[locale].title} ({valueLang})
                </>
              }
              onChange={formik.handleChange}
              sx={{ display: item.value !== valueLang ? ' none' : 'block' }}
            />
            <div
              className={cls.error}
              style={{ display: item.value !== valueLang ? ' none' : 'block' }}
            >
              {error
                ? error[`title.${locale}`]
                  ? error[`title.${locale}`][0]
                  : null
                : null}
            </div>
          </div>
        ))}
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          autoComplete='on'
          variant='standard'
          label={common[locale].number_of_floors}
          name='number_of_floors'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.number_of_floors}
        />
        <div className={cls.error}>
          {error?.number_of_floors ? error?.number_of_floors[0] : null}
        </div>
      </Grid>
      <Grid container item xs={12} sm={6} md={4}>
        <InputNumber
          fullWidth
          autoComplete='on'
          variant='standard'
          label={common[locale].prepay_sent}
          name='prepay_sent'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.prepay_sent}
        />
        <div className={cls.error}>
          {error?.prepay_sent ? error?.prepay_sent[0] : null}
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          autoComplete='on'
          variant='standard'
          label={common[locale].contract}
          name='contract'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.contract}
        />
        <div className={cls.error}>
          {error?.contract ? error?.contract[0] : null}
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Typography variant='body2'>{common[locale].star}</Typography>
        <Rating
          id='rating'
          value={star}
          onChange={(e, value) => setStar(value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <ReactInputMask
          mask='+\9\98 99 999 99 99'
          onChange={formik.handleChange}
          value={formik.values?.phone}
        >
          {() => (
            <TextField
              fullWidth
              variant='standard'
              label={common[locale].phone}
              name='phone'
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </ReactInputMask>
        <div className={cls.error}>{error?.phone ? error?.phone[0] : null}</div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectInput
          name='country_id'
          label={common[locale].country}
          value={parseInt(select.country_id)}
          list={countries?.map((item) => ({
            value: item.id,
            label: item.translation.title,
          }))}
          handleChange={handleChange}
        />
        <div className={cls.error}>
          {error?.country_id ? error?.country_id[0] : null}
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectInput
          name='city_id'
          label={common[locale].region}
          value={parseInt(select.city_id)}
          list={regions}
          handleChange={handleChange}
        />
        <div className={cls.error}>
          {error?.city_id ? error?.city_id[0] : null}
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectInput
          name='region_id'
          label={common[locale].district}
          value={parseInt(select.region_id)}
          list={cities}
          handleChange={handleChange}
        />
        <div className={cls.error}>
          {error?.region_id ? error?.region_id[0] : null}
        </div>
      </Grid>
    </Grid>
  )
}
