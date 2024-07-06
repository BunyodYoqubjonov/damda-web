import React, { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import { IOSSwitch } from '../customSwitch/customSwitch'
import cls from './summerHouseList.module.scss'
import residenceService from '../../services/residenceService'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { common2 } from '../../locales/common2'
import { BASE_URL } from 'constants/env'

export default function MyResidenceCard({ data }) {
  const { locale } = useRouter()
  const [toggle, setToggle] = useState(Boolean(data?.active))
  const [id, setID] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleClose = () => setID(null)

  const handleSwitch = () => {
    const payload = { status: !toggle ? 1 : 0 }
    setLoading(true)
    residenceService
      .switchResidence(id, payload)
      .then((res) => {
        setToggle(Boolean(res.data.active))
        handleClose()
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <div className={cls.wrapper}>
          <div className={cls.card}>
            <Link href={`/account/dacha/${data?.id}`}>
              <a className={cls.header}>
                <div className={cls.imgWrapper}>
                  <img
                    src={BASE_URL + data?.img}
                    alt={data?.translation?.title}
                  />
                </div>

                <div className={cls.name}>
                  <Typography>
                    {data?.translation?.title || common[locale].Noname}{" "}{`ID ${data?.id}`}
                  </Typography>
                </div>
              </a>
            </Link>
            <div className={cls.body}>
              <Typography variant='body2' className={cls.subtitle}>
                {data?.address_title?.city_name?.translation?.title}
                {', '}
                {data?.address_title?.region_name?.translation?.title}
              </Typography>
            </div>
            <div className={cls.footer}>
              <div className={cls.item}>
                <Typography variant='caption'>
                  {common[locale].booking}
                </Typography>
                <Typography className={cls.number}>
                  {data?.bookings_count}{' '}
                  {data?.bookings_process_count
                    ? `(${data?.bookings_process_count} ${common2[locale].waiting})`
                    : ''}
                </Typography>
              </div>
              <div className={cls.item} onClick={() => setID(data.id)}>
                <IOSSwitch checked={toggle} />
              </div>
            </div>
          </div>
        </div>
      </Grid>
      {!!id && (
        <Dialog
          open={!!id}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          PaperProps={{ style: { margin: 'auto 32px' } }}
        >
          <DialogTitle sx={{ marginBottom: 4, border: 'none' }}>
            {common[locale].Are_you_sure}
          </DialogTitle>
          <DialogActions>
            <Button variant='outlined' onClick={handleClose}>
              {common[locale].cancel}
            </Button>
            <Button variant='contained' autoFocus onClick={handleSwitch}>
              {loading ? (
                <CircularProgress color='inherit' size={22} />
              ) : (
                common[locale].yes
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}
