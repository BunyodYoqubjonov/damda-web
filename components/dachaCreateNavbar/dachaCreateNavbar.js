import React from 'react'
import cls from './dachaCreateNavbar.module.scss'

const list = [
  {
    title: 'About summer house',
    link: '#about',
  },
  {
    title: 'Offers',
    link: '#offers',
  },
  {
    title: 'Area info',
    link: '#area-info',
  },
  {
    title: 'Guide rules',
    link: '#rules',
  },
  {
    title: 'On map',
    link: '#map',
  },
]

export default function DachaCreateNavbar() {
  return (
    <div className={cls.root}>
      <div className={cls.navbar}>
        {list.map((item, index) => (
          <a key={index} href={item.link} className={cls.navItem}>
            {item.title}
          </a>
        ))}
      </div>
    </div>
  )
}
