import React, { useState } from 'react';
import { 
  Box, 
  Grommet
} from 'grommet';

import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Help from './components/Help'
import AppFooter from './components/AppFooter'

import { pvsTheme } from './theme/theme'



const App = () => {

  const domain = 'http://localhost:5000'
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHelp, setShowHelp] = useState(false);


  return (
    <Grommet theme={ pvsTheme } full>  
          <Box background='dark-1' fill>
            <AppBar 
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
              setShowHelp={setShowHelp}
              showHelp={showHelp}
            />
            
            <Box flex direction='row' overflow={{ horizontal: 'hidden' }} gap='medium'>
              <Sidebar 
                showSidebar={showSidebar}
                showStatistics={showStatistics}
                setShowStatistics={setShowStatistics}
                statistics={statistics}
                domain={domain}
              />
              
              <MainContent
                domain={domain}
              />

            </Box>

            <Help 
              setShowHelp={setShowHelp}
              showHelp={showHelp}
            />

            

          </Box>
          <AppFooter/>
    </Grommet>
  );
}


export default App;
