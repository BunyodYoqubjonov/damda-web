import React, { useState } from 'react'
import { Button, Container, Grid } from '@mui/material'
import FilterDateButton from '../filterButton/filterDateButton'
import { FilterIcon, SearchIcon } from '../icons/commonIcons'
import cls from './guideFilters.module.scss'
import FilterPopover from '../filterPopover/filterPopover'
import FilterRoomsButton from '../filterButton/filterRoomsButton'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function GuideHorizontalFilters({
  values,
  clearFilter,
  setValues,
  searchTerm,
  setSearchTerm,
  cities,
  regions,
  country,
  setDays,
  days,
  handleChangeItem,
  price,
  setPrice,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { locale } = useRouter()

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleClickFilter = (event) => setAnchorEl(event.currentTarget)

  const handleCloseFilter = () => setAnchorEl(null)

  const searchHandle = (e) => setSearchTerm(e.target.value)

  return (
    <Container>
      <div className={cls.filters} style={{ padding: '50px 0' }}>
        <Grid container columnSpacing={1} rowSpacing={2}>
          <Grid item xs={3}>
            <div className={cls.search}>
              <input
                name='search'
                className={cls.input}
                placeholder='Search hotels'
                autoComplete='off'
                onChange={searchHandle}
                value={searchTerm}
              />
              <button className={cls.searchIcon}>
                <SearchIcon />
              </button>
            </div>
          </Grid>
          <Grid item xs={3}>
            <FilterDateButton values={days} handleChange={setDays} />
          </Grid>
          <Grid item xs={3}>
            <FilterRoomsButton
              label={common[locale].room_guests}
              value={values}
              handleChange={handleChangeItem}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              size='large'
              variant='outlined'
              startIcon={<FilterIcon />}
              sx={{ borderColor: 'primary.border' }}
              onClick={handleClickFilter}
            >
              {common[locale].Filter}
            </Button>
          </Grid>
        </Grid>
      </div>
      <FilterPopover
        price={price}
        setPrice={setPrice}
        country={country}
        cities={cities}
        regions={regions}
        values={values}
        setValues={setValues}
        clearFilter={clearFilter}
        open={open}
        onClose={handleCloseFilter}
        anchorEl={anchorEl}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Container>
  )
}
