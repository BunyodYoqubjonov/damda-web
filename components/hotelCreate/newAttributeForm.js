import React, { useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import DachaCreateNewAttributes from 'components/dachaCreateNewAttributes/dachaCreateNewAttributes'
import { Formik } from 'formik'
import { common } from 'locales/common'
import { toast } from 'react-toastify'
import residenceService from 'services/residenceService'

export default function NewAttributeForm({
  data,
  activeStep,
  residenceId,
  handleBack,
  handleNext,
}) {
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{
        features: !!data?.features?.length
          ? data?.features.map((item) => ({
              count: item.count,
              feature_id: item.id,
            }))
          : [''],
      }}
      onSubmit={(values) => {
        const body = {
          residence_id: residenceId,
          features: values.features,
        }
        setLoading(true)
        residenceService
          .updateFeatures(body)
          .then(() => {
            toast.success(common[locale].successfully_updated)
            handleNext()
          })
          .catch(() => toast.error(common2[locale].fill_fields))
          .finally(() => setLoading(false))
      }}
      render={({ values, handleSubmit }) => (
        <div
          className='activeStep2'
          style={{ display: activeStep === 3 ? 'block' : 'none' }}
        >
          {activeStep === 3 && (
            <DachaCreateNewAttributes
              features={data?.features || []}
              values={values}
            />
          )}
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
              onClick={handleSubmit}
              sx={{
                backgroundColor: 'common.green',
                '&:hover': { backgroundColor: 'common.green' },
              }}
            >
              {!loading ? (
                common2[locale].next
              ) : (
                <CircularProgress color='inherit' size={22} />
              )}
            </Button>
          </Box>
        </div>
      )}
    />
  )
}
