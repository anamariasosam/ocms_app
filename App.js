import React from 'react'
import { NativeRouter, Route } from 'react-router-native'
import { Container, Root } from 'native-base'

import Header from './src/components/Header'
import Home from './src/screens/Home'
import Agenda from './src/screens/Agenda'
import Login from './src/screens/Login'

const App = () => (
  <Root>
    <NativeRouter>
      <Container>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/agenda" component={Agenda} />
        <Route exact path="/login" component={Login} />
      </Container>
    </NativeRouter>
  </Root>
)

export default App
