import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text, Content, Form, Item, Input, Label } from 'native-base'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      correo: '',
      password: '',
    }

    this.loginUser = this.loginUser.bind(this)
  }

  loginUser() {
    const { history } = this.props
    history.push('/agenda')
  }

  render() {
    const { container, button } = styles
    const { correo, password } = this.state
    return (
      <Container style={container}>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Correo Electrónico</Label>
              <Input onChangeText={correo => this.setState({ correo })} value={correo} />
            </Item>
            <Item floatingLabel>
              <Label>Contraseña</Label>
              <Input
                onChangeText={password => this.setState({ password })}
                value={password}
                secureTextEntry
              />
            </Item>
            <Button primary style={button} onPress={this.loginUser}>
              <Text> Iniciar Sesión </Text>
            </Button>
          </Form>
        </Content>
      </Container>
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
  },
})
