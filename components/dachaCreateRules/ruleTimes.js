import React from 'react'
import cls from './dachaCreateRules.module.scss'
import { useRouter } from 'next/router'
import { checkList } from 'constants/mock'
import FilterCheckButton from 'components/filterButton/filterCheckButton'
import { common2 } from 'locales/common2'

export default function RuleTimes({ formik, name }) {
  const { locale } = useRouter()

  const handleChangeInData = (event) => {
    let time = formik.values[name]
    time[0] = event.target.value
    formik.setFieldValue(name, time)
  }
  const handleChangeOutData = (event) => {
    let time = formik.values[name]
    time[1] = event.target.value
    formik.setFieldValue(name, time)
  }

  return (
    <button className={cls.outlinedButton} type='button'>
      <div className={cls.wrapper}>
        <FilterCheckButton
          label={common2[locale].time1}
          value={formik.values[name][0]}
          name='checkIn'
          list={checkList}
          handleChange={handleChangeInData}
          className={cls.checkIn}
        />
        <div style={{ marginRight: '10px' }} />
        <FilterCheckButton
          label={common2[locale].time2}
          value={formik.values[name][1]}
          name='checkOut'
          list={checkList}
          handleChange={handleChangeOutData}
          className={cls.checkIn}
        />
      </div>
    </button>
  )
}
