import React from 'react'
import cls from './faq.module.scss'
import { Container, Grid, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { navigation } from 'locales/navigation'
import CustomizedAccordions from 'components/accordion/accordion'
import FallbackImage from 'components/fallbackImage/fallbackImage'
import { faqs } from 'constants/faq'

export default function Faq() {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { locale } = useRouter()
  const list = faqs[locale]

  return (
    <div className={cls.container}>
      <Container>
        <div className={cls.hero}>
          <div className={cls.imgWrapper}>
            <img src='/images/faq.jpg' alt='Desert' />
          </div>
          <p className={cls.caption}>{navigation[locale].support}</p>
          <Typography variant='h1' className={cls.title}>
            {navigation[locale].frequent_questions}
          </Typography>
        </div>
        <div className={cls.main}>
          {list?.map((item, index) => (
            <CustomizedAccordions key={index} title={item.title}>
              <Grid container columnSpacing={4} rowSpacing={isDesktop ? 7 : 5}>
                {item.children.map((child, idx) => (
                  <Grid key={'child' + idx} item xs={12} md={6}>
                    <div className={cls.flex}>
                      {child.images.map((image, i) => (
                        <div key={'id' + i} className={cls.imgWrapper}>
                          <FallbackImage
                            alt={'How'}
                            src={image}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      ))}
                    </div>
                    <p>
                      {idx + 1}. {child.content}
                    </p>
                  </Grid>
                ))}
              </Grid>
            </CustomizedAccordions>
          ))}
        </div>
      </Container>
    </div>
  )
}
