import { Container, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PORT_URL } from '../../../PortURL'

const useStyles = makeStyles((theme) => ({
    alingBott: {
        margin: '2rem'
    }
}))
const InfoEmp = (props) => {
    const classes = useStyles()
    const [asistencia, setAsistencia] = useState([])
    const [empleado, setEmpleado] = useState([])
    const a = props.location.pathname
    var b = a.split('/')
    // var c=b[2]
    // console.log(c)

    const params = useParams()
    useEffect(() => {
        (async () => {
            await axios.get(`${PORT_URL}empleado/${params.id}`)
                .then(resp => {
                    setEmpleado(resp.data)
                    console.log(resp.data)
                })
                .catch(err => console.log(err))

            await axios.get(`${PORT_URL}asistencia/${b[3]}`)
                .then(resp => {
                    setAsistencia(resp.data)
                })
                .catch(err => {
                    alert('aun no se le asigno un horario')
                    console.log(err)
                })
        })()
    })

    console.log(asistencia)


    const columnas = [
        { title: 'ID BIO', field: 'id_bio' },
        { title: 'Fecha', field: 'fecha' },
        { title: 'Dia', field: 'dia' },
        // {title:'Hora', field:'hora'},
        { title: 'ingreso1', field: 'ingreso1' },
        { title: 'salida1', field: 'salida1' },
        { title: 'ingreso2', field: 'ingreso2' },
        { title: 'salida2', field: 'salida2' },
        { title: 'Observaciones', field: 'observaciones' },

    ]
    return (
        <Container maxWidth={false}>
            <Typography className={classes.alingBott} style={{ paddingTop: '5rem' }} variant='h5' align='center'>Informacion de {empleado.firstNameEmp}</Typography>
            <Container maxWidth='lg'>
                <MaterialTable
                    title={`Asistencia de ${empleado.firstNameEmp} `}
                    columns={columnas}
                    data={asistencia}
                    options={{
                        headerStyle: {
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
