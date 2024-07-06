import React from 'react'
import { StarSmile } from '../icons/commonIcons'
import cls from './filterButton.module.scss'

const list = new Array(5).fill(1).map((item, index) => item + index)

export default function FilterStarButton({ label, value, handleChange }) {
  return (
    <div className={cls.outlinedButton} style={{ cursor: 'default' }}>
      <div className={cls.caption}>{label}</div>
      <div className={cls.wrapper}>
        {list.map((item, index) => (
          <button
            key={index}
            className={`${cls.ratingBtn} ${value == item ? cls.active : ''}`}
            onClick={() => handleChange('star', item)}
          >
            <StarSmile /> {item}
          </button>
        ))}
      </div>
    </div>
  )
}
