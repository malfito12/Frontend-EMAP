import { Container, Typography } from '@material-ui/core'
import axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import {PORT_URL} from '../../../PortURL'
import SettingsIcon from '@material-ui/icons/Settings';

const ControlCargos = (props) => {
    const [empleado,setEmpleado]=useState([])

    useEffect(()=>{
        getEmpledoCargo()
    },[])
    const getEmpledoCargo=()=>{
        axios.get(`${PORT_URL}cargo`)
        .then(resp=>{
            setEmpleado(resp.data)
            console.log(resp.data)
        })
        .catch(err=>console.log(err))
    }
    const columnas=[
        {title:"Nombre", field:'firstNameEmp'},
        {title:"Apellido P", field:'lastNameEmpP'},
        {title:"Apellido M", field:'lastNameEmpM'},
        {title:"Cargo", field:'cargoEmp'},
    ]
    
    const {history}=props
    return (
        <Container maxWidth='lg'>
            <Typography align='center' variant='h4' style={{marginTop:'5rem'}}>Tabla de Cargos Asignados</Typography>
            <Container maxWidth='md'>
                <MaterialTable
                    title='Lista de Cargos'
                    columns={columnas}
                    data={empleado}
                    options={{
                        headerStyle:{
                            backgroundColor: 'black',
                            color: '#FFF'
                        },
                        actionsColumnIndex: -1
                    }}
                    actions={[
                        {
                            icon:()=><SettingsIcon style={{color:'#6200ea'}} />,
                            tooltip:'asignar cargo',
                            onClick:(e, rowData)=>history.push('/registerCargo/'
                            +rowData.id+'/'+
                            +rowData.id_bio+"/"
                            +rowData.firstNameEmp+'/'
                            +rowData.lastNameEmpP+'/'
                            +rowData.lastNameEmpM
                            )
                        }
                    ]}

                >

                </MaterialTable>
            </Container>
        </Container>
    )
}

export default withRouter (ControlCargos)