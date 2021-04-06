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



const Statistics = props => {
    const language = props.language

    return (

    <Collapsible open={props.showStatistics}>
      <Layer onClickOutside={() => props.setShowStatistics(false)}>
        {/* <Box fill direction='column' align='start'> */}
          <Box>
              <Button fill
              icon={<FormClose color='lightgrey'/>}
              onClick={()=>props.setShowStatistics(false)}
              />
          </Box>
            
          <Box direction='column' fill pad='large' gap='medium'>
            <Box direction='horizontal' fill='horizontal' justify='center' align='center'>
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
        {/* </Box> */}
      </Layer>
    </Collapsible>

    )
}
export default Statistics;