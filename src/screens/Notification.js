import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import PushNotification from 'react-native-push-notification'

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.NewNotification = this.NewNotification.bind(this)
  }

  componentDidMount() {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification)
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    })
  }

  NewNotification() {
    let date = new Date(Date.now() + this.state.seconds * 1000)

    // Fix for IOS
    if (Platform.OS == 'ios') {
      date = date.toISOString()
    }

    PushNotification.localNotificationSchedule({
      message: 'My Notification Message', // (required)
      date: date, // (optional) for setting delay
      largeIcon: '', // set this blank for removing large icon
      //smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Push Notification</Text>
        <View style={styles.Button}>
          <Button
            onPress={() => {
              this.NewNotification()
            }}
            title="Show Notification"
            style={styles.Button}
            color="#841584"
            accessibilityLabel="Show Notification"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  Button: {
    margin: 10,
  },
})
