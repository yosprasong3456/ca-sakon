import React from 'react'
import Header from '../layouts/Header'
import { Button, Typography } from '@mui/material'

type Props = {}

function Home({}: Props) {
  return (
    <div>
      <Header/>
      <Typography variant='h4' mt={2}>ผู้ป่วยรายใหม่ </Typography>
      <Button variant="contained" sx={{fontSize:30,borderRadius:3}}>ส่งข้อมูล</Button>
    </div>
  )
}

export default Home