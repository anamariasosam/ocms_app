import React, { Component } from 'react'
import { StyleSheet, AsyncStorage, Image } from 'react-native'
import { Button, Text, Content, Form, Item, Input, Label, Toast, Thumbnail } from 'native-base'
import axios from 'axios'
import PACKAGE from '../../package.json'

const API_URL = PACKAGE.config.url

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      correo: null,
      password: null,
      buttonText: 'Iniciar Sesión',
      loading: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue)
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message)
    }
  }

  loginUser(data) {
    const { history } = this.props
    axios
      .post(`${API_URL}/auth/login`, data)
      .then(response => {
        const { usuario } = response.data

        this.saveItem('user_id', usuario._id)
        this.saveItem('user_name', usuario.nombre)
        this.saveItem('user_type', usuario.rol)

        history.push('/agenda')
      })
      .catch(error => {
        this.setState({
          loading: false,
          buttonText: 'Iniciar sesión',
        })

        Toast.show({
          text: 'Verifica tus datos',
          buttonText: 'Ok',
          duration: 3000,
          type: 'danger',
        })
      })
  }

  handleSubmit() {
    const { correo, password } = this.state
    if (correo && password) {
      const data = {
        correo,
        password,
      }

      this.setState({
        loading: true,
        buttonText: 'Iniciando sesión...',
      })
      this.loginUser(data)
    } else {
      Toast.show({
        text: 'Verifica tus datos',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger',
      })
    }
  }

  render() {
    const { button, userCard, mainColor } = styles
    const { correo, password, buttonText, loading } = this.state
    return (
      <Content padder>
        <Image source={require('../images/userCard.png')} style={userCard} />
        <Form>
          <Item floatingLabel>
            <Label style={mainColor}>Correo Electrónico</Label>
            <Input
              onChangeText={correo => this.setState({ correo })}
              value={correo}
              autoFocus
              keyboardType="email-address"
            />
          </Item>
          <Item floatingLabel>
            <Label style={mainColor}>Contraseña</Label>
            <Input
              onChangeText={password => this.setState({ password })}
              value={password}
              secureTextEntry
            />
          </Item>
          <Button primary style={button} onPress={this.handleSubmit} disabled={loading}>
            <Text> {buttonText} </Text>
          </Button>
        </Form>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#16343b',
  },
  userCard: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  mainColor: {
    color: '#16343b',
  },
})
