import React from 'react';
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
  FormClose
} from 'grommet-icons';


const Products = props => {
    const language = props.language

return (

<Collapsible open={props.showProducts}>
      <Layer onClickOutside={() => props.setShowProducts(false)}>
        {/* <Box direction='column' fill align='start'>   */}
          <Box>
            <Button
            icon={<FormClose color='lightgrey'/>}
            onClick={()=>props.setShowProducts(false)}
            fill
            />
          </Box>
          <Box direction='column' fill pad='large' gap='medium'> 
            <Box direction='horizontal' fill='horizontal' justify='center' align='center'>
              <Heading level='2' margin="medium" fill>{language ? "Produkte von PerVerSo" : "PerVerSo Products"}</Heading>
            </Box>


            <Box fill gap='medium' margin='medium' overflow={{"vertical": "scroll"}}>
              
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
        {/* </Box> */}
    </Layer> 
</Collapsible>
    
)}

export default Products;