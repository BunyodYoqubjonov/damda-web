import React, { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { FilterIcon, SearchIcon } from '../icons/commonIcons'
import cls from './guideHeader.module.scss'
import { useRouter } from 'next/router'
import MobileHotelsFilter from '../mobileHotelsFilter/mobileHotelsFilter'
import { common } from '../../locales/common'
import { sorting } from '../../constants/mock'
import FilterButton from '../filterButton/filterButton'

export default function GuideHeader({
  searchTerm,
  setSearchTerm,
  setValues,
  values,
  setDays,
  setPrice,
  list,
  page,
  pageSize,
  lastPage,
  clearFilter,
  days,
  price,
  fetchResidences,
  loading,
  params,
}) {
  const { locale } = useRouter()
  const [openFilters, setFilters] = useState(false)
  const handleOpenFilters = () => setFilters(true)
  const handleCloseFilters = () => setFilters(false)
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Container>
      <div className={cls.header}>
        <Box
          maxWidth='40%'
          sx={{
            '@media (max-width: 900px)': {
              maxWidth: '95%',
            },
          }}
        >
          <Typography variant='h1'>Booking Guide in Uzbekistan</Typography>
        </Box>
        <div className={cls.actions}>
          <button className={cls.outlinedButton}>
            <div className={cls.caption}>
              <FilterButton
                label={common[locale].sorting}
                name='sort_by_price'
                value={values?.sort_by_price}
                list={sorting}
                handleChange={handleChange}
              />
            </div>
          </button>
        </div>

        <div className={cls.mobileActions}>
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
          <button className={cls.outlinedButton} onClick={handleOpenFilters}>
            <div className={cls.iconWrapper}>
              <FilterIcon />
            </div>
          </button>
        </div>
      </div>
      <MobileHotelsFilter
        open={openFilters}
        onClose={handleCloseFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        params={params}
        setPrice={setPrice}
        clearFilter={clearFilter}
        days={days}
        setDays={setDays}
        price={price}
        setValues={setValues}
        values={values}
        page={page}
        list={list}
        lastPage={lastPage}
        loading={loading}
        fetchResidences={fetchResidences}
        pageSize={pageSize}
      />
    </Container>
  )
}
