import React, {useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box, Stack, Typography } from '@mui/material'

import { exerciseOptions, fetchData } from '../utils/fetchData'
import ExerciseCard from './ExerciseCard'
import MyActivity from '../pages/MyActivity'


const Exercises = ({ exercises, setExercises, bodyPart}) => {
  console.log(exercises, 'exercises')
  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage = 9;

  // //lets show the first 9 exercises per page

  const indexOfLastExercise = currentPage * exercisesPerPage;

  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage

  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo( { top: 1800, behavior: 'smooth'})

  }

  useEffect(() => {
   const fetchExercisesData = async () => { //to be executed in the cards whenever the body part changes
    let exercisesData = []
    if (exercisesData === 'all') {
      exercisesData = await fetchData
      ('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

    } else {
      exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
    }
    setExercises(exercisesData)
   }
   fetchExercisesData();
   
  }, [bodyPart])
  
  return (
    <Box id='exercises' //to enable scrrolling to it
    sx={{ mt: { lg: '110px'} }}
    mt= '50px'
    p='20px'
    >

      <Typography variant='h3' mb='46px'>
        Showing Results
      </Typography>

      <Stack 
      direction='row'
      sx={{ lg: '110px', xs: '50px' }}
      flexWrap='wrap'
      justifyContent='center'
      >

        {currentExercises.map( (exercise, index) => ( //instead of excercises.map
        //  <p>{exercise.name}</p> 

        <ExerciseCard key={index} exercise={exercise}/>
        
        )  )}


        {/* { currentExercises.map( (exercise, index) => ( */}
          {/* // <p>{exercise.name}</p> */}
          {/* // now replace the paragraphs with the exercise cards     exercise={exercise}*/}
          {/* <ExerciseCard key={index} /> */}

        {/* // ))} */}
      </Stack>

      <Stack mt='100px' alignItems='center'>
        {exercises.length > 9 && (
          <Pagination 
          color='standard'
          shape='rounded'
          defaultPage={1}
          count={Math.ceil(exercises.length / exercisesPerPage )}  //exercisesPerPage
          page={currentPage}
          onChange={paginate}
          size='large'
          />
        )}

      </Stack>
      

      <Stack>
        <MyActivity />

      </Stack>
    </Box>
  )
}

export default Exercises