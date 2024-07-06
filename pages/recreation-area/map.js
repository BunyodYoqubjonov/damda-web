import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useMediaQuery } from '@mui/material'
import SEO from '../../components/SEO'
import HorizontalFilters from '../../components/hotelFilters/horizontalFilters'
import MapView from '../../components/mapView/mapView'
import axios from '../../utils/axios'

const pageSize = 10

export default function RecreationAreaMap({ data, error, total }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale, query } = useRouter()
  const [list, setList] = useState(data?.data)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(data?.meta?.last_page)
  const [loading, setLoading] = useState(false)
  const [cities, setCities] = useState([])
  const [regions, setRegions] = useState([])
  const [districts, setDistricts] = useState([])
  const [allCities, setAllCities] = useState([])
  const [facilities, setFacilities] = useState([])

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
        setList((prev) => [...prev, ...res.data])
        setPage(res.meta.current_page)
        setLastPage(res.meta.last_page)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (query.city_id)
      setCities(allCities.filter((item) => item?.parent_id == query.city_id))
  }, [query.city_id, allCities])

  useEffect(() => {
    if (query.region_id)
      setDistricts(
        allCities.filter((item) => item?.parent_id == query.region_id)
      )
  }, [query.region_id, allCities])

  useEffect(() => {
    getCities()
    getAttributes()
  }, [locale])

  function getAttributes() {
    axios.get(`attributes?lang=${locale}&type=main`).then(({ data }) => {
      const newFacilities = data.map((item) => ({
        label: item.translation?.title,
        key: item.alias,
        value: false,
        icon: item.icon,
        id: item.id,
      }))
      setFacilities(newFacilities)
    })
  }

  function getCities() {
    axios.get(`countries?lang=${locale}`).then(({ data }) => {
      setAllCities(formatCities(data[0].cities))
      setRegions(
        formatCities(data[0].cities.filter((item) => item.parent_id === 0))
      )
    })
  }
  function formatCities(cities) {
    return cities.map((item) => ({
      label: item.translation?.title,
      value: item.id,
      parent_id: item.parent_id,
    }))
  }

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      {matches && (
        <HorizontalFilters
          regions={regions}
          cities={cities}
          districts={districts}
          facilities={facilities}
          setFacilities={setFacilities}
          total={total}
        />
      )}
      <MapView
        list={list}
        page={page}
        lastPage={lastPage}
        loading={loading}
        fetchResidences={fetchResidences}
        facilities={facilities}
        setFacilities={setFacilities}
      />
    </div>
  )
}

export async function getServerSideProps({ locale, query }) {
  const params = {
    ...query,
    perPage: 10,
    lang: locale,
    type: 'zone',
  }

  try {
    const data = await axios.get('/residences/paginate', { params })
    return {
      props: {
        data,
        total: data.meta.total,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        data: {},
        total: null,
        error: error.data,
      },
    }
  }
}
