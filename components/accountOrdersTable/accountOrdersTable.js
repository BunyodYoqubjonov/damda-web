import React, { useState } from 'react'
import {
  Checkbox,
  Typography,
  Button,
  Container,
  useMediaQuery,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import cls from './accountOrdersTable.module.scss'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { stringToDate } from '../../utils/stringToDate'
import { common } from '../../locales/common'
import { common2 } from '../../locales/common2'
import getImageFromBaseUrl from '../../utils/getImageFromBaseUrl'
import bookingService from '../../services/BookingService'

export default function AccountOrdersTable({
  list,
  checked,
  setChecked,
  isLoading,
  refetch = () => {},
}) {
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [status, setStatus] = useState(null)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const handleCheck = (e) => {
    const value = Number(e.target.id)
    if (checked.includes(value)) {
      setChecked(checked.filter((item) => item != value))
    } else {
      setChecked([...checked, value])
    }
  }

  const handleOpenModal = (data, newStatus) => {
    setModalData(data)
    setStatus(newStatus)
  }

  const handleCancel = () => {
    setModalData(null)
    setStatus(null)
  }

  function changeBookingStatus() {
    const id = modalData.id
    const payload = { status }
    setLoading(true)
    bookingService
      .myResidenceBookingStatusChange(id, payload)
      .then((res) => {
        console.log('res => ', res)
        refetch(1)
        handleCancel()
      })
      .finally(() => setLoading(false))
  }

  console.log('list => ', list)

  return (
    <div className={`${cls.root} products_row`}>
      <Container>
        {matches
          ? list.map((item) => (
              <div key={item.id} className={`${cls.row} products_item`}>
                <div className={cls.title}>
                  <Checkbox
                    name='select'
                    color='secondary'
                    disableRipple
                    onChange={handleCheck}
                    id={item.id}
                    checked={checked.includes(item.id)}
                  />
                  <div className={cls.name}>
                    <Typography className={cls.heading}>
                      {item.residence?.translation?.title}
                    </Typography>
                    <Typography variant='caption'>
                      {
                        item.residence.address_title?.city_name?.translation
                          ?.title
                      }
                      {', '}
                      {
                        item.residence.address_title?.region_name?.translation
                          ?.title
                      }
                    </Typography>
                  </div>
                </div>
                <div className={cls.item} style={{ flex: '0 0 14%' }}>
                  <Typography className={cls.heading}>
                    {stringToDate(item.created_at, locale)}
                  </Typography>
                  <Typography variant='caption'>
                    {common[locale].order_time}
                  </Typography>
                </div>
                <div className={cls.item} style={{ flex: '0 0 14%' }}>
                  <Typography className={cls.heading}>
                    {`${item.user?.firstname || ''} ${
                      item.user?.lastname || ''
                    } ${item?.name || ''}`}
                  </Typography>
                  <Typography variant='caption'>
                    {common2[locale].customer}
                  </Typography>
                </div>
                <div className={cls.item} style={{ flex: '0 0 15%' }}>
                  <Typography className={cls.heading}>
                    {item.user?.phone || item?.phone}
                  </Typography>
                  <Typography variant='caption'>
                    {common[locale].phone}
                  </Typography>
                </div>
                <div className={cls.item} style={{ flex: '0 0 15%' }}>
                  <Typography className={cls.heading}>
                    {stringToDate(item.registration_date.in, locale)} —{' '}
                    {stringToDate(item.registration_date.out, locale)}
                  </Typography>
                  <Typography variant='caption'>
                    {common[locale].arrive_leave_time}
                  </Typography>
                </div>
                <div
                  className={cls.item}
                  style={{ flex: '0 0 18%', textAlign: 'center' }}
                >
                  {item.status === 'created' ? (
                    <Box display='flex' alignItems='center' columnGap={1.5}>
                      <Button
                        variant='contained'
                        sx={{
                          backgroundColor: 'common.red',
                          width: 80,
                          padding: 2,
                          '&:hover': {
                            backgroundColor: 'common.red',
                          },
                        }}
                        onClick={() => handleOpenModal(item, 'rejected')}
                      >
                        {common2[locale].reject}
                      </Button>
                      <Button
                        variant='contained'
                        sx={{
                          backgroundColor: 'common.green',
                          width: 80,
                          padding: 2,
                          '&:hover': {
                            backgroundColor: 'common.green',
                          },
                        }}
                        onClick={() => handleOpenModal(item, 'approved')}
                      >
                        {common2[locale].accept}
                      </Button>
                    </Box>
                  ) : (
                    <Typography
                      variant='body2'
                      className={cls.status}
                      color={
                        item.status === 'approved'
                          ? 'common.green'
                          : 'common.red'
                      }
                    >
                      {common[locale][item.status]}
                    </Typography>
                  )}
                </div>
              </div>
            ))
          : list?.map((item) => (
              <div key={item.id} className={cls.box}>
                <Checkbox
                  name='select'
                  color='secondary'
                  disableRipple
                  onChange={handleCheck}
                  id={item.id}
                  checked={checked.includes(item.id)}
                />
                <div className={cls.boxRow}>
                  <div className={cls.title}>
                    <div className={cls.imgWrapper}>
                      <img
                        src={getImageFromBaseUrl(item.residence.img)}
                        alt={item.residence?.translation?.title}
                      />
                    </div>
                    <div className={cls.name}>
                      <Typography className={cls.heading}>
                        {item.residence.translation?.title}
                      </Typography>
                      <Typography variant='caption' className={cls.address}>
                        {item.residence.translation?.address}
                      </Typography>
                    </div>
                  </div>

                  <div className={cls.listContainer}>
                    <div className={cls.item1}>
                      <Typography className={cls.heading}>
                        {stringToDate(item.created_at, locale)}
                      </Typography>
                      <Typography variant='caption'>
                        {common[locale].order_time}
                      </Typography>
                    </div>

                    <div className={cls.item1}>
                      <Typography className={cls.heading}>
                        {item.user?.phone}
                      </Typography>
                      <Typography variant='caption'>
                        {common[locale].phone}
                      </Typography>
                    </div>

                    <div className={cls.item1}>
                      <Typography className={cls.heading}>
                        {item.user?.firstname} {item.user?.lastname}
                      </Typography>
                      <Typography variant='caption'>
                        {common2[locale].customer}
                      </Typography>
                    </div>
                  </div>

                  <div className={cls.listFooter}>
                    <div className={cls.linkBox}>
                      <Typography className={cls.heading}>
                        {item.registration_date.in} —{' '}
                        {item.registration_date.out}
                      </Typography>
                      <Typography variant='caption'>
                        {common[locale].arrive_leave_time}
                      </Typography>
                    </div>

                    <div className={cls.statusBox}>
                      {item.status === 'created' ? (
                        <Box display='flex' alignItems='center' columnGap={1.5}>
                          <Button
                            variant='contained'
                            sx={{
                              backgroundColor: 'common.red',
                              width: 80,
                              padding: 2,
                              '&:hover': {
                                backgroundColor: 'common.red',
                              },
                            }}
                            onClick={() => handleOpenModal(item, 'rejected')}
                          >
                            {common2[locale].reject}
                          </Button>
                          <Button
                            variant='contained'
                            sx={{
                              backgroundColor: 'common.green',
                              width: 80,
                              padding: 2,
                              '&:hover': {
                                backgroundColor: 'common.green',
                              },
                            }}
                            onClick={() => handleOpenModal(item, 'approved')}
                          >
                            {common2[locale].accept}
                          </Button>
                        </Box>
                      ) : (
                        <Typography
                          variant='body2'
                          className={cls.status}
                          color={
                            item.status === 'approved'
                              ? 'common.green'
                              : 'common.red'
                          }
                        >
                          {common[locale][item.status]}
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        {isLoading && (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            mt={2}
          >
            <CircularProgress color='inherit' size={28} />
          </Box>
        )}
      </Container>
      {!!modalData && (
        <Dialog
          open={!!modalData}
          onClose={handleCancel}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          PaperProps={{ style: { margin: 'auto 32px' } }}
        >
          <DialogTitle sx={{ marginBottom: 4, border: 'none' }}>
            {common2[locale][`change_status_${status}`]}
          </DialogTitle>
          <DialogActions>
            <Button variant='outlined' onClick={handleCancel}>
              {common[locale].cancel}
            </Button>
            <Button variant='contained' autoFocus onClick={changeBookingStatus}>
              {loading || isLoading ? (
                <CircularProgress color='inherit' size={22} />
              ) : (
                common[locale].yes
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
