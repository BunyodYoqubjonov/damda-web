import React, { useEffect, useState } from 'react'
import { Checkbox, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { Container } from '@mui/system'
import { FilterIcon, SearchIcon, TrashIcon } from '../icons/commonIcons'
import cls from './accountOrdersTableFilters.module.scss'
import FilterButton from '../filterButton/filterButton'
import { common } from '../../locales/common'
import useDebounce from '../../utils/useDebounce'
import bookingService from '../../services/BookingService'
import { format, parseISO } from 'date-fns'
import useDidUpdate from '../../hook/useDidUpdate'
import FilterDateButton from '../filterButton/filterDateButton'
import profileService from '../../services/profileService'
import AccountsOrdersFilterMobile from '../accountsOrdersFilterMobile/orderFilter/accountsOrdersFilterMobile'

export default function AccountOrdersTableFilters({
  deleteBooking,
  setChecked,
  list,
}) {
  const { locale, query, push } = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [statuses, setStatuses] = useState([])
  const [residences, setResidences] = useState([])
  const [searchTerm, setSearchTerm] = useState(query.search_owner)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  const handleClickFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)

  useEffect(() => {
    bookingService.getStatuses().then((res) => {
      const allStatuses = res.data.map((item) => ({
        label: item,
        value: item,
      }))
      setStatuses(allStatuses)
    })
    profileService.myResidences({ perPage: 1000 }).then((res) => {
      const allResidences = res.data.map((item) => ({
        label: item.translation?.title,
        value: item.id,
      }))
      setResidences(allResidences)
    })
  }, [])

  useDidUpdate(() => {
    push({
      pathname: '',
      query: {
        ...query,
        search_owner: debouncedSearchTerm,
      },
    })
  }, [debouncedSearchTerm])

  const handleChange = (event) => {
    push({
      pathname: '',
      query: {
        ...query,
        [event.target.name]: event.target.value,
      },
    })
  }

  const handleCheck = (e) => {
    if (e.target.checked) {
      setChecked(list.map((item) => item.id))
    } else {
      setChecked([])
    }
  }

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

  return (
    <div className={cls.root}>
      <Container>
        <Typography variant='h1' className={cls.title}>
          {common[locale].Price_orders}
        </Typography>
        <div className={cls.wrapper}>
          <div className={cls.actions}>
            <Checkbox
              name='select_all'
              color='secondary'
              disableRipple
              onChange={handleCheck}
            />
            <button onClick={deleteBooking} className={cls.trashBtn}>
              <TrashIcon />
            </button>
          </div>
          <div className={cls.search}>
            <input
              name='search'
              className={cls.input}
              placeholder={common[locale].search}
              autoComplete='off'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={cls.searchIcon}>
              <SearchIcon />
            </button>
          </div>
         
          <div className={cls.item}>
            <FilterDateButton
              values={{
                from: query.date_from ? parseISO(query.date_from) : null,
                to: query.date_to ? parseISO(query.date_to) : null,
              }}
              handleChange={handleFilterDateChange}
            />
          </div>
          <div className={cls.item}>
            <FilterButton
              label={common[locale].order_status}
              name='status'
              value={query.status}
              list={statuses}
              handleChange={handleChange}
            />
          </div>
          <div className={cls.filter}>
            <button className={cls.outlinedBtn} onClick={handleClickFilter}>
              <FilterIcon />
            </button>
          </div>
        </div>
      </Container>
      <AccountsOrdersFilterMobile
        open={open}
        onClose={handleCloseFilter}
        handleChange={handleChange}
        handleFilterDateChange={handleFilterDateChange}
        statuses={statuses}
        residences={residences}
      />
    </div>
  )
}
