import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import BlogFilters from 'components/blogFilters/blogFilters'
import BlogHero from 'components/blogHero/blogHero'
import BlogItem from 'components/blogItem/blogItem'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import { Container } from '@mui/system'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import blogService from 'services/blogService'
import axios from 'utils/axios'
import { toast } from 'react-toastify'
import Pagination from 'components/pagination/pagination'
import PageLoading from 'components/loading/pageLoading'
import LoadMoreBtn from 'components/loadMoreBtn/loadMoreBtn'
import { common2 } from 'locales/common2'

const pageSize = 12

export default function Blog({ data, error }) {
  const { locale, query } = useRouter()
  const [list, setList] = useState(data?.data)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(data?.meta?.last_page)
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
    setList(data.data)
    setPage(data.meta.current_page)
    setLastPage(data.meta.last_page)
  }, [data])

  function fetchBlogs(page) {
    setLoadingBtn(true)
    const params = {
      page,
      perPage: pageSize,
      ...query,
    }
    if (query.most_viewed) {
      params.most_viewed = 1
    }
    if (query.category === 'all') {
      params.category = null
    }
    blogService
      .getBlog(params)
      .then((res) => {
        setList((prev) => [...prev, ...res.data])
        setPage(res.meta.current_page)
        setLastPage(res.meta.last_page)
      })
      .finally(() => setLoadingBtn(false))
  }

  const handleChangePagination = (event, value) => {
    fetchBlogsWithPagination(value, event)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function fetchBlogsWithPagination(page) {
    setLoading(true)
    const params = {
      page,
      perPage: pageSize,
      ...query,
    }
    if (query.most_viewed) {
      params.most_viewed = 1
    }
    if (query.category === 'all') {
      params.category = null
    }
    blogService
      .getBlog(params)
      .then((res) => {
        setList(res.data)
        setPage(res.meta.current_page)
        setLastPage(res.meta.last_page)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO
        title={common[locale].Blogs}
        description={common2[locale].blog_text}
      />
      <Breadcrumbs
        prevs={[
          {
            title: common[locale].Home,
            link: '/',
          },
        ]}
        current={common[locale].Blogs}
      />
      <BlogHero />
      <BlogFilters />
      <Container>
        <Grid container spacing={4} mt={1}>
          {list?.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <BlogItem item={item} />
            </Grid>
          ))}
          {page < lastPage ? (
            <Grid item xs={12}>
              <LoadMoreBtn
                loading={loadingBtn}
                fetchData={fetchBlogs}
                page={page}
              />
            </Grid>
          ) : (
            ''
          )}
          <Grid item xs={12}>
            <Pagination
              total={lastPage}
              page={page}
              handleChange={handleChangePagination}
            />
          </Grid>
          {loading && <PageLoading />}
          <div
            style={{
              margin: '0 auto',
              fontSize: '25px',
              fontFamily: "'TT Commons', sans-serif",
            }}
          >
            {list.length === 0 && common[locale].not_blog}
          </div>
        </Grid>
      </Container>
    </div>
  )
}

export async function getServerSideProps({ locale, query }) {
  const params = {
    ...query,
    perPage: pageSize,
    lang: locale,
  }

  if (query.most_viewed) {
    params.most_viewed = 1
  }
  if (query.category === 'all') {
    params.category = null
  }

  try {
    const data = await axios.get('/blog', { params })
    return {
      props: {
        data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        data: {},
        error: error.data,
      },
    }
  }
}
