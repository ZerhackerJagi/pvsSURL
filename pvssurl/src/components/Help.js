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
    const language = props.language
    
    return(
    <Collapsible direction='horizontal' open={props.showHelp}>
        <Layer>
        <Box>
            <Button
            icon={<FormClose color='lightgrey'/>}
            onClick={()=>props.setShowHelp(false)}
            />
        </Box>
        <Box margin='medium' overflow={{"vertical": "scroll"}} >
            <Heading level='2'>{language ? "Anleitung" : "Manual"}</Heading>
            {props.language ?(
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
                <br/><br/><b>Beispiel Anfrage:</b>
                <br/>GET https://perver.so/api/create?url=https://perver.so&custom=foo</Text>
            ):(
                <Text>Please enter your <b>URL</b> into the input field. In effect press the <b>shorten</b> button. Your random short URL with the Domain perver.so gets created.
                If you want to use your own custom tag or change the conditions please press the <b>wrench symbol</b> on the left side of the input field. Now there are multiple options available:<br />
                <br /><b>Custom Tag:</b> If you choose the option you can enter your custom tag. (https://perver.so/[ihr persönlicher tag])
                <br/><br/><b>Max References:</b> If you chosse the option, you can enter a number. If the short url was opened as often as your number, the url gets updated and you can't access the original url.
                <br/><br/><b>Private:</b>If you choose the option, the url will not be recorded in the statistics. If there is a lock next to the option then the link is private.
                <br/><br/><b>Special Randomizer:</b> If you choose the option, then you can choose which randomizer should be used when creating a short url.
                <br/>- default (uppercase, lowercase, numbers) [1]
                <br/>- just uppercase [2]
                <br/>- just lowercase [3]
                <br/>- just numbers [4]
                <br/><br/><b>API:</b> If you want to use the API, you can make a GET Request to https://perver.so/api/create
                <br/><b>Options:</b>
                <br/>-url [required] string
                <br/>-custom [optional] string 
                <br/>-private [optional] 0 oder 1
                <br/>-refs_available [optional] int (default= -1)
                <br/>-random_method [optional] int (default= 1)
                <br/><br/><b>Sample Request:</b>
                <br/>GET https://perver.so/api/create?url=https://perver.so&custom=foo</Text>
            )}
        </Box>
        </Layer>
    </Collapsible>
    )
}

export default Help;