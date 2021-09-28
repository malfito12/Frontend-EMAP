import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import HeaderUser from '../../Organismsm/UsersMenus/HeaderUser'
import HomeUser from '../../Pages/PagesUsers/HomeUser'
import Protected from '../Protected'
import UserControlEmp from '../../Pages/PagesUsers/Empleados/UserControlEmp'
import InfoEmp from '../../Molecules/StepFormEmpleados/InfoEmp'
import UserControlPermiso from '../../Pages/PagesUsers/UserControlPermiso'
import UserControlHorario from '../../Pages/PagesUsers/UserControlHorario'
import UserControlReporte from '../../Pages/PagesUsers/UserControlReporte'
import UserControlPlanilla from '../../Pages/PagesUsers/UserControlPlanilla'

const AppUsers = () => {
    return (
        <Router>
            <HeaderUser/>
            <Switch>
                <Protected  path='/homeuser' component={props=><HomeUser {...props} />} />

                <Protected  path='/userControlEmp' component={props=><UserControlEmp {...props} />} />

                <Protected  path='/infoEmp/:id' component={props=><InfoEmp {...props} />} />

                <Protected  path='/userControlPermiso' component={props=><UserControlPermiso {...props} />} />

                <Protected  path='/userControlHorario' component={props=><UserControlHorario {...props} />} />

                <Protected  path='/userControlReporte' component={props=><UserControlReporte {...props} />} />
                
                <Protected  path='/userControlPlanilla' component={props=><UserControlPlanilla {...props} />} />
            </Switch>
        </Router>
    )
}

export default AppUsers
