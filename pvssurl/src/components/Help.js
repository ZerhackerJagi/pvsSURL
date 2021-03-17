import { 
    
    Box,
    Button,
    Collapsible,
    Heading,
    Layer,
    Text

 } from 'grommet';
 import { FormClose } from 'grommet-icons';
import React from 'react';

const Help = props => {
    return(
    <Collapsible direction='horizontal' open={props.showHelp}>
        <Layer>
        <Box>
            <Button
            icon={<FormClose color='lightgrey'/>}
            onClick={()=>props.setShowHelp(false)}
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
    )
}

export default Help;