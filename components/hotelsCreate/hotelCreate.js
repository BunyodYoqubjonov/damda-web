import React, { useState } from 'react'
import { Container } from '@mui/system'
import cls from './hotelCreate.module.scss'
import DachaImageUpload from '../dachaImageUpload/dachaImageUpload'
import DachaCreateOffers from '../dachaCreateOffers/dachaCreateOffers'
import DachaCreateMain from '../dachaCreateMain/dachaCreateMain'
import DachaCreateAbout from '../dachaCreateAbout/dachaCreateAbout'
import DachaCreateArea from '../dachaCreateArea/dachaCreateArea'
import DachaCreateRules from '../dachaCreateRules/dachaCreateRules'
import DachaCreateAddress from '../dachaCreateAddress/dachaCreateAddress'
import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  Select,
  Tab,
  Tabs,
} from '@mui/material'
import { a11yProps } from '../tabs-function'
import { useFormik } from 'formik'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import residenceService from '../../services/residenceService'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export default function HotelCreate() {
  // translate
  const { locale } = useRouter()
  // next prev buttons
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  // state for tabs
  const [image, setImage] = useState([])
  const lang = [
    { value: 'ru' },
    { value: 'en' },
    { value: 'uz' },
    { value: 'uzk' },
  ]
  const [select, setSelect] = useState({
    city_id: '',
    region_id: '',
    village: '',
    for_whom: '',
  })
  const [valueLang, setValueLang] = useState('ru')
  const handleChange = (event) => setValueLang(event.target.value)
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [village, setVillage] = useState([])
  const [allCities, setAllCities] = useState([])
  const [whom, setWhom] = useState([])
  const [longitude, setLongitude] = useState(69.23240905761718)
  const [latitude, setLatitude] = useState(41.349186966114765)
  const [address, setAddress] = useState()
  const [residence, setResidence] = useState(0)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState([])
  const router = useRouter()
  const selected = useSelector((state) => state.auth.user)
  const [areaList, setAreaList] = useState([])

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, { setSubmitting }) => {
      const body = {
        ...values,
        images: image,
        city_id: select?.region_id,
        region_id: select?.city_id,
        village_id: select?.village,
        for_whom: select?.for_whom,
        latitude: latitude,
        longitude: longitude,
        category_id: 1,
        type: 'hotel',
        check_in: '10:00,19:00',
        check_out: '09:00,20:00',
        user_id: selected.id,
      }
      residenceService
        .mainInfo(body)
        .then((res) => {
          if (res.status === true) {
            toast.success(res.message)
            handleNext()
            setResidence(res.data.id)
          }
        })
        .catch((err) => {
          setError(err.data.params)
        })
        .finally(() => setSubmitting(false))
    },
  })

  const formik1 = useFormik({
    initialValues: {},
    onSubmit: (values, { setSubmitting }) => {
      const body = {
        residence_id: residence ? residence : 1050,
        attribute_value_id: options,
      }
      residenceService
        .attributes(body)
        .then((res) => {
          if (res.status === true) {
            toast.success(res.message)
            handleNext()
          }
        })
        .finally(() => setSubmitting(false))
    },
  })

  const formik2 = useFormik({
    initialValues: {},
    onSubmit: () => {
      areaList.length > 0 ? router.push('/account') : null
    },
    validate: () => {
      if (areaList.length === 0) {
        toast.warn(common[locale].areaError)
      }
    },
  })

  return (
    <div className={cls.root}>
      <Container>
        <form className={cls.wrapper}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={activeStep}
              TabIndicatorProps={{
                style: { background: '#000' },
                sx: { display: 'none' },
              }}
              sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }}
              aria-label='basic tabs example'
            >
              <Tab label={`Basic information`} {...a11yProps(0)} />
              <Tab label='Options' {...a11yProps(1)} />
              <Tab label='Area Information' {...a11yProps(2)} />
            </Tabs>
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
                        {item.value}
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
                setRegions={setRegions}
                setCities={setCities}
                allCities={allCities}
                setWhom={setWhom}
                whom={whom}
                regions={regions}
                setAllCities={setAllCities}
                lang={lang}
                valueLang={valueLang}
                village={village}
                setVillage={setVillage}
                error={error}
              />

              <DachaImageUpload setImage={setImage} image={image} />
              <DachaCreateAddress
                setLongitude={setLongitude}
                address={address}
                setLatitude={setLatitude}
                setAddress={setAddress}
              />
              <DachaCreateAbout
                lang={lang}
                valueLang={valueLang}
                formik={formik}
                error={error}
              />
              <DachaCreateRules
                lang={lang}
                valueLang={valueLang}
                formik={formik}
              />
            </div>

            <div
              className='activeStep1'
              style={{ display: activeStep === 1 ? 'block' : 'none' }}
            >
              <DachaCreateOffers
                formik1={formik1}
                valueLang={valueLang}
                options={options}
                setOptions={setOptions}
              />
            </div>

            <div
              className='activeStep2'
              style={{ display: activeStep === 2 ? 'block' : 'none' }}
            >
              <DachaCreateArea
                residence={residence}
                valueLang={valueLang}
                lang={lang}
                handleChangeLang={handleChange}
                setAreaList={setAreaList}
                areaList={areaList}
              />
            </div>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}>
            <Button
              type='button'
              variant='outlined'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              variant='contained'
              type='submit'
              onClick={
                (activeStep === 0 && formik.handleSubmit) ||
                (activeStep === 1 && formik1.handleSubmit) ||
                (activeStep === 2 && formik2.handleSubmit)
              }
              sx={{
                backgroundColor: 'common.green',
                '&:hover': { backgroundColor: 'common.green' },
              }}
            >
              {formik.isSubmitting ? (
                <>
                  <CircularProgress color='inherit' size={22} sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  )
}
