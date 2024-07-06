import React, { useEffect, useState } from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material'
import cls from './hotelCreateArea.module.scss'
import { Box } from '@mui/system'
import AddRestaurantPopover from '../addRestaurantPopover/addRestaurantPopover'
import residenceService from 'services/residenceService'
import ButtonAdd from './buttonAdd'
import { useRouter } from 'next/router'
import { common } from 'locales/common'
import AreaInfoPanelRow from 'components/areaInfo/areaInfoPanelRow'
import Loading from 'components/loading'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className={cls.tabPanel}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function HotelCreateArea({
  residenceId,
  areaList,
  setAreaList,
  data,
}) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const { locale } = useRouter()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const openAddRestaurant = Boolean(anchorEl)

  const [areaTypes, setAreaTypes] = useState([])
  const [areaTypeId, setAreaTypeId] = useState(0)

  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [areaDeleteId, setAreaDeleteId] = useState(null)

  const handleChange = (event, newValue) => setValue(newValue)

  const handleChangeType = (event) => setAreaTypeId(event)

  const handleOpenAddRestaurant = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseAddRestaurant = () => {
    setAnchorEl(null)
  }

  function fetchAreaTypes() {
    residenceService.getAreaTypes({ perPage: 1000 }).then((res) => {
      setAreaTypes(res.data)
      setAreaTypeId(res.data[0].id)
    })
  }

  function fetchResidenceAreas() {
    setLoading(true)
    residenceService
      .areaList(residenceId)
      .then((res) => setAreaList(res.data))
      .finally(() => setLoading(false))
  }

  const deleteArea = (id) => {
    setLoadingBtn(true)
    residenceService
      .deleteArea(residenceId, id)
      .then(() => {
        setAreaDeleteId(null)
        fetchResidenceAreas()
      })
      .finally(() => setLoadingBtn(false))
  }

  useEffect(() => {
    fetchAreaTypes()
    fetchResidenceAreas()
  }, [locale])

  return (
    <div id='area-info' className={cls.root}>
      <Typography variant='h6' sx={{ marginBottom: 1.5 }}>
        {common[locale].Area_info}
      </Typography>

      {!loading ? (
        <Box sx={{ width: '100%', mt: matches ? 6 : 4 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#000' } }}
          >
            {areaTypes.map((area, index) => (
              <Tab
                key={index}
                label={area.translation?.title}
                sx={{ textTransform: 'capitalize' }}
                {...a11yProps(index)}
                className={cls.tabLIst}
                onClick={() => handleChangeType(area.id)}
              />
            ))}
          </Tabs>
          {areaTypes.map((area, index) => (
            <TabPanel value={value} index={index} key={index}>
              {areaList
                .filter((item) => item.area_type.id === areaTypeId)
                .map((item, idx) => (
                  <AreaInfoPanelRow
                    key={idx}
                    item={item}
                    matches={matches}
                    isDelete
                    handleDelete={setAreaDeleteId}
                  />
                ))}
              <ButtonAdd
                handleOpenAddRestaurant={handleOpenAddRestaurant}
                title={area.translation?.title}
                buttonTitle={area.translation?.title}
              />
            </TabPanel>
          ))}
        </Box>
      ) : (
        <Loading />
      )}

      {openAddRestaurant && (
        <AddRestaurantPopover
          open={openAddRestaurant}
          onClose={handleCloseAddRestaurant}
          anchorEl={anchorEl}
          areaTypeId={areaTypeId}
          residenceId={residenceId}
          areaTypes={areaTypes}
          refetch={fetchResidenceAreas}
          data={data}
        />
      )}
      <Dialog
        open={!!areaDeleteId}
        onClose={() => setAreaDeleteId(null)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DialogTitle sx={{ marginBottom: 4, border: 'none' }}>
          {common[locale].deleteText}
        </DialogTitle>
        <DialogActions>
          <Button
            variant='outlined'
            autoFocus
            onClick={() => setAreaDeleteId(null)}
          >
            {common[locale].cancel}
          </Button>
          <Button variant='contained' onClick={() => deleteArea(areaDeleteId)}>
            {!loadingBtn ? (
              common[locale].yes
            ) : (
              <CircularProgress size={18} color='inherit' />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
