import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  Select,
} from '@mui/material'
import cls from './dachaCreate.module.scss'
import { common } from 'locales/common'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import DachaCreateMain from '../dachaCreateMain/dachaCreateMain'
import DachaImageUpload from '../dachaImageUpload/dachaImageUpload'
import DachaCreateAddress from '../dachaCreateAddress/dachaCreateAddress'
import { useRouter } from 'next/router'
import { lang } from 'constants/lang'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import residenceService from 'services/residenceService'
import { toast } from 'react-toastify'
import { common2 } from 'locales/common2'
import { getAddressFromMap } from 'utils/getAddressFromMap'
import dynamic from 'next/dynamic'

const DachaCreateRules = dynamic(
  () => import('../dachaCreateRules/dachaCreateRules'),
  { ssr: false }
)
const DachaCreateAbout = dynamic(
  () => import('../dachaCreateAbout/dachaCreateAbout'),
  { ssr: false }
)

const MainInfoForm = ({ activeStep, handleNext, data, countries }) => {
  const { locale, query, push } = useRouter()
  const allCities = countries[0]?.cities || []
  const regions = allCities
    .filter((item) => item.parent_id === 0)
    .map((item) => ({ value: item.id, label: item.translation?.title }))
  const [images, setImages] = useState([])
  const [valueLang, setValueLang] = useState('ru')
  const handleChange = (event) => setValueLang(event.target.value)
  const [cities, setCities] = useState([])
  const [village, setVillage] = useState([])
  const [whom, setWhom] = useState([])
  const [mapState, setMapState] = useState({
    center: [
      Number(data?.location?.latitude) || 41.349186966114765,
      Number(data?.location?.longitude) || 69.23240905761718,
    ],
    zoom: 12,
  })
  const [error, setError] = useState(null)
  const selected = useSelector((state) => state.auth.user)
  const [toggle, setToggle] = useState(false)
  const [activeAddress, setActiveAddress] = useState('')
  const [select, setSelect] = useState({
    city_id: '',
    region_id: '',
    village: '',
    for_whom: '',
  })

  function getTranslationsField(field) {
    if (!data) {
      return {}
    }
    const { translations } = data
    const result = lang.map((item) => ({
      [item.value]: translations?.find((el) => el.locale === item.value)
        ? translations?.find((el) => el.locale === item.value)[field]
        : '',
    }))
    return Object.assign({}, ...result)
  }

  console.log('data => ', data)

  const formik = useFormik({
    initialValues: {
      title: getTranslationsField('title'),
      address: getTranslationsField('address'),
      description: getTranslationsField('description'),
      cancellation: getTranslationsField('cancellation'),
      children_and_beds: getTranslationsField('children_and_beds'),
      allowed: getTranslationsField('allowed'),
      number_of_rooms: data?.number_of_rooms,
      price: data?.price,
      holiday_price: data?.holiday_price,
      bathroom: data?.bathroom,
      aria: data?.aria,
      adult: data?.adult,
      yard_area: data?.yard_area,
      breakfast: data?.breakfast,
      is_breakfast: data?.is_breakfast,
      phone: data?.phone,
      check_in: data?.check_in || ['10:00', '19:00'],
      check_out: data?.check_out || ['09:00', '20:00'],
    },
    onSubmit: (values, { setSubmitting }) => {
      const body = {
        active: data?.active || 0,
        status: data?.status || 'created',
        category_id: 1,
        city_id: select?.city_id,
        region_id: select?.region_id,
        type: 'cottage',
        price: values.price,
        holiday_price: values.holiday_price,
        bathroom: values.bathroom,
        number_of_rooms: values.number_of_rooms,
        check_in: data?.check_in?.join(',') || '10:00,19:00',
        check_out: data?.check_out?.join(',') || '09:00,20:00',
        adult: values.adult,
        aria: values.aria,
        cancellation: values.cancellation,
        children_and_beds: values.children_and_beds,
        allowed: values.allowed,
        latitude: mapState.center[0],
        longitude: mapState.center[1],
        images: images
          .sort((a, b) => Number(b.isMain) - Number(a.isMain))
          .map((item) => item.path),
        for_whom: whom,
        village_id: select?.village,
        yard_area: values.yard_area,
        user_id: selected.id,
        title: {},
        address: {},
        description: {},
        phone: values.phone.replaceAll(' ', ''),
        lang: locale
      }
      lang.forEach((item) => {
        if (values.title[item.value]) {
          body.title[item.value] = values.title[item.value]
        }
        if (values.address[item.value]) {
          body.address[item.value] = values.address[item.value]
        }
        if (values.description[item.value]) {
          body.description[item.value] = values.description[item.value]
        }
        if (values.cancellation[item.value]) {
          body.cancellation[item.value] = values.cancellation[item.value]
        }
        if (values.children_and_beds[item.value]) {
          body.children_and_beds[item.value] =
            values.children_and_beds[item.value]
        }
        if (values.allowed[item.value]) {
          body.allowed[item.value] = values.allowed[item.value]
        }
      })
      console.log('body => ', body)
      if (query.id) {
        updateResidence(body, setSubmitting)
      } else {
        createResidence(body, setSubmitting)
      }
    },
  })

  function createResidence(body, setSubmitting) {
    residenceService
      .mainInfo(body)
      .then((res) => {
        toast.success(common[locale].successfully_created)
        push({
          pathname: `/account/dacha/${res.data.id}/edit`,
          query: { step: 1 },
        })
      })
      .catch((err) => setError(err.data?.params))
      .finally(() => setSubmitting(false))
  }

  function updateResidence(body, setSubmitting) {
    residenceService
      .updateMain(query.id, body)
      .then(() => {
        handleNext()
        toast.success(common[locale].successfully_updated)
      })
      .catch((err) => setError(err.data?.params))
      .finally(() => setSubmitting(false))
  }

  useEffect(() => {
    if (query.id) {
      const galleries = data.galleries?.map((item, idx) => ({
        path: item.type + '/' + item.title,
        isMain: idx === 0,
      }))
      setImages(galleries)
      setSelect({
        for_whom: data.for_whom,
        region_id: data.region_id,
        city_id: data.city_id,
        village: data.village_id,
      })
      setWhom(data.for_whom || [])
    }
  }, [data])

  const onMapClick = (event) => {
    const coords = event.get('coords')
    setMapState((value) => ({ center: coords, zoom: value.zoom }))
    getAddressFromMap(formik.setFieldValue, coords, `address.${valueLang}`)
  }

  return (
    <div
      className='activeStep'
      style={{ display: activeStep === 0 ? 'block' : 'none' }}
    >
      <Box className={cls.languages}>
        <FormControl fullWidth>
          <InputLabel id='demo'>{common[locale].language}</InputLabel>
          <Select
            id='demo'
            label='Language'
            value={valueLang}
            onChange={handleChange}
          >
            {lang.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DachaCreateMain
        formik={formik}
        setSelect={setSelect}
        select={select}
        cities={cities}
        setCities={setCities}
        allCities={allCities}
        setWhom={setWhom}
        whom={whom}
        regions={regions}
        lang={lang}
        valueLang={valueLang}
        village={village}
        setVillage={setVillage}
        error={error}
        setToggle={setToggle}
        toggle={toggle}
        data={data}
      />

      <DachaImageUpload setImages={setImages} images={images} data={data} />

      <DachaCreateAddress
        setActiveAddress={setActiveAddress}
        activeAddress={activeAddress}
        lang={lang}
        formik={formik}
        valueLang={valueLang}
        mapState={mapState}
        onMapClick={onMapClick}
      />
      <Box className={cls.languages} mt={4}>
        <FormControl fullWidth>
          <InputLabel id='demo'>{common[locale].language}</InputLabel>
          <Select
            id='demo'
            label='Language'
            value={valueLang}
            onChange={handleChange}
          >
            {lang.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DachaCreateAbout valueLang={valueLang} formik={formik} error={error} />
      <DachaCreateRules valueLang={valueLang} formik={formik} data={data} />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}>
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
  )
}

export default MainInfoForm