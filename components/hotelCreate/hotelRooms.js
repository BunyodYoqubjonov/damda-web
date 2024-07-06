import { Box, Button } from '@mui/material'
import HotelCreateRooms from 'components/hotelCreateRooms/hotelCreateRooms'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import React from 'react'

const HotelRooms = ({ activeStep, data, handleBack }) => {
  const { locale, push } = useRouter()

  return (
    <>
      <div
        className='activeStep2'
        style={{ display: activeStep === 4 ? 'block' : 'none' }}
      >
        <HotelCreateRooms data={data} />
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}>
          <Button
            type='button'
            variant='outlined'
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            {common2[locale].Back}
          </Button>
          <Box sx={{ flex: '1' }} />
          <Button
            type='button'
            variant='contained'
            disabled={activeStep === 0}
            onClick={() => push('/account/hotels')}
            sx={{ mr: 1 }}
          >
            {common2[locale].done}
          </Button>
        </Box>
      </div>
    </>
  )
}

export default HotelRooms
