import { EditOutlined } from '@mui/icons-material'
import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { common } from 'locales/common'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import cls from './hotelCreateRooms.module.scss'

const HotelCreateRooms = ({ data }) => {
  const { locale } = useRouter()
  console.log(data)
  return (
    <div className={cls.container}>
      <Stack alignItems='center' justifyContent='space-between' direction='row'>
        <Typography variant='h6'>{common[locale].rooms}</Typography>
        <Link href={`/account/hotels/${data?.id}/edit/rooms`} passHref>
          <Button variant='contained'>{common[locale].Add_new}</Button>
        </Link>
      </Stack>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>{common[locale].title}</TableCell>
            <TableCell align='center'>{common[locale].quantity}</TableCell>
            <TableCell align='center'>{common[locale].area}</TableCell>
            <TableCell align='center'>{common[locale].bedsCount}</TableCell>
            <TableCell align='center'>{common[locale].children}</TableCell>
            <TableCell align='center'>{common[locale].adult}</TableCell>
            <TableCell align='center'>{common[locale].options}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.rooms?.length !== 0 ? (
            data?.rooms?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.room?.translation?.title}
                </TableCell>
                <TableCell align='center'>{row.quantity}</TableCell>
                <TableCell align='center'>
                  {row.area} m<sup>2</sup>
                </TableCell>
                <TableCell align='center'>{row.bed}</TableCell>
                <TableCell align='center'>{row.children}</TableCell>
                <TableCell align='center'>{row.adult}</TableCell>
                <TableCell align='center'>
                  <Link
                    href={`/account/hotels/${data.id}/edit/rooms/edit/${row.id}`}
                    passHref
                  >
                    <IconButton variant='outlined'>
                      <EditOutlined />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align='center' colSpan={7}>
                <Typography variant='subtitle1'>
                  {common[locale].no_rooms}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default HotelCreateRooms
