import React from 'react'
import { Card, CardItem, Text, Left, Body, Right } from 'native-base'

const EventCard = ({ nombre, tipo, hora, lugar }) => (
  <Card>
    <CardItem>
      <Left>
        <Body>
          <Text style={{ color: '#16343b' }}>{nombre}</Text>
          <Text note>{tipo}</Text>
        </Body>
      </Left>
      <Right>
        <Text>{hora}</Text>
        <Text note>{lugar}</Text>
      </Right>
    </CardItem>
  </Card>
)

export default EventCard
