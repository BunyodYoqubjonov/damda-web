import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import BlogSingleItem from 'components/blogSingleItem/blogSingleItem'
import axios from 'utils/axios'
import { toast } from 'react-toastify'
import { navigation } from 'locales/navigation'

export default function BlogSingle({ data, error }) {
  const { locale } = useRouter()

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
  }, [data])

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO
        title={data.translation?.meta_title}
        description={data.translation?.meta_description}
        keywords={data.translation?.meta_keywords}
      />
      <Breadcrumbs
        prevs={[
          {
            title: navigation[locale].home,
            link: '/',
          },
          {
            title: navigation[locale].blogs,
            link: '/blog',
          },
          {
            title: data?.blog_category?.translation?.title,
            link: `/blog?category=${data.blog_category.alias}`,
          },
        ]}
        current={data?.translation?.title}
      />
      <BlogSingleItem data={data} />
    </div>
  )
}

export async function getServerSideProps({ locale, query }) {
  const params = {
    lang: locale,
  }

  try {
    const data = await axios.get(`/blog/${query.index}`, { params })
    return {
      props: {
        data: data.data,
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
