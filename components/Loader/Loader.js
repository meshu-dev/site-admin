import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '600px', alignItems: 'center' }}>
      <CircularProgress size={ 100 } />
    </Box>
  );
}

export default Loader;
