import React from 'react'
import { StyleSheet } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'
import { Header, Body, Title, Container, Root, Content } from 'native-base'

import Home from './src/screens/Home'
import Agenda from './src/screens/Agenda'
import Login from './src/screens/Login'

const App = () => (
  <Root>
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
  </Root>
)

export default App
