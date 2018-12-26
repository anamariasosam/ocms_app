import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import calendar from '../locales/calendar'

LocaleConfig.locales.es = calendar
LocaleConfig.defaultLocale = 'es'

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
