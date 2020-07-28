import React, {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom'
import styled from 'styled-components'

import { GlobalStyles } from './components/GlobalStyles'
import Sidebar from './components/Sidebar'
import { Error } from './components/Error'
import Home from './components/Home'
import TweetDetails from './components/TweetDetails'
import Profile from './components/Profile'
import { CurrentUserContext } from './components/CurrentUserContext'

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext)
  


  return (
    <Router>
      <GlobalStyles>
      <Sidebar currentUser={status === 'idle' ? currentUser : null} />
      <Content>
      <Switch>
        <Route path='/notifications'></Route>
        <Route path='/bookmarks'></Route>
        <Route path='/tweet/:tweetId'>
          <TweetDetails />
        </Route>
        <Route path='/error'>
          <Error />
        </Route>
        <Route path='/:profileId'>
          <Profile />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      </Content>
      </GlobalStyles>
    </Router>
  )
}

const Content = styled.div`
  margin-left: 200px;
  margin-top: -10px;
  width: 600px;
`

export default App
