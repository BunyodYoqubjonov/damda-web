import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import nookies from 'nookies'
import AccountMainSettings from '../../components/accountMainSettings/accountMainSettings'
import AccountSettingsHeader from '../../components/accountSettingsHeader/accountSettingsHeader'
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs'
import SEO from '../../components/SEO'
import { navigation } from '../../locales/navigation'
import axios from '../../utils/axios'

export default function Account({ data, error }) {
  const { locale } = useRouter()

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
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
        ]}
        current={navigation[locale].cabinet}
      />
      <AccountSettingsHeader data={data} />
      <AccountMainSettings data={data} />
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
    console.log(error)
    return {
      props: {
        data: {},
        error: error.data,
      },
    }
  }
}
