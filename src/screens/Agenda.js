import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { Card, CardItem, Text, Left, Body, Right } from 'native-base'
import axios from 'axios'
import calendar from '../locales/calendar'
import PACKAGE from '../../package.json'

const API_URL = PACKAGE.config.url

LocaleConfig.locales.es = calendar
LocaleConfig.defaultLocale = 'es'

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      loading: true,
      eventos: {},
      agenda: {},
    }

    this.renderEmptyDate = this.renderEmptyDate.bind(this)
    this.rowHasChanged = this.rowHasChanged.bind(this)
  }

  async componentDidMount() {
    await this.loadUserId()
    this.loadEvents()
  }

  loadEvents() {
    console.log('====================================')
    console.log(this.state.userId)
    console.log('====================================')

    axios.get(`${API_URL}/calendario/eventos?semestre=2018-2`).then(response => {
      const { eventos, agenda } = response.data

      this.setState({
        loading: false,
        eventos,
        agenda,
      })
    })
  }

  async loadUserId() {
    try {
      const userId = await AsyncStorage.getItem('user_id')
      if (userId !== null) {
        this.setState({
          userId,
          loading: false,
        })
      }
    } catch (error) {
      console.error('AsyncStorage Error: ' + error.message)
    }
  }

  render() {
    const { loading, eventos, agenda } = this.state
    if (loading) {
      return <ActivityIndicator size="large" />
    }

    return (
      <Agenda
        items={eventos}
        renderItem={this.renderItem}
        minDate={agenda.minDate}
        maxDate={agenda.maxDate}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        horizontal={true}
      />
    )
  }

  renderItem(evento) {
    return (
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>{evento.nombre}</Text>
              <Text note>{evento.tipo}</Text>
            </Body>
          </Left>
          <Right>
            <Text>{evento.hora}</Text>
            <Text note>{evento.lugar}</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>No hay ningún evento programado</Text>
      </View>
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name
  }
}

const styles = StyleSheet.create({
  evento: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
})
