import React from 'react'
import cmd from './privecy.module.scss'
import cls from '../aboutUs/aboutUs.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { common } from '../../locales/common'
import { Typography } from '@mui/material'
import { navigation } from '../../locales/navigation'
import { useRouter } from 'next/router'

const Privecy = () => {
  const { locale } = useRouter()
  return (
    <div className={cmd.container}>
      <div className={cls.hero}>
        <div className={cls.imgWrapper}>
          <LazyLoadImage alt='About damda' src='/images/about.jpg' />
        </div>
        <p className={cls.caption}>{common[locale].Company}</p>
        <Typography variant='h1' className={cls.title}>
          {navigation[locale].summer_house}
        </Typography>
      </div>

      <p className={cmd.center}>МАХФИЙЛИК СИЁСАТИ</p>

      <p>
        Шахсий маълумотларнинг махфийлик сиёсати (бундан кейин матнда Сиёсат,
        деб аталади) “Damda Sayyoh” МЧЖ (бундан кейин матнда Дамда, деб аталади)
        damda.uz сайти ёки шу сайтга алоқадор бошқа мобиль иловалардан (бундан
        кейин матнда Дамда ресурслари, деб аталади) фойдаланиш чоғида
        Фойдаланувчи ҳақида олинадиган маълумотларга нисбатан қўлланилади. Damda
        Ўзбекистон Республикаси қонунларига биноан расман рўйхатдан ўтган юридик
        шахс ҳисобланади. Жойлашув манзили: Ўзбекистон Республикаси, Тошкент
        шаҳри, Чилонзор тумани, Бунёдкор шоҳкўчаси, 42-уй.
      </p>
    </div>
  )
}

export default Privecy
