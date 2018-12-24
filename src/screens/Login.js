import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, TextInput, Button, Alert } from 'react-native'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      correo: '',
      password: '',
    }
  }

  render() {
    const { container, input } = styles
    const { correo, password } = this.state
    return (
      <ScrollView style={container}>
        <TextInput
          style={input}
          onChangeText={correo => this.setState({ correo })}
          value={correo}
          placeholder="Email"
        />
        <TextInput
          style={input}
          onChangeText={password => this.setState({ password })}
          value={password}
          placeholder="Contraseña"
        />
        <Button
          onPress={() => {
            Alert.alert(text)
          }}
          title="Continuar"
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
})
