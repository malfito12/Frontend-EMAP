import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RegisterUser from '../../Molecules/StepFormUser/RegisterUser'
import HeaderAdmin from '../../Organismsm/AdminMenus/HeaderAdmin'
import ControlUsers from '../../Pages/PagesAdmin/ControlUsers'
import HomeAdmin from '../../Pages/PagesAdmin/HomeAdmin'
import Protected from '../Protected'

const AppAdmin = () => {
    return (
        <>
            <HeaderAdmin />
            <Switch>
                <Protected path='/homeadmin' component={props=><HomeAdmin {...props} />} />
                <Protected path='/controluser' component={props=><ControlUsers {...props} />} />
                <Protected path='/registeruser' component={props=><RegisterUser {...props} />} />
                
            </Switch>
        </>
    )
}

export default AppAdmin
