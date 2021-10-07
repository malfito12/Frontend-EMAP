import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RegisterCargo from '../../Pages/PagesAdmin/RegisterCargo'
import InfoEmp from '../../Molecules/StepFormEmpleados/InfoEmp'
import RegisterEmp from '../../Molecules/StepFormEmpleados/RegisterEmp'
import RegisterUser from '../../Molecules/StepFormUser/RegisterUser'
import HeaderAdmin from '../../Organismsm/AdminMenus/HeaderAdmin'
import ControlCargos from '../../Pages/PagesAdmin/ControlCargos'
import ControlEmpleado from '../../Pages/PagesAdmin/ControlEmpleado'
import ControlHorario from '../../Pages/PagesAdmin/ControlHorario'
import ControlPermisos from '../../Pages/PagesAdmin/ControlPermisos'
import ControlUsers from '../../Pages/PagesAdmin/ControlUsers'
import HomeAdmin from '../../Pages/PagesAdmin/HomeAdmin'
import Protected from '../Protected'
import AsigHorario from '../../Pages/PagesAdmin/AsigHorario'
import ControlFeriado from '../../Pages/PagesAdmin/ControlFeriado'
import GeneralConfig from '../../Pages/PagesAdmin/GeneralConfig'
import KardexPreRevision from '../../Pages/PagesAdmin/KardexAsistencia/KardexPreRevision'
import KardexRevision from '../../Pages/PagesAdmin/KardexAsistencia/KardexRevision'
import AntiguedadEmp from '../../Pages/PagesAdmin/AntiguedadEmp'
import SueldosPreRevision from '../../Pages/PagesAdmin/Planillas/SueldosPreRevision'
import SuledosRevision from '../../Pages/PagesAdmin/Planillas/SueldosRevision'
import RefrigerioPreRevision from '../../Pages/PagesAdmin/Planillas/RefrigerioPreRevision'
import RefrigerioRevision from '../../Pages/PagesAdmin/Planillas/RefrigerioRevision'

const AppAdmin = () => {
    return (
        <Router>
            <HeaderAdmin />
            <Switch>
                <Protected path='/homeadmin' exact component={props=><HomeAdmin {...props} />} />
                <Protected path='/controluser' component={props=><ControlUsers {...props} />} />
                <Protected path='/registeruser' component={props=><RegisterUser {...props} />} />
                
                <Protected path='/controlEmp' component={props=><ControlEmpleado {...props} />} />
                <Protected path='/registerEmp' component={props=><RegisterEmp {...props} />} />
                {/* <Protected path='/infoEmp' component={props=><InfoEmp {...props} />} /> */}
                <Protected path='/infoEmp/:id' component={props=><InfoEmp {...props} />} />
                
                <Protected path='/controlPermisos' component={props=><ControlPermisos {...props} />} />
                
                <Protected path='/controlCargos' component={props=><ControlCargos {...props} />} />
                <Protected path='/registerCargo' component={props=><RegisterCargo {...props} />} />
                {/* <Protected path='/registerCargo/:id' component={props=><RegisterCargo {...props} />} /> */}


                <Protected path='/controlHorarios' component={props=><ControlHorario {...props} />} />

                <Protected path='/asigHorario' component={props=><AsigHorario {...props} />} />

                <Protected path='/controlFeriados' component={props=><ControlFeriado {...props} />} />
                
                <Protected path='/generalConfig' component={props=><GeneralConfig {...props} />} />
                <Protected path='/antiguedadEmp' component={props=><AntiguedadEmp {...props} />} />

                <Protected path='/kardexPreRevision' component={props=><KardexPreRevision {...props} />} />
                <Protected path='/kardexRevision' component={props=><KardexRevision {...props} />} />

                {/*---------------------------PLANILLAS--------------------*/}
                <Protected path='/sueldosPreRevision' component={props=><SueldosPreRevision {...props} />} />
                <Protected path='/sueldosRevision' component={props=><SuledosRevision {...props} />} />

                <Protected path='/refrigerioPreRevision' component={props=><RefrigerioPreRevision {...props} />} />
                <Protected path='/refrigerioRevision' component={props=><RefrigerioRevision {...props} />} />
                
            </Switch>
        </Router>
    )
}

export default AppAdmin
