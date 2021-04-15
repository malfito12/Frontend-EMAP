import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import HeaderUser from '../../Organismsm/UsersMenus/HeaderUser'
import HomeUser from '../../Pages/PagesUsers/HomeUser'
import Protected from '../Protected'

const AppUsers = () => {
    return (
        <Router>
            <HeaderUser/>
            <Switch>
                <Protected path='/homeuser' component={props=><HomeUser {...props} />} />
            </Switch>
        </Router>
    )
}

export default AppUsers
