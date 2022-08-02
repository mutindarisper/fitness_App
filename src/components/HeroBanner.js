import React from 'react'
import { Box,Typography , Button} from '@mui/material'

import HeroBannerImage from '../assets/images/banner.png'
// import { padding } from '@mui/system'
const HeroBanner = () => {
  return (
    <Box sx={{
        mt: {lg: '212px', xs: '70px'},
        ml: {sm: '50px' }
    }}
    position="relative" p="20px">
         <Typography 
         color="
         #00688f"
         fontWeight="700"
         fontSize="36px"

         >
            Fitness Baddie
         </Typography>

         <Typography
          fontWeight="700"
          sx={{ fontSize: {lg: '36px', xs: '30px'}}}
          mb='23px' mt='30px'>
            Sweat, Smile <br/> and Repeat

         </Typography>

         <Typography fontSize='22px'
         lineHeight='35px' mb={4}>
           Check out the most effective workouts

         </Typography>

         <Button 
         variant='contained'
        //  color='success'
         href='#exercises'
         sx={{backgroundColor: "#00688f", padding: '10px'

         }}
         >Explore Exercises</Button>

         <Typography  
          fontWeight="700"
          color="
#2f7f9d"
          sx={{
            opacity:0.2,
            display: {lg: 'block', xs:'none'}
          }}
          fontSize="200px"
          >
            Exercise
         </Typography>

         <img src={HeroBannerImage} alt='banner' className="hero-banner-img"/>
         </Box>
  )
}

export default HeroBanner