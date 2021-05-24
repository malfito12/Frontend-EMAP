import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RegisterCargo from '../../Molecules/StepFormCargo/RegisterCargo'
import InfoEmp from '../../Molecules/StepFormEmpleados/InfoEmp'
import RegisterEmp from '../../Molecules/StepFormEmpleados/RegisterEmp'
import RegisterUser from '../../Molecules/StepFormUser/RegisterUser'
import HeaderAdmin from '../../Organismsm/AdminMenus/HeaderAdmin'
import ControlCargos from '../../Pages/PagesAdmin/ControlCargos'
import ControlEmpleado from '../../Pages/PagesAdmin/ControlEmpleado'
import ControlPermisos from '../../Pages/PagesAdmin/ControlPermisos'
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
                
                <Protected path='/controlEmp' component={props=><ControlEmpleado {...props} />} />
                <Protected path='/registerEmp' component={props=><RegisterEmp {...props} />} />
                {/* <Protected path='/infoEmp' component={props=><InfoEmp {...props} />} /> */}
                <Protected path='/infoEmp/:id' component={props=><InfoEmp {...props} />} />
                
                <Protected path='/controlPermisos' component={props=><ControlPermisos {...props} />} />
                
                <Protected path='/controlCargos' component={props=><ControlCargos {...props} />} />
                <Protected path='/registerCargo/:id' component={props=><RegisterCargo {...props} />} />
                
            </Switch>
        </>
    )
}

export default AppAdmin
