import React from 'react'
import { Container } from '@mui/system'
import cls from './footer.module.scss'
import { Grid } from '@mui/material'
import {
  ArrowDown,
  DamdaLogo,
  Facebook,
  Instagram,
  Telegram,
} from '../icons/commonIcons'
import Link from 'next/link'
import { navigation } from '../../locales/navigation'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'

export default function Footers() {
  const { locale } = useRouter()

  return (
    <Container>
      <footer className={cls.root}>
        <div className={cls.footer}>
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} md={3} mr={4}>
              <span className={cls.logo}>
                <DamdaLogo />
              </span>
              <p className={cls.text}>{common[locale].address}</p>
              <a
                target='_blank'
                href='http://t.me/damdauzadmin'
                className={cls.text}
                rel='noreferrer'
              >
                Telegram
              </a>
              <a
                target='_blank'
                href='mailto:info@damda.uz'
                className={cls.text}
                rel='noreferrer'
              >
                info@damda.uz
              </a>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <h3 className={cls.title}>
                {navigation[locale].support} <ArrowDown />
              </h3>
              <div>
                <Link href='/faq'>
                  <a className={cls.text}>
                    {navigation[locale].frequent_questions}
                  </a>
                </Link>
                <Link href='/sitemap'>
                  <a className={cls.text}>{navigation[locale].sitemap}</a>
                </Link>
                <Link href='/advertising'>
                  <a className={cls.text}>{navigation[locale].advertising}</a>
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <h3 className={cls.title}>
                {navigation[locale].company} <ArrowDown />
              </h3>
              <div>
                <Link href='/about'>
                  <a className={cls.text}>{navigation[locale].about_us}</a>
                </Link>
                <Link href='/privacy-policy'>
                  <a className={cls.text}>
                    {navigation[locale].privacy_policy}
                  </a>
                </Link>
                <Link href='/terms'>
                  <a className={cls.text}>{navigation[locale].terms}</a>
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <h3 className={cls.title}>
                {navigation[locale].cooperation} <ArrowDown />
              </h3>
              <div>
                <Link href='/for/hotels'>
                  <a className={cls.text}>{navigation[locale].for_hotels}</a>
                </Link>
                <Link href='/for/cottages'>
                  <a className={cls.text}>
                    {navigation[locale].for_summer_houses}
                  </a>
                </Link>
                <Link href='/for/sanatoriums'>
                  <a className={cls.text}>
                    {navigation[locale].for_sanatoriums}
                  </a>
                </Link>
                <Link href='/for/guides'>
                  <a className={cls.text}>{navigation[locale].for_guides}</a>
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={cls.row}>
          <p className={cls.copyright}>©2022 Damda. All Rights Reserved</p>
          <div className={cls.social}>
            <a
              target='_blank'
              href='https://www.instagram.com/damda.uz/?hl=ru'
              className={cls.socialIcon}
              rel='noreferrer'
            >
              <Instagram />
            </a>
            <a
              target='_blank'
              href='https://t.me/damdauz'
              className={cls.socialIcon}
              rel='noreferrer'
            >
              <Telegram />
            </a>
            <a
              target='_blank'
              href='https://www.facebook.com/damda.uz/'
              className={cls.socialIcon}
              rel='noreferrer'
            >
              <Facebook />
            </a>
          </div>
        </div>
      </footer>
    </Container>
  )
}
