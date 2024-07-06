import React, { useState } from 'react'
import { Container } from '@mui/material'
import {
  BlogIcon,
  Globe,
  Hotels,
  Sanatorium,
  Ship,
  Sun,
} from '../icons/navIcons'
import { DamdaLogo, MenuIcon } from '../icons/commonIcons'
import cls from './header.module.scss'
import Link from 'next/link'
import LangMenu from './langMenu'
import { navigation } from '../../locales/navigation'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'
import ProfileMenu from '../profileMenu/profileMenu'
import NotificationsMenu from '../notificationsMenu/notificationsMenu'
import MobileMenu from '../mobileMenu/mobileMenu'
import { useSelector } from 'react-redux'
import getImage from '../../utils/getImage'

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

export default function Header() {
  const [openLangMenu, setOpenLangMenu] = useState(false)
  const { locale, push } = useRouter()
  const { pathname } = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const openProfileMenu = Boolean(anchorEl)
  const [openNotificationsMenu, setOpenNotificationsMenu] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const currentPathName = pathname

  const handleOpenLangMenu = (event) => {
    event.preventDefault()
    setOpenLangMenu(true)
  }

  const handleCloseLangMenu = () => setOpenLangMenu(false)
  const handleClickLogin = () => push('/login')
  const handleClickMenu = (event) => setAnchorEl(event.currentTarget)
  const handleCloseProfileMenu = () => setAnchorEl(null)
  const handleCloseNotifications = () => setOpenNotificationsMenu(false)
  const handleOpenMobileMenu = () => setOpenMobileMenu(true)
  const handleCloseMobileMenu = () => setOpenMobileMenu(false)

  const handleOpenNotifications = (event) => {
    event.preventDefault()
    handleCloseProfileMenu()
    setOpenNotificationsMenu(true)
  }

  return (
    <>
      <Container>
        <div className={cls.root}>
          <div className={cls.header}>
            <div className={cls.logoWrapper}>
              <button className={cls.menuIcon} onClick={handleOpenMobileMenu}>
                <MenuIcon />
              </button>
              <Link href='/'>
                <a className={cls.brandLogo}>
                  <DamdaLogo />
                </a>
              </Link>
            </div>
            <div className={cls.actions}>
              <a
                href='#'
                className={cls.textButton}
                onClick={handleOpenLangMenu}
              >
                <Globe />
                <span>{common[locale].currentLanguage}</span>
              </a>
              {user ? (
                <button className={cls.profileBtn} onClick={handleClickMenu}>
                  <img
                    src={
                      user?.img !== null
                        ? getImage(user?.img)
                        : '/images/avatar.png'
                    }
                    alt={user.firstname}
                  />
                </button>
              ) : (
                <button
                  className={cls.outlinedButton}
                  onClick={handleClickLogin}
                >
                  {common[locale].loginText}
                </button>
              )}
            </div>
          </div>
          <div className={cls.navigation}>
            {navMenu.map((item, index) => (
              <Link key={index} href={item?.link}>
                <a
                  className={
                    currentPathName === item?.link ? cls.active : cls.navItem
                  }
                >
                  {item?.icon}
                  <span className={cls.text}>
                    {navigation[locale][item?.name]}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <LangMenu handleClose={handleCloseLangMenu} open={openLangMenu} />
      <ProfileMenu
        open={openProfileMenu}
        anchorEl={anchorEl}
        onClose={handleCloseProfileMenu}
        openNotifications={handleOpenNotifications}
        data={user}
      />
      <NotificationsMenu
        handleClose={handleCloseNotifications}
        open={openNotificationsMenu}
      />
      <MobileMenu open={openMobileMenu} onClose={handleCloseMobileMenu} />
    </>
  )
}
