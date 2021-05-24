import { Container, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import {PORT_URL} from '../../../PortURL'
const useStyles=makeStyles((theme)=>({
    alingBott:{
        margin:'2rem'
    }
}))
const InfoEmp = (props) => {
    const classes=useStyles()
    const [asistencia, setAsistencia]=useState([])
    const a=props.location.pathname
    var b=a.split('/')
    var c=b[2]
    console.log(c)

    useEffect(()=>{
        getAsistencia()
    },[])
    const getAsistencia=()=>{
        axios.get(`${PORT_URL}asistencia?id_bio=${b[3]}`)
        .then(resp=>{
            setAsistencia(resp.data)
        })
    }
    console.log(asistencia)
    const columnas=[
        {title:'ID BIO', field:'id_bio'},
        {title:'Fecha', field:'fecha'},
        {title:'Hora', field:'hora'},
    ]
    return (
        <Container style={{marginTop:'5rem'}} maxWidth='lg'>
            <Typography className={classes.alingBott} variant='h5'align='center'>Informacion de {b[4]} </Typography>
            <Container maxWidth='md'>
                <MaterialTable
                title={`Asistencia de ${b[4]}`}
                columns={columnas}
                data={asistencia}
                options={{
                    headerStyle:{
                        backgroundColor: 'black',
                        color: '#FFF'
                    },
                    actionsColumnIndex: -1
                }}
                ></MaterialTable>
            </Container>
        </Container>
    )
}

export default InfoEmp
