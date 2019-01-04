import React from 'react'
import { Header, Body, Title, Left } from 'native-base'
import { withRouter } from 'react-router-native'

import LogOutButton from './LogOutButton'

const HeaderApp = withRouter(props => (
  <Header>
    <Left style={{ flex: 0 }} />
    <Body style={{ flex: 1 }}>
      <Title style={{ color: '#16343B' }}>Calendario Académico</Title>
    </Body>
    <LogOutButton {...props} />
  </Header>
))

export default HeaderApp
