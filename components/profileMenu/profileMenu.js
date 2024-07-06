import React from 'react'
import { Popover, Typography } from '@mui/material'
import cls from './profileMenu.module.scss'
import Link from 'next/link'
import { HeartIcon, LogoutIcon, ProfileIcon } from '../icons/navIcons'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authActions/authActions'
import { useRouter } from 'next/router'
import { navigation } from '../../locales/navigation'
import getAvatar from 'utils/getAvatar'

export default function ProfileMenu({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  transformOrigin = { vertical: 'top', horizontal: 'right' },
  data,
}) {
  const dispatch = useDispatch()
  const { push, locale } = useRouter()

  const logoutUser = (event) => {
    event.preventDefault()
    destroyCookie(null, 'access_token')
    dispatch(logout())
    onClose()
    push('/')
  }
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{
        sx: { bgcolor: 'transparent', boxShadow: 'none' },
      }}
    >
      <div className={cls.root}>
        <div className={cls.wrapper}>
          <div className={cls.header}>
            <div>
              <Typography variant='body2' className={cls.title}>
                {data?.firstname}
              </Typography>
              <Typography variant='body2' className={cls.title}>
                {data?.lastname}
              </Typography>
            </div>
            <div className={cls.imgWrapper}>
              <img src={getAvatar(data?.img)} alt={data?.firstname} />
            </div>
          </div>
          <ul className={cls.menu}>
            {/*<li className={cls.menuItem}>*/}
            {/*  <Link href='/notifications'>*/}
            {/*    <a className={cls.itemLink} onClick={openNotifications}>*/}
            {/*      <NotificationIcon />*/}
            {/*      <Typography sx={{ fontWeight: 500 }}>*/}
            {/*        {navigation[locale].notification}*/}
            {/*      </Typography>*/}
            {/*      <span className={cls.indicator} />*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={cls.menuItem}>*/}
            {/*  <Link href='/messages'>*/}
            {/*    <a className={cls.itemLink} onClick={onClose}>*/}
            {/*      <MessageIcon />*/}
            {/*      <Typography sx={{ fontWeight: 500 }}>*/}
            {/*        {navigation[locale].message}*/}
            {/*      </Typography>*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            <li className={cls.menuItem}>
              <Link href='/liked'>
                <a className={cls.itemLink} onClick={onClose}>
                  <HeartIcon />
                  <Typography sx={{ fontWeight: 500 }}>
                    {navigation[locale].liked}
                  </Typography>
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={cls.wrapper}>
          <ul className={cls.menu}>
            <li className={cls.menuItem}>
              <Link href='/account'>
                <a className={cls.itemLink} onClick={onClose}>
                  <ProfileIcon />
                  <Typography sx={{ fontWeight: 500 }}>
                    {navigation[locale].account}
                  </Typography>
                </a>
              </Link>
            </li>
            <li className={cls.menuItem}>
              <Link href='/logout'>
                <a className={cls.itemLink} onClick={logoutUser}>
                  <LogoutIcon />
                  <Typography sx={{ fontWeight: 500 }}>
                    {navigation[locale].logout}
                  </Typography>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Popover>
  )
}
