import React from 'react'
import { Switch,Route } from 'react-router-dom'
import {Resevation} from "./Resevation"
import {Facility} from "./Facility"
import {ReservationList} from "./ReservationList"

export const Routing:React.FC = () => {
  return (
    <Switch>
      <Route path="/reservation" component={Resevation} />
      <Route path="/facility" component={Facility} />
      <Route path="/" exact component={ReservationList} />
    </Switch>
  )
}
