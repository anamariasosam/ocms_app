import React from 'react'
import { Header, Body, Title, Left } from 'native-base'
import { withRouter } from 'react-router-native'

import LogOutButton from './LogOutButton'

const HeaderApp = withRouter(props => (
  <Header androidStatusBarColor="#16343B" style={{ backgroundColor: '#16343B' }}>
    <Left style={{ flex: 0 }} />
    <Body style={{ flex: 1 }}>
      <Title style={{ color: '#fafafa' }}>Calendario Académico</Title>
    </Body>
    <LogOutButton {...props} />
  </Header>
))

export default HeaderApp
