import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card,
  CardBody,
  Collapsible,
  Heading, 
  Text
} from 'grommet';
import { 
  BarChart,
  Cart,
  Info
} from 'grommet-icons';
import Products from './Products';
import History from './History';
import Statistics from './Statistics'



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
  
  return(
  <Collapsible direction='horizontal' open={props.showSidebar}>
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

    <Products 
      setShowProducts={setShowProducts} 
      showProducts={showProducts}
      language={language}
      />
    <Statistics
      setShowStatistics={props.setShowStatistics}
      showStatistics={props.showStatistics}
      statistics={props.statistics}
      language={language}
    />
    <History
      setShowWissen={setShowWissen}
      showWissen={showWissen}
      language={language}
    />
    
  </Box>
</Collapsible>
  
)
}

export default Sidebar;