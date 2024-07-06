import React from 'react'
import { Container } from '@mui/system'
import cls from './dachaCreate.module.scss'
import { Box, Tab, Tabs } from '@mui/material'
import { a11yProps } from '../tabs-function'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import MainInfoForm from './mainInfoForm'
import AreaInfoForm from './areaInfoForm'
import AttributesInfoForm from './attributesInfoForm'
import NewAttributeForm from './newAttributeForm'

export default function DachaCreate({ data, countries }) {
  const { locale, query, push } = useRouter()
  const residenceId = data?.id
  const activeStep = Number(query.step) || 0

  const handleNext = () =>
    push({ pathname: '', query: { id: residenceId, step: activeStep + 1 } })
  const handleBack = () =>
    push({ pathname: '', query: { id: residenceId, step: activeStep - 1 } })

  const onChangeTabs = (event, step) => {
    if (data) {
      push({ pathname: '', query: { id: residenceId, step } })
    }
  }

  return (
    <div className={cls.root}>
      <Container>
        <form className={cls.wrapper}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={activeStep}
              onChange={onChangeTabs}
              TabIndicatorProps={{
                style: { background: '#000' },
              }}
            >
              <Tab label={common[locale].Basic_information} {...a11yProps(0)} />
              <Tab label={common[locale].Options} {...a11yProps(1)} />
              <Tab label={common[locale].Area_Information} {...a11yProps(2)} />
              <Tab label={common[locale].attributes} {...a11yProps(3)} />
            </Tabs>
            <MainInfoForm
              data={data}
              activeStep={activeStep}
              handleNext={handleNext}
              countries={countries}
            />
            <AttributesInfoForm
              data={data}
              activeStep={activeStep}
              handleNext={handleNext}
              residenceId={residenceId}
              handleBack={handleBack}
            />
            <AreaInfoForm
              data={data}
              activeStep={activeStep}
              handleNext={handleNext}
              residenceId={residenceId}
              handleBack={handleBack}
            />
            <NewAttributeForm
              data={data}
              activeStep={activeStep}
              residenceId={residenceId}
              handleBack={handleBack}
            />
          </Box>
        </form>
      </Container>
    </div>
  )
}
