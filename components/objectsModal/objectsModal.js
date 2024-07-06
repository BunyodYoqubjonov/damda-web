import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  Button,
  Typography,
  Grid,
  useMediaQuery,
} from '@mui/material'
import cls from './objectsModal.module.scss'
import styled from '@emotion/styled'
import { Sanatorium, Sun, Transport } from '../icons/navIcons'
import { TickIcon } from '../icons/commonIcons'

const services = [
  {
    title: 'My vehicles',
    description: 'Provide personal details and how wecan reach you',
    icon: <Transport />,
    link: '/account/vehicles',
    active: true,
    key: 'vehicle',
  },
  {
    title: 'My Hotels',
    description: 'Provide personal details and how we can reach you',
    icon: <Sanatorium />,
    link: '/account/hotel',
    active: false,
    key: 'hotel',
  },
  {
    title: 'My summer houses',
    description: 'Provide personal details and how we can reach you',
    icon: <Sun />,
    link: '/account/summer-houses',
    active: true,
    key: 'house',
  },
]

const CenteredDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiDialog-paper': {
    padding: '70px 70px 70px 52px',
    maxWidth: 930,
    '@media (max-width: 576px)': {
      padding: '30px 15px',
      maxWidth: '100%',
      margin: '15px',
    },
  },
})

export default function ObjectsModal({ open, handleClose }) {
  const [list, setList] = useState(services)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  const handleClick = (event, key) => {
    event.preventDefault()
    const newList = list.map((item) => ({
      ...item,
      active: item.key === key ? !item.active : item.active,
    }))
    setList(newList)
  }

  return (
    <CenteredDialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          paddingBottom: matches ? 5 : 4,
          borderBottom: 'none',
        }}
      >
        Objects & Services
      </DialogTitle>
      <Grid container spacing={matches ? 2.5 : 1.5}>
        {list.map((item, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <a
              href='#'
              className={`${cls.wrapper} ${item.active ? cls.active : ''}`}
              onClick={(event) => handleClick(event, item.key)}
            >
              <div className={cls.activeIcon}>
                <TickIcon />
              </div>
              <div className={cls.iconWrapper}>{item.icon}</div>
              <Typography sx={{ fontWeight: 500, mb: 1.5 }}>
                {item.title}
              </Typography>
              <Typography variant='body2' sx={{ color: 'secondary.main' }}>
                {item.description}
              </Typography>
            </a>
          </Grid>
        ))}
      </Grid>
      <div className={cls.actions}>
        {matches && (
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        )}
        <Button
          variant='contained'
          sx={{
            backgroundColor: 'common.green',
            '&:hover': {
              backgroundColor: 'common.green',
            },
          }}
        >
          Add this object
        </Button>
      </div>
    </CenteredDialog>
  )
}
