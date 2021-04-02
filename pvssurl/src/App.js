import React, { useState } from 'react';
import { 
  Box,
  Grommet
} from 'grommet';

import Outdated from './sites/outdated'
import NotFound from './sites/notFound'
import SafeLoad from './sites/safeLoad'

import MainContent from './components/MainContent'
import Sidebar from './components/Sidebar'
import AppBar from './components/AppBar'
import Help from './components/Help'
import AppFooter from './components/AppFooter'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { pvsTheme } from './theme/theme'



const App = () => {
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [darkMode, setDarkmode] = useState(true);
  const [language, setLanguage] = useState(true);

  return (
        <Grommet theme={ pvsTheme } themeMode={darkMode ? "dark" : "light"} full>  
          <Box background={darkMode ? "dark-1" : "light-1"} fill>
            <AppBar 
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
              setShowHelp={setShowHelp}
              showHelp={showHelp}
              darkMode={darkMode}
              setDarkmode={setDarkmode}
              language={language}
              setLanguage={setLanguage}
            />

            
            <Box flex direction='row' overflow={{ horizontal: 'hidden' }} gap='medium'>
              <Sidebar 
                showSidebar={showSidebar}
                showStatistics={showStatistics}
                setShowStatistics={setShowStatistics}
                setStatistics={setStatistics}
                statistics={statistics}
                language={language}
              />
              
              <Router>
                <Switch>
                  <Route path="/" exact component={() => <MainContent language={language} />} />
                  <Route path="/error/404" component={() => <NotFound language={language} />}/>
                  <Route path="/:id/outdated" component={() => <Outdated language={language} />}/>
                  <Route path="/:url/safeView" component={() => <SafeLoad language={language} />}/>
                </Switch>

              </Router>

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
