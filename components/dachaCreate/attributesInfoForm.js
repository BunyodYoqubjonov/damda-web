import React, { useEffect, useState } from 'react'
import DachaCreateOffers from '../dachaCreateOffers/dachaCreateOffers'
import { Box, Button, CircularProgress } from '@mui/material'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import residenceService from 'services/residenceService'

const AttributesInfoForm = ({
  data,
  activeStep,
  handleBack,
  handleNext,
  residenceId,
}) => {
  const [options, setOptions] = useState([])
  const { locale } = useRouter()
  const formik = useFormik({
    initialValues: {
      ...data,
    },
    onSubmit: (values, { setSubmitting }) => {
      const body = {
        residence_id: residenceId,
        attribute_value_id: options,
      }
      residenceService
        .attributes(body)
        .then((res) => handleNext())
        .finally(() => setSubmitting(false))
    },
  })

  useEffect(() => {
    if (data) {
      const attributes = data.attributes.map((item) => item.id)
      setOptions(attributes)
    }
  }, [data])

  return (
    <>
      <div
        className='activeStep1'
        style={{ display: activeStep === 1 ? 'block' : 'none' }}
      >
        <DachaCreateOffers options={options} setOptions={setOptions} />
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
            onClick={formik.handleSubmit}
            sx={{
              backgroundColor: 'common.green',
              '&:hover': { backgroundColor: 'common.green' },
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <CircularProgress color='inherit' size={22} />
            ) : (
              common2[locale].next
            )}
          </Button>
        </Box>
      </div>
    </>
  )
}

export default AttributesInfoForm
