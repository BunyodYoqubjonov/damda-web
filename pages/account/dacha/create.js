import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import DachaCreate from 'components/dachaCreate'
import { common } from 'locales/common'
import axios from 'utils/axios'
import { toast } from 'react-toastify'

export default function CreateSummerHouse({ countries, error }) {
  const { locale } = useRouter()

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
  }, [])

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: common[locale].Home,
            link: '/',
          },
          {
            title: common[locale].Cabinet,
            link: '/account',
          },
          {
            title: common[locale].my_summer_houses,
            link: '/account/dacha',
          },
        ]}
        current={common[locale].Add_new + ' ' + common[locale].summer_house}
      />
      <DachaCreate countries={countries} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { locale } = ctx

  try {
    const response = await axios.get('/countries', { lang: locale })
    return {
      props: {
        countries: response.data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        countries: [],
        error: error.data,
      },
    }
  }
}
