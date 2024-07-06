import React from 'react'
import { SwipeableDrawer, Typography, Button, Grid } from '@mui/material'
import cls from './blogFilters.module.scss'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import FilterCheckButton from 'components/filterButton/filterCheckButton'
import { blogFilter } from 'constants/mock'
import { common2 } from 'locales/common2'
import FilterButton from 'components/filterButton/filterButton'

export default function MobileFilter({
  open,
  onClose,
  categories,
  category,
  setCategory,
  mostViewed,
  setMostViewed,
  setSearchTerm,
}) {
  const { locale } = useRouter()

  const clearFilter = () => {
    setSearchTerm('')
    setMostViewed('0')
    setCategory('all')
    onClose()
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
      <div className={cls.swiperBlock}>
        <Typography className={cls.title}>{common[locale].Filter}</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FilterCheckButton
              label={common2[locale].category}
              name='category'
              value={category}
              list={categories}
              handleChange={(event) => setCategory(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterButton
              name='most_viewed'
              label={common[locale].sorting}
              value={mostViewed}
              list={blogFilter}
              handleChange={(event) => setMostViewed(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={6}>
            <Button fullWidth variant='outlined' onClick={clearFilter}>
              {common[locale].clear_filter}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant='contained' onClick={onClose}>
              {common[locale].Show_results}
            </Button>
          </Grid>
        </Grid>
      </div>
    </SwipeableDrawer>
  )
}
