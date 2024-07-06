import React from 'react'
import { useRouter } from 'next/router'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SummerHouseInfo from 'components/summerHouseInfo/summerHouseInfo'
import { common } from 'locales/common'
import { cooperation } from 'locales/cooperation'

export default function ForSummerHouses() {
  const { query, locale } = useRouter()

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
        current={cooperation[locale][query.id]?.title}
      />
      <SummerHouseInfo
        title={cooperation[locale][query.id]?.title}
        content={cooperation[locale][query.id]?.content}
      />
    </div>
  )
}
