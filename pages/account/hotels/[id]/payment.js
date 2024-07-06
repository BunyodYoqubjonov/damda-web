import React from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import SEO from 'components/SEO'
import AccountPaymentMethod from 'components/accountPaymentMethod/accountPaymentMethod'
import PaymentsTable from 'components/paymentsTable/paymentsTable'
import { common } from 'locales/common'

export default function AccountPayment() {
  const { query, locale } = useRouter()

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
          {
            title: query.id,
            link: `/account/dacha/${query.id}`,
          },
        ]}
        current={common[locale].Payment}
      />
      <AccountPaymentMethod />
      <PaymentsTable />
    </div>
  )
}
