import React from 'react';
import { 
  Box, 
  Button,
  Collapsible,
  Layer,
  Heading, 
  Text
} from 'grommet';
import { 
  FormClose
} from 'grommet-icons';



const History = props => {
    const language = props.language


    return (
    <Collapsible open={props.showWissen}>
      <Layer onClickOutside={() => props.setShowWissen(false)}>
        <Box>
          <Button
          icon={<FormClose color='lightgrey'/>}
          onClick={()=>props.setShowWissen(false)}
          />
        </Box>

        <Box direction='column' fill pad='large' gap='medium'>
          <Box direction='horizontal' fill='horizontal' justify='center' align='center'>
            <Heading level='2' margin="medium" fill>{language ? "Entstehung" : "How it started"}</Heading>
          </Box>

          <Text size='medium'>
            {language ? `PerVerSo war ursprünglich ein studentisches Softwareprojekt für eine Personalverwaltungssoftware. Im Laufe der Zeit kamen weitere Projekte hinzu, sodass sich PerVerSo nach und nach zu einer Marke etabliert hat.
            Für die Entwicklergruppe steht dabei stets der Nutzende im Vordergrund, wobei ein gewisser Humor nicht verloren gegangen ist.` : `PerVerSo was a fun project during a study. It's the short version for the german version of employee management software
            Over time the fun project got a brand. Fun is one of the important things for the developer team.`}
          </Text>
        </Box>

      </Layer>
    </Collapsible>
    )
}

export default History;