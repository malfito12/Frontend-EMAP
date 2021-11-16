import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import HomeAdmin from '../../Pages/PagesAdmin/HomeAdmin'
import Protected from '../Protected'
import Public from '../Public'
import HomeUser from '../../Pages/PagesUsers/HomeUser'
import Home from '../../Pages/PagesPublic/Home'
import InformacionEMAP from '../../Pages/PagesPublic/InformacionEMAP'
import Consultas from '../../Pages/PagesPublic/Consultas'

const AppPublic = () => {
    return (
        <Router>
            {/* <PublicMainMenu /> */}
            <Switch>
                <Protected exact path='/homeadmin' component={props => <HomeAdmin {...props} />} />
                <Protected exact path='/homeuser' component={props => <HomeUser {...props} />} />

                <Public exact path='/' component={props =><div id='home'><Home {...props} /></div>} />
                <Public exact path='/informacion' component={props =><InformacionEMAP />} />
                <Public exact path='/consultas' component={props =><Consultas />} />
            </Switch>
        </Router>
    )
}

export default AppPublic
