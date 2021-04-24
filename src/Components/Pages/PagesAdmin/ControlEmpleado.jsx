import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {PORT_URL} from '../../../PortURL'

const useStyles=makeStyles((theme)=>({
    TyphoAlineation:{
        marginTop:'1.5rem',
        marginBottom:'1.5rem'
    },
}))

const ControlEmpleado = () => {
    const classes=useStyles()
    const [empleado,setEmpleado]=useState([])

    useEffect(()=>{
        getEmpleado()
    },[])
    const getEmpleado=async()=>{
        await axios.get(`${PORT_URL}empleado`)
        .then(resp=>{
            setEmpleado(resp.data)
        })
    }

    const columnas=[
        {title:'ID BIO', field:'id_bio'},
        {title:'Nombre', field:'firstNameEmp'},
        {title:'Apellido', field:'lastNameEmp'},
        {title:'Cargo', field:'cargo'},
        {title:'Sexo', field:'sexo'},
    ]
    return (
        <Container maxWidth='lg'>
            <Typography variant='h4' align='center' className={classes.TyphoAlineation}>Lista de Empleados</Typography>
            <Button component={Link} to='/registerEmp' style={{marginBottom:'2rem',backgroundColor:'#689f38', color:'white'}} variant='contained' >registrar empleado</Button>
            <Container maxWidth='md'>
                <MaterialTable
                    columns={columnas}
                    data={empleado}
                    options={{
                        headerStyle:{
                            backgroundColor:'#689f38',
                            color:'white'
                        },
                        actionsColumnIndex: -1
                    }}


                >

                </MaterialTable>
            </Container>
        </Container>
    )
}

export default ControlEmpleado
