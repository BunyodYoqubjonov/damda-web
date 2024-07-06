import React from 'react'
import { Button, Typography } from '@mui/material'
import { PlusIcon } from '../icons/commonIcons'
import { Box } from '@mui/system'
import { common } from 'locales/common'
import { useRouter } from 'next/router'

const ButtonAdd = ({ handleOpenAddRestaurant, title, buttonTitle }) => {
  const { locale } = useRouter()
  return (
    <Box mt={2}>
      {/* <Typography variant='h3' sx={{ fontSize: 24, lineHeight: '29px' }}>
        {common[locale].Add} {title}
      </Typography> */}
      <Button
        variant='contained'
        startIcon={<PlusIcon fill='#fff' />}
        sx={{ mt: 3 }}
        onClick={handleOpenAddRestaurant}
      >
        {common[locale].Add} {buttonTitle}
      </Button>
    </Box>
  )
}

export default ButtonAdd
