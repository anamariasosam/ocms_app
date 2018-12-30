import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { Card, CardItem, Text, Left, Body, Right } from 'native-base'
import calendar from '../locales/calendar'

LocaleConfig.locales.es = calendar
LocaleConfig.defaultLocale = 'es'

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      loading: true,
      items: {
        '2018-12-24': [
          {
            nombre: 'Algebra y Trigonometría',
            lugar: '4-202',
            hora: '6:00 am',
            tipo: 'Supletorios Parciales',
          },
          {
            nombre: 'Algebra y Trigonometría',
            lugar: '4-202',
            hora: '6:00 am',
            tipo: 'Supletorios Parciales',
          },
        ],
        '2018-12-30': [],
        '2018-12-31': [],
        '2018-1-1': [],
      },
    }
  }

  async componentDidMount() {
    await this.loadUserId()
    this.loadEvents()
  }

  loadEvents() {
    console.log('====================================')
    console.log(this.state.userId)
    console.log('====================================')
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
    return (
      <Agenda
        items={this.state.items}
        selected={'2018-12-24'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        //minDate={'2018-12-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        //maxDate={'2019-02-28'}
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
