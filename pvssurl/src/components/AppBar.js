import React from 'react';
import { 

  Box,
  Button

} from 'grommet';
import { Menu, Sun, Moon } from 'grommet-icons';

const AppBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      color='text'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
  >
    <Button 
      color='brand'
      icon={<Menu color='text'/>}
      onClick={() => props.setShowSidebar(!props.showSidebar)}
    />
    <Box
    direction="row"
    align="end"
    >
      <Button 
        color='brand'
        label='Help'
        onClick={() => props.setShowHelp(!props.showHelp)}
      />
      <Button
        color='brand' 
        icon={props.darkMode ? <Sun/> : <Moon/> }
        onClick={() => props.setDarkmode(!props.darkMode)
        }
      />
      <Button
        color='brand'
        label={props.language ? "DE" : "EN"}
        onClick={() => props.setLanguage(!props.language)}
      />
    </Box>
  </Box>
);

export default AppBar;