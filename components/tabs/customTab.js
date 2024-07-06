import styled from '@emotion/styled'
import { Tab } from '@mui/material'

export const CustomTab = styled(Tab)({
  padding: '12px 20px',
  textTransform: 'none',
  fontSize: 16,
  lineHeight: '18px',
  fontFamily: '"TT Commons", sans-serif',
  fontWeight: 400,
  '&.Mui-selected': {
    border: '1px solid #D2D2D7',
    borderRadius: '12px 12px 0 0',
    borderBottom: 0,
    backgroundColor: '#FFF',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      bgcolor: '#FFF',
    },
  },
})
