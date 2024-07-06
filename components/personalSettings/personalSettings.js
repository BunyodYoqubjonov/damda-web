import React, { useState } from 'react'
import { Container } from '@mui/system'
import {
  Typography,
  Grid,
  Button,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import cls from './personalSettings.module.scss'
import InputSimple from '../inputSimple/inputSimple'
import SwitchInput from '../switchInput/switchInput'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'
import { navigation } from '../../locales/navigation'
import { useFormik } from 'formik'
import profileService from '../../services/profileService'
import { toast } from 'react-toastify'
import PasswordForm from './passwordForm'
import { setUser } from '../../redux/actions/authActions/authActions'
import { useDispatch } from 'react-redux'
import getImage from '../../utils/getImage'
import getAvatar from 'utils/getAvatar'

export default function PersonalSettings({ data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale, push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setLoading(true)
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('img', file)
    formData.append('type', 'users')
    profileService
      .fileUpload(formData)
      .then(({ data }) => setImage(data?.type + '/' + data?.title))
      .finally(() => setLoading(false))
  }

  const formik = useFormik({
    initialValues: {
      email: data?.email,
      phone: data?.phone,
      firstname: data?.firstname,
      lastname: data?.lastname,
      dacha_owner: Boolean(data?.dacha_owner),
      hotel_owner: Boolean(data?.hotel_owner),
    },
    onSubmit: (values, { setSubmitting }) => {
      const params = {
        ...values,
        phone: values.phone?.replace(/ /g, ''),
        img: image ? image : undefined,
        dacha_owner: Number(values.dacha_owner),
        hotel_owner: Number(values.hotel_owner)
      }
      profileService
        .updateUserDetails(params)
        .then(({ data }) => {
          toast.success(common[locale].successfully_updated)
          dispatch(setUser(data))
          push('/account')
        })
        .finally(() => setSubmitting(false))
    },
    validate: (values) => {
      const errors = {}
      const login = data.email ? values.email : values.phone
      if (!login) {
        errors.email = common[locale].required
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      )
        if (!values.firstname) {
          errors.firstname = common[locale].required
        }
      if (!values.lastname) {
        errors.lastname = common[locale].required
      }

      return errors
    },
  })

  const handleOpenModal = () => setOpenModal(true)

  return (
    <div className={cls.root}>
      <Container>
        <Typography variant='h1' className={cls.title}>
          {navigation[locale].personal_settings}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={4} mt={2.5}>
            <Grid item xs={12} sm={4}>
              <div className={cls.profileUpload}>
                <div className={cls.imgWrapper}>
                  <img
                    src={image ? getImage(image) : getAvatar(data?.img)}
                    alt={data?.firstname}
                  />
                </div>
                <label htmlFor='profile_photo' className={cls.fileUpload}>
                  <Typography variant='body2'>
                    {loading ? (
                      <CircularProgress size={22} />
                    ) : (
                      common[locale].change_photo
                    )}
                  </Typography>
                  <input
                    type='file'
                    name='profile_photo'
                    id='profile_photo'
                    hidden
                    onChange={handleChange}
                  />
                </label>
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='h6'>
                {common[locale].general_info}
              </Typography>
              <Grid
                item
                container
                columnSpacing={matches ? 3.8 : 1}
                rowSpacing={matches ? 1.5 : 0}
                mt={0}
                mb={5}
              >
                <Grid item xs={12} sm={6}>
                  <InputSimple
                    name='firstname'
                    label={common[locale].first_name}
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    errors={formik.errors.firstname && formik.touched.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputSimple
                    name='lastname'
                    label={common[locale].last_name}
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    errors={formik.errors.lastname && formik.touched.lastname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {data.email ? (
                    <InputSimple
                      name='email'
                      label={common[locale].phone_number}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      errors={formik.errors.email && formik.touched.email}
                    />
                  ) : (
                    <InputSimple
                      name='phone'
                      label={common[locale].phone_number}
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      errors={formik.errors.email && formik.touched.email}
                    />
                  )}
                </Grid>
              </Grid>
              <Typography variant='h6'>
                {common[locale].account_mode}
              </Typography>
              <Grid
                item
                container
                columnSpacing={matches ? 3.8 : 1}
                rowSpacing={matches ? 1.5 : 1}
                mt={0}
                mb={5}
              >
                <Grid item xs={12} sm={6}>
                  <SwitchInput
                    name='dacha_owner'
                    label={common[locale].i_am_dacha_owner}
                    onChanges={formik.handleChange}
                    value={formik.values.dacha_owner}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SwitchInput
                      name='hotel_owner'
                      label={common[locale].i_am_hotel_owner}
                      onChanges={formik.handleChange}
                      value={formik.values.hotel_owner}
                  />
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
                <Button
                  type='button'
                  variant='outlined'
                  onClick={handleOpenModal}
                  className={cls.editPassword}
                >
                  {common[locale].change_password}
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Container>
      <PasswordForm open={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}
