import { Box, Button, Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { PORT_URL } from '../../../PortURL'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const Consultas = () => {
    const classes = useStyles()
    const [consulta, setConsulta] = useState([])
    const [changeData, setChangeData] = useState({
        cedula: '',
    })

    //------------------------------------------------
    const buscarInfo = async (e) => {
        e.preventDefault()
        await axios.get(`${PORT_URL}consulta?cedula=${changeData.cedula}`)
            .then(resp => {
                setConsulta(resp.data)
                document.getElementById('id-table').style.display = 'block'
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
        // console.log(changeData)
    }
    //------------------------------
    //-----------------HANDLE CHANGE--------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------------------------------------------
    const array = []
    if (consulta.length > 0) {
        const horario = consulta[0].cod_horario
        switch (horario) {
            case '1111100':
                array.push({
                    lunes: consulta[0].ingreso1,
                    martes: consulta[0].ingreso1,
                    miercoles: consulta[0].ingreso1,
                    jueves: consulta[0].ingreso1,
                    viernes: consulta[0].ingreso1,
                    sabado: 'libre',
                    domingo: 'libre',

                })
                array.push({
                    lunes: consulta[0].salida1,
                    martes: consulta[0].salida1,
                    miercoles: consulta[0].salida1,
                    jueves: consulta[0].salida1,
                    viernes: consulta[0].salida1,
                    sabado: 'libre',
                    domingo: 'libre',

                })
                array.push({
                    lunes: consulta[0].ingreso2,
                    martes: consulta[0].ingreso2,
                    miercoles: consulta[0].ingreso2,
                    jueves: consulta[0].ingreso2,
                    viernes: consulta[0].ingreso2,
                    sabado: 'libre',
                    domingo: 'libre',

                })
                array.push({
                    lunes: consulta[0].salida2,
                    martes: consulta[0].salida2,
                    miercoles: consulta[0].salida2,
                    jueves: consulta[0].salida2,
                    viernes: consulta[0].salida2,
                    sabado: 'libre',
                    domingo: 'libre',

                })
                break;
            case '1111110':
                array.push({
                    lunes: consulta[0].ingreso1,
                    martes: consulta[0].ingreso1,
                    miercoles: consulta[0].ingreso1,
                    jueves: consulta[0].ingreso1,
                    viernes: consulta[0].ingreso1,
                    sabado: consulta[0].ingreso1,
                    domingo: 'libre',

                })
                array.push({
                    lunes: consulta[0].salida1,
                    martes: consulta[0].salida1,
                    miercoles: consulta[0].salida1,
                    jueves: consulta[0].salida1,
                    viernes: consulta[0].salida1,
                    sabado: consulta[0].salida1,
                    domingo: 'libre',

                })
                array.push({
                    lunes: consulta[0].ingreso2,
                    martes: consulta[0].ingreso2,
                    miercoles: consulta[0].ingreso2,
                    jueves: consulta[0].ingreso2,
                    viernes: consulta[0].ingreso2,
                    sabado: consulta[0].ingreso2,
                    domingo: 'libre',

                })
                array.push({
                    lunes: consulta[0].salida2,
                    martes: consulta[0].salida2,
                    miercoles: consulta[0].salida2,
                    jueves: consulta[0].salida2,
                    viernes: consulta[0].salida2,
                    sabado: consulta[0].salida2,
                    domingo: 'libre',

                })
                break;
            case '1111111':
                array.push({
                    lunes: consulta[0].ingreso1,
                    martes: consulta[0].ingreso1,
                    miercoles: consulta[0].ingreso1,
                    jueves: consulta[0].ingreso1,
                    viernes: consulta[0].ingreso1,
                    sabado: consulta[0].ingreso1,
                    domingo: consulta[0].ingreso1,

                })
                array.push({
                    lunes: consulta[0].salida1,
                    martes: consulta[0].salida1,
                    miercoles: consulta[0].salida1,
                    jueves: consulta[0].salida1,
                    viernes: consulta[0].salida1,
                    sabado: consulta[0].salida1,
                    domingo: consulta[0].salida1,

                })
                array.push({
                    lunes: consulta[0].ingreso2,
                    martes: consulta[0].ingreso2,
                    miercoles: consulta[0].ingreso2,
                    jueves: consulta[0].ingreso2,
                    viernes: consulta[0].ingreso2,
                    sabado: consulta[0].ingreso2,
                    domingo: consulta[0].ingreso2,

                })
                array.push({
                    lunes: consulta[0].salida2,
                    martes: consulta[0].salida2,
                    miercoles: consulta[0].salida2,
                    jueves: consulta[0].salida2,
                    viernes: consulta[0].salida2,
                    sabado: consulta[0].salida2,
                    domingo: consulta[0].salida2,

                })
                break;
            default:
                console.log('no existe')
        }
    }
    // console.log(array)
    //------------------------------------------------
    return (
        <Container maxWidth={false} style={{ paddingTop: '5rem' }}>
            <Container maxWidth='sm' >
                <Typography align='center' variant='h5' className={classes.spacingBot}>Consultas</Typography>
                <Paper component={Box} p={2} className={classes.spacingBot}>
                    <form onSubmit={buscarInfo}>
                        <TextField
                            name='cedula'
                            label='Cedula de Identidad'
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            fullWidth
                            className={classes.spacingBot}
                            required
                        />
                        <div align='center'>
                            <Button size='small' variant='contained' color='primary' type='submit'>buscar</Button>
                        </div>
                    </form>
                </Paper>
            </Container>
            <Container maxWidth='md'>
                <Paper component={Box} p={2} style={{ display: 'none' }} id='id-table'>
                    {consulta.length > 0 ? (
                        <>
                            <Typography align='center' variant='subtitle1' className={classes.spacingBot}>Resultado</Typography>
                            <Typography align='center'>Nombre: {consulta[0].firstNameEmp} {consulta[0].lastNameEmpP} {consulta[0].lastNameEmpM}</Typography>
                            <Typography align='center'>Tipo de Horario: {consulta[0].typeHorario}</Typography>
                        </>
                    ) : null}
                    <TableContainer>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell style={{ color: 'white', background: 'black' }}>Hrs</TableCell> */}
                                    <TableCell style={{ color: 'white', background: 'black' }}>Lunes</TableCell>
                                    <TableCell style={{ color: 'white', background: 'black' }}>Martes</TableCell>
                                    <TableCell style={{ color: 'white', background: 'black' }}>Miercoles</TableCell>
                                    <TableCell style={{ color: 'white', background: 'black' }}>Jueves</TableCell>
                                    <TableCell style={{ color: 'white', background: 'black' }}>Viernes</TableCell>
                                    <TableCell style={{ color: 'white', background: 'black' }}>Sabado</TableCell>
                                    <TableCell style={{ color: 'white', background: 'black' }}>Domingo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {consulta.length > 0 ? (
                                    array.map((c, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{c.lunes}</TableCell>
                                            <TableCell>{c.martes}</TableCell>
                                            <TableCell>{c.miercoles}</TableCell>
                                            <TableCell>{c.jueves}</TableCell>
                                            <TableCell>{c.viernes}</TableCell>
                                            <TableCell>{c.sabado}</TableCell>
                                            <TableCell>{c.domingo}</TableCell>
                                        </TableRow>
                                    ))
                                    // <TableRow>
                                    //     <TableCell>{consulta[0].ingreso1}</TableCell>
                                    //     <TableCell>{consulta[0].ingreso1}</TableCell>
                                    //     <TableCell>{consulta[0].ingreso1}</TableCell>
                                    //     <TableCell>{consulta[0].ingreso1}</TableCell>
                                    //     <TableCell>{consulta[0].ingreso1}</TableCell>
                                    //     <TableCell>{consulta[0].ingreso1}</TableCell>
                                    //     <TableCell>{consulta[0].ingreso1}</TableCell>
                                    // </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell align='center' colSpan='7'>no existe informacion</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

        </Container>
    )
}

export default Consultas
