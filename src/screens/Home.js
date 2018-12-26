import React, { Component } from 'react'
import { Container } from 'native-base'
import { AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native'

export default class Home extends Component {
  async componentWillMount() {
    try {
      const { history } = this.props
      const userId = await AsyncStorage.getItem('user_id')
      if (userId !== null) {
        history.push('/agenda')
      } else {
        history.push('/login')
      }
    } catch (error) {
      console.error('AsyncStorage Error: ' + error.message)
    }
  }

  render() {
    const { container, horizontal } = styles
    return (
      <Container style={[container, horizontal]}>
        <ActivityIndicator size="large" />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
