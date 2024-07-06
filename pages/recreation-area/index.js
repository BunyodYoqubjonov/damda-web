import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import HotelsHeader from 'components/hotelsHeader/hotelsHeader'
import HotelsList from 'components/hotelsList/hotelsList'
import SEO from 'components/SEO'
import { navigation } from 'locales/navigation'
import axios from 'utils/axios'
import { meta } from 'locales/meta'
const ToTop = dynamic(() => import('components/toTop'))

const pageSize = 10

export default function RecreationAreas({ data, error }) {
  const { locale, query, push } = useRouter()
  const [list, setList] = useState(data?.data || [])
  const [page, setPage] = useState(query?.cursor ? Number(query?.cursor) : 1)
  const [lastPage, setLastPage] = useState(data?.meta?.last_page || 1)
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [facilities, setFacilities] = useState([])

  const metaTitle = meta[locale].title_resorts
  const metaDescription = meta[locale].description_resorts

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
    setList(data.data)
    setLastPage(data.meta.last_page)
    console.log('data => ', data)
  }, [data])

  function fetchResidences(page) {
    setLoadingBtn(true)
    const params = {
      page,
      perPage: pageSize,
      lang: locale,
      type: 'zone',
      ...query,
    }
    axios
      .get('/residences/paginate', { params })
      .then((res) => {
        setList((prev) => [...prev, ...res.data])
        setLastPage(res.meta.last_page)
      })
      .finally(() => setLoadingBtn(false))
  }

  const handleChangePagination = (event, value) => {
    fetchResidencesWithPagination(value, event)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function fetchResidencesWithPagination(page) {
    setLoading(true)
    const params = {
      page,
      perPage: pageSize,
      lang: locale,
      type: 'zone',
      ...query,
    }
    axios
      .get('/residences/paginate', { params })
      .then((res) => {
        setList(res.data)
        setLastPage(res.meta.last_page)
      })
      .finally(() => setLoading(false))
      setPage(page)
      push({query: {cursor: page}}, undefined, {shallow: true})
  }

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO title={metaTitle} description={metaDescription} />
      <Breadcrumbs
        prevs={[
          {
            title: navigation[locale].home,
            link: '/',
          },
        ]}
        current={navigation[locale].resorts}
      />
      <HotelsHeader
        title={metaTitle}
        facilities={facilities}
        setFacilities={setFacilities}
      />
      <HotelsList
        page={page}
        list={list}
        lastPage={lastPage}
        loading={loading}
        loadingBtn={loadingBtn}
        handleChangePagination={handleChangePagination}
        fetchResidences={fetchResidences}
        facilities={facilities}
        setFacilities={setFacilities}
        description={metaDescription}
      />
      <ToTop />
    </div>
  )
}

export async function getServerSideProps({ locale, query }) {
  const page = query?.cursor ? Number(query?.cursor) : 1
  const params = {
    ...query,
    perPage: 10,
    lang: locale,
    type: 'zone',
    page
  }

  try {
    const data = await axios.get('/residences/paginate', { params })
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
