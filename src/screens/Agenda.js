import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { Text } from 'native-base'
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
        '2018-12-23': [
          {
            name: 'Item for 2018-12-10',
            selectedColor: 'red',
          },
        ],
        '2018-12-24': [
          {
            name: 'Item for 2018-12-10',
          },
        ],
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
        selected={new Date()}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        minDate={'2018-12-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2019-02-28'}
      />
    )
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
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
  item: {
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
