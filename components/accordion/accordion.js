import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  borderBottom: `1px solid transparent`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&:first-of-type': {
    '& .MuiAccordionSummary-root': {
      borderTop: 'none',
    },
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: '1.2rem', fill: '#000' }} />
    }
    {...props}
  />
))(() => ({
  backgroundColor: 'transparent',
  flexDirection: 'row',
  padding: 0,
  borderTop: `1px solid #D2D2D7`,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    border: 'none',
  },
  '& .MuiAccordionSummary-content': {
    margin: '25px 0',
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0 0 70px 0',
  borderTop: '1px solid transparent',
  '@media(max-width: 576px)': {
    padding: '0 0 40px 0',
  },
}))

export default function CustomizedAccordions({ title, children }) {
  const [expanded, setExpanded] = useState(false)

  const handleChange = () => setExpanded(!expanded)

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary>
        <Typography variant='h1'>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
