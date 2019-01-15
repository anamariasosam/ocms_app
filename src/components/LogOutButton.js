import React from 'react'
import { AsyncStorage } from 'react-native'
import { Right, Icon, Button } from 'native-base'

const deleteItem = async item => {
  await AsyncStorage.removeItem(item)
}

const logOut = async history => {
  await deleteItem('user_id')
  await deleteItem('user_name')
  await deleteItem('user_type')

  history.push('/login')
}

const LogOutButton = ({ location, history }) => {
  const { pathname } = location

  if (pathname !== '/login') {
    return (
      <Right style={{ flex: 0 }}>
        <Button transparent onPress={() => logOut(history)}>
          <Icon name="md-log-out" style={{ color: '#fafafa' }} />
        </Button>
      </Right>
    )
  }

  return <Right style={{ flex: 0 }} />
}

export default LogOutButton
