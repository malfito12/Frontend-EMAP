import React from 'react'
import { BrowserRouter as Switch } from 'react-router-dom'
import Home from '../../Pages/Home'
import Login from '../../Pages/Login'
import Protected from '../Protected'
import Public from '../Public'

const AppPublic = () => {
    return (
        <Switch>
            <Protected exact path='/' component={props=><Home {...props} />} />
            <Public path='/login' component={props=><Login {...props} />} />
        </Switch>
    )
}

export default AppPublic
