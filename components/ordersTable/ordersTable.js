import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@mui/system'
import { toast } from 'react-toastify'
import cls from './ordersTable.module.scss'
import OrdersHeader from '../ordersHeader/ordersHeader'
import CustomTable from '../customTable/customTable'
import OrderTableFilter from '../orderTableFilter/orderTableFilter'
import bookingService from '../../services/BookingService'
import { common } from '../../locales/common'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material'

export default function OrdersTable({ data, error }) {
  const { locale, query } = useRouter()
  const [list, setList] = useState(data.data)
  const [checked, setChecked] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(data.meta?.last_page)
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const pageSize = 10

  console.log('data => ', data)
  console.log('list => ', list)
  console.log('checked => ', checked)

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
      fetchBooking(page)
    }
  }, [page])

  function fetchBooking(page) {
    setLoading(true)
    const params = {
      page,
      perPage: pageSize,
      lang: locale,
      ...query,
    }
    if (query.state) {
      params[query.state] = 1
    } else {
      params.upcoming = 1
    }
    bookingService
      .list(params)
      .then((res) => {
        if (page === 1) {
          setList(res.data)
        } else {
          setList((prev) => [...prev, ...res.data])
        }
        setPage(res.meta.current_page)
        setLastPage(res.meta.last_page)
        setIsOpenPopup(false)
      })
      .finally(() => setLoading(false))
  }

  const deleteBooking = () => {
    setLoadingBtn(true)
    bookingService
      .deleteAll({ ids: checked })
      .then(() => {
        toast.success(common[locale].deleteText2)
        fetchBooking(1)
      })
      .finally(() => setLoadingBtn(false))
  }

  const handleOpenPopup = () => {
    if (checked.length) {
      setIsOpenPopup(true)
    }
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
        <OrdersHeader />
        <OrderTableFilter
          deleteBooking={handleOpenPopup}
          setChecked={setChecked}
          list={list}
        />
        <CustomTable
          list={list}
          checked={checked}
          setChecked={setChecked}
          isLoading={loading}
          page={page}
          lastPage={lastPage}
        />
        <Dialog
          open={isOpenPopup}
          onClose={() => setIsOpenPopup(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DialogTitle sx={{ marginBottom: 4, border: 'none' }}>
            {common[locale].deleteText}
          </DialogTitle>
          <DialogActions>
            <Button variant='outlined' onClick={() => setIsOpenPopup(false)}>
              {common[locale].cancel}
            </Button>
            <Button variant='contained' autoFocus onClick={deleteBooking}>
              {loading || loadingBtn ? (
                <CircularProgress color='inherit' size={22} />
              ) : (
                common[locale].yes
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  )
}
