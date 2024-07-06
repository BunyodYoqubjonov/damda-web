import React, { useEffect } from 'react'
import { Grid, ListItemText, Select, TextField, Checkbox } from '@mui/material'
import SelectInput from '../selectInput/selectInput'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import cls from './dachaCreateMain.module.scss'
import MenuItem from '@mui/material/MenuItem'
import { forWhomData } from 'constants/ForWhom'
import { useTheme } from '@mui/material/styles'
import InputNumber from 'components/inputNumber/inputNumber'
import ReactInputMask from 'react-input-mask'

export default function DachaCreateMain({
  setSelect,
  select,
  formik,
  valueLang,
  setWhom,
  whom,
  lang,
  allCities,
  setCities,
  cities,
  regions,
  setVillage,
  village,
  error,
}) {
  const { locale } = useRouter()
  const theme = useTheme()

  const handleChange = (event) => {
    setSelect({
      ...select,
      [event.target.name]: event.target.value,
    })
  }

  const handleChangeForWhom = (event) => {
    const {
      target: { value },
    } = event
    setWhom(typeof value === 'string' ? value.split(',') : value)
  }

  function handleChangeRegions(value) {
    const dataFilter = allCities.filter((item) => item.parent_id === value)
    const data = dataFilter.map((item) => ({
      value: item.id,
      label: item.translation?.title,
    }))
    setCities(data)
  }

  function handleChangeVillage(value) {
    const dataFilter = allCities.filter((item) => item.parent_id === value)
    const data = dataFilter.map((item) => ({
      value: item.id,
      label: item.translation?.title,
    }))
    setVillage(data)
  }

  useEffect(() => {
    handleChangeRegions(parseInt(select.city_id))
    handleChangeVillage(parseInt(select.region_id))
  }, [select, locale])

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }

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
          label={common[locale].dormitories}
          name='number_of_rooms'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.number_of_rooms}
        />
        <div className={cls.error}>
          {error?.number_of_rooms ? error?.number_of_rooms[0] : null}
        </div>
      </Grid>
      <Grid container item xs={12} sm={6} md={4} columnSpacing={1.5}>
        <Grid item xs={6}>
          <InputNumber
            fullWidth
            autoComplete='on'
            variant='standard'
            label={common[locale].price_per_day}
            name='price'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            value={formik.values?.price}
          />
          <div className={cls.error}>
            {error?.price ? error?.price[0] : null}
          </div>
        </Grid>
        <Grid item xs={6}>
          <InputNumber
            fullWidth
            autoComplete='on'
            variant='standard'
            label={common[locale].price_holiday}
            name='holiday_price'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            value={formik.values?.holiday_price}
          />
          <div className={cls.error}>
            {error?.holiday_price ? error?.holiday_price[0] : null}
          </div>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          autoComplete='on'
          variant='standard'
          label={common[locale].bathroom}
          name='bathroom'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.bathroom}
        />
        <div className={cls.error}>
          {error?.bathroom ? error?.bathroom[0] : null}
        </div>
      </Grid>

      <Grid container item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          autoComplete='on'
          variant='standard'
          label={common[locale].surface}
          name='aria'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.aria}
        />
        <div className={cls.error}>{error?.aria ? error?.aria[0] : null}</div>
      </Grid>

      <Grid container item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          autoComplete='on'
          variant='standard'
          label={common[locale].yard_area}
          name='yard_area'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.yard_area}
        />
        <div className={cls.error}>{error?.aria ? error?.aria[0] : null}</div>
      </Grid>

      <Grid container item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          autoComplete='on'
          variant='standard'
          label={common[locale].Number_of_people}
          name='adult'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values?.adult}
        />
        <div className={cls.error}>{error?.adult ? error?.adult[0] : null}</div>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className={cls.grid}>
        <label className={cls.label}>{common[locale].for_whom}</label>
        <Select
          multiple
          fullWidth
          value={whom}
          variant='standard'
          className='MuiSelect-select-center'
          onChange={handleChangeForWhom}
          renderValue={(selected) =>
            selected.map((item) => common[locale][item]).join(', ')
          }
          InputLabelProps={{ shrink: true }}
        >
          {forWhomData.map((name) => (
            <MenuItem
              key={name.id}
              value={name.value}
              style={getStyles(name.label, whom, theme)}
            >
              <Checkbox checked={whom.indexOf(name.id) > -1} />
              <ListItemText primary={common[locale][name.value]} />
            </MenuItem>
          ))}
        </Select>
        <div className={cls.error}>
          {error?.for_whom ? error?.for_whom[0] : null}
        </div>
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

      <Grid item xs={12} sm={6} md={4}>
        <SelectInput
          name='village'
          label={common[locale].village}
          value={parseInt(select.village)}
          list={village}
          handleChange={handleChange}
        />
        <div className={cls.error}>
          {error?.village_id ? error?.village_id[0] : null}
        </div>
      </Grid>
    </Grid>
  )
}
