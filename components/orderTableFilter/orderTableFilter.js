import React, { useEffect, useState } from 'react'
import { Checkbox } from '@mui/material'
import { useRouter } from 'next/router'
import { FilterIcon, SearchIcon, TrashIcon } from '../icons/commonIcons'
import cls from './orderTableFilter.module.scss'
import FilterButton from '../filterButton/filterButton'
import { serviceTypes } from '../../constants/mock'
import OrderFilter from '../orderFilter'
import { common } from '../../locales/common'
import useDebounce from '../../utils/useDebounce'
import useDidUpdate from '../../hook/useDidUpdate'
import { format, parseISO } from 'date-fns'
import FilterDateButton from '../filterButton/filterDateButton'
import bookingService from '../../services/BookingService'

export default function OrderTableFilter({ deleteBooking, setChecked, list }) {
  const { locale, query, push } = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [statuses, setStatuses] = useState([])
  const [searchTerm, setSearchTerm] = useState(query.search)
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
  }, [])

  useDidUpdate(() => {
    push({
      pathname: '',
      query: {
        ...query,
        search: debouncedSearchTerm,
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
      <div className={cls.wrapper}>
        <div className={cls.actions}>
          <Checkbox
            name='select_all'
            color='secondary'
            onChange={handleCheck}
            disableRipple
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
          <FilterButton
            label={common[locale].Service_type}
            name='service_type'
            value={query.service_type}
            list={serviceTypes}
            handleChange={handleChange}
          />
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
      <OrderFilter
        open={open}
        onClose={handleCloseFilter}
        handleChange={handleChange}
        handleFilterDateChange={handleFilterDateChange}
        statuses={statuses}
      />
    </div>
  )
}
