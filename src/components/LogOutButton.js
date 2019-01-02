import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
import {
  Header,
  Body,
  Title,
  Container,
  Root,
  Subtitle,
  Right,
  Button,
  Icon,
  Left,
} from 'native-base'

class LogOutButton extends Component {
  constructor(props) {
    super(props)

    this.logOut = this.logOut.bind(this)
  }

  async deleteItem(item) {
    try {
      await AsyncStorage.removeItem(item)
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message)
    }
  }

  async logOut() {
    await this.deleteItem('user_id')
    await this.deleteItem('user_name')
    await this.deleteItem('user_type')
  }

  render() {
    const { user } = this.props
    if (user !== null) {
      return (
        <Right>
          <Link onPress={this.logOut} to="/login">
            <Icon name="md-log-out" />
          </Link>
        </Right>
      )
    } else {
      return <Right />
    }
  }
}

export default LogOutButton
