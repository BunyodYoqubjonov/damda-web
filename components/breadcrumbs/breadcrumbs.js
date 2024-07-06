import React from 'react'
import {
  Container,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from '@mui/material'
import cls from './breadcrumbs.module.scss'
import Link from 'next/link'

export default function Breadcrumbs({ prevs = [], current }) {
  return (
    <Container>
      <div className={cls.root}>
        <MuiBreadcrumbs separator='•'>
          {prevs.map((item, index) => (
            <Link key={index} href={item.link}>
              <a className={cls.link}>{item.title}</a>
            </Link>
          ))}
          <Typography className={cls.current}>{current}</Typography>
        </MuiBreadcrumbs>
      </div>
    </Container>
  )
}
