import React, { useEffect } from 'react'
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs'
import PersonalSettings from '../../components/personalSettings/personalSettings'
import SEO from '../../components/SEO'
import nookies from 'nookies'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'
import axios from '../../utils/axios'

export default function Settings({ data, error }) {
  const { locale, push } = useRouter()

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      push('/login')
    }
    console.log('data => ', data)
  }, [data])

  return (
    <div style={{ minHeight: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: navigation[locale].home,
            link: '/',
          },
          {
            title: navigation[locale].cabinet,
            link: '/account',
          },
        ]}
        current={navigation[locale].personal_settings}
      />
      <PersonalSettings data={data} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)

  try {
    const data = await axios.get('/users/detail', {
      headers: {
        Authorization: cookies.access_token,
      },
    })
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
