import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Image
} from 'grommet';


import { Link } from 'react-router-dom'




const NotFound = () => {
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    document.title = "pvsURL - 404";
  }, []);


  return (
    
    <Box
    flex
    align='center'
    justify='center'
    gap='medium'>
      <Image src="/images/404"/>
      <Link to="/">
        <Box
        border="small"
        >
          <Box 
          width='medium' 
          border={{
            side: 'all',
            color: 'brand',
          }}
          round="small"
          align='center'
          background='brand'
          color='text'
        >
          Try Again
          </Box>
        </Box>
      </Link>

    </Box>
  )
}


export default NotFound;
