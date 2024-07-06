import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import cls from './fallbackImage.module.scss'

const defaultSrc = '/images/not-found.png'

export default function FallbackImage({ src, ...rest }) {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <LazyLoadImage
      {...rest}
      src={imgSrc ? imgSrc : defaultSrc}
      onError={() => setImgSrc(defaultSrc)}
      className={cls.root}
    />
  )
}
