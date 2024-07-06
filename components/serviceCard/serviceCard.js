import React from 'react'
import { Container } from '@mui/material'
import cls from './serviceCard.module.scss'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'

export default function ServiceCard() {
  const { locale } = useRouter()
  return (
    <Container>
      <section className={cls.root}>
        <div className={cls.card}>
          <span className={cls.caption}>{common[locale].more}</span>
          <div className={cls.cardRow}>
            <div className={cls.cardInfo}>
              {/* <p className={cls.subtitle}>{common[locale].help} </p> */}
              <h1 className={cls.title}>{common[locale].service}</h1>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
