import React from 'react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import { useRouter } from 'next/router'
import { navigation } from '../locales/navigation'
import Faq from '../components/faq'
import { common } from '../locales/common'

export default function Questions() {
  const { locale } = useRouter()

  return (
    <div style={{ minHeigth: '50vh' }}>
      <SEO title={navigation[locale].frequent_questions} />
      <Breadcrumbs
        prevs={[
          {
            title: common[locale].Home,
            link: '/',
          },
        ]}
        current={navigation[locale].frequent_questions}
      />
      <Faq />
    </div>
  )
}
