import React, { useEffect, useRef, useState } from 'react'
import { Button, Grid, useMediaQuery } from '@mui/material'
import { dachaVacants, layouts } from '../../constants/mock'
import FilterButton from '../filterButton/filterButton'
import FilterDateButton from '../filterButton/filterDateButton'
import FilterPrice from '../filterButton/filterPrice'
import FilterStarButton from '../filterButton/filterStarButton'
import { SearchIcon } from '../icons/commonIcons'
import cls from './hotelFilters.module.scss'
import FilterRoomsButton from '../filterButton/filterRoomsButton'
import axios from '../../utils/axios'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import FilterCheckButton from '../filterButton/filterCheckButton'
import useDebounce from '../../utils/useDebounce'
import useDidUpdate from '../../hook/useDidUpdate'
import { format, parseISO } from 'date-fns'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setLayout } from '../../redux/actions/themeActions/themeActions'

export default function HotelFilters({
  onClose = () => {},
  facilities,
  setFacilities,
}) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale, pathname, push, query } = useRouter()
  const dispatch = useDispatch()
  const { layout } = useSelector((state) => state.theme, shallowEqual)
  const [allCities, setAllCities] = useState([])
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [price, setPrice] = useState([
    Number(query.price_from) || 100000,
    Number(query.price_to) || 9000000,
  ])
  const [searchTerm, setSearchTerm] = useState(query.search)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  const debouncedPrice = useDebounce(price, 400)
  const isClearFilterRef = useRef(false)

  useDidUpdate(() => {
    if (!isClearFilterRef.current) {
      push({
        pathname: '',
        query: {
          ...query,
          search: debouncedSearchTerm,
          price_from: debouncedPrice[0],
          price_to: debouncedPrice[1],
        },
      })
    }
  }, [debouncedSearchTerm, debouncedPrice])

  const handleFilterDateChange = (date) => {
    const date_from = date?.from ? format(date.from, 'yyyy-MM-dd') : undefined
    const date_to = date?.to ? format(date.to, 'yyyy-MM-dd') : undefined
    console.log({ date_from, date_to })
    if (date_from || date_to) {
      if (date_from) {
        push({
          pathname: '',
          query: {
            ...query,
            date_from,
          },
        })
      }
      if (date_to) {
        push({
          pathname: '',
          query: {
            ...query,
            date_to,
          },
        })
      }
    }
    if (!date_from && !date_to) {
      push({
        pathname: '',
        query: { ...query, date_to: undefined, date_from: undefined },
      })
    }
    const {
      date_from: queryDateFrom,
      date_to: queryDateto,
      ...otherQueries
    } = query
  }

  const handleChange = (event) => {
    push({
      pathname: '',
      query: {
        ...query,
        [event.target.name]: event.target.value,
      },
    })
  }

  const handleChangeLayout = (event) => {
    dispatch(setLayout(event.target.value))
  }

  useEffect(() => {
    if (query.city_id)
      setCities(allCities.filter((item) => item?.parent_id == query.city_id))
  }, [query.city_id, allCities])

  useEffect(() => {
    getCities()
    getAttributes()
  }, [locale])

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

  function getCities() {
    axios.get(`countries?lang=${locale}`).then(({ data }) => {
      setAllCities(formatCities(data[0].cities))
      setRegions(
        formatCities(data[0].cities.filter((item) => item.parent_id === 0))
      )
    })
  }

  function getAttributes() {
    axios.get(`attributes?lang=${locale}&type=main`).then(({ data }) => {
      const newFacilities = data.map((item) => ({
        label: item.translation?.title,
        key: item.alias,
        value: false,
        icon: item.icon,
        id: item.id,
      }))
      setFacilities(newFacilities)
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
    setSearchTerm('')
    setPrice([100000, 9000000])
    push({
      pathname: '',
      query: {},
    }).finally(() => (isClearFilterRef.current = false))
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
            <FilterDateButton
              values={{
                from: query.date_from ? parseISO(query.date_from) : null,
                to: query.date_to ? parseISO(query.date_to) : null,
              }}
              handleChange={handleFilterDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterCheckButton
              label={common[locale].region}
              name='city_id'
              value={query.city_id}
              list={regions}
              handleChange={handleChange}
            />
          </Grid>
          {query.city_id ? (
            <Grid item xs={12}>
              <FilterCheckButton
                label={common[locale].district}
                name='region_id'
                value={query.region_id}
                list={cities}
                handleChange={handleChange}
              />
            </Grid>
          ) : (
            ''
          )}
          <Grid item xs={12}>
            <FilterRoomsButton
              label={common[locale].room_guests}
              value={query}
              handleChange={handleChangeItem}
              isDacha={pathname == '/dacha'}
            />
          </Grid>
          {pathname === '/dacha' && (
            <Grid item xs={12}>
              <FilterButton
                label={common[locale].for_whom}
                name='for_whom'
                value={query.for_whom}
                list={dachaVacants}
                handleChange={handleChange}
              />
            </Grid>
          )}
          {pathname !== '/residences/cottage' && (
            <Grid item xs={pathname === '/residences/cottage' ? 12 : 6}>
              <FilterButton
                label={common[locale].facilities}
                multiple
                name='attributes'
                list={facilities}
                handleChange={handleChangeFacilities}
                closeEvent={handleCloseFacilities}
              />
            </Grid>
          )}
          <Grid item xs={pathname === '/residences/cottage' ? 12 : 6}>
            <FilterButton
              label={common[locale].layout}
              name='layout'
              value={layout}
              list={layouts}
              handleChange={handleChangeLayout}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterStarButton
              label={common[locale].star_rating}
              value={query.star}
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
