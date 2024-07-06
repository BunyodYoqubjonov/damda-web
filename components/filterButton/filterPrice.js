import React from 'react'
import styled from '@emotion/styled'
import cls from './filterButton.module.scss'
import { Slider, SliderThumb, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { numberToPrice } from '../../utils/numberToPrice'
import { useRouter } from 'next/router'
import { common } from '../../locales/common'

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#F19204',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: 'currentColor',
    border: '2px solid #FFF',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 10,
      width: 2,
      backgroundColor: '#FFF',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 1,
    border: 'none',
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 1,
  },
}))

function AirbnbThumbComponent(props) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className='airbnb-bar' />
      <span className='airbnb-bar' />
    </SliderThumb>
  )
}

export default function FilterPrice({ label, value, handleChange }) {
  const { locale } = useRouter()

  return (
    <div className={cls.outlinedButton} style={{ cursor: 'default' }}>
      <div className={cls.caption}>{label}</div>
      <Box mt={2} />

      <AirbnbSlider
        components={{ Thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) =>
          index === 0 ? 'Minimum price' : 'Maximum price'
        }
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        min={100000}
        max={9000000}
        step={1000}
      />
      <div className={cls.priceRange}>
        <div className={cls.price}>
          <span>{common[locale].min_price}</span>
          <Typography>{numberToPrice(value[0], locale)}</Typography>
        </div>
        <div className={cls.separator} />
        <div className={cls.price}>
          <span>{common[locale].max_price}</span>
          <Typography>{numberToPrice(value[1], locale)}</Typography>
        </div>
      </div>
    </div>
  )
}
