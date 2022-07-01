import React, {useEffect, useState} from 'react'
import { Box, Button, Stack, TextField, Typography} from '@mui/material'
import {exerciseOptions, fetchData } from '../assets/utils/fetchData'

const SearchExercises = () => {
  const [search, setsearch] = useState('')

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      console.log(exercisesData, 'exercisesData')
    }

  }


  return (
    <Stack alignItems='center' 
    mt='37px'
    justifyContent='center'
    p="20px"
    >

      <Typography fontWeight={700}
      sx={{ 
        fontSize: {lg: '44px', xs: '30px' }
      }}
      mb='50px' textAlign='center'>
        Awesome Exercises you <br /> Should Know
      </Typography>

      <Box position='relative' mb='72px'>
        <TextField 
        sx={{
          input: {
            fontWeight:'700',
          border: 'none',
        borderRadius: '4px'},
        width: {lg: '800px', xs: '350px'},
        backgroundColor: '#fff',
        borderRadius: '40px'
        }}
        height='76px'
        value={search}
        onChange={ (e) => setsearch(e.target.value.toLowerCase() ) }
        placeholder='Search Exercises'
        type='text'
        
        />

        <Button className="search-btn"
        sx={{
          bgcolor: '#ff2625',
          color: '#fff',
          textTransform: 'none',
          width: {lg: '175px', xs: '80px'},
          fontSize: {lg: '20px', xs: '14px'},
          height: '56px',
          position: 'absolute',
          right: '0'
        }}
        onClick={handleSearch}>
          Search
        </Button>

       

      </Box>
      
    </Stack>
  )
}

export default SearchExercises