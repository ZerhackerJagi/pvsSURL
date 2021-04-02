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
  const [randomOptions, setRandomOptions] = useState([]);

  const [URLInput, setURLInput] = useState('');
  const [myURL, setURL] = useState('');


  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState("");

  const language = props.language
  const [createdUrl, setCreatedUrl] = useState(`${props.domain}`);
  const [answer, setAnswer] = useState(<Text size='medium' color='brand'>Your URL was created</Text>);



  useEffect(() => {
    document.title = "pvsURL";
    if(props.language){
      setAnswer(<Text size='medium' color='brand'>Deine kurze URL <Anchor href={createdUrl} label={createdUrl} color='brand'/> wurde erstellt</Text>) 
      setRandomOptions([
        { label: 'Standard', value: 1 },
        { label: 'Großbuchstaben', value: 2 },
        { label: 'Kleinbuchstaben', value: 3 },
        { label: 'Zahlen', value: 4 },
      ])
    }else {
      setAnswer(<Text size='medium' color='brand'>Your URL <Anchor href={createdUrl} label={createdUrl} color='brand'/> was created</Text>)
      setRandomOptions([
        { label: 'Default', value: 1 },
        { label: 'Uppercase', value: 2 },
        { label: 'Lowercase', value: 3 },
        { label: 'Numbers', value: 4 },
      ])
    }

  },[language])

  useEffect(() => {
    createShortUrl();
  }, [myURL]);

  const createShortUrl = async () => {
    var base = `/api/create?url=${myURL}`;
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
        if(language){
          setAnswer(<Text size='medium' color='brand'>Deine kurze URL <Anchor href={dataUrl.url} label={dataUrl.url} color='brand'/> wurde erstellt</Text>) 
        }else {
          setAnswer(<Text size='medium' color='brand'>Your URL <Anchor href={dataUrl.url} label={dataUrl.url} color='brand'/> was created</Text>)
        }
      }
    } catch(error){
      setMessage("Error connecting to Backend")
      setAnswer(message)
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
      icon={<Configure color='dark-1'/>}
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
      placeholder={language ? 'Füge deinen Link ein...' : 'Enter your URL...'}
      onChange={updateURL}
      /> 
    </Box>

      <Form onSubmit={getURL}>
        <Button
          color='brand'
          label={language ? 'Verkürzen':'Shorten'}
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
              answer
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
            label={language ? 'Individueller Tag' : 'Custom tag'}
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
                placeholder={language ? 'Gib deinen individuellen Tag ein...' : 'Enter custom tag...'}
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
            label={language ? 'Limit an Aufrufen setzen':'Set max. references'}
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
                placeholder={language ? 'Gib die Anzahl der maximalen Aufrufe ein...' : 'Enter max. References...'}
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
            label={language ? 'Privat setzen' : 'Is private'}
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
            label={language ? 'Speziellen Zufallsgenerator' : 'Special randomizer'}
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
                placeholder={language ? 'Auswählen Zufallsgenerator...' : 'Select randomizer...'}
                options={randomOptions}
                labelKey="label"
                valueKey="value"
                onChange={({ option }) => setRandomizer(option)}
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