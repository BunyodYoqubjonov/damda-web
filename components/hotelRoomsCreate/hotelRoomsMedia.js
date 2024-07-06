import { Box, Button, CircularProgress } from '@mui/material'
import DachaImageUpload from 'components/dachaImageUpload/dachaImageUpload'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import React from 'react'
import cls from './hotelRoomsCreate.module.scss'

const HotelRoomsMedia = ({
  images,
  setImages,
  data,
  activeStep,
  handleBack,
  formik,
}) => {
  const { locale } = useRouter()
  return (
    <div
      className='activeStep'
      style={{ display: activeStep === 3 ? 'block' : 'none' }}
    >
      <div className={cls.root}>
        <DachaImageUpload
          images={images}
          setImages={setImages}
          data={data}
          type='rooms'
        />
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
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant='contained'
            disabled={formik.isSubmitting}
            type='submit'
            sx={{
              backgroundColor: 'common.green',
              '&:hover': { backgroundColor: 'common.green' },
            }}
          >
            {formik.isSubmitting ? (
              <CircularProgress color='inherit' size={22} />
            ) : (
              common2[locale].done
            )}
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default HotelRoomsMedia
