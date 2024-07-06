import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import cls from './hotelCreateRules.module.scss'
import {
  ChildrenIcon,
  ClockIcon,
  PetsIcon,
  WalletIcon,
} from '../icons/commonIcons'
import { common } from 'locales/common'
import { useRouter } from 'next/router'
import FormEditor from 'components/formEditor'
import { common2 } from 'locales/common2'
import RuleTimes from './ruleTimes'

export default function HotelCreateRules({ valueLang, formik, data }) {
  const { locale } = useRouter()

  return (
    <div id='rules' className={cls.root}>
      <Typography variant='h6'>{common[locale].house_rules}</Typography>
      <div className={cls.wrapper}>
        <div className={cls.row}>
          <div className={cls.item}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values?.break_fast}
                  onChange={(e) => {
                    const { checked } = e.target
                    if (!checked) {
                      formik.setFieldValue('breakfast', undefined)
                    }
                    formik.setFieldValue('break_fast', e.target.checked)
                  }}
                />
              }
              label={common[locale].break_fast}
            />
          </div>
          <div className={cls.item}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values?.price_for_children}
                  onChange={(e) => {
                    const { checked } = e.target
                    if (!checked) {
                      formik.setFieldValue('children_age', undefined)
                      formik.setFieldValue('children_price', undefined)
                    }
                    formik.setFieldValue('price_for_children', e.target.checked)
                  }}
                />
              }
              label={common[locale].price_for_children}
            />
          </div>
        </div>
        {formik.values.break_fast && (
          <div className={cls.row}>
            <div className={cls.item}>
              <Typography variant='body1'>
                {common[locale].break_fast}
              </Typography>
            </div>
            <div className={cls.item}>
              <TextField
                name={`breakfast`}
                fullWidth
                autoComplete='on'
                InputLabelProps={{
                  shrink: true,
                }}
                variant='standard'
                value={formik.values.breakfast}
                placeholder={common[locale].break_fast}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        )}
        {formik.values.price_for_children && (
          <>
            <div className={cls.row}>
              <div className={cls.item}>
                <Typography variant='body1'>
                  {common[locale].children_age}
                </Typography>
              </div>
              <div className={cls.item}>
                <TextField
                  name={`children_age`}
                  fullWidth
                  type='number'
                  autoComplete='on'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                  value={formik.values.children_age}
                  placeholder={common[locale].age}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className={cls.row}>
              <div className={cls.item}>
                <Typography variant='body1'>
                  {common[locale].children_price}
                </Typography>
              </div>
              <div className={cls.item}>
                <TextField
                  name={`children_price`}
                  fullWidth
                  type='number'
                  autoComplete='on'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                  value={formik.values.children_price}
                  placeholder={common[locale].price}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </>
        )}
        <div className={cls.row}>
          <div className={cls.item}>
            <ClockIcon />
            <Typography variant='body2'>{common[locale].check_in}</Typography>
          </div>
          <div className={cls.item}>
            <RuleTimes formik={formik} name='check_in' />
          </div>
        </div>
        <div className={cls.row}>
          <div className={cls.item}>
            <ClockIcon />
            <Typography variant='body2'>{common[locale].check_out}</Typography>
          </div>
          <div className={cls.item}>
            <RuleTimes formik={formik} name='check_out' />
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <WalletIcon />
            <Typography variant='body2'>
              {common[locale].cancellation_prepayment} ({valueLang})
            </Typography>
          </div>
          <div className={cls.item}>
            <FormEditor
              name='cancellation'
              valueLang={valueLang}
              formik={formik}
            />
            {/* <IconButton>
              <TimesIcon />
            </IconButton> */}
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <ChildrenIcon />
            <Typography variant='body2'>
              {common[locale].children_beds} ({valueLang})
            </Typography>
          </div>
          <div className={cls.item}>
            <FormEditor
              name='children_and_beds'
              valueLang={valueLang}
              formik={formik}
            />
          </div>
        </div>

        <div className={cls.row}>
          <div className={cls.item}>
            <PetsIcon />
            <Typography variant='body2'>
              {common[locale].pets} ({valueLang})
            </Typography>
          </div>
          <div className={cls.item}>
            <FormEditor name='allowed' valueLang={valueLang} formik={formik} />
          </div>
        </div>
      </div>
    </div>
  )
}
