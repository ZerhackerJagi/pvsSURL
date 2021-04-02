import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Heading,
  Text
} from 'grommet';


import { Link } from 'react-router-dom'




const Outdated = (props) => {

  const [pointer, setPointer] = useState("")
  const language = props.language

  useEffect(() => {
    document.title = "pvsURL - Link outdated";
    setPointer(window.location.pathname.substr(1,(window.location.pathname.length-10)))
  }, []);


  return (
    
    <Box
    flex
    align='center'
    justify='center'
    gap='medium'>
      <Heading>{language ? "Kurze URL abgelaufen" : "Short URL Outdated"}</Heading>
      <Text>{language ? `Das angefragte Kürzel (${pointer}) wurde nur für eine bestimmte Anzahl an Aufrufen generiert. Bitte versuche ein anderes Kürzel.`:`The requested Tag (${pointer}) was only generated for a limited number of requests. Please try another one.`}</Text>
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
          {language ? "Nochmal versuchen" : "Try Again"}
          </Box>
        </Box>
      </Link>

    </Box>
  );
}


export default Outdated;
