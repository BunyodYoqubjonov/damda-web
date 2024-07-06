import React, { useEffect, useState } from 'react'
import { Container, Grid, useMediaQuery } from '@mui/material'
import cls from './usefulBlogSection.module.scss'
import { useRouter } from 'next/router'
import BlogItem from '../blogItem/blogItem'
import blogService from 'services/blogService'
import Loading from '../loading'
import { common2 } from 'locales/common2'

export default function UsefulBlogSection() {
  const router = useRouter()
  const [blogs, setBlogs] = useState([])
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)

  const fetchBlog = () => {
    setLoading(true)
    const body = {
      perpage: 10,
      lang: locale,
    }
    blogService
      .getBlog(body)
      .then((res) => setBlogs(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBlog()
  }, [locale])

  return (
    <Container>
      <section className={cls.root}>
        <Grid container mb={4}>
          <Grid item xs={6}>
            <h4 className={cls.title}>{common2[locale].useful_blog}</h4>
          </Grid>
          <Grid item xs={6}>
            <button
              className={cls.outlinedButton}
              onClick={() => router.push('/blog')}
            >
              {common2[locale].view_all_blog}
            </button>
          </Grid>
        </Grid>

        <div className={cls.scrollContainer}>
          <Grid
            container
            spacing={matches ? 4 : 2}
            sx={{ flexWrap: matches ? 'wrap' : 'nowrap' }}
          >
            {loading ? (
              <Grid container spacing={12} mt={5}>
                <Loading />
              </Grid>
            ) : (
              blogs.splice(0, 3).map((item) => (
                <Grid key={item.id} item xs={11} sm={5} md={4} flexShrink={0}>
                  <BlogItem item={item} />
                </Grid>
              ))
            )}
          </Grid>
        </div>
      </section>
    </Container>
  )
}
