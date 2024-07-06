import React from 'react'
import {
  Grid,
  IconButton,
  Popover,
  Typography,
  useMediaQuery,
} from '@mui/material'
import cls from './sharePopover.module.scss'
import {
  CloseIcon,
  CopyIcon,
  EmailIcon,
  Facebook,
  Telegram,
  Twitter,
} from '../icons/commonIcons'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import {
  FacebookShareButton,
  EmailShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share'
import { WEB_URL } from 'constants/env'

export default function SharePopover({
  data,
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
}) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      toast.success(common[locale].Copied)
    } catch (err) {
      toast.warn('Failed to copy!')
    }
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      <div className={cls.root}>
        <Typography variant='h6'>{common[locale].share}</Typography>
        <IconButton
          size='small'
          sx={{
            position: 'absolute',
            top: matches ? 22 : 15,
            right: matches ? 22 : 15,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <div className={cls.wrapper}>
          <Grid container spacing={2} pt={2}>
            <Grid item xs={6}>
              <button
                className={cls.shareItem}
                onClick={() => copyToClipBoard(WEB_URL + data?.slug)}
              >
                <CopyIcon />
                <span>{common[locale].copy_Link}</span>
              </button>
            </Grid>
            <Grid item xs={6}>
              <EmailShareButton
                className={cls.shareItem}
                url={WEB_URL + data?.slug}
                title={data?.translation?.title}
              >
                <EmailIcon />
                <span>{common[locale].email}</span>
              </EmailShareButton>
            </Grid>
            <Grid item xs={6}>
              <TelegramShareButton
                className={cls.shareItem}
                url={WEB_URL + data?.slug}
                title={data?.translation?.title}
              >
                <Telegram />
                <span>Telegram</span>
              </TelegramShareButton>
            </Grid>
            <Grid item xs={6}>
              <TwitterShareButton
                className={cls.shareItem}
                url={WEB_URL + data?.slug}
                title={data?.translation?.title}
              >
                <Twitter />
                <span>Twitter</span>
              </TwitterShareButton>
            </Grid>
            <Grid item xs={6}>
              <FacebookShareButton
                className={cls.shareItem}
                url={WEB_URL + data?.slug}
                title={data?.translation?.title}
              >
                <Facebook />
                <span>Facebook</span>
              </FacebookShareButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </Popover>
  )
}
