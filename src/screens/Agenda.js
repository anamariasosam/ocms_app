import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import axios from 'axios'
import calendar from '../locales/calendar'
import PACKAGE from '../../package.json'
import EventCard from '../components/EventCard'

const API_URL = PACKAGE.config.url

LocaleConfig.locales.es = calendar
LocaleConfig.defaultLocale = 'es'

const renderItem = evento => <EventCard {...evento} />

const renderEmptyDate = () => <View style={{ height: 15, flex: 1, paddingTop: 30 }} />

const rowHasChanged = (r1, r2) => r1.name !== r2.name

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      userType: null,
      loading: true,
      eventos: {},
      agenda: {},
    }
  }

  async componentDidMount() {
    await this.loadUserId()
    this.loadEvents()
  }

  loadEvents() {
    const { userId: usuario, userType: tipo } = this.state

    const params = {
      usuario,
      tipo,
      semestre: '2019-1',
    }

    axios.get(`${API_URL}/calendario/eventos`, { params }).then(response => {
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
      const userType = await AsyncStorage.getItem('user_type')
      if (userId !== null) {
        this.setState({
          userId,
          userType,
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
        selected={'2019-01-21'}
        items={eventos}
        renderItem={renderItem}
        minDate={agenda.minDate}
        maxDate={agenda.maxDate}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        theme={{
          agendaKnobColor: '#16343b',
          monthTextColor: '#16343b',
          textMonthFontWeight: 'bold',
          selectedDayBackgroundColor: '#16343b',
          dotColor: '#3a7e8e',
          todayTextColor: '#3a7e8e',
          agendaDayTextColor: '#3a7e8e',
          agendaDayNumColor: '#3a7e8e',
        }}
      />
    )
  }
}
