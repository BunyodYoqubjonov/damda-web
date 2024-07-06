import React from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import cls from './personalSettings.module.scss'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { CloseIcon } from '../icons/commonIcons'
import profileService from '../../services/profileService'
import { toast } from 'react-toastify'
import { common } from '../../locales/common'
import InputPassword from '../inputSimple/inputPassword'

const CenteredDialog = styled(Dialog)({
  zIndex: '100',
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

export default function PasswordForm({ open, setOpenModal }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()

  const formik = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      profileService
        .updatePassword(values)
        .then(() => {
          toast.success(common[locale].successfully_updated)
          resetForm()
          setOpenModal(false)
        })
        .finally(() => setSubmitting(false))
    },
    validate: (values) => {
      const errors = {}

      if (!values.old_password) {
        errors.old_password = common[locale].required
      }
      if (!values.password) {
        errors.password = common[locale].passwordRequired
      } else if (values.password.replace(/\s/g, '').length < 6) {
        errors.password = common[locale].passwordRequired
      }
      if (!values.password_confirmation) {
        errors.password_confirmation = common[locale].required
      } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = common[locale].passwordDontMatch
      }

      return errors
    },
  })

  const handleCloseModal = () => {
    setOpenModal(false)
    formik.resetForm()
  }

  return (
    <CenteredDialog onClose={handleCloseModal} open={open}>
      <DialogTitle
        sx={{
          paddingBottom: 5,
          borderBottom: 'none',
        }}
      >
        {common[locale].change_password}
      </DialogTitle>
      <IconButton
        size='small'
        sx={{
          position: 'absolute',
          top: matches ? 20 : 15,
          right: matches ? 12 : 15,
        }}
        onClick={handleCloseModal}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          columnSpacing={matches ? 3.8 : 1}
          rowSpacing={matches ? 1.5 : 1}
          mt={0}
          mb={5}
        >
          <Grid item xs={12} sm={6}>
            <InputPassword
              name='old_password'
              label={common[locale].old_password}
              type='password'
              onChange={formik.handleChange}
              value={formik.values.old_password}
              errors={
                formik.errors?.old_password && formik.touched?.old_password
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputPassword
              name='password'
              label={common[locale].new_password}
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              errors={formik.errors?.password && formik.touched?.password}
            />
            <div style={{ color: 'red', fontSize: '14px' }}>
              {formik.errors?.password && formik.touched?.password
                ? formik.errors?.password
                : ''}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputPassword
              name='password_confirmation'
              label={common[locale].confirm_new_password}
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              errors={
                formik.errors?.password_confirmation &&
                formik.touched?.password_confirmation
              }
            />
            <div style={{ color: 'red', fontSize: '14px' }}>
              {formik.errors?.password_confirmation &&
              formik.touched?.password_confirmation
                ? formik.errors?.password_confirmation
                : ''}
            </div>
          </Grid>
        </Grid>
        <div className={cls.actions}>
          <Button
            type='submit'
            variant='contained'
            sx={{
              backgroundColor: 'common.green',
              '&:hover': {
                backgroundColor: 'common.green',
              },
            }}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={22} color='inherit' />
            ) : (
              common[locale].save
            )}
          </Button>
          <Button type='button' variant='outlined' onClick={handleCloseModal}>
            {common[locale].cancel}
          </Button>
        </div>
      </form>
    </CenteredDialog>
  )
}
