import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import cls from './hotelAbout.module.scss'
import { useRouter } from 'next/router'
import { navigation } from 'locales/navigation'
import { common } from 'locales/common'

export default function HotelAbout({ data }) {
  const { locale } = useRouter()
  const [list, setList] = useState(data.attributes?.slice(0, 9) || [])

  useEffect(() => {
    setList(data.attributes?.slice(0, 9) || [])
  }, [data])

  return (
    <>
      <div id='about' className={cls.root}>
        <Typography variant='h6'>
          {navigation[locale][`about_${data.type}`]}
        </Typography>
        <Box mt={1} />
        <div
          dangerouslySetInnerHTML={{ __html: data.translation?.description }}
        />

        <div className={cls.offers} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Grid container spacing={3} mt={0} mb={5}>
            {data.features?.map((item, index) => (
              <Grid key={index} item xs={6} sm={4}>
                <div className={cls.item}>
                  <div className={cls.imageWrapper}>
                    <span className={item.icon_name} />
                  </div>
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.translation?.title}: {item.count}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div id='offers' className={cls.offers}>
        <Typography variant='h6'>{navigation[locale].offers}</Typography>
        <Grid container spacing={3} mt={0} mb={5}>
          {list.map((item, index) => (
            <Grid key={index} item xs={6} sm={4}>
              <div className={cls.item}>
                <div className={cls.imageWrapper}>
                  <span className={item.icon} />
                </div>
                <Typography sx={{ fontWeight: 500 }}>
                  {item.translation?.title}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
        {list.length !== data.attributes?.length && (
          <Button variant='outlined' onClick={() => setList(data.attributes)}>
            {common[locale].show_all} {data.attributes?.length || 0}{' '}
            {common[locale].offers}
          </Button>
        )}
        {list.length === data.attributes?.length && data.attributes.length > 9 && (
          <Button
            variant='outlined'
            onClick={() => setList(data.attributes?.slice(0, 9) || [])}
          >
            {common[locale].show_less}
          </Button>
        )}
      </div>
    </>
  )
}
