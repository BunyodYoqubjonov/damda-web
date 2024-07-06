import React from 'react'
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs'
import PaymentCards from '../../components/paymentCards/paymentCards'
import PaymentsTable from '../../components/paymentsTable/paymentsTable'
import SEO from '../../components/SEO'
import {common} from "../../locales/common";
import {useRouter} from "next/router";

export default function Payments() {
    const {locale} = useRouter()
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
        ]}
        current={common[locale].Payment_history}
      />
      <PaymentCards />
      <PaymentsTable />
    </div>
  )
}
