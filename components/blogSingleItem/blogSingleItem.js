import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import cls from './blogSingleItem.module.scss'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import BlogItem from '../blogItem/blogItem'
import { useRouter } from 'next/router'
import blogService from 'services/blogService'
import { common2 } from 'locales/common2'
import { stringToDate } from 'utils/stringToDate'
import { BASE_URL } from 'constants/env'
import { ShowAllIcon } from 'components/icons/commonIcons'
import { common } from 'locales/common'
import dynamic from 'next/dynamic'

const GalleryCount = dynamic(() =>
  import('components/galleryModal/gallaryCount')
)
const GalleryModal = dynamic(() =>
  import('components/galleryModal/galleryModal')
)
const MobileGallery = dynamic(() =>
  import('components/mobileGallery/mobileGallery')
)

export default function BlogSingleItem({ data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()
  const [blogs, setBlogs] = useState([])
  const [openGallery, setGallery] = useState(null)
  const [galleryModal, setGalleryModal] = useState(false)
  const gallery = data.galleries?.filter((item) => item.position === 'gallery')

  function fetchRelatedBlogs() {
    const params = {
      perPage: 10,
    }
    blogService.getBlog(params).then((res) => setBlogs(res.data))
  }

  useEffect(() => {
    fetchRelatedBlogs()
  }, [locale])

  function editBody() {
    return data.translation?.body
      ?.replaceAll('src=\\"/uploads', `src=${BASE_URL}/uploads`)
      .replaceAll('\\"', '')
  }

  const showGalleryModal = (event) => {
    event.preventDefault()
    setGalleryModal(true)
  }
  const hideGalleryModal = (event) => {
    event.preventDefault()
    setGalleryModal(false)
  }
  const showGallery = (id) => setGallery(id)
  const hideGallery = () => setGallery(null)

  return (
    <div className={cls.root}>
      <Container>
        <div className={cls.header}>
          <Typography variant='h1' className={cls.title}>
            {data.translation?.title}
          </Typography>
          <Typography className={cls.subtitle}>
            {data.blog_category?.translation?.title}{' '}
            <span className={cls.separator} />{' '}
            {stringToDate(data?.publish_date, locale)}
          </Typography>
        </div>
        <div className={cls.imgWrapper}>
          <img
            src={
              BASE_URL +
              data.galleries.find((item) => item.position === 'banner')?.path
            }
            alt='Hilton'
          />
          <div className={cls.user}>
            <div className={cls.photoWrapper}>
              <img src='/favicon.png' alt='user' />
            </div>
            <Typography className={cls.name}>Damda.uz</Typography>
          </div>
        </div>
        <div
          className={cls.content}
          dangerouslySetInnerHTML={{ __html: editBody() }}
        />

        <div className={cls.galleryItemWrapper}>
          {gallery?.slice(0, 3).map((item, index) => (
            <img
              src={BASE_URL + item.path}
              alt='Hilton'
              key={index}
              className={cls.gallery}
              onClick={() => showGallery(item.id)}
            />
          ))}
          {gallery?.length > 2 && (
            <div className={cls.floatBtn}>
              <a className={cls.showAll} href='#' onClick={showGalleryModal}>
                <ShowAllIcon />
                <span>{common[locale].show_all}</span>
              </a>
            </div>
          )}
        </div>

        <div className={cls.footer}>
          <Typography variant='h2' className={cls.title}>
            {common2[locale].Similar_blogs}
          </Typography>
          <Link href='/blog'>
            <a className={cls.outlinedButton}>
              {common2[locale].view_all_blog}
            </a>
          </Link>
        </div>

        <div className={cls.scrollContainer}>
          <Grid
            container
            spacing={matches ? 4 : 2}
            sx={{ flexWrap: matches ? 'wrap' : 'nowrap' }}
          >
            {blogs.slice(3, 6).map((item, index) => (
              <Grid key={index} item xs={11} sm={5} md={4} flexShrink={0}>
                <BlogItem item={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>

      {matches && !!openGallery && (
        <GalleryModal
          open={Boolean(openGallery)}
          handleClose={hideGallery}
          data={data}
          photoId={openGallery}
        />
      )}
      {!matches && !!openGallery && (
        <MobileGallery
          open={Boolean(openGallery)}
          onClose={hideGallery}
          data={data}
          photoId={openGallery}
        />
      )}
      <GalleryCount
        open={galleryModal}
        handleClose={hideGalleryModal}
        data={data}
      />
    </div>
  )
}
