import React from 'react'
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import HeaderUser from '../../Organismsm/UsersMenus/HeaderUser'
import HomeUser from '../../Pages/PagesUsers/HomeUser'
import Protected from '../Protected'
import UserControlEmp from '../../Pages/PagesUsers/Empleados/UserControlEmp'
import InfoEmp from '../../Molecules/StepFormEmpleados/InfoEmp'
import UserControlHorario from '../../Pages/PagesUsers/Empleados/UserControlHorario'
import UserControlPlanilla from '../../Pages/PagesUsers/UserControlPlanilla'
import Page404 from '../Page404'
import RegisterEmp from '../../Molecules/StepFormEmpleados/RegisterEmp'
import UserControlCargos from '../../Pages/PagesUsers/Empleados/UserControlCargos'
import UserControlFeriados from '../../Pages/PagesUsers/Justificaciones/UserControlFeriados'
import UserControlVacaciones from '../../Pages/PagesUsers/Justificaciones/UserControlVacaciones'
import UserControlPermisos from '../../Pages/PagesUsers/Justificaciones/UserControlPermisos'

const AppUsers = () => {
    return (
        <Router>
            <HeaderUser/>
            <Switch>
                <Protected exact  path='/homeuser' component={props=><HomeUser {...props} />} />
                <Protected exact  path='/registerEmp' component={props=><RegisterEmp {...props} />} />
                <Protected exact  path='/userControlCargo' component={props=><UserControlCargos {...props} />} />
                <Protected exact  path='/userControlHorario' component={props=><UserControlHorario {...props} />} />
                
                <Protected exact  path='/userControlPermiso' component={props=><UserControlPermisos {...props} />} />
                <Protected exact  path='/userControlFeriados' component={props=><UserControlFeriados {...props} />} />
                <Protected exact  path='/userControlVacaciones' component={props=><UserControlVacaciones {...props} />} />
                

                <Protected exact  path='/userControlEmp' component={props=><UserControlEmp {...props} />} />

                <Protected exact  path='/infoEmp/:id' component={props=><InfoEmp {...props} />} />

                
                <Protected exact  path='/userControlPlanilla' component={props=><UserControlPlanilla {...props} />} />

                <Route component={Page404}/>            
            </Switch>
        </Router>
    )
}

export default AppUsers
