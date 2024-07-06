import React, { useState } from 'react'
import { CircularProgress, Rating, Typography } from '@mui/material'
import { StarSmile } from '../icons/commonIcons'
import cls from './reviewSection.module.scss'
import { TelegraphIcon } from '../icons/brandIcons'
import { common } from '../../locales/common'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'
import { shallowEqual, useSelector } from 'react-redux'
import bookingService from '../../services/BookingService'
import { common2 } from '../../locales/common2'
import { getLocale } from '../../utils/getLocale'
import residenceService from '../../services/residenceService'
import getAvatar from 'utils/getAvatar'

export default function ReviewSection({ data }) {
  const [value, setValue] = useState(1)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState(data.reviews?.slice(0, 4) || [])
  const { locale } = useRouter()
  const user = useSelector((state) => state.auth.user, shallowEqual)
  const isUserCanSendReview = !!data?.bookings?.find(
    (item) => item?.user_id === user?.id && item.status === 'approved'
  )

  const sendReview = () => {
    const trimmedText = text.trim()
    const payload = {
      comment: trimmedText,
      rating: value,
    }
    if (!trimmedText.length) {
      return
    }
    setLoading(true)
    residenceService
      .reviewCreate(data.id, payload)
      .then(() => {
        toast.success(common2[locale].thanks_for_your_comment)
        setText('')
        fetchReviews()
      })
      .finally(() => setLoading(false))
  }

  const fetchReviews = () => {
    bookingService.getReviews(data.alias).then((res) => {
      setReviews(res.data.reviews)
    })
  }

  return (
    <div className={cls.root} id='rating-reviews'>
      {reviews.length ? (
        <Typography variant='h6'>{common2[locale].reviews}</Typography>
      ) : (
        ''
      )}
      {reviews.map((item, index) => (
        <div key={index} className={cls.review}>
          <div className={cls.titleBlock}>
            <div className={cls.imageWrapper}>
              <img src={getAvatar(item.user?.img)} alt='Avatar' />
            </div>
            <div className={cls.nameBlock}>
              <Typography>
                {item.user?.firstname || "" + ' ' + (item.user?.lastname || "")}
              </Typography>
              <div className={cls.subtitle}>
                <Typography variant='body2'>
                  {format(parseISO(item.created_at), 'dd MMM yyyy', {
                    locale: getLocale(locale),
                  })}
                </Typography>
                <span className={cls.separator} />
                <span className={cls.rating}>
                  <StarSmile />
                  {item.rating}
                </span>
              </div>
            </div>
          </div>
          <div className={cls.description}>
            <Typography>{item.comment}</Typography>
          </div>
        </div>
      ))}
      {data.reviews?.length > reviews.length && (
        <button
          className={cls.outlinedButton}
          onClick={() => setReviews(data.reviews)}
        >
          {common[locale].view_more}
        </button>
      )}
      {isUserCanSendReview ? (
        <div className={cls.commentSection}>
          <div className={cls.rate}>
            <Rating
              name='rating'
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue)
              }}
            />
          </div>
          <div className={cls.inputWrapper}>
            <input
              name='comment'
              placeholder={common2[locale].write_comment_here}
              autoComplete='off'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className={cls.submitBtn}
              onClick={sendReview}
              disabled={loading}
            >
              {!loading ? (
                <TelegraphIcon />
              ) : (
                <CircularProgress color='primary' size={24} />
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className={cls.reviewText}> {common2[locale].reviewText}</p>
      )}
    </div>
  )
}
