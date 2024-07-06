import React, { useEffect, useState } from 'react'
import {
  Button,
  Radio,
  FormControlLabel,
  Popover,
  Select,
  Typography,
  CircularProgress,
} from '@mui/material'
import cls from './addRestaurantPopover.module.scss'
import { common } from 'locales/common'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import residenceService from 'services/residenceService'
import { common2 } from 'locales/common2'
import { toast } from 'react-toastify'

export default function AddRestaurantPopover({
  open,
  anchorEl,
  onClose = () => {},
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  residenceId,
  areaTypeId,
  areaTypes,
  refetch = () => {},
  data,
}) {
  const { locale } = useRouter()
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [areaTitleId, setAreaTitleId] = useState(null)
  const [distance, setDistance] = useState('')
  const [areaTitles, setAreaTitles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const areaType = areaTypes.find((item) => item.id === areaTypeId)

  function fetchAreaTitles() {
    const params = {
      area_type_id: areaTypeId,
      city_id: data?.region_id,
      perPage: 1000,
    }
    setIsLoading(true)
    residenceService
      .getAreaTitles(params)
      .then((res) => setAreaTitles(res.data))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchAreaTitles()
  }, [])

  function createAreaInfo(payload) {
    setLoadingBtn(true)
    residenceService
      .areaCreate(payload)
      .then(() => {
        onClose()
        setAreaTitleId(null)
        setDistance(null)
        refetch()
      })
      .finally(() => setLoadingBtn(false))
  }

  const handleChangeAreaTitle = (event) => {
    setAreaTitleId(event.target.value)
  }

  const handleChangeDistance = (event) => {
    const { value } = event.target
    const re = /^[0-9\b]+$/

    if (value === '' || re.test(value)) {
      setDistance(value)
    }
  }

  const handleSubmit = () => {
    const payload = {
      residence_id: residenceId,
      residence_area_type_id: areaTypeId,
      residence_area_title_id: areaTitleId,
      distance: distance,
    }
    if (!distance) {
      toast.warning(common2[locale].distance_is_empty)
      return
    }
    if (!areaTitleId) {
      toast.warning(common2[locale].area_is_empty)
      return
    }
    createAreaInfo(payload)
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{ sx: { maxWidth: 'calc(100vw - 32px)' } }}
    >
      <div className={cls.root}>
        <div className={cls.wrapper}>
          <div className={cls.row}>
            <Typography>{common[locale].name}</Typography>
            <Select
              sx={{ width: '50%', height: '45px' }}
              value={areaTitleId}
              onChange={handleChangeAreaTitle}
            >
              {isLoading && (
                <MenuItem value={null} disabled>
                  loading...
                </MenuItem>
              )}
              {areaTitles.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.translation?.title}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className={cls.row}>
            <Typography>{common2[locale].type}</Typography>
            <div className={cls.radioWrapper}>
              <FormControlLabel
                label={areaType?.translation?.title}
                control={
                  <Radio name={areaType?.translation?.title} checked={true} />
                }
              />
            </div>
          </div>
          <div className={cls.row}>
            <Typography>{common[locale].Distance}</Typography>
            <input
              name='distance'
              placeholder={common2[locale].type_here}
              autoComplete='off'
              value={distance}
              onChange={handleChangeDistance}
              className={cls.input}
            />
          </div>
          <div className={cls.actions}>
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'common.green',
                '&:hover': {
                  backgroundColor: 'common.green',
                },
              }}
              onClick={handleSubmit}
            >
              {!loadingBtn ? (
                common[locale].save
              ) : (
                <CircularProgress size={20} color='inherit' />
              )}
            </Button>
            <Button variant='outlined' onClick={onClose}>
              {common[locale].cancel}
            </Button>
          </div>
        </div>
      </div>
    </Popover>
  )
}
