import React from 'react';
import {
    Box,
    Image,
    Footer,
    Text
} from 'grommet';


const AppFooter = props => {

    return(
        <Footer background="brand" justify="center" pad="medium">
        <Text textAlign="center" size="medium" color='lightgrey'>
          © 2021 Copyright PerVerSo
        </Text>
        <Box
        direction='row'
        justify='end'
        >
          <Image src='../../PerVerSo32x32.png'/>
        </Box>
      </Footer>
    )

}

export default AppFooter;