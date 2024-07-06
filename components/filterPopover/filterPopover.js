import React, { useState } from 'react'
import { Button, Grid, Popover } from '@mui/material'
import { useRouter } from 'next/router'
import cls from './filterPopover.module.scss'
import FilterButton from '../filterButton/filterButton'
import FilterPrice from '../filterButton/filterPrice'
import FilterStarButton from '../filterButton/filterStarButton'
import { common } from '../../locales/common'
import { common2 } from '../../locales/common2'
import useDebounce from '../../utils/useDebounce'
import useDidUpdate from '../../hook/useDidUpdate'
import FilterCheckButton from '../filterButton/filterCheckButton'

export default function FilterPopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  regions,
  districts,
  facilities,
  setFacilities,
  total,
  setSearchTerm,
  isClearFilterRef,
}) {
  const { locale, query, push } = useRouter()
  const [price, setPrice] = useState([
    Number(query.price_from) || 100000,
    Number(query.price_to) || 9000000,
  ])
  const debouncedPrice = useDebounce(price, 400)

  useDidUpdate(() => {
    if (!isClearFilterRef.current) {
      push({
        pathname: '',
        query: {
          ...query,
          price_from: debouncedPrice[0],
          price_to: debouncedPrice[1],
        },
      })
    }
  }, [debouncedPrice])

  const handleChange = (event) => {
    push({
      pathname: '',
      query: {
        ...query,
        [event.target.name]: event.target.value,
      },
    })
  }

  const handleChangeFacilities = (event, name) => {
    const newArray = facilities.map((item) => {
      if (item.key === event.target.name) {
        return {
          ...item,
          value: event.target.checked,
        }
      } else {
        return item
      }
    })
    setFacilities(newArray)
  }

  const handleCloseFacilities = () => {
    const selectedFacilities = facilities.filter((item) => item.value)
    const facilityParams = {}
    selectedFacilities.forEach((item, idx) => {
      facilityParams[`attributes[${idx}]`] = item.id
    })
    if (!selectedFacilities.length && !query['attributes[0]']) return
    const queryParams = {}
    const params = Object.entries(query)
    params.forEach((item) => {
      if (item[0].includes('attributes')) {
        queryParams[item[0]] = null
      } else {
        queryParams[item[0]] = item[1]
      }
    })
    push({
      pathname: '',
      query: {
        ...queryParams,
        ...facilityParams,
      },
    })
  }

  const handleChangeItem = (key, value) => {
    push({
      pathname: '',
      query: {
        ...query,
        [key]: value,
      },
    })
  }

  const clearFilter = () => {
    isClearFilterRef.current = true
    onClose()
    setPrice([100000, 9000000])
    setSearchTerm('')
    push({
      pathname: '',
      query: {},
    }).finally(() => (isClearFilterRef.current = false))
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      <div className={cls.root}>
        <div className={cls.wrapper}>
          <Grid container spacing={2} pt={2}>
            <Grid item xs={6}>
              <FilterCheckButton
                label={common[locale].Region}
                name='region_id'
                value={query.region_id}
                list={regions}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FilterCheckButton
                label={common[locale].District}
                name='district_id'
                value={query.district_id}
                list={districts}
                handleChange={handleChange}
              />
            </Grid>
            <Grid container spacing={2} item xs={6}>
              <Grid item xs={12}>
                <FilterButton
                  label={common[locale].facilities}
                  multiple
                  name='attributes'
                  list={facilities}
                  handleChange={handleChangeFacilities}
                  closeEvent={handleCloseFacilities}
                />
              </Grid>
              <Grid item xs={12}>
                <FilterStarButton
                  label={common[locale].star_rating}
                  value={query.rating}
                  handleChange={handleChangeItem}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <FilterPrice
                label={common[locale].price_range}
                value={price}
                handleChange={setPrice}
              />
            </Grid>
          </Grid>
        </div>
        <div className={cls.actions}>
          <Button variant='contained' onClick={onClose}>
            {common2[locale].Show} {total} {common2[locale].result}
          </Button>
          <Button variant='outlined' onClick={clearFilter}>
            {common[locale].clear_filter}
          </Button>
        </div>
      </div>
    </Popover>
  )
}
