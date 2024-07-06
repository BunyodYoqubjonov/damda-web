import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  Button,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
} from '@mui/material'
import cls from './advertisingModal.module.scss'
import styled from '@emotion/styled'
import { CloseIcon, TickIcon } from '../icons/commonIcons'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import subscriptionService from 'services/subscriptionService'
import { toast } from 'react-toastify'
import Loading from 'components/loading'
import { numberToPrice } from 'utils/numberToPrice'

const CenteredDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiDialog-paper': {
    padding: 70,
    maxWidth: '100%',
  },
  '@media (max-width: 576px)': {
    '& .MuiDialog-paper': {
      padding: 16,
    },
  },
})

export default function AdvertisingModal({ open, handleClose }) {
  const { locale, query, push } = useRouter()
  const [loadingBtn, setLoadingBtn] = useState(null)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    if (open) {
      fetchSubscriptions()
    }
  }, [open])

  function fetchSubscriptions() {
    setLoading(true)
    subscriptionService
      .getAll()
      .then((res) => setList(res.data))
      .finally(() => setLoading(false))
  }

  const transactionCreate = (id) => {
    const payload = { payment_sys_id: 2 }
    subscriptionService
      .createTransaction(id, payload)
      .then(() => {
        toast.success(common2[locale].subscription_successfully_activated)
        push({ pathname: '/account/dacha' })
      })
      .finally(() => setLoadingBtn(null))
  }

  const purchase = (id) => {
    const payload = { residence_id: query.id }
    setLoadingBtn(id)
    subscriptionService
      .create(id, payload)
      .then((res) => transactionCreate(res.data.id))
      .catch(() => setLoadingBtn(null))
  }

  return (
    <CenteredDialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          paddingBottom: 5,
          borderBottom: 'none',
          '@media (max-width: 576px)': {
            paddingBottom: 1,
            paddingTop: 3,
          },
        }}
      >
        <Typography variant='h1' className={cls.title}>
          {common2[locale].advertising_price}
        </Typography>
        <Typography className={cls.subtitle}>
          {common2[locale].advertising_desc}
        </Typography>
      </DialogTitle>
      <IconButton
        size='small'
        sx={{ position: 'absolute', top: 20, right: 12 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <div className={cls.root}>
        {!loading ? (
          <Grid container spacing={4} mt={0}>
            {list.map((item) => (
              <Grid key={item.id} item xs={12} md={6} lg={4}>
                <div className={cls.wrapper}>
                  <div className={cls.header}>
                    <div className={cls.tariff}>
                      <Typography variant='h2' fontWeight='500'>
                        {item.translation?.title}
                      </Typography>
                      <div className={cls.iconWrapper}>
                        <img src='/icons/gift.png' alt='gift' />
                      </div>
                    </div>
                    <div className={cls.price}>
                      <Typography className={cls.number}>
                        {numberToPrice(item.price, locale)}
                      </Typography>
                      <Typography>
                        / {item.day} {common2[locale].days}
                      </Typography>
                    </div>
                  </div>
                  <div className={cls.body}>
                    <ul>
                      <li>
                        <TickIcon />
                        <Typography variant='body2'>
                          {common2[locale].top_level_during_day}
                        </Typography>
                      </li>
                      <li>
                        <TickIcon />
                        <Typography variant='body2'>
                          {common2[locale].for_one_service}
                        </Typography>
                      </li>
                    </ul>
                  </div>
                  <div className={cls.footer}>
                    <Button
                      fullWidth
                      variant='outlined'
                      onClick={() => purchase(item.id)}
                      disabled={loadingBtn === item.id}
                    >
                      {loadingBtn !== item.id ? (
                        common2[locale].activate_now
                      ) : (
                        <CircularProgress size={22} color='inherit' />
                      )}
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Loading />
        )}
      </div>
    </CenteredDialog>
  )
}
