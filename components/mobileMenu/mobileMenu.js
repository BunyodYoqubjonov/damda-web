import React from 'react'
import { SwipeableDrawer, Typography } from '@mui/material'
import cls from './mobileMenu.module.scss'
import { DamdaLogo } from '../icons/commonIcons'
import { BlogIcon, Hotels, Sanatorium, Ship, Sun } from '../icons/navIcons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'

const navMenu = [
  {
    name: 'hotels',
    icon: <Hotels />,
    link: '/hotels',
  },
  {
    name: 'summer_house',
    icon: <Sun />,
    link: '/dacha',
  },
  {
    name: 'resorts',
    icon: <Ship />,
    link: '/recreation-area',
  },
  {
    name: 'sanatorium',
    icon: <Sanatorium />,
    link: '/sanatorium',
  },
  {
    name: 'blogs',
    icon: <BlogIcon />,
    link: '/blog',
  },
]

export default function MobileMenu({ open, onClose }) {
  const { locale } = useRouter()

  return (
    <SwipeableDrawer anchor='left' open={open} onClose={onClose}>
      <div className={cls.wrapper}>
        <div className={cls.header}>
          <button className={cls.closeBtn} onClick={onClose}>
            <span className={cls.line} />
          </button>
          <div className={cls.brandLogo}>
            <DamdaLogo />
          </div>
        </div>
        <div className={cls.body}>
          <ul>
            {navMenu.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>
                  <a className={cls.item} onClick={onClose}>
                    {item.icon}{' '}
                    <span className={cls.text}>
                      {navigation[locale][item.name]}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={cls.footer}>
          <div className={cls.content}>
            <Typography>
              Tashkent Amir Temur Str., C-4, No. 7/8, Тошкент 100000
            </Typography>
          </div>
          <div className={cls.actions}>
            <a href='tel:+998935000000' className={cls.link}>
              (+99893) 500-00-00
            </a>
            <a href='mailto:hello@damda.com' className={cls.link}>
              hello@damda.com
            </a>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  )
}
