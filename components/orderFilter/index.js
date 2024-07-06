import React from 'react'
import { SwipeableDrawer, Button } from '@mui/material'
import { parseISO } from 'date-fns'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import cls from './filter.module.scss'
import { Close } from '../icons/navIcons'
import FilterButton from '../filterButton/filterButton'
import { serviceTypes } from '../../constants/mock'
import FilterDateButton from '../filterButton/filterDateButton'

const OrderFilter = ({
  open,
  onClose,
  handleChange,
  handleFilterDateChange,
  statuses,
}) => {
  const { locale, query, push } = useRouter()

  const clearFilter = () => {
    push({
      pathname: '',
      query: {},
    })
  }

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px 12px 0 0',
          padding: '20px 15px',
        },
      }}
    >
      <div className={cls.root}>
        <div className={cls.header}>
          <p className={cls.title}>{common[locale].Filter}</p>
          <button onClick={onClose} className={cls.close}>
            <Close />
          </button>
        </div>
        <div className={cls.body}>
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
          <div className={cls.item}>
            <Button fullWidth variant='contained' onClick={onClose}>
              {common[locale].Show_results}
            </Button>
          </div>
          <div className={cls.item}>
            <Button fullWidth variant='outlined' onClick={clearFilter}>
              {common[locale].clear_filter}
            </Button>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  )
}

export default OrderFilter
