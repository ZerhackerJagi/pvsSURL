import React from 'react';
import {
    Box,
    Image,
    Footer,
    Text
} from 'grommet';


const AppFooter = props => {

    return(
        <Footer background="brand" justify="center" pad="small">
        <Text textAlign="center" size="medium" color='text'>
          © 2021 Copyright PerVerSo
        </Text>
        <Box
        direction='row'
        justify='end'
        >
          <Image src="/images/logo"/>
        </Box>
      </Footer>
    )

}

export default AppFooter;