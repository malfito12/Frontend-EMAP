import React from 'react'
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
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
import ControlVacaciones from '../../Pages/PagesAdmin/ControlVacaciones'
import ReportePersonal from '../../Pages/PagesAdmin/Reportes/ReportePersonal'
import ReporteMovimiento from '../../Pages/PagesAdmin/Reportes/ReporteMovimiento'
import Memorandums from '../../Pages/PagesAdmin/Reportes/Memorandums'
import ReporteAltasBajas from '../../Pages/PagesAdmin/Reportes/ReporteAltasBajas'
import Page404 from '../Page404'

const AppAdmin = () => {
    return (
        <Router>
            <HeaderAdmin />
            <Switch>
                <Protected exact path='/homeadmin'  component={props=><HomeAdmin {...props} />} />
                <Protected exact path='/controluser' component={props=><ControlUsers {...props} />} />
                <Protected exact path='/registeruser' component={props=><RegisterUser {...props} />} />
                
                <Protected exact path='/controlEmp' component={props=><ControlEmpleado {...props} />} />
                <Protected exact path='/registerEmp' component={props=><RegisterEmp {...props} />} />
                {/* <Protected path='/infoEmp' component={props=><InfoEmp {...props} />} /> */}
                <Protected exact path='/infoEmp/:id' component={props=><InfoEmp {...props} />} />
                
                <Protected exact path='/controlPermisos' component={props=><ControlPermisos {...props} />} />
                <Protected exact path='/controlVacaciones' component={props=><ControlVacaciones {...props} />} />
                
                <Protected exact path='/controlCargos' component={props=><ControlCargos {...props} />} />
                <Protected exact path='/registerCargo' component={props=><RegisterCargo {...props} />} />
                {/* <Protected path='/registerCargo/:id' component={props=><RegisterCargo {...props} />} /> */}


                <Protected exact path='/controlHorarios' component={props=><ControlHorario {...props} />} />

                <Protected exact path='/asigHorario' component={props=><AsigHorario {...props} />} />

                <Protected exact path='/controlFeriados' component={props=><ControlFeriado {...props} />} />
                
                <Protected exact path='/generalConfig' component={props=><GeneralConfig {...props} />} />
                <Protected exact path='/antiguedadEmp' component={props=><AntiguedadEmp {...props} />} />

                <Protected exact path='/kardexPreRevision' component={props=><KardexPreRevision {...props} />} />
                <Protected exact path='/kardexRevision' component={props=><KardexRevision {...props} />} />

                {/*----------------------REPORTES--------------------*/}
                <Protected exact path='/reportePersonal' component={props=><ReportePersonal {...props} />} />
                <Protected exact path='/reporteMovimiento' component={props=><ReporteMovimiento {...props} />} />
                <Protected exact path='/reporteAltasBajas' component={props=><ReporteAltasBajas {...props} />} />
                <Protected exact path='/memorandums' component={props=><Memorandums {...props} />} />


                {/*---------------------------PLANILLAS--------------------*/}
                <Protected exact path='/sueldosPreRevision' component={props=><SueldosPreRevision {...props} />} />
                <Protected exact path='/sueldosRevision' component={props=><SuledosRevision {...props} />} />

                <Protected exact path='/refrigerioPreRevision' component={props=><RefrigerioPreRevision {...props} />} />
                <Protected exact path='/refrigerioRevision' component={props=><RefrigerioRevision {...props} />} />
                
                <Route component={Page404}/>
            </Switch>
        </Router>
    )
}

export default AppAdmin
