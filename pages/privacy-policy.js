import React from 'react'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import { useRouter } from 'next/router'
import { navigation } from 'locales/navigation'
import Privacy from 'components/privacyPolicy'
import { common } from 'locales/common'
import { getMarkdownData } from 'utils/getMarkdownData'

export default function PrivacyPolicy({ data }) {
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
        current={navigation[locale].privacy_policy}
      />
      <Privacy data={data} />
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const data = await getMarkdownData(`privacy_${locale}`)

  return {
    props: {
      data,
    },
  }
}
