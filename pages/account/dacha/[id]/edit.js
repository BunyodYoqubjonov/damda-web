import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { toast } from 'react-toastify'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import { common } from 'locales/common'
import DachaCreate from 'components/dachaCreate'
import axios from 'utils/axios'

export default function EditSummerHouse({ data, error, countries }) {
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
            title: common[locale].cottage,
            link: '/account/dacha',
          },
        ]}
        current={data.translation?.title}
      />
      <DachaCreate data={data} countries={countries} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { query, locale } = ctx
  const cookies = nookies.get(ctx)

  try {
    const response = await axios.get('/countries', { lang: locale })
    const res = await axios.get(`/users/residences/${query.id}`, {
      headers: {
        Authorization: cookies.access_token,
      },
      params: {
        lang: locale,
      },
    })
    return {
      props: {
        data: res.data,
        countries: response.data,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        data: {},
        countries: [],
        error: error.data,
      },
    }
  }
}
