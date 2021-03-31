import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Text,
  Heading
} from 'grommet';
import { Link } from 'react-router-dom'

const SafeLoad = () => {

  const [pointer, setPointer] = useState('')

  useEffect(() => {
    document.title = "pvsURL - Safe Opener";

    const pathname = window.location.pathname
    setPointer(`https://${pathname.substr(1,pathname.length-9)}`)
  }, []);



  return (
    
    <Box
    flex
    align='center'
    justify='center'
    gap='medium'>
      <Heading>Are you sure?</Heading>
      <Text>The short url points to {pointer}. Do you want to continue?</Text>
      
      <Box
        border="small"
        onClick={()=> window.location.replace(pointer)}
        >
          <Box 
          width='small' 
          border={{
            side: 'all',
            color: 'brand',
          }}
          round="small"
          align='center'
          background='brand'
          color='text'
        >
          Yes
          </Box>
        </Box>

      
      <Link to="/">
        <Box
        border="small"
        >
          <Box 
          width='small' 
          border={{
            side: 'all',
            color: 'brand',
          }}
          round="small"
          align='center'
          background='brand'
          color='text'
        >
          No
          </Box>
        </Box>
      </Link>

    </Box>
  );
}


export default SafeLoad;
