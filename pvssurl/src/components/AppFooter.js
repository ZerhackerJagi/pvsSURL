import React from 'react';
import {
    Box,
    Image,
    Text
} from 'grommet';


const AppFooter = props => {

    return(
      <Box
        tag='footer'
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
        <Text textAlign="center" size="medium" color='text'>
          © 2021 Copyright PerVerSo
        </Text>
        <Box
        direction='row'
        justify='end'
        >
          {props.darkMode ? (
            <Image src="/images/logo/dark"/>
          ) :(
            <Image src="/images/logo/light"/>
          )}
        </Box>
      </Box>
    )

}

export default AppFooter;