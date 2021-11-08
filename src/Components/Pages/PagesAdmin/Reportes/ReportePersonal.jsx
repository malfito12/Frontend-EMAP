import { Button, Container, Box, Grid, Paper, Tab, Tabs, Typography, makeStyles, TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React, { Fragment, useEffect, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimerIcon from '@material-ui/icons/Timer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PrintIcon from '@material-ui/icons/Print'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const ReportePersonal = () => {
    const classes = useStyles()
    const [empleado, setEmpleado] = useState([])
    const [departamento, setDepartamento] = useState([])

    useEffect(() => {
        getEmpleado()
        getDepartament()
    }, [])


    //-----------------------------GET EMPELADOS-------------------------------
    const getEmpleado = async () => {
        await axios.get(`${PORT_URL}empleado`)
            .then(resp => {
                setEmpleado(resp.data)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //------------------------GET DEPATTAMENTO-------------------------------
    const getDepartament = async () => {
        await axios.get(`${PORT_URL}departament`)
            .then(resp => {
                setDepartamento(resp.data)
                // console.log('departamentos')
            })
            .catch(err => console.log(err))
    }

    //------------------------OPERACIONES PARA NUEVA TABLA-------------------------------
    const array1 = []
    var a = 0;
    while (a < departamento.length) {
        for (var i = 0; i < empleado.length; i++) {
            if (departamento[a].nameDepartament === empleado[i].departamentEmp) {
                array1.push(departamento[a])
                break;
            }
        }
        a++;
    }
    // console.log(array1)
    //------------------------PDF GENERATE-------------------------------
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        // const doc = new jsPDF()
        // const doc = new jsPDF('l','pt','letter')
        doc.setFontSize(20)
        doc.addFont('Calibri', 'Calibri', 'normal');
        doc.setFont('Calibri');
        doc.text('Lista de Personal', 6, 0.5)
        doc.setFontSize(11)
        doc.autoTable({ html: "#id-table", startY: 1 })
        doc.output('dataurlnewwindow')
    }
    //---------------------------------------------------------------------
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    // console.log(empleado)
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid item xs={12} sm={5}>
                    <Paper className={classes.spacingBot}>
                        <Tabs
                            value={scroll}
                            onChange={scrollChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            style={{ height: 60 }}
                        >
                            <Tab label="Reporte Personal" style={{ fontSize: 'x-small' }} icon={<AccountCircleIcon style={{ height: 20 }} />} />
                            <Tab label="Reporte Movimiento Personal" style={{ fontSize: 'x-small' }} component={Link} to='/reporteMovimiento' icon={<DeviceHubIcon style={{ height: 20 }} />} />
                            <Tab label="Reporte Altas y Bajas" style={{ fontSize: 'x-small' }} component={Link} to='/reporteAltasBajas' icon={<TimerIcon style={{ height: 20 }} />} />
                        </Tabs>
                    </Paper>

                </Grid>

                {/* <Typography variant='h4' align='center' className={classes.TyphoAlineation}>Lista de Empleados</Typography> */}
                {/* <Button component={Link} to='/registerEmp' style={{ marginBottom: '2rem', backgroundColor: '#689f38', color: 'white' }} variant='contained' >registrar empleado</Button> */}
                {/* <Button style={{ marginBottom: '2rem', backgroundColor: '#689f38', color: 'white' }} variant='contained' onClick={pdfGenerate} endIcon={<PrintIcon />} >Imprimir</Button> */}
            </Container>
            <Container maxWidth='lg'>
                <Typography variant='h5' align='center' className={classes.spacingBot}>Lista de Personal</Typography>
                <div align='right'>
                    <Button style={{ backgroundColor: '#689f38', color: 'white' }} className={classes.spacingBot} variant='contained' onClick={pdfGenerate} endIcon={<PrintIcon />} >Imprimir</Button>
                </div>
                <Paper component={Box} p={1}>
                    <TableContainer style={{ maxHeight: 540 }}>
                        <Table stickyHeader id="id-table" style={{ display: 'none' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>ID Biometrico</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>N° de Item</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido P</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido M</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Sexo</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Departamento</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Cargo</TableCell>
                                </TableRow>

                            </TableHead>
                            {array1.length > 0 && empleado.length > 0 ? (
                                array1.map((d, index) => (
                                    <TableBody key={index}>
                                        <TableRow key={d._id}>
                                            <TableCell colSpan='8'>{d.nameDepartament}</TableCell>
                                        </TableRow>
                                        {empleado.map((e, index) => (
                                            <Fragment key={index}>
                                                {d.nameDepartament === e.departamentEmp ? (
                                                    <TableRow >
                                                        <TableCell component='th' scope='col'>{e.id_bio}</TableCell>
                                                        <TableCell>{e.itemEmp}</TableCell>
                                                        <TableCell>{e.firstNameEmp}</TableCell>
                                                        <TableCell>{e.lastNameEmpP}</TableCell>
                                                        <TableCell>{e.lastNameEmpM}</TableCell>
                                                        <TableCell>{e.sexoEmp}</TableCell>
                                                        <TableCell>{e.departamentEmp}</TableCell>
                                                        <TableCell>{e.cargoEmp}</TableCell>
                                                    </TableRow>
                                                ) : (null)}
                                            </Fragment>
                                        ))}
                                    </TableBody>
                                ))
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center' colSpan='8'>no existe informacion</TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                        {/*-----------------------------------------------------------------------------------*/}
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>ID Biometrico</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>N° de Item</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido P</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido M</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Sexo</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Departamento</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Cargo</TableCell>
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {empleado.length > 0 ? (
                                    empleado.map((e, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{e.id_bio}</TableCell>
                                            <TableCell>{e.itemEmp}</TableCell>
                                            <TableCell>{e.firstNameEmp}</TableCell>
                                            <TableCell>{e.lastNameEmpP}</TableCell>
                                            <TableCell>{e.lastNameEmpM}</TableCell>
                                            <TableCell>{e.sexoEmp}</TableCell>
                                            <TableCell>{e.departamentEmp}</TableCell>
                                            <TableCell>{e.cargoEmp}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow >
                                        <TableCell align='center' colSpan='8'>no existe informacion</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    )
}

export default ReportePersonal
