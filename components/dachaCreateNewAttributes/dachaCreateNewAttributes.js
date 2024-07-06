import React, { useEffect, useState } from 'react'
import {
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  Button,
} from '@mui/material'
import cls from './dachaCreateNewAttributes.module.scss'
import residenceService from 'services/residenceService'
import { useRouter } from 'next/router'
import { common } from 'locales/common'
import { Field, FieldArray, Form } from 'formik'
import { TrashIcon } from 'components/icons/commonIcons'
import { AddOutlined } from '@mui/icons-material'
import { common2 } from 'locales/common2'
import Loading from 'components/loading'

export default function DachaCreateNewAttributes({ features, values }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  console.log('features => ', features)

  const getAttributesList = () => {
    const params = { perPage: 1000 }
    setLoading(true)
    residenceService
      .getFeatures(params)
      .then((res) => {
        setData(res.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAttributesList()
  }, [locale])

  return (
    <div className={cls.container}>
      <Typography variant='h6'>{common[locale].attributes}</Typography>
      {!loading ? (
        <Form>
          <FieldArray
            name='features'
            render={(arrayHelpers) => (
              <div>
                {values.features.map((friend, index) => (
                  <Grid container my={2} columnSpacing={2} key={index}>
                    <Grid item md={5} sm={12}>
                      <Field name={`features.${index}.feature_id`}>
                        {({ field, form, meta }) => (
                          <Select sx={{ width: '100%' }} {...field}>
                            {loading && (
                              <MenuItem value={null} disabled>
                                loading...
                              </MenuItem>
                            )}
                            {data.map((item, index) => (
                              <MenuItem value={item.id} key={index}>
                                <span className={item.icon_name} />
                                <span style={{ marginLeft: 8 }}>
                                  {item.translation?.title}
                                </span>
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Field>
                    </Grid>
                    <Grid item md={5} sm={12}>
                      <Field name={`features.${index}.count`}>
                        {({ field, form, meta }) => (
                          <TextField
                            fullWidth
                            autoComplete='off'
                            type='number'
                            InputLabelProps={{
                              shrink: true,
                            }}
                            placeholder={common2[locale].count}
                            {...field}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item md={2} sm={12}>
                      <button
                        type='button'
                        onClick={() => arrayHelpers.remove(index)}
                        className={cls.trashBtn}
                      >
                        <TrashIcon />
                      </button>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: 'common.green',
                    '&:hover': {
                      backgroundColor: 'common.green',
                    },
                  }}
                  onClick={() => arrayHelpers.push('')}
                  startIcon={<AddOutlined />}
                  type='button'
                >
                  {common[locale].Add_new}
                </Button>
              </div>
            )}
          />
        </Form>
      ) : (
        <Loading />
      )}
    </div>
  )
}
