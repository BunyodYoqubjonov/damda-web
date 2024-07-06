import React, { useEffect, useState } from 'react'
import {
  Checkbox,
  Typography,
  Button,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import cls from './customTable.module.scss'
import med from './customTableMedia.module.scss'
import { Box } from '@mui/system'
import OrderDetails from '../orderDetails/orderDetails'
import getImageFromBaseUrl from '../../utils/getImageFromBaseUrl'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import bookingService from '../../services/BookingService'
import { stringToDate } from 'utils/stringToDate'

export default function CustomTable({
  list,
  checked,
  setChecked,
  page,
  lastPage,
  isLoading,
}) {
  const [openDetails, setOpenDetails] = useState(false)
  const { locale } = useRouter()
  const [id, setId] = useState(null)
  const [distance, setDistance] = useState([])
  const [loading, setLoading] = useState(false)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const handleOpenDetails = (id) => {
    setOpenDetails(true)
    setId(id)
  }
  const handleCloseDetails = () => {
    setOpenDetails(false)
    setId(null)
  }
  const handleCheck = (e) => {
    const value = Number(e.target.id)
    if (checked.includes(value)) {
      setChecked(checked.filter((item) => item != value))
    } else {
      setChecked([...checked, value])
    }
  }

  const fetchDetails = () => {
    setLoading(true)
    bookingService
      .detailsList(id)
      .then((res) => {
        setDistance(res.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (id) fetchDetails()
  }, [id, locale])

  return (
    <>
      {matches ? (
        <div className={`${cls.root} products_row`}>
          {list?.map((item) => (
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
                <Typography variant='body1' color='textPrimary'>
                  {item.id}
                </Typography>
                <div className={cls.imgWrapper}>
                  <img
                    src={getImageFromBaseUrl(item.residence.img)}
                    alt={item.residence?.translation?.title}
                  />
                </div>

                <div className={cls.name}>
                  <Typography className={cls.heading}>
                    {item.residence.translation?.title}{' '}
                    {item.residence.type === 'cottage'
                      ? `ID ${item.residence.id}`
                      : ''}
                  </Typography>
                  <Typography variant='caption' className={cls.address}>
                    {item.residence.address_title.city_name.translation?.title}
                  </Typography>
                </div>
              </div>
              <div className={cls.item}>
                <Typography className={cls.heading}>
                  {stringToDate(item?.created_at, locale)}
                </Typography>
                <Typography variant='caption'>
                  {common[locale].order_time}
                </Typography>
              </div>
              <div className={cls.item} style={{ flex: '0 0 13%' }}>
                <Typography className={cls.heading}>
                  {common[locale][item.residence.type]}
                </Typography>
                <Typography variant='caption'>
                  {common[locale].service_type}
                </Typography>
              </div>
              <div className={cls.item} style={{ flex: '0 0 15%' }}>
                <Typography className={cls.heading}>
                  {stringToDate(item.registration_date?.in, locale)} —{' '}
                  {stringToDate(item.registration_date?.out, locale)}
                </Typography>
                <Typography variant='caption'>
                  {common[locale].arrive_leave_time}
                </Typography>
              </div>
              <div className={cls.item} style={{ flex: '0 0 10%' }}>
                <Typography
                  className={cls.heading}
                  sx={{
                    textTransform: 'capitalize',
                    color:
                      item.status === 'waiting'
                        ? 'common.yellow'
                        : 'common.green',
                  }}
                >
                  {common[locale][item.status]}
                </Typography>
                <Typography variant='caption'>
                  {common[locale].order_status}
                </Typography>
              </div>
              <div className={cls.item} style={{ flex: '0 0 5%' }}>
                <Button
                  className={cls.details}
                  variant='text'
                  sx={{ height: '60px' }}
                  onClick={() => handleOpenDetails(item.id)}
                >
                  <Typography variant='body2'>
                    {common[locale].details}
                  </Typography>
                </Button>
              </div>
              {/* <div className={cls.item}>
                {item.status === 'waiting' ? (
                  <Box width={94}>
                    <Button className={cls.cansel} fullWidth variant='outlined'>
                      <Typography variant='body2'>
                        {common[locale].cancel}
                      </Typography>
                    </Button>
                  </Box>
                ) : (
                  <Box width={94}>
                    <Button
                      className={cls.cansel}
                      fullWidth
                      variant='contained'
                      sx={{ padding: '14px 30px' }}
                    >
                      <Typography variant='body2'>
                        {common[locale].pay}
                      </Typography>
                    </Button>
                  </Box>
                )}
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className={med.media}>
          {list?.map((item) => (
            <div key={item.id} className={med.box}>
              <Checkbox
                name='select'
                color='secondary'
                disableRipple
                onChange={handleCheck}
                id={item.id}
                checked={checked.includes(item.id)}
              />
              <div className={med.row}>
                <div className={med.title}>
                  <div className={med.imgWrapper}>
                    <img
                      src={getImageFromBaseUrl(item.residence.img)}
                      alt={item.residence?.translation?.title}
                    />
                  </div>
                  <div className={med.name}>
                    <Typography className={med.heading}>
                      {item.residence.translation?.title}
                    </Typography>
                    <Typography variant='caption' className={med.address}>
                      {
                        item.residence.address_title.city_name.translation
                          ?.title
                      }
                      <br />
                      <br />
                      {
                        item.residence.address_title.region_name.translation
                          ?.title
                      }
                    </Typography>
                  </div>
                  <div className={med.linkButton}>
                    <Button
                      variant='text'
                      sx={{ height: '60px' }}
                      onClick={() => handleOpenDetails(item.id)}
                      className={med.button}
                    >
                      <Typography variant='body2' className={med.buttonText}>
                        {common[locale].details}
                      </Typography>
                    </Button>
                  </div>
                </div>

                <div className={med.listContainer}>
                  <div className={med.item1}>
                    <Typography className={med.heading}>
                      {common[locale][item.residence.type]}
                    </Typography>
                    <Typography variant='caption' className={med.subheading}>
                      {common[locale].service_type}
                    </Typography>
                  </div>

                  <div className={med.item2}>
                    <Typography className={med.heading}>
                      {item.registration_date?.in} <br />
                      {item.registration_date?.out}
                    </Typography>
                    <Typography variant='caption' className={med.subheading}>
                      {common[locale].arrive_leave_time}
                    </Typography>
                  </div>

                  <div className={med.item3}>
                    <Typography
                      className={med.heading}
                      sx={{
                        textTransform: 'capitalize',
                        color:
                          item.status === 'waiting'
                            ? 'common.yellow'
                            : 'common.green',
                      }}
                    >
                      {common[locale][item.status]}
                    </Typography>
                    <Typography variant='caption' className={med.subheading}>
                      {common[locale].order_status}
                    </Typography>
                  </div>
                </div>

                <div className={med.listFooter}>
                  <div className={med.linkBox}>
                    <Typography className={cls.heading}>
                      {item?.created_at}
                    </Typography>
                    <Typography variant='caption'>
                      {common[locale].order_time}
                    </Typography>
                  </div>

                  {/* <div className={med.link}>
                    {item.status === 'waiting' ? (
                      <Box width={94} className={med.box}>
                        <Button
                          fullWidth
                          variant='outlined'
                          className={med.button}
                        >
                          <Typography variant='body2'>
                            {common[locale].cancel}
                          </Typography>
                        </Button>
                      </Box>
                    ) : (
                      <Box width={94} className={med.box}>
                        <Button
                          className={med.button}
                          fullWidth
                          variant='contained'
                          sx={{ padding: '14px 30px' }}
                        >
                          <Typography
                            variant='body2'
                            className={med.buttonText}
                          >
                            {common[locale].pay}
                          </Typography>
                        </Button>
                      </Box>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoading && (
        <Box display='flex' alignItems='center' justifyContent='center' mt={2}>
          <CircularProgress color='inherit' size={28} />
        </Box>
      )}
      <OrderDetails
        open={openDetails}
        loading={loading}
        handleClose={handleCloseDetails}
        list={distance}
      />
    </>
  )
}
