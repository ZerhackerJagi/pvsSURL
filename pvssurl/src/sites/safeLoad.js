import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Text,
  Heading
} from 'grommet';
import { Link } from 'react-router-dom'

const SafeLoad = (props) => {

  const [pointer, setPointer] = useState('')
  const language = props.language

  useEffect(() => {
    document.title = "pvsURL - Safe Opener";
    const pathname = window.location.pathname + window.location.search
    console.log(pathname)
    setPointer(`${pathname.substr(10,pathname.length)}`)
  }, []);



  return (
    
    <Box
    flex
    align='center'
    justify='center'
    gap='medium'>
      <Heading>{language ? "Bist du sicher?" : "Are you sure?"}</Heading>
      <Text>{language ? `Die kurze URL referenziert auf ${pointer}. Möchtest du fortfahren?`:`The short url points to ${pointer}. Do you want to continue?`}</Text>
      
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
          {language ? "Ja" : "Yes"}
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
          {language ? "Nein" : "No"}
          </Box>
        </Box>
      </Link>

    </Box>
  );
}


export default SafeLoad;
