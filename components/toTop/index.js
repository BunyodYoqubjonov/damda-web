import React, { useState } from 'react'
import cls from './toTop.module.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function ToTop() {
  const [showScroll, setShowScroll] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollTop)
  }

  return (
    <button
      className={cls.to_top}
      onClick={scrollToTop}
      style={{ display: showScroll ? 'flex' : 'none' }}
    >
      <ArrowUpwardIcon />
    </button>
  )
}
