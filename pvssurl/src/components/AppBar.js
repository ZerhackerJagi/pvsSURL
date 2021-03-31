import React from 'react';
import { 

  Box,
  Button,
  CheckBox

} from 'grommet';
import { Menu } from 'grommet-icons';

const AppBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
  >
    <Button 
      icon={<Menu color='lightgrey'/>}
      onClick={() => props.setShowSidebar(!props.showSidebar)}
    />
    <Button 
      label='Help'
      onClick={() => props.setShowHelp(!props.showHelp)}
    />
    <CheckBox 
      toggle 
      label="View" 
      onClick={() => props.setDarkmode(!props.darkMode)
    }/>
  </Box>
);

export default AppBar;