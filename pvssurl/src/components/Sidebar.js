import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button,
  Card,
  CardBody,
  Collapsible,
  Layer,
  Heading, 
  Text
} from 'grommet';
import { 
  BarChart,
  Cart,
  FormClose,
  Info
} from 'grommet-icons';



const Sidebar = (props) => {
  const [showWissen, setShowWissen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const language = props.language

  useEffect(() => {
    getStatistics();
  }, [props.showStatistics])

  const getStatistics = async ()=> {
    const response = await fetch(`/api/statistics`)
    const dataStat = await response.json();
    props.setStatistics(dataStat);
  }
  
  return(<Collapsible direction='horizontal' open={props.showSidebar}>
  <Box
  flex
  width='medium'
  background='dark'
  elevation='small'
  align='center'
  justify='start'
  gap='medium'
  >
    <Heading level='2'>{language ? "Wissenswertes" : "Nice to know"}</Heading>
    <Card onClick={()=>setShowWissen(!showWissen)}>
      <CardBody>
        <Box flex direction='row' width='medium'>
          <Box justify='center' align='center' pad='medium'>
            <Info color='brand' size='large'/>
          </Box>
          <Box justify='center' align="start" direction="column" pad="large" >
            <Text size='medium' weight="bold">
              {language ? "PerVerSo Historie" : "PerVerSo History"}
            </Text>
            <Text size='medium'>{language ? "Wie alles begann" : "How it started"}</Text>
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
              {language ? "PerVerSo Produkte" : "PerVerSo Products"}
            </Text>
            <Text size='medium'>{language ? "Produktportfolio" : "Products"}</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>

    <Card onClick={()=>props.setShowStatistics(!props.showStatistics)}>
      <CardBody>
        <Box flex direction='row' width='medium'>
          <Box justify='center' align='center' pad='medium'>
            <BarChart color='brand' size='large'/>
          </Box>
          <Box justify='center' align="start" direction="column" pad="large" >
            <Text size='medium' weight="bold">
              {language ? "Statistiken" : "Statistics"}
            </Text>
            <Text size='medium'>{language ? "Lass dir die TOP 10 der verkürzten Links anzeigen." : "The TOP 10 shortened urls."}</Text>
          </Box>
        </Box>

      </CardBody>
    </Card>
    
    <Collapsible open={showWissen}>
      <Layer onClickOutside={() => props.setShowWissen(false)}>
        <Box>
            <Button
            icon={<FormClose color='lightgrey'/>}
            onClick={()=>setShowWissen(false)}
            />
          </Box>
          <Box pad='full' justify='center' gap='medium' margin='medium'>
            <Heading level='2'>{language ? "Entstehung" : "How it started"}</Heading>
            <Text size='medium'>
              {language ? `PerVerSo war ursprünglich ein studentisches Softwareprojekt für eine Personalverwaltungssoftware. Im Laufe der Zeit kamen weitere Projekte hinzu, sodass sich PerVerSo nach und nach zu einer Marke etabliert hat.
              Für die Entwicklergruppe steht dabei stets der Nutzende im Vordergrund, wobei ein gewisser Humor nicht verloren gegangen ist.` : `PerVerSo was a fun project during a study. It's the short version for the german version of employee management software
              Over time the fun project got a brand. Fun is one of the important things for the developer team.`}
            </Text>
          </Box>

      </Layer>
    </Collapsible>

    <Collapsible open={props.showStatistics}>
      <Layer onClickOutside={() => props.setShowStatistics(false)}>
        <Box fill direction='column' align='start'>
              <Button fill
              icon={<FormClose color='lightgrey'/>}
              onClick={()=>props.setShowStatistics(false)}
              />
          <Box direction='column' fill pad='large'>
            <Box direction='horizontal' fill justify='center' align='center'>
                <Heading level='2' margin="medium" >{language ? "Statistiken" : "Statistics"}</Heading>
            </Box>
            
            <Box fill gap='medium' margin='medium' overflow={{"vertical": "scroll"}} >
              {props.statistics.map(entry => (
                <Card flex='false'>
                  <CardBody>
                    <Box gap="small" align="center" direction="row" pad="large" width='large'>
                        <Box onClick={() => window.open(entry.reference)} >
                          <Text size='large' weight="bold" color='test'>
                            {entry.short} </Text><Text size='large' weight='bold'>{language ? `mit ${entry.frequency} Aufrufen` : `with ${entry.frequency} Clicks`}</Text>
                          <Text size='medium'>{language ? `Dieser Tag referenziert auf ${entry.reference}` : `This tag references to ${entry.reference}`}</Text>
                        </Box>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Layer>
    </Collapsible>


    <Collapsible open={showProducts}>
      <Layer onClickOutside={() => props.setShowProducts(false)}>
        <Box direction='column' fill align='start'>  
          <Box direction='row' fill>
            <Button
            icon={<FormClose color='lightgrey'/>}
            onClick={()=>setShowProducts(false)}
            fill
            />
          </Box>
          <Box align='start' justify='center' overflow={{"vertical": "scroll"}} pad='large'> 
            <Box direction='horizontal' fill justify='center' align='center'>
              <Heading level='2' margin="medium" >{language ? "Produkte von PerVerSo" : "PerVerSo Products"}</Heading>
            </Box>
            <Box fill gap='medium' margin='medium'>
              <Card flex='false'>
                <CardBody>
                <Box gap="small" align="center" direction="row" pad="large" width='large'>
                  <Box>
                    <Text size='large' weight="bold">
                      PerVerSo
                    </Text>
                    <Text size='medium'>{ language ? "Personalverwaltungssoftware, basierend auf Java" : "Employee management software, based on Java"}</Text>
                  </Box>
                </Box>
                </CardBody>
              </Card>
              <Card flex='false'>
                <CardBody>
                <Box gap="small" align="center" direction="row" pad="large" width='large'>
                  <Box>
                    <Text size='large' weight="bold">
                      PerVerSo MSO
                    </Text>
                    <Text size='medium'>{language ? "Personalverwaltungssoftware, implementiert in Microsoft Excel" : "Employee management software, based on Microsoft Excel" }</Text>
                  </Box>
                </Box>
                </CardBody>
              </Card>
              <Card flex='false'>
                <CardBody>
                <Box gap="small" align="center" direction="row" pad="large" width='large'>
                  <Box>
                    <Text size='large' weight="bold">
                      PerVerSo MSO AEP
                    </Text>
                    <Text size='medium'>{language ? "Personalverwaltungssoftware, in Microsoft Excel zur Einsatzplanung von Auszubildenden" : "Employee management software, based on Microsoft Excel and mainly used for planning of trainees"}</Text>
                  </Box>
                </Box>
                </CardBody>
              </Card>
              <Card flex='false'>
                <CardBody>
                <Box gap="small" align="center" direction="row" pad="large" width='large'>
                  <Box>
                    <Text size='large' weight="bold">
                      Weatherplans
                    </Text>
                    <Text size='medium'>{language ? "Wettervorhersage zum Testen von APIs" : "Testing APIs results in a weather forecast"}</Text>
                  </Box>
                </Box>
                </CardBody>
              </Card>
              <Card flex='false'>
                <CardBody>
                <Box gap="small" align="center" direction="row" pad="large" width='large'> 
                  <Box>
                    <Text size='large' weight="bold">
                      OLE (Kooperation)
                    </Text>
                    <Text size='medium'>{language ? "Der Online LaTeX Editor mit kollaborativen Möglichkeiten zum Selfhosting": "The online LaTeX editor with collaborative possibilities with the chance for selfhosting"}</Text>
                  </Box>
                </Box>
                </CardBody>
              </Card>
            </Box>
          </Box>
        </Box>
      </Layer> 
    </Collapsible>
    

  </Box>
</Collapsible>)
}

export default Sidebar;