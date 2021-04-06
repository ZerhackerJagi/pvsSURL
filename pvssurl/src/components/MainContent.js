import React, { useEffect, useState } from 'react';
import { 
  Anchor,
  Box, 
  Heading, 
  Text
} from 'grommet';
import MainContentDesktop from './MainContentDesktop'
import MainContentMobile from './MainContentMobile'


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

  const size=props.size;

  return(
  <Box
  flex
  align='center'
  justify='center'
  gap='medium'
  background={props.darkMode ? "dark" : "light"}
  >
    
    <Heading level='1'>PerVerSo Shorter URLs</Heading>
    <Box direction='row' gap='small'>

     {props.size!=="small" ? (
    <MainContentDesktop
      message={message}
      createdUrl={createdUrl}
      darkMode={props.darkMode}
      setRandomizer={setRandomizer}
      randomOptions={randomOptions}
      language={language}
      showRandomizer={showRandomizer}
      setShowRandomizer={setShowRandomizer}
      isPrivate={isPrivate}
      setIsPrivate={setIsPrivate}
      updateMaxRef={updateMaxRef}
      showMaxReferences={showMaxReferences}
      setShowMaxReferences={setShowMaxReferences}
      updateCustomURL={updateCustomURL}
      showCustomURL={showCustomURL}
      setShowCustomURL={setShowCustomURL}
      showSettings={showSettings}
      showResult={showResult}
      getURL={getURL}
      updateURL={updateURL}
      setShowSettings={setShowSettings}
      answer={answer}

      
    /> ):( 
      <MainContentMobile
        message={message}
        createdUrl={createdUrl}
        darkMode={props.darkMode}
        setRandomizer={setRandomizer}
        randomOptions={randomOptions}
        language={language}
        showRandomizer={showRandomizer}
        setShowRandomizer={setShowRandomizer}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        updateMaxRef={updateMaxRef}
        showMaxReferences={showMaxReferences}
        setShowMaxReferences={setShowMaxReferences}
        updateCustomURL={updateCustomURL}
        showCustomURL={showCustomURL}
        setShowCustomURL={setShowCustomURL}
        showSettings={showSettings}
        showResult={showResult}
        getURL={getURL}
        updateURL={updateURL}
        setShowSettings={setShowSettings}
        answer={answer}
      />
    )}

    </Box>

  </Box>
  );
}

export default MainContent;