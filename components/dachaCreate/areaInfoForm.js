import React, { useState } from 'react'
import DachaCreateArea from '../dachaCreateArea/dachaCreateArea'
import { Box, Button } from '@mui/material'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'

const AreaInfoForm = ({
  data,
  activeStep,
  residenceId,
  handleBack,
  handleNext,
}) => {
  const [areaList, setAreaList] = useState(data?.area_info || [])
  const { locale } = useRouter()

  return (
    <div
      className='activeStep2'
      style={{ display: activeStep === 2 ? 'block' : 'none' }}
    >
      <DachaCreateArea
        residenceId={residenceId}
        setAreaList={setAreaList}
        areaList={areaList}
        data={data}
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
          onClick={handleNext}
          sx={{
            backgroundColor: 'common.green',
            '&:hover': { backgroundColor: 'common.green' },
          }}
        >
          {common2[locale].next}
        </Button>
      </Box>
    </div>
  )
}

export default AreaInfoForm
