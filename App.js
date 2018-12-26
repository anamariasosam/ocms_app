import React from 'react'
import { NativeRouter, Route } from 'react-router-native'
import { Header, Body, Title, Container } from 'native-base'

import Home from './src/screens/Home'
import Agenda from './src/screens/Agenda'
import Login from './src/screens/Login'

const App = () => (
  <NativeRouter>
    <Container>
      <Header>
        <Body>
          <Title>Academic Schedule</Title>
        </Body>
      </Header>
      <Route exact path="/" component={Home} />
      <Route path="/agenda" component={Agenda} />
      <Route exact path="/login" component={Login} />
    </Container>
  </NativeRouter>
)

export default App
