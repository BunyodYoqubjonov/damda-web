import { Container, Tab, Tabs } from '@mui/material'
import { a11yProps } from 'components/tabs-function'
import { useFormik } from 'formik'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import HotelRoomsAttributes from './hotelRoomsAttributes'
import cls from './hotelRoomsCreate.module.scss'
import HotelRoomsMain from './hotelRoomsMain'
import HotelRoomsMedia from './hotelRoomsMedia'
import HotelRoomsPrice from './hotelRoomsPrice'
import axios from 'utils/axios'

const HotelRoomsCreate = ({ residenceData, data }) => {
  const { locale, query, push } = useRouter()
  const residenceId = residenceData?.id
  const roomId = data?.id
  const activeStep = Number(query.step) || 0
  const [options, setOptions] = useState([])
  const [images, setImages] = useState([])

  const handleNext = () =>
    push({
      pathname: '',
      query: { id: residenceId, step: activeStep + 1, room_id: roomId },
    })
  const handleBack = () =>
    push({
      pathname: '',
      query: { id: residenceId, step: activeStep - 1, room_id: roomId },
    })

  const onChangeTabs = (event, step) => {
    if (data) {
      push({ pathname: '', query: { id: residenceId, step, room_id: roomId } })
    }
  }

  const formik = useFormik({
    initialValues: {
      quantity: data?.quantity,
      area: data?.area,
      bed: data?.bed,
      children: data?.children,
      room_id: data?.room_id,
      images: data?.images,
      adult: data?.adult,
      prices: data?.prices.map((item) => ({
        ...item,
        status: item.status === 1 ? true : false,
      })),
    },
    validate: (values) => {
      const errors = {}
      if (!values.adult) {
        errors.adult = common[locale].required
      }
      if (!values.area) {
        errors.area = common[locale].required
      }
      if (!values.bed) {
        errors.bed = common[locale].required
      }
      if (!values.children) {
        errors.children = common[locale].required
      }
      if (!values.room_id) {
        errors.room_id = common[locale].required
      }
      if (!values.quantity) {
        errors.quantity = common[locale].required
      }

      if (
        values.prices?.some(
          (price) => !price.resident_price || !price.nonresident_price
        )
      ) {
        errors.price = values.prices?.map((price) => {
          if (!price.resident_price) {
            return { resident_price: common[locale].required }
          }
          if (!price.nonresident_price) {
            return { nonresident_price: common[locale].required }
          }
        })
      }

      return errors
    },
    onSubmit: (values) => {
      const body = {
        ...values,
        prices: values.prices.map((price, i) => ({
          person: i,
          status: 1,
          ...price,
        })),
        images: images.map((image) => image.path),
        attribute_id: options,
        residence_id: residenceId,
        active: 1,
      }
      formik.setSubmitting(true)
      if (data) {
        axios
          .put(`/residences/rooms/${roomId}`, body)
          .then(() => push(`/account/hotels/${residenceId}/edit?step=4`))
          .finally(() => formik.setSubmitting(false))
      } else {
        axios
          .post(`/residences/rooms`, body)
          .then(() => {
            push(`/account/hotels/${residenceId}/edit?step=4`)
          })
          .finally(() => formik.setSubmitting(false))
      }
    },
  })

  useEffect(() => {
    if (data) {
      const attributes = data.attributes?.map((item) => item.id)
      setOptions(attributes)
    }
  }, [])

  useEffect(() => {
    if (query.room_id) {
      const galleries = data?.galleries?.map((item, idx) => ({
        path: item.type + '/' + item.title,
        isMain: idx === 0,
      }))
      setImages(galleries)
    }
  }, [])

  return (
    <div className={cls.root}>
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Tabs
            value={activeStep}
            onChange={onChangeTabs}
            TabIndicatorProps={{
              style: { background: '#000' },
            }}
          >
            <Tab label={common[locale].Basic_information} {...a11yProps(0)} />
            <Tab label={common[locale].total_price} {...a11yProps(1)} />
            <Tab label={common[locale].attributes} {...a11yProps(2)} />
            <Tab label={common[locale].photos_of_the_room} {...a11yProps(3)} />
          </Tabs>
          <HotelRoomsMain
            formik={formik}
            handleNext={handleNext}
            activeStep={activeStep}
          />
          <HotelRoomsPrice
            formik={formik}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
          <HotelRoomsAttributes
            options={options}
            setOptions={setOptions}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
          <HotelRoomsMedia
            images={images}
            setImages={setImages}
            data={data}
            formik={formik}
            handleBack={handleBack}
            activeStep={activeStep}
          />
        </form>
      </Container>
    </div>
  )
}

export default HotelRoomsCreate
