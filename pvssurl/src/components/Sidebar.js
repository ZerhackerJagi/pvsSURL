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

    <Card onClick={()=>props.setShowStatistics(!props.showStatistics)}>
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

    <Collapsible open={props.showStatistics}>
      <Layer>
        <Box>
            <Button
            icon={<FormClose color='lightgrey'/>}
            onClick={()=>props.setShowStatistics(false)}
            />
          </Box>
          <Box pad='full' justify='center' gap='medium' margin='medium'>
            {props.statistics.map(entry => (
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
</Collapsible>)
}

export default Sidebar;