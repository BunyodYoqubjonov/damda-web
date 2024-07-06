import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import cls from './subscriptionsTable.module.scss'
import { Typography } from '@mui/material'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import { common2 } from 'locales/common2'
import { toast } from 'react-toastify'
import { stringToDate } from 'utils/stringToDate'
import { numberToPrice } from 'utils/numberToPrice'
import subscriptionService from 'services/subscriptionService'
import { differenceInDays, parse } from 'date-fns'

export default function SubscriptionsTable({ data, error }) {
  const { locale, query } = useRouter()
  const [list, setList] = useState(data?.data)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(data.meta?.last_page)
  const pageSize = 10

  useEffect(() => {
    if (error) {
      console.log('error => ', error)
      toast.error('Internal server error')
      return
    }
    setList(data.data)
    setPage(1)
    setLastPage(data.meta.last_page)
  }, [data])

  useEffect(() => {
    if (page !== 1) {
      fetchSubscriptions(page)
    }
  }, [page])

  function fetchSubscriptions(page) {
    setLoading(true)
    const params = {
      page,
      perPage: pageSize,
      lang: locale,
      ...query,
    }
    subscriptionService
      .getMySubscriptions(params)
      .then((res) => {
        setList((prev) => [...prev, ...res.data])
        setPage(res.meta.current_page)
        setLastPage(res.meta.last_page)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleScroll = () => {
    const lastProductLoaded = document.querySelector(
      '.products_row > .products_item:last-child'
    )

    if (lastProductLoaded) {
      const lastProductLoadedOffset =
        lastProductLoaded.offsetTop + lastProductLoaded.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight
      if (pageOffset > lastProductLoadedOffset) {
        if (lastPage > page) {
          if (!loading) {
            setPage(page + 1)
          }
        }
      }
    }
  }

  return (
    <div className={cls.root}>
      <Container>
        <Typography variant='h1' className={cls.headTitle}>
          {common2[locale].subscriptions}
        </Typography>
        <div className={cls.wrapper}>
          {list.map((item, index) => {
            const isSubscriptionExpired =
              differenceInDays(
                parse(item.expired_at, 'yyyy/MM/dd', new Date()),
                new Date()
              ) < 0
            return (
              <div key={index} className={cls.row}>
                <div className={cls.title}>
                  <div className={cls.name}>
                    <Typography className={cls.heading}>
                      {item.residence?.translation?.title}
                    </Typography>
                    <Typography variant='caption'>
                      {item.residence?.translation?.address}
                    </Typography>
                  </div>
                </div>
                <div className={cls.item} style={{ flex: '0 0 14%' }}>
                  <Typography className={cls.heading}>
                    {item.subscription?.translation?.title}
                  </Typography>
                  <Typography variant='caption'>
                    {common2[locale].subscription}
                  </Typography>
                </div>
                <div className={cls.item} style={{ flex: '0 0 14%' }}>
                  <Typography className={cls.heading}>
                    {stringToDate(item.created_at, locale)}
                  </Typography>
                  <Typography variant='caption'>
                    {common[locale].Payment_date}
                  </Typography>
                </div>
                <div className={cls.item} style={{ flex: '0 0 14%' }}>
                  <Typography className={cls.heading}>
                    {item.expired_at}
                  </Typography>
                  <Typography variant='caption'>
                    {common2[locale].active_until}
                  </Typography>
                </div>
                <div className={cls.item} style={{ flex: '0 0 14%' }}>
                  <Typography className={cls.heading}>
                    {numberToPrice(item.price, locale)}
                  </Typography>
                  <Typography variant='caption'>
                    {common[locale].price}
                  </Typography>
                </div>

                <div className={cls.item} style={{ flex: '0 0 12%' }}>
                  <Typography
                    className={cls.heading}
                    sx={{
                      textTransform: 'capitalize',
                      color:
                        item.active && !isSubscriptionExpired
                          ? 'common.green'
                          : 'common.red',
                    }}
                  >
                    {item.active && !isSubscriptionExpired
                      ? common[locale].active
                      : common[locale].inactive}
                  </Typography>
                  <Typography variant='caption'>
                    {common2[locale].status}
                  </Typography>
                </div>
              </div>
            )
          })}

          {list.map((item, index) => {
            const isSubscriptionExpired =
              differenceInDays(
                parse(item.expired_at, 'yyyy/MM/dd', new Date()),
                new Date()
              ) < 0
            return (
              <div key={index} className={cls.card}>
                <div className={cls.wrapper}>
                  <div className={cls.header}>
                    <div className={cls.name}>
                      <Typography className={cls.heading}>
                        {item.residence?.translation?.title}
                      </Typography>
                      <Typography variant='caption'>
                        {item.residence?.translation?.address}
                      </Typography>
                    </div>
                    <div className={cls.price}>
                      <Typography className={cls.heading}>
                        {numberToPrice(item.price, locale)}
                      </Typography>
                      <Typography variant='caption'>
                        {common[locale].price}
                      </Typography>
                    </div>
                  </div>
                  <div className={cls.body}>
                    <div className={cls.row}>
                      <div className={cls.item}>
                        <Typography className={cls.heading}>
                          {item.subscription?.translation?.title}
                        </Typography>
                        <Typography variant='caption'>
                          {common2[locale].subscription}
                        </Typography>
                      </div>

                      <div className={cls.item}>
                        <Typography className={cls.heading}>
                          {item.expired_at}
                        </Typography>
                        <Typography variant='caption'>
                          {common2[locale].active_until}
                        </Typography>
                      </div>

                      <div className={cls.item}>
                        <Typography
                          className={cls.heading}
                          sx={{
                            textTransform: 'capitalize',
                            color:
                              item.active && !isSubscriptionExpired
                                ? 'common.green'
                                : 'common.red',
                          }}
                        >
                          {item.active && !isSubscriptionExpired
                            ? common[locale].active
                            : common[locale].inactive}
                        </Typography>
                        <Typography variant='caption'>
                          {common[locale].Payment_status}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
