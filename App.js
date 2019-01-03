import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'
import { Header, Body, Title, Container, Root, Subtitle } from 'native-base'

import Home from './src/screens/Home'
import Agenda from './src/screens/Agenda'
import Login from './src/screens/Login'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
    }
  }

  async componentDidMount() {
    await this.loadUsername()
  }

  async loadUsername() {
    try {
      const username = await AsyncStorage.getItem('user_name')
      const type = await AsyncStorage.getItem('user_type')

      if (username !== null) {
        this.setState({
          username: `${type}: ${username}`,
        })
      }
    } catch (error) {
      console.error('AsyncStorage Error: ' + error.message)
    }
  }

  render() {
    const { username } = this.state
    return (
      <Root>
        <NativeRouter>
          <Container>
            <Header>
              <Body>
                <Title>Calendario</Title>
                <Subtitle>{username}</Subtitle>
              </Body>
            </Header>
            <Route exact path="/" component={Home} />
            <Route path="/agenda" component={Agenda} />
            <Route exact path="/login" component={Login} />
          </Container>
        </NativeRouter>
      </Root>
    )
  }
}

export default App
