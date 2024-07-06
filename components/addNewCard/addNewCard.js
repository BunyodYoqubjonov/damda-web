import React from 'react'
import { Button, Dialog, DialogTitle, Grid } from '@mui/material'
import styled from '@emotion/styled'
import cls from './addNewCard.module.scss'
import InputSimple from '../inputSimple/inputSimple'

const CenteredDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiDialog-paper': {
    padding: 50,
    width: 500,
    maxWidth: 890,
  },
})

export default function AddNewCard({ open, handleClose }) {
  return (
    <CenteredDialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          paddingBottom: 5,
          borderBottom: 'none',
          fontSize: 50,
          fontWeight: 400,
        }}
      >
        Add new card
      </DialogTitle>
      <div className={cls.formWrapper}>
        <Grid container columnSpacing={1.5}>
          <Grid item xs={12}>
            <InputSimple
              label='Card name'
              placeholder='Cardholder'
              name='card_holder'
              id='card_holder'
            />
          </Grid>
          <Grid item xs={12}>
            <InputSimple
              label='Card number'
              placeholder='0000 0000 0000 0000'
              name='card_number'
              id='card_number'
            />
          </Grid>
          <Grid item xs={6}>
            <InputSimple
              label='Expiration'
              placeholder='00/00'
              name='expiration'
              id='expiration'
            />
          </Grid>
          <Grid item xs={6}>
            <InputSimple label='CVC' placeholder='000' name='cvc' id='cvc' />
          </Grid>
        </Grid>
        <div className={cls.actions}>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'common.green',
              '&:hover': {
                backgroundColor: 'common.green',
              },
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </CenteredDialog>
  )
}
