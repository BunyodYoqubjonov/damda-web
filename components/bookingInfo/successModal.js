import React from 'react'
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import styled from '@emotion/styled'
import { CloseIcon } from '../icons/commonIcons'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { common2 } from 'locales/common2'

const CenteredDialog = styled(Dialog)({
  zIndex: '1000',
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

export default function SuccessModal({ open, handleClose, data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()
  const phone = data.phone || data?.user?.phone

  return (
    <CenteredDialog onClose={handleClose} open={open}>
      <IconButton
        size='small'
        sx={{
          position: 'absolute',
          top: matches ? 20 : 15,
          right: matches ? 12 : 15,
        }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <Box textAlign='center'>
        <Box my={2} fontSize={60} color='common.green'>
          <span className='mdi mdi-check-circle-outline' />
        </Box>
        <Box maxWidth={400} mb={4}>
          <Typography variant='h1'>
            {data.type === 'cottage'
              ? common2[locale].booking_success_dacha
              : common2[locale].booking_success_hotel}
          </Typography>
        </Box>
        <Button
          sx={{ fontSize: '21px' }}
          variant='contained'
          fullWidth
          startIcon={<span className='mdi mdi-phone' />}
          href={`tel:${phone}`}
        >
          {phone}
        </Button>
      </Box>
    </CenteredDialog>
  )
}
