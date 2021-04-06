import { Box, Button, Collapsible, Form, CheckBox, TextInput, Text, Select } from "grommet";
import { Configure, Code, Edit, Secure, Tag } from 'grommet-icons';



const MainContentDesktop = props => {

return(
    <Box gap='small'>
        
        
        <Box direction='row' fill='horizontal'>
            <Button 
            icon={<Configure color='dark-1'/>}
            color='brand'
            size='small'
            onClick={() => {props.setShowSettings(!props.showSettings);
            props.setShowCustomURL(false);
            props.setIsPrivate(false);
            props.setShowMaxReferences(false);
            props.setShowRandomizer(false);
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
                placeholder={props.language ? 'Füge deinen Link ein...' : 'Enter your URL...'}
                onChange={props.updateURL}
                /> 
            </Box>

            <Form onSubmit={props.getURL}>
                <Button
                color='brand'
                label={props.language ? 'Verkürzen':'Shorten'}
                type='submit'
                fill='true'
                />
            </Form>
        
        </Box>

        <Collapsible direction='vertical' open={props.showResult}>
            <Box
            width='large'
            >
                
                {(() => {
                if (props.createdUrl.length>0) {
                    return (
                    props.answer
                    )
                } else {
                    return (
                    <Text size='medium' color='test'>{props.message}</Text>
                    )
                } 
                })()}
                
            </Box>
        </Collapsible>

        <Collapsible direction='vertical' open={props.showSettings}>
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
                    label={props.language ? 'Individueller Tag' : 'Custom tag'}
                    onClick={() => props.setShowCustomURL(!props.showCustomURL)}
                />
                <Collapsible direction='horizontal' open={props.showCustomURL}>
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
                            placeholder={props.language ? 'Gib deinen individuellen Tag ein...' : 'Enter custom tag...'}
                            onChange={props.updateCustomURL}
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
                    label={props.language ? 'Limit an Aufrufen setzen':'Set max. references'}
                    onClick={() => props.setShowMaxReferences(!props.showMaxReferences)}
                />
                <Collapsible direction='horizontal' open={props.showMaxReferences}>
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
                            placeholder={props.language ? 'Gib die Anzahl der maximalen Aufrufe ein...' : 'Enter max. References...'}
                            onChange={props.updateMaxRef}
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
                    label={props.language ? 'Privat setzen' : 'Is private'}
                    onClick={() => props.setIsPrivate(!props.isPrivate)}
                />
                <Collapsible direction='horizontal' open={props.isPrivate}>
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
                    label={props.language ? 'Speziellen Zufallsgenerator' : 'Special randomizer'}
                    onClick={() => props.setShowRandomizer(!props.showRandomizer)}
                />
                <Collapsible direction='horizontal' open={props.showRandomizer}>
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
                            placeholder={props.language ? 'Auswählen Zufallsgenerator...' : 'Select randomizer...'}
                            options={props.randomOptions}
                            labelKey="label"
                            valueKey="value"
                            onChange={({ option }) => props.setRandomizer(option)}
                            dropHeight='small'
                            background={props.darkMode ? "dark" : "light"}
                            plain
                            />
                        </Box>
                    </Box>
                </Collapsible>
            </Box>
        </Box>
        </Collapsible>
    
    </Box>
)
}

export default MainContentDesktop