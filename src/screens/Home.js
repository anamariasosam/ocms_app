import React, { Component } from 'react'
import { Text } from 'native-base'

export default class Home extends Component {
  componentWillMount() {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return <Text>Redireccionando...</Text>
  }
}
