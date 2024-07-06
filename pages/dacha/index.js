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

const pageSize = 9

export default function Dacha({ data, error, topResidences }) {
  const { locale, query, push } = useRouter()
  const [list, setList] = useState(data?.data || [])
  const [page, setPage] = useState(query?.cursor ? Number(query?.cursor) : 1)
  const [lastPage, setLastPage] = useState(data?.meta?.last_page || 1)
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [facilities, setFacilities] = useState([])

  const metaTitle = meta[locale].title_dacha
  const metaDescription = meta[locale].description_dacha

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
    setList(data.data)
    setLastPage(data.meta.last_page)
  }, [data])

  function fetchResidences(page) {
    setLoadingBtn(true)
    const params = {
      page,
      perPage: pageSize,
      lang: locale,
      type: 'cottage',
      ...query,
    }
    axios
      .get('/residences/paginate', { params })
      .then((res) => {
        setList((prev) => [...prev, ...res.data])
        setLastPage(res?.meta?.last_page)
        setPage(res?.meta?.current_page ?? page)
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
      type: 'cottage',
      ...query,
    }
    axios
      .get('/residences/paginate', { params })
      .then((res) => {
        setList(res.data)
        setLastPage(res?.meta?.last_page)
      })
      .finally(() => setLoading(false))
    setPage(page)
    push({ query: { cursor: page } }, undefined, { shallow: true })
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
        current={navigation[locale].summer_house}
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
        topResidences={topResidences}
      />
      <ToTop />
    </div>
  )
}

export async function getServerSideProps({ query, locale }) {
  const page = query?.cursor ? Number(query?.cursor) : 1
  const params = {
    ...query,
    perPage: pageSize,
    lang: locale,
    type: 'cottage',
    page,
  }

  try {
    const data = await axios.get('/residences/paginate', { params })
    const topResidences = await axios.get('/residences/top', {
      params: { type: params.type, lang: locale },
    })
    return {
      props: {
        data,
        topResidences: topResidences.data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        data: {},
        topResidences: [],
        error: error.data,
      },
    }
  }
}
