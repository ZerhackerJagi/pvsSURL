import React, { useEffect, useState } from 'react';
import { 
  Anchor,
  Box, 
  Button,
  Card,
  CardBody,
  CheckBox, 
  Clock,
  Collapsible,
  Image,
  Layer,
  Markdown,
  Footer,
  Heading, 
  Grommet,
  Select,
  Text,
  TextInput,
  Form
} from 'grommet';
import { 
  BarChart,
  Cart,
  Code, 
  Configure,
  Edit,
  FormClose,
  Info,
  Menu,
  Secure,
  Tag 
} from 'grommet-icons';

const theme = {
  global: {
    drop:{
      background: '#444444',
      shadowSize: 'medium',
    },
    elevation: {
      dark: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
      light: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
    },
    colors: {
      brand: '#6496FA',
      test: 'red',
      text: {
        dark: 'lightgrey',
      },
    },
    font: {
      family: 'Arial',
      size: '20px',
      height: '20px'
    },
    input: {
      weight: 400,
    },
  },
  checkBox:{
    hover:{
      border:{
        color:{dark:'brand'},
      },
    },
    color:{
      dark: 'brand',
    },
    border:{
      color:{dark:'brand'},
    },
    toggle:{
      color:{
        light: 'brand',
      },
    },
  },
  card: {
    container: {
      background: {dark:'#FFFFFF12'},
      elevation: 'none',
    },
    footer: {
      background: '#FFFFFF06',
    },
  },
  button: {
    border:{
      radius: '12px',
    },
    default: {
      background:{
        color: {dark:'brand'},
      },
      color:{dark:'lightgrey', light: 'lightgrey'},
    },
    
  },
};

const AppBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
  />
);



const App = () => {
  const domain = 'http://localhost:5000'
  const [showSettings, setShowSettings] = useState(false);
  const [showCustomURL, setShowCustomURL] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showMaxReferences, setShowMaxReferences] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showWissen, setShowWissen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showRandomizer, setShowRandomizer] = useState(false);
  const [CustomURL, setCustomURL] = useState('');
  const [MaxReferences, setMaxReferences] = useState(-1);
  const [Randomizer, setRandomizer] = useState(1);
  const [URLInput, setURLInput] = useState('');
  const [myURL, setURL] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [createdUrl, setCreatedUrl] = useState(`${domain}`);


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
    var base = `${domain}/api/create?url=${myURL}`;
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

  useEffect(() => {
    getStatistics();
  }, [showStatistics])

  const getStatistics = async ()=> {
    const response = await fetch(`${domain}/api/statistics`)
    const dataStat = await response.json();
    setStatistics(dataStat);
  }

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


  return (
    <Grommet theme={theme} full>  
          <Box background='dark-1' fill>
            <AppBar>
              <Button 
                icon={<Menu color='lightgrey'/>}
                onClick={() => setShowSidebar(!showSidebar)}
              />
              <Button 
                label='Help'
                onClick={() => setShowHelp(!showHelp)}
              />

            </AppBar>
            
            <Box flex direction='row' overflow={{ horizontal: 'hidden' }} gap='medium'>
              <Collapsible direction='horizontal' open={showSidebar}>
                <Box
                flex
                width='medium'
                background='dark'
                elevation='small'
                align='center'
                justify='start'
                gap='medium'
                >
                  <Heading level='2'>Wissenswertes</Heading>
                  <Card onClick={()=>setShowWissen(!showWissen)}>
                    <CardBody>
                      <Box flex direction='row' width='medium'>
                        <Box justify='center' align='center' pad='medium'>
                          <Info color='brand' size='large'/>
                        </Box>
                        <Box justify='center' align="start" direction="column" pad="large" >
                          <Text size='medium' weight="bold">
                            PerVerSo Historie
                          </Text>
                          <Text size='medium'>Wie alles begann</Text>
                        </Box>
                      </Box>

                    </CardBody>
                  </Card>


                  <Card onClick={()=>setShowProducts(!showProducts)}>
                    <CardBody>
                    <Box flex direction='row' width='medium'>
                        <Box justify='center' align='center' pad='medium'>
                          <Cart color='brand' size='large'/>
                        </Box>
                        <Box justify='center' align="start" direction="column" pad="large" >
                          <Text size='medium' weight="bold">
                            PerVerSo Produkte
                          </Text>
                          <Text size='medium'>Produktportfolio</Text>
                        </Box>
                      </Box>
                    </CardBody>
                  </Card>

                  <Card onClick={()=>setShowStatistics(!showStatistics)}>
                    <CardBody>
                      <Box flex direction='row' width='medium'>
                        <Box justify='center' align='center' pad='medium'>
                          <BarChart color='brand' size='large'/>
                        </Box>
                        <Box justify='center' align="start" direction="column" pad="large" >
                          <Text size='medium' weight="bold">
                            Statistiken
                          </Text>
                          <Text size='medium'>Lass dir die TOP 10 der verkürzten Links anzeigen.</Text>
                        </Box>
                      </Box>

                    </CardBody>
                  </Card>
                  
                  <Collapsible open={showWissen}>
                    <Layer>
                      <Box>
                          <Button
                          icon={<FormClose color='lightgrey'/>}
                          onClick={()=>setShowWissen(false)}
                          />
                        </Box>
                        <Box pad='full' justify='center' gap='medium' margin='medium'>
                          <Heading level='2'>Entstehung</Heading>
                          <Text size='medium'>
                            PerVerSo war ursprünglich ein studentisches Softwareprojekt für eine Personalverwaltungssoftware. Im Laufe der Zeit kamen weitere Projekte hinzu, sodass sich PerVerSo nach und nach zu einer Marke etabliert hat.
                            Für die Entwicklergruppe steht dabei stets der Nutzende im Vordergrund, wobei ein gewisser Humor nicht verloren gegangen ist.
                          </Text>
                        </Box>

                    </Layer>
                  </Collapsible>

                  <Collapsible open={showStatistics}>
                    <Layer>
                      <Box>
                          <Button
                          icon={<FormClose color='lightgrey'/>}
                          onClick={()=>setShowStatistics(false)}
                          />
                        </Box>
                        <Box pad='full' justify='center' gap='medium' margin='medium'>
                          {statistics.map(entry => (
                            <Card>
                              <CardBody>
                                <Box gap="small" align="center" direction="row" pad="large" width='large'>
                                  <Box>
                                    <Text size='large' weight="bold" color='test'>
                                      {entry.short} </Text><Text size='large' weight='bold'>mit {entry.frequency} Aufrufen</Text>
                                    <Text size='medium'>Dieser Tag referenziert auf {entry.reference}</Text>
                                  </Box>
                                </Box>
                              </CardBody>
                            </Card>
                          ))}
                        </Box>

                    </Layer>
                  </Collapsible>


                  <Collapsible open={showProducts}>
                    <Layer>  
                      <Box>
                        <Button
                        icon={<FormClose color='lightgrey'/>}
                        onClick={()=>setShowProducts(false)}
                        />
                      </Box>
                      <Box pad='full' align='center' justify='center' gap='medium' margin='medium'>
                        <Heading level='2'>Produkte von PerVerSo</Heading>
                      <Card>
                        <CardBody>
                        <Box gap="small" align="center" direction="row" pad="large" width='large'>
                          <Box>
                            <Text size='large' weight="bold">
                              PerVerSo
                            </Text>
                            <Text size='medium'>Personalverwaltungssoftware, basierend auf Java</Text>
                          </Box>
                        </Box>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                        <Box gap="small" align="center" direction="row" pad="large" width='large'>
                          <Box>
                            <Text size='large' weight="bold">
                              PerVerSo MSO
                            </Text>
                            <Text size='medium'>Personalverwaltungssoftware, implementiert in Microsoft Excel</Text>
                          </Box>
                        </Box>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                        <Box gap="small" align="center" direction="row" pad="large" width='large'>
                          <Box>
                            <Text size='large' weight="bold">
                              PerVerSo MSO AEP
                            </Text>
                            <Text size='medium'>Personalverwaltungssoftware, in Microsoft Excel zur Einsatzplanung von Auszubildenden</Text>
                          </Box>
                        </Box>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                        <Box gap="small" align="center" direction="row" pad="large" width='large'>
                          <Box>
                            <Text size='large' weight="bold">
                              Weatherplans
                            </Text>
                            <Text size='medium'>Wettervorhersage zum Testen von APIs</Text>
                          </Box>
                        </Box>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                        <Box gap="small" align="center" direction="row" pad="large" width='large'> 
                          <Box>
                            <Text size='large' weight="bold">
                              OLE (Kooperation)
                            </Text>
                            <Text size='medium'>Der Online LaTeX Editor mit kollaborativen Möglichkeiten zum Selfhosting</Text>
                          </Box>
                        </Box>
                        </CardBody>
                      </Card>
                      </Box>
                    </Layer> 
                  </Collapsible>
                  

                </Box>
              </Collapsible>

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
            </Box>

            <Collapsible direction='horizontal' open={showHelp}>
              <Layer>
                <Box>
                  <Button
                  icon={<FormClose color='lightgrey'/>}
                  onClick={()=>setShowHelp(false)}
                  />
                </Box>
                <Box margin='medium'>
                  <Heading level='2'>Anleitung</Heading>
                  <Text>Geben Sie die gewünschte <b>URL</b> in das Eingabefeld ein und drücken Sie anschließend auf <b>shorten</b>. Es wird eine zufällige kurze URL mit der Domain perver.so erzeugt.
                  Möchten Sie einen eigenen Namen wählen oder die Konditionen verändern, drücken Sie bitte auf das <b>Werkzeug-Symbol</b> links vom Eingabefeld. Es öffnen sich nun weitere Optionen:<br />
                  <br /><b>Custom Tag:</b> Wenn Sie den Schalter nach rechts schieben (anklicken), können Sie im neuen Eingabefeld einen eigenen URL Tag angeben. (https://perver.so/[ihr persönlicher tag])
                  <br/><br/><b>Max References:</b> Wenn diese Option gewählt ist, können Sie die Nutzungszahl für den erstellenden Link angeben. Nachdem das Limit erreicht wurde, wird Ihre URL überschrieben, das Tag bleibt jedoch bestehen.
                  <br/><br/><b>Private:</b> Wenn diese Option gewählt ist, wird die gekürzte URL nicht in der Statistik erfasst. Wenn neben der Option ein Schloss erscheint, ist der Link privat.
                  <br/><br/><b>Special Randomizer:</b> Wenn diese Option gewählt ist, können Optionen für die zufällige Tag Vergabe gewählt werden:
                  <br/>- Default (Großbuchstaben, Kleinbuchstaben, Zahlen) [1]
                  <br/>- nur Großbuchstaben [2]
                  <br/>- nur Kleinbuchstaben [3]
                  <br/>- nur Zahlen [4]
                  <br/><br/><b>API:</b> Wollen Sie die API nutzen, so können Sie einen GET Request an https://perver.so/api/create stellen.
                  <br/><b>Parameter:</b>
                  <br/>-url [required] string
                  <br/>-custom [optional] string 
                  <br/>-private [optional] 0 oder 1
                  <br/>-refs_available [optional] int (default= -1)
                  <br/>-random_method [optional] int (default= 1)
                  <br/><br/><b>Sample Request:</b>
                  <br/>GET https://perver.so/api/create?url=https://perver.so&custom=foo</Text>
                </Box>
              </Layer>
            </Collapsible>


          </Box>
          <Footer background="brand" justify="center" pad="medium">
            <Clock type='digital' color={{dark:'lightgrey'}}/>
            <Text textAlign="center" size="medium" color='lightgrey'>
              © 2021 Copyright PerVerSo
            </Text>
            <Box
            direction='row'
            justify='end'
            >
              <Image src='../../PerVerSo32x32.png'/>
            </Box>
          </Footer>
    </Grommet>
  );
}


export default App;
