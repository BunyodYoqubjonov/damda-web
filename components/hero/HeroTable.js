import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../../utils/axios'
import cls from './hero.module.scss'
import { common } from '../../locales/common'
import { ArrowDown, SearchIcon } from '../icons/commonIcons'
import { format } from 'date-fns'
import DateRangePopover from '../popover/dateRangePopover'
import RadioPopover from '../popover/radioPopover'
import { toast } from 'react-toastify'
import ResidentPopover from '../popover/residentPopover'
import { residentData } from '../../constants/mock'
import { useMediaQuery } from '@mui/material'
import { navigation } from '../../locales/navigation'
import { common2 } from '../../locales/common2'

export default function TempPanel({ values, setValues, resident }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentTab, setCurrentTab] = useState(null)
  const { locale } = useRouter()
  const [country, setCountry] = useState([])
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [days, setDays] = useState(null)
  const router = useRouter()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const handleClick = (event, current) => {
    setAnchorEl(event.currentTarget)
    setCurrentTab(current)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setCurrentTab(null)
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }
  function getCities() {
    axios.get(`countries?lang=${locale}`).then(({ data }) => {
      setCountry(formatCountries(data?.flatMap((e) => e)))
    })
  }
  function formatCities(cities) {
    return cities?.map((item) => ({
      label: item?.translation?.title,
      value: item?.id,
      parent_id: item?.parent_id,
    }))
  }
  function formatCountries(country) {
    return country?.map((item) => ({
      label: item?.translation?.title,
      value: item?.id,
      cities: item?.cities,
    }))
  }

  const handleSearch = () => {
    if (!days) {
      toast.warn(common[locale].chooseDays)
    } else if (!values.country) {
      toast.warn(common[locale].chooseCountry)
    } else if (!values.region) {
      toast.warn(common[locale].chooseRegion)
    } else {
      const date_from = days?.from ? format(days.from, 'yyyy-MM-dd') : null
      const date_to = days?.to ? format(days.to, 'yyyy-MM-dd') : null
      router.push({
        pathname: matches ? `/${resident}` : `/${values.residentMock}`,
        query: {
          country_id: values.country,
          city_id: values.region,
          region_id: values.district,
          date_from,
          date_to,
        },
      })
    }
  }
  useEffect(() => {
    setRegions(
      formatCities(
        country
          .flatMap((item) => item.value == values.country && item.cities)
          .filter((item) => item?.parent_id === 0)
      )
    )
  }, [values.country, locale])
  useEffect(() => {
    if (regions) {
      setCities(
        country
          .flatMap((item) => formatCities(item.cities))
          .filter((item) => item?.parent_id == values?.region)
      )
    }
  }, [values?.region, locale])
  useEffect(() => {
    setCities(
      formatCities(
        country
          .flatMap((item) => item.value == values.country && item.cities)
          .filter((item) => item?.parent_id == values?.region)
      )
    )
  }, [locale])
  useEffect(() => {
    getCities()
  }, [locale])

  return (
    <>
      <div
        className={cls.block}
        style={{ display: matches ? 'none' : 'block' }}
        onClick={(event) => handleClick(event, 'residentMock')}
      >
        <div className={cls.label}>
          <span className={cls.text}>{common2[locale].type}</span> <ArrowDown />
        </div>
        <input
          name='resident'
          className={cls.input}
          value={
            navigation[locale][
              residentData.find((item) => item.value === values.residentMock)
                ?.label
            ]
          }
          disabled
          placeholder={common[locale].service_type}
          autoComplete='off'
        />
      </div>

      <div
        className={cls.block}
        onClick={(event) => handleClick(event, 'date')}
      >
        <div className={cls.label}>
          <span className={cls.text}>{common[locale].Arrival}</span>{' '}
          <ArrowDown />
        </div>
        <input
          name='start_date'
          className={cls.input}
          value={days?.from && format(days.from, 'dd MMM, yyyy')}
          disabled
          placeholder={common[locale].Start_date}
          autoComplete='off'
        />
      </div>
      <div
        className={cls.block}
        onClick={(event) => handleClick(event, 'date')}
      >
        <div className={cls.label}>
          <span className={cls.text}>{common[locale].Departure}</span>{' '}
          <ArrowDown />
        </div>
        <input
          name='end_date'
          className={cls.input}
          value={days?.to && format(days.to, 'dd MMM, yyyy')}
          disabled
          placeholder={common[locale].End_date}
          autoComplete='off'
        />
      </div>
      <div
        className={cls.block}
        onClick={(event) => handleClick(event, 'country')}
      >
        <div className={cls.label}>
          <span className={cls.text}>{common[locale].country}</span>{' '}
          <ArrowDown />
        </div>
        <input
          name='country'
          className={cls.input}
          value={country?.find((item) => item.value == values?.country)?.label}
          disabled
          placeholder={common[locale].country}
          autoComplete='off'
        />
      </div>

      <div
        className={cls.block}
        style={{ display: values.country ? 'block' : 'none' }}
        onClick={(event) => handleClick(event, 'region')}
      >
        <div className={cls.label}>
          <span className={cls.text}>{common[locale].Region}</span>{' '}
          <ArrowDown />
        </div>
        <input
          name='region'
          className={cls.input}
          value={regions?.find((item) => item.value == values?.region)?.label}
          disabled
          placeholder={common[locale].Region}
          autoComplete='off'
        />
      </div>

      <div
        className={cls.block}
        style={{ display: values.region ? 'block' : 'none' }}
        onClick={(event) => handleClick(event, 'district')}
      >
        <div className={cls.label}>
          <span className={cls.text}>{common[locale].District}</span>{' '}
          <ArrowDown />
        </div>
        <input
          name='district'
          className={cls.input}
          value={cities?.find((item) => item.value == values?.district)?.label}
          disabled
          placeholder={common[locale].District}
          autoComplete='off'
        />
      </div>
      <div className={cls.block} onClick={handleSearch}>
        <div className={cls.search}>
          <SearchIcon />
          <span className={cls.text}>{common[locale].Search}</span>
        </div>
      </div>

      <RadioPopover
        open={currentTab === 'country'}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={country}
        value={values.country}
        name={currentTab}
        handleChange={handleChange}
      />
      <RadioPopover
        open={currentTab === 'region'}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={regions}
        value={values.region}
        name={currentTab}
        handleChange={handleChange}
      />
      <RadioPopover
        open={currentTab === 'district'}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={cities}
        value={values.district}
        name={currentTab}
        handleChange={handleChange}
      />
      <DateRangePopover
        open={currentTab === 'date'}
        onClose={handleClose}
        anchorEl={anchorEl}
        value={days}
        handleChange={setDays}
      />
      <ResidentPopover
        open={currentTab === 'residentMock'}
        onClose={handleClose}
        anchorEl={anchorEl}
        list={residentData}
        value={values.residentMock}
        name={currentTab}
        handleChange={handleChange}
      />
    </>
  )
}
