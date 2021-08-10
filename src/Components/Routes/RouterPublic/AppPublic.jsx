import React from 'react'
import { BrowserRouter as Switch } from 'react-router-dom'
import Home from '../../Pages/PagesPublic/Home'
import Login from '../../Pages/PagesPublic/Login'
import HomeAdmin from '../../Pages/PagesAdmin/HomeAdmin'
import Protected from '../Protected'
import Public from '../Public'
import PublicHome from '../../Pages/PagesPublic/PublicHome'

const AppPublic = () => {
    return (
        <Switch>
            {/* <Public path='/login' component={props=><Login {...props} />} /> */}
            <Public  path='/homepublic' component={props=><PublicHome {...props}/>}/>
            {/* <Public path='/' component={props=><Home {...props} />} /> */}
            <Protected path='/homeadmin' exact component={props=><HomeAdmin {...props} />} />

        </Switch>
    )
}

export default AppPublic
