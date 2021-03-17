import React, { useEffect, useState } from 'react';
import { 
  Anchor,
  Box, 
  Button,
  CheckBox, 
  Collapsible,
  Heading, 
  Select,
  Text,
  TextInput,
  Form
} from 'grommet';
import { 
  Code, 
  Configure,
  Edit,
  Secure,
  Tag 
} from 'grommet-icons';


const MainContent = (props) => {

  const [showSettings, setShowSettings] = useState(false);
  const [showCustomURL, setShowCustomURL] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showMaxReferences, setShowMaxReferences] = useState(false);
  const [showRandomizer, setShowRandomizer] = useState(false);
  const [CustomURL, setCustomURL] = useState('');
  const [MaxReferences, setMaxReferences] = useState(-1);
  const [Randomizer, setRandomizer] = useState(1);

  const [URLInput, setURLInput] = useState('');
  const [myURL, setURL] = useState('');


  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState("");

  const [createdUrl, setCreatedUrl] = useState(`${props.domain}`);

  const randomOptions = [
    { label: 'Default', value: 1 },
    { label: 'Uppercase', value: 2 },
    { label: 'Lowercase', value: 3 },
    { label: 'Numbers', value: 4 },
  ];

  useEffect(() => {
    createShortUrl();
  }, [myURL]);

  const createShortUrl = async () => {
    var base = `${props.domain}/api/create?url=${myURL}`;
    if(showCustomURL){
      base= base + `&custom=${CustomURL}`;
    }
    if(isPrivate){
      base= base + "&private=1";
    }
    if(showMaxReferences){
      base=base + `&refs_available=${MaxReferences}`;
    }
    if(showRandomizer){
      base=base + `&random_method=${Randomizer.value}`;
    }else{
      base=base + `&random_method=1`;
    }
    if(myURL.length>4){
    try{
      const response = await fetch(base, {method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
      const dataUrl = await response.json();
      setMessage(dataUrl.message);
      if(dataUrl.hasOwnProperty('url')){
        setCreatedUrl(dataUrl.url);
      }
    } catch(error){
      setMessage("Error connecting to Backend")
    }
    
    }
    console.log(Randomizer);
  };

  

  const updateURL = e => {
    setURLInput(e.target.value);
  };
  const updateMaxRef = e => {
    setMaxReferences(e.target.value);
  };
  const updateCustomURL = e => {
    setCustomURL(e.target.value);
  };
  
  const getURL = e => {
    e.preventDefault();
    setURL(URLInput);
    setShowResult(true);
  };

  return(
  <Box
  flex
  align='center'
  justify='center'
  gap='medium'
  >
    
    <Heading level='1'>PerVerSo Shorter URLs</Heading>
    <Box direction='row' gap='small'>

    <Button 
      icon={<Configure color='lightgrey'/>}
      color='brand'
      size='small'
      onClick={() => {setShowSettings(!showSettings);
      setShowCustomURL(false);
      setIsPrivate(false);
      setShowMaxReferences(false);
      setShowRandomizer(false);
      }}
    />
    
    <Box
      width="large"
      direction="row"
      align="center"
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      round="small"
      border={{
        side: 'all',
        color: 'brand',
      }}
    >
      <Code color='brand'/>
      <TextInput 
      plain
      placeholder='Enter your URL...'
      onChange={updateURL}
      /> 
    </Box>

      <Form onSubmit={getURL}>
        <Button
          label='Shorten'
          color='brand'
          type='submit'
          fill='true'
        />
      </Form>
      
    </Box>

    <Collapsible direction='vertical' open={showResult}>
      <Box
      width='large'
      >
        
        {(() => {
          if (createdUrl.length>0) {
            return (
              <Text size='medium' color='brand'>Your URL <Anchor href={createdUrl} label={createdUrl} color='brand'/> was created</Text>
            )
          } else {
            return (
              <Text size='medium' color='test'>{message}</Text>
            )
          } 
          })()}
        
      </Box>
    </Collapsible>

    <Collapsible direction='vertical' open={showSettings}>
      <Box
      flex
      direction='column'
      align='center'
      justify='center'
      gap='medium'
      >
        <Box
          width="large"
          direction="row"
          align="center"
          gap='medium'
        >
          <CheckBox
            toggle
            label='Custom tag'
            onClick={() => setShowCustomURL(!showCustomURL)}
          />
          <Collapsible direction='horizontal' open={showCustomURL}>
            <Box width='large' direction='row' justify='end'>
              <Box
                width="medium"
                direction="row"
                align="center"
                justify='end'
                pad={{ horizontal: 'small', vertical: 'xsmall' }}
                round="small"
                border={{
                  side: 'all',
                  color: 'brand',
                }}
              >
                <Tag color='brand'/>
                <TextInput 
                plain
                placeholder='Enter custom tag...'
                onChange={updateCustomURL}
                /> 
              </Box>
            </Box>
          </Collapsible>
        </Box>
        <Box
          width="large"
          direction="row"
          align="center"
          gap='medium'
        >
          <CheckBox
            toggle
            label='Set max. references'
            onClick={() => setShowMaxReferences(!showMaxReferences)}
          />
          <Collapsible direction='horizontal' open={showMaxReferences}>
            <Box width='large' direction='row' justify='end'>
              <Box
                width="medium"
                direction="row"
                align="center"
                justify='end'
                pad={{ horizontal: 'small', vertical: 'xsmall' }}
                round="small"
                border={{
                  side: 'all',
                  color: 'brand',
                }}
              >
                <Edit color='brand'/>
                <TextInput 
                plain
                placeholder='Enter max. References...'
                onChange={updateMaxRef}
                /> 
              </Box>
            </Box>
          </Collapsible>
        </Box>
        <Box
          width="large"
          direction="row"
          align="start"
          gap='small'
        >
          <CheckBox
            toggle
            label='Is private'
            onClick={() => setIsPrivate(!isPrivate)}
          />
          <Collapsible direction='horizontal' open={isPrivate}>
            <Secure color='brand'/>
          </Collapsible>
        </Box>
        <Box
          width="large"
          direction="row"
          align="center"
          gap='medium'
        >
          <CheckBox
            toggle
            label='Special randomizer'
            onClick={() => setShowRandomizer(!showRandomizer)}
          />
          <Collapsible direction='horizontal' open={showRandomizer}>
            <Box width='large' direction='row' justify='end'>
              <Box
                width="medium"
                direction="row"
                align="center"
                justify='start'
                pad={{ horizontal: 'small', vertical: 'xsmall' }}
                round="small"
                border={{
                  side: 'all',
                  color: 'brand',
                }}
              >
                <Tag color='brand'/>
                <Select 
                placeholder='Select randomizer...'
                options={randomOptions}
                labelKey="label"
                valueKey="value"
                onChange={({ option }) => setRandomizer(option)}
                size='small'
                dropHeight='small'
                plain
                />
              </Box>
            </Box>
          </Collapsible>
        </Box>
      
      </Box>
    </Collapsible>

  </Box>
  );
}

export default MainContent;