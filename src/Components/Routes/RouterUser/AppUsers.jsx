import React from 'react'
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import HeaderUser from '../../Organismsm/UsersMenus/HeaderUser'
import HomeUser from '../../Pages/PagesUsers/HomeUser'
import Protected from '../Protected'
import UserControlEmp from '../../Pages/PagesUsers/Empleados/UserControlEmp'
import InfoEmp from '../../Molecules/StepFormEmpleados/InfoEmp'
import UserControlHorario from '../../Pages/PagesUsers/Empleados/UserControlHorario'
import Page404 from '../Page404'
import UserControlCargos from '../../Pages/PagesUsers/Empleados/UserControlCargos'
import UserControlFeriados from '../../Pages/PagesUsers/Justificaciones/UserControlFeriados'
import UserControlVacaciones from '../../Pages/PagesUsers/Justificaciones/UserControlVacaciones'
import UserControlPermisos from '../../Pages/PagesUsers/Justificaciones/UserControlPermisos'
import KardexPreRevision from '../../Pages/PagesAdmin/KardexAsistencia/KardexPreRevision'
import KardexRevision from '../../Pages/PagesAdmin/KardexAsistencia/KardexRevision'
import SueldosPreRevision from '../../Pages/PagesAdmin/Planillas/SueldosPreRevision'
import SueldosRevision from '../../Pages/PagesAdmin/Planillas/SueldosRevision'
import RefrigerioPreRevision from '../../Pages/PagesAdmin/Planillas/RefrigerioPreRevision'
import RefrigerioRevision from '../../Pages/PagesAdmin/Planillas/RefrigerioRevision'
import ReportePersonal from '../../Pages/PagesAdmin/Reportes/ReportePersonal'
import ReporteMovimiento from '../../Pages/PagesAdmin/Reportes/ReporteMovimiento'
import ReporteAltasBajas from '../../Pages/PagesAdmin/Reportes/ReporteAltasBajas'
import Memorandums from '../../Pages/PagesAdmin/Reportes/Memorandums'
import GeneralConfig from '../../Pages/PagesAdmin/GeneralConfig'
import AntiguedadEmp from '../../Pages/PagesAdmin/AntiguedadEmp'
import ReporteCargos from '../../Pages/PagesAdmin/Reportes/ReporteCargos'
import UserRegistroEmp from '../../Pages/PagesUsers/Empleados/UserRegistroEmp'
import AportesPatronales from '../../Pages/PagesAdmin/Planillas/AportesPatronales'
import RetroactivoSalarial from '../../Pages/PagesAdmin/Planillas/RetroactivoSalarial'


const AppUsers = () => {
    return (
        <Router>
            <HeaderUser/>
            <Switch>
                <Protected exact  path='/homeuser' component={props=><HomeUser {...props} />} />
                <Protected exact  path='/userRegisterEmp' component={props=><UserRegistroEmp {...props} />} />
                <Protected exact  path='/userControlCargo' component={props=><UserControlCargos {...props} />} />
                <Protected exact  path='/userControlHorario' component={props=><UserControlHorario {...props} />} />
                
                <Protected exact  path='/userControlPermiso' component={props=><UserControlPermisos {...props} />} />
                <Protected exact  path='/userControlFeriados' component={props=><UserControlFeriados {...props} />} />
                <Protected exact  path='/userControlVacaciones' component={props=><UserControlVacaciones {...props} />} />
                
                <Protected exact path='/kardexPreRevision' component={props=><KardexPreRevision {...props} />} />
                <Protected exact path='/kardexRevision' component={props=><KardexRevision {...props} />} />

                <Protected exact path='/sueldosPreRevision' component={props=><SueldosPreRevision {...props} />} />
                <Protected exact path='/sueldosRevision' component={props=><SueldosRevision {...props} />} />

                <Protected exact path='/refrigerioPreRevision' component={props=><RefrigerioPreRevision {...props} />} />
                <Protected exact path='/refrigerioRevision' component={props=><RefrigerioRevision {...props} />} />
                
                <Protected exact path='/aportesPatronales' component={props=><AportesPatronales {...props} />} />
                <Protected exact path='/retroactivo' component={props=><RetroactivoSalarial {...props} />} />

                <Protected exact path='/reportePersonal' component={props=><ReportePersonal {...props} />} />
                <Protected exact path='/reporteMovimiento' component={props=><ReporteMovimiento {...props} />} />
                <Protected exact path='/reporteAltasBajas' component={props=><ReporteAltasBajas {...props} />} />
                <Protected exact path='/reporteCargos' component={props=><ReporteCargos {...props} />} />
                <Protected exact path='/memorandums' component={props=><Memorandums {...props} />} />

                <Protected exact path='/generalConfig' component={props=><GeneralConfig {...props} />} />
                <Protected exact path='/antiguedadEmp' component={props=><AntiguedadEmp {...props} />} />
                

                <Protected exact  path='/userControlEmp' component={props=><UserControlEmp {...props} />} />

                <Protected exact  path='/infoEmp/:id' component={props=><InfoEmp {...props} />} />

                

                <Route component={Page404}/>            
            </Switch>
        </Router>
    )
}

export default AppUsers
