import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import cls from './blogFilters.module.scss'
import { FilterIcon, SearchIcon } from '../icons/commonIcons'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import MobileFilter from './mobileFilter'
import { blogFilter } from 'constants/mock'
import FilterCheckButton from '../filterButton/filterCheckButton'
import blogService from 'services/blogService'
import useDidUpdate from 'hook/useDidUpdate'
import useDebounce from 'utils/useDebounce'
import FilterButton from 'components/filterButton/filterButton'
import { common2 } from 'locales/common2'

export default function BlogFilters() {
  const { locale, query, push } = useRouter()
  const [openFilters, setFilters] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(query.category || 'all')
  const [mostViewed, setMostViewed] = useState(query.most_viewed || null)
  const [searchTerm, setSearchTerm] = useState(query.search)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  const handleOpenFilters = () => setFilters(true)
  const handleCloseFilters = () => setFilters(false)

  const fetchCategories = () => {
    blogService.getBlogCategory().then((res) => {
      const list = res.data.data.map((item) => ({
        label: item.translation?.title,
        value: item.alias,
      }))
      list.unshift({ label: common[locale].all, value: 'all' })
      setCategories(list)
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [locale])

  useDidUpdate(() => {
    push({
      pathname: '',
      query: {
        ...query,
        search: debouncedSearchTerm,
        category,
        most_viewed: mostViewed,
      },
    })
  }, [debouncedSearchTerm, category, mostViewed])

  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.wrapper}>
          <div className={cls.item}>
            <FilterCheckButton
              label={common2[locale].category}
              name='category'
              value={category}
              list={categories}
              handleChange={(event) => setCategory(event.target.value)}
            />
          </div>
          <div className={cls.item}>
            <FilterButton
              name='most_viewed'
              label={common[locale].sorting}
              value={mostViewed}
              list={blogFilter}
              handleChange={(event) => setMostViewed(event.target.value)}
            />
          </div>
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
          <div className={cls.filter}>
            <button className={cls.outlinedBtn} onClick={handleOpenFilters}>
              <FilterIcon />
            </button>
          </div>
        </div>
        <MobileFilter
          categories={categories}
          open={openFilters}
          onClose={handleCloseFilters}
          category={category}
          setCategory={setCategory}
          mostViewed={mostViewed}
          setMostViewed={setMostViewed}
          setSearchTerm={setSearchTerm}
        />
      </Container>
    </div>
  )
}
