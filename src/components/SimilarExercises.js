import React from 'react'
import { Typography, Stack, Box } from '@mui/material'
import HorizontalScrollBar from './HorizontalScrollbar'
import Loader from './Loader'

const SimilarExercises = ( {targetMuscleExercises, equipmentExercises} //receive props
    ) => {
  return (
    <Box sx={{ mt: {lg: '100px', xs: '0'}}}>
        <Typography variant='h3' mb={5}>Exercises that target the same muscle group</Typography>
        <Stack direction='row' sx={{ p: '2', position: 'relative'}}>

            {/* render the target muscle exercises if they exist in a scrollview */}
            {targetMuscleExercises.length  ?
            <HorizontalScrollBar data={targetMuscleExercises} />
        // if it doesn't exist
        : <Loader />
        }

        </Stack>


        {/* exercises that use similar equipment */}

        <Typography variant='h3' mb={5}>Exercises that use the same equipment</Typography>
        <Stack direction='row' sx={{ p: '2', position: 'relative'}}>

            {/* render the target muscle exercises if they exist in a scrollview */}
            {equipmentExercises.length  !== 0 ?
            <HorizontalScrollBar data={equipmentExercises} />
        // if it doesn't exist
        : <Loader />
        }

        </Stack>

    </Box>
  )
}

export default SimilarExercises