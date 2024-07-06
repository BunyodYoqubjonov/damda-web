import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import AccountOrdersTable from '../accountOrdersTable/accountOrdersTable'
import AccountOrdersTableFilters from '../accountOrdersTableFilters/accountOrdersTableFilters'
import cls from './myResidenceBookings.module.scss'
import bookingService from '../../services/BookingService'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material'
import { common } from 'locales/common'

export default function MyResidenceBookings({ data, error }) {
  const { locale, query } = useRouter()
  const [list, setList] = useState(data.data)
  const [checked, setChecked] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(data.meta?.last_page)
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const pageSize = 10

  useEffect(() => {
    console.log('data => ', data)
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
      fetchMyResidenceBookings(page)
    }
  }, [page])

  function fetchMyResidenceBookings(page) {
    setLoading(true)
    const params = {
      page,
      perPage: pageSize,
      lang: locale,
      residence_id: query?.id,
    }
    bookingService
      .myResidenceBookings(params)
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
      .myResidenceBookingDelete({ ids: checked })
      .then(() => {
        toast.success(common[locale].deleteText2)
        fetchMyResidenceBookings(1)
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
      <AccountOrdersTableFilters
        deleteBooking={handleOpenPopup}
        setChecked={setChecked}
        list={list}
      />
      <AccountOrdersTable
        list={list}
        checked={checked}
        setChecked={setChecked}
        isLoading={loading}
        refetch={fetchMyResidenceBookings}
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
    </div>
  )
}
