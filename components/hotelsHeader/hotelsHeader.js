import React, { useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { FilterIcon, MapIcon, SearchIcon } from '../icons/commonIcons'
import cls from './hotelsHeader.module.scss'
import { useRouter } from 'next/router'
import MobileHotelsFilter from '../mobileHotelsFilter/mobileHotelsFilter'
import { common } from '../../locales/common'
import { sorting } from '../../constants/mock'
import FilterButton from '../filterButton/filterButton'
import useDidUpdate from '../../hook/useDidUpdate'
import useDebounce from '../../utils/useDebounce'

export default function HotelsHeader({ title, facilities, setFacilities }) {
  const { push, locale, pathname, query } = useRouter()
  const [openFilters, setFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState(query.search)
  const handleOpenFilters = () => setFilters(true)
  const handleCloseFilters = () => setFilters(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  const handleChange = (event) => {
    push({
      pathname: '',
      query: {
        ...query,
        [event.target.name]: event.target.value,
      },
    })
  }

  useDidUpdate(() => {
    push({
      pathname: '',
      query: {
        ...query,
        search: debouncedSearchTerm,
      },
    })
  }, [debouncedSearchTerm])

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
          <Typography variant='h1'>{title}</Typography>
        </Box>
        <div className={cls.actions}>
          <button className={cls.outlinedButton}>
            <div className={cls.caption}>
              <FilterButton
                label={common[locale].sorting}
                name='sort_by_price'
                value={query.sort_by_price}
                list={sorting}
                handleChange={handleChange}
              />
            </div>
          </button>
          <Button
            size='large'
            variant='outlined'
            startIcon={<MapIcon />}
            className={cls.outlinedButton2}
            onClick={() => push(`${pathname}/map`)}
          >
            {common[locale].show_map}
          </Button>
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
          <button
            className={cls.outlinedButton}
            onClick={() => push(`${pathname}/map`)}
          >
            <div className={cls.iconWrapper}>
              <MapIcon />
            </div>
          </button>
        </div>
      </div>
      <MobileHotelsFilter
        open={openFilters}
        onClose={handleCloseFilters}
        facilities={facilities}
        setFacilities={setFacilities}
      />
    </Container>
  )
}
