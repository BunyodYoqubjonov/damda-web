import React from 'react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import AdvertisingPage from '../components/advertisingPage/advertisingPage'
import { common } from '../locales/common'
import { useRouter } from 'next/router'

export default function Advertising() {
  const { locale } = useRouter()

  return (
    <div style={{ minHeigth: '50vh' }}>
      <SEO />
      <Breadcrumbs
        prevs={[
          {
            title: common[locale].Home,
            link: '/',
          },
        ]}
        current={common[locale].Advertising}
      />
      <AdvertisingPage />
    </div>
  )
}
