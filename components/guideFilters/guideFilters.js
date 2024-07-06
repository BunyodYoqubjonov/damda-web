import React, { useEffect, useState } from 'react'
import { Button, Grid, useMediaQuery } from '@mui/material'
import { layouts, gender } from '../../constants/mock'
import FilterButton from '../filterButton/filterButton'
import FilterDateButton from '../filterButton/filterDateButton'
import FilterPrice from '../filterButton/filterPrice'
import FilterStarButton from '../filterButton/filterStarButton'
import { SearchIcon } from '../icons/commonIcons'
import cls from './guideFilters.module.scss'
import axios from '../../utils/axios'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import FilterCheckButton from '../filterButton/filterCheckButton'
import FilterAttributes from '../filterButton/filterAttributes'
import FilterRegionButton from '../filterButton/filterRegionButton'

export default function GuideFilters({
  onClose,
  values,
  setValues,
  clearFilter,
  days,
  setDays,
  searchTerm,
  setSearchTerm,
  params,
  price,
  setPrice,
}) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()
  const [allCities, setAllCities] = useState([])
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    if (values?.region)
      setCities(allCities.filter((item) => item?.parent_id == values?.region))
  }, [values?.region, params, regions, locale])

  useEffect(() => {
    getCities()
    getAttributes()
    getMultiRegions()
  }, [locale])

  const handleMultipleChange = (event, name) => {
    const newArray = values[name].map((item) => {
      if (item.key === event.target.name) {
        return {
          ...item,
          value: event.target.checked,
        }
      } else {
        return item
      }
    })
    setValues({
      ...values,
      [name]: newArray,
    })
  }

  function getCities() {
    axios.get(`countries?lang=${locale}`).then(({ data }) => {
      setAllCities(formatCities(data[0].cities))
      setRegions(
        formatCities(data[0].cities.filter((item) => item.parent_id === 0))
      )
      getMultiRegions(
        formatCities(data[0].cities.filter((item) => item.parent_id === 0))
      )
    })
  }

  function getAttributes() {
    axios.get(`attributes?lang=${locale}&type=main`).then(({ data }) => {
      const newAttributes = data.map((item) => ({
        label: item.translation?.title,
        key: item.alias,
        value: false,
        icon: item.icon,
        id: item.id,
      }))
      setValues({ ...values, attributes: newAttributes })
    })
  }

  function formatCities(cities) {
    return cities.map((item) => ({
      label: item.translation?.title,
      value: item.id,
      parent_id: item.parent_id,
    }))
  }

  const handleChangeItem = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  function getMultiRegions(data) {
    const multiRegionList = data?.map((item) => ({
      icon: '',
      id: item.value,
      key: item.label,
      label: item.label,
      value: false,
    }))
    setValues({ ...values, multiRegions: multiRegionList })
  }

  return (
    <aside className={cls.wrapper}>
      <div className={cls.filters}>
        <Grid container columnSpacing={1} rowSpacing={matches ? 2 : 1}>
          <Grid item xs={12}>
            <div className={cls.search}>
              <input
                name='search'
                className={cls.input}
                placeholder={common[locale].search}
                autoComplete='off'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <button className={cls.searchIcon}>
                <SearchIcon />
              </button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <FilterDateButton values={days} handleChange={setDays} />
          </Grid>

          <Grid item xs={12}>
            <FilterRegionButton regions={regions} />
          </Grid>

          <Grid item xs={6}>
            <FilterCheckButton
              label={common[locale].district}
              name='district'
              value={values?.district}
              list={cities}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FilterButton
              label={common[locale].gender}
              name='gender'
              value={values?.gender}
              list={gender}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterAttributes
              label={common[locale].language}
              name='language'
              // list={}
              multiple
              handleChange={handleMultipleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterAttributes
              label={common[locale].Performance}
              name='multiRegions'
              list={values?.multiRegions}
              multiple
              handleChange={handleMultipleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FilterAttributes
              label={common[locale].facilities}
              name='attributes'
              list={values?.attributes}
              multiple
              handleChange={handleMultipleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FilterButton
              label={common[locale].layout}
              name='layout'
              value={values?.layout}
              list={layouts}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterStarButton
              label={common[locale].star_rating}
              value={values?.rating}
              handleChange={handleChangeItem}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterPrice
              label={common[locale].price_range}
              value={price}
              handleChange={setPrice}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant='outlined' onClick={clearFilter}>
              {common[locale].clear_filter}
            </Button>
          </Grid>
          {!matches && (
            <Grid item xs={6}>
              <Button fullWidth variant='contained' onClick={onClose}>
                {common[locale].Show_results}
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </aside>
  )
}
