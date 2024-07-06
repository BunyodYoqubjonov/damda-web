import React from 'react'
import { Typography } from '@mui/material'
import cls from './areaInfo.module.scss'
import { TrashIcon } from 'components/icons/commonIcons'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'
import { getDistance } from 'utils/getDistance'
import { common } from '../../locales/common'
import Link from 'next/link'

export default function AreaInfoPanelRow({
  item,
  matches,
  isDelete,
  handleDelete = () => {},
}) {
  const { locale } = useRouter()

  return (
    <div className={`${cls.row} ${isDelete ? '' : cls.fullWidth}`}>
      <div className={cls.title}>
        <Typography>{item.area_title?.translation?.title}</Typography>
        {!matches && item?.area_title?.view_link && (
          <Typography component={Link} href={item?.area_title.view_link}>
            {common[locale].view_on_site}
          </Typography>
        )}
      </div>
      {matches && item?.area_title?.view_link && (
        <div className={cls.anchorText}>
          <Typography
            className={cls.anchorText}
            component={Link}
            href={item.area_title.view_link}
          >
            {common[locale].view_on_site}
          </Typography>
        </div>
      )}
      <div className={cls.anchorText}>{/* <a href='#'>View on site</a> */}</div>
      <div className={cls.destination}>
        <Typography>{getDistance(item?.distance, locale)}</Typography>
        {item.area_title?.location?.latitude && (
          <Link
              className={cls.mapIcon}
            href={`/view-in-map?latitude=${item.area_title.location.latitude}&longitude=${item.area_title.location.longitude}&title=${item.area_title?.translation?.title}`}
          >
            <i className='mdi mdi-map' />
          </Link>
        )}
      </div>
      {isDelete ? (
        <div className={cls.actions}>
          <button
            type='button'
            onClick={() => handleDelete(item.id)}
            className={cls.trashBtn}
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
