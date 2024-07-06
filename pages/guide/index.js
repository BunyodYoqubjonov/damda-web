import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs'
import SEO from '../../components/SEO'
import { fetchMultipleUrls } from '../../utils/fetchMultipleUrls'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'
import { facilities, sorting } from '../../constants/mock'
import useDebounce from '../../utils/useDebounce'
import useDidUpdate from '../../hook/useDidUpdate'
import { format } from 'date-fns'
import axios from '../../utils/axios'
import GuideHeader from '../../components/guideHeader/guideHeader'
import GuideList from '../../components/guideList/guideList'

const initialValues = {
  sort_by_price: undefined,
  country: undefined,
  region: undefined,
  district: undefined,
  layout: 'horizontal',
  facilities: facilities,
  rating: undefined,
  gender: undefined,
  attributes: [],
  multiRegions: [],
}

export default function Hotels({ hotels }) {
  const { locale } = useRouter()
  const router = useRouter()
  const [values, setValues] = useState(initialValues)
  const [searchTerm, setSearchTerm] = useState('')
  const [list, setList] = useState(hotels?.data)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [lastPage, setLastPage] = useState(hotels?.meta?.last_page)
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState()
  const [price, setPrice] = useState([100000, 9000000])
  const params = router.query
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  const priceDebounce = useDebounce(price, 800)
  useDidUpdate(() => {
    fetchResidences(1, pageSize)
  }, [
    values,
    days,
    sorting,
    locale,
    debouncedSearchTerm,
    priceDebounce,
    locale,
  ])

  const filterAttributes = values.attributes
    .filter((item) => item.value === true)
    .flatMap((item) => item.id)

  function fetchResidences(page, perPage) {
    setLoading(true)
    const params = {
      page,
      perPage,
      lang: locale,
      region_id: values.district ? values.district : undefined,
      city_id: values.region ? values.region : undefined,
      date_from: days?.from ? format(days.from, 'yyyy-MM-dd') : undefined,
      date_to: days?.to ? format(days.to, 'yyyy-MM-dd') : undefined,
      rating: values.rating ? values.rating : undefined,
      price_from: price !== 0 ? price[0] : undefined,
      price_to: priceDebounce[1] !== 0 ? priceDebounce[1] : undefined,
      room: values.room ? values.room : undefined,
      adult: values.adult ? values.adult : undefined,
      children: values.children ? values.children : undefined,
      search: searchTerm === '' ? undefined : debouncedSearchTerm,
      type: 'hotel',
      attributes: filterAttributes.length === 0 ? undefined : filterAttributes,
      sort_by_price: values.sort_by_price,
    }
    axios
      .get('/residences/paginate', { params })
      .then((res) => {
        if (page === 1) {
          setList(res.data)
        } else {
          setList((prev) => [...prev, ...res.data])
        }
        setPage(res.meta.current_page)
        setLastPage(res.meta.last_page)
      })
      .catch((err) => console.log('err => ', err))
      .finally(() => setLoading(false))
  }

  const clearFilter = () => {
    setValues(initialValues)
    setPrice([100000, 9000000])
    setDays(undefined)
    setSearchTerm('')
  }

  useEffect(() => {
    const isEmpty = Object.keys(params).length === 0
    if (!isEmpty) {
      setValues({
        ...values,
        ...params,
      })
      setDays({ from: new Date(params.from), to: new Date(params.to) })
    }
  }, [params])

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: navigation[locale].home,
            link: '/',
          },
        ]}
        current={navigation[locale].guide}
      />
      <GuideHeader
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
        data={hotels}
      />
      <GuideList
        data={hotels}
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
    </div>
  )
}

export async function getServerSideProps({ locale }) {
  const [hotels] = await fetchMultipleUrls([
    `/residences/paginate?perPage=10&type=hotel&lang=${locale}`,
  ])

  return {
    props: {
      hotels,
    },
  }
}
