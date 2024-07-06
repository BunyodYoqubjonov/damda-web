import React, { useRef, useState } from 'react'
import { Button, Container, Grid } from '@mui/material'
import FilterDateButton from '../filterButton/filterDateButton'
import { FilterIcon, SearchIcon } from '../icons/commonIcons'
import cls from './hotelFilters.module.scss'
import FilterPopover from '../filterPopover/filterPopover'
import FilterRoomsButton from '../filterButton/filterRoomsButton'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import useDebounce from '../../utils/useDebounce'
import useDidUpdate from '../../hook/useDidUpdate'
import { format, parseISO } from 'date-fns'

export default function HorizontalFilters({
  cities,
  regions,
  districts,
  facilities,
  setFacilities,
  total,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { locale, query, push } = useRouter()
  const [searchTerm, setSearchTerm] = useState(query.search)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  const isClearFilterRef = useRef(false)

  const handleClickFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)
  const searchHandle = (e) => setSearchTerm(e.target.value)

  useDidUpdate(() => {
    if (!isClearFilterRef.current) {
      push({
        pathname: '',
        query: {
          ...query,
          search: debouncedSearchTerm,
        },
      })
    }
  }, [debouncedSearchTerm])

  const handleFilterDateChange = (date) => {
    const date_from = date?.from ? format(date.from, 'yyyy-MM-dd') : null
    const date_to = date?.to ? format(date.to, 'yyyy-MM-dd') : null
    push({
      pathname: '',
      query: {
        ...query,
        date_from,
        date_to,
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

  return (
    <Container>
      <div className={cls.filters} style={{ padding: '50px 0' }}>
        <Grid container columnSpacing={1} rowSpacing={2}>
          <Grid item xs={3}>
            <div className={cls.search}>
              <input
                name='search'
                className={cls.input}
                placeholder={common[locale].search}
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
            <FilterDateButton
              values={{
                from: query.date_from ? parseISO(query.date_from) : null,
                to: query.date_to ? parseISO(query.date_to) : null,
              }}
              handleChange={handleFilterDateChange}
            />
          </Grid>
          <Grid item xs={3}>
            <FilterRoomsButton
              label={common[locale].room_guests}
              value={query}
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
        districts={districts}
        cities={cities}
        regions={regions}
        facilities={facilities}
        setFacilities={setFacilities}
        open={open}
        onClose={handleCloseFilter}
        anchorEl={anchorEl}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        total={total}
        setSearchTerm={setSearchTerm}
        isClearFilterRef={isClearFilterRef}
      />
    </Container>
  )
}
