import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Subtitle } from 'native-base'

class UserDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
    }
  }

  async componentDidMount() {
    await this.loadUser()
  }

  async loadUser() {
    try {
      const username = await AsyncStorage.getItem('user_name')
      if (username !== null) {
        this.setState({
          username,
        })
      }
    } catch (error) {
      console.error('AsyncStorage Error: ' + error.message)
    }
  }

  render() {
    const { pathname } = this.props.location

    const { username } = this.state
    const user = pathname !== '/login' ? username : ''

    return <Subtitle>{user}</Subtitle>
  }
}

export default UserDetail
