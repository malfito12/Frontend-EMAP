import { Container, Grid, Paper, Tabs, Tab, makeStyles, Typography, TableContainer, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimerIcon from '@material-ui/icons/Timer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const ReporteCargos = () => {
    const classes = useStyles()
    const [empleadoCargo, setEmpleadoCargo] = useState([])


    useEffect(() => {
        getEmpleadoCargo()
    }, [])
    //--------------------------------------------------------
    //----------------------GET EMPLEADOS CARGO-------------------------------------
    const getEmpleadoCargo = async () => {
        await axios.get(`${PORT_URL}empleadoCargo`)
            .then(resp => {
                setEmpleadoCargo(resp.data)
            })
            .catch(err => console.log(err))
    }
    //----------------SCROLL----------------------------------------
    const [scroll, setScroll] = useState(3)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid container item xs={12} sm={7} justifyContent='flex-start'>
                    <Tabs
                        value={scroll}
                        onChange={scrollChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        style={{ height: 60, background: 'white', borderRadius: 5, marginBottom: '2rem' }}
                    >
                        <Tab label="Reporte Personal" style={{ fontSize: 'x-small' }} component={Link} to='/reportePersonal' icon={<AccountCircleIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Movimiento Personal" style={{ fontSize: 'x-small' }} icon={<DeviceHubIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Altas y Bajas" style={{ fontSize: 'x-small' }} component={Link} to='/reporteAltasBajas' icon={<TimerIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Cargos" style={{ fontSize: 'x-small' }} icon={<AccountCircleIcon style={{ height: 20 }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography variant='h5' align='center' className={classes.spacingBot}>REPORTE CARGOS DE PERSONAL</Typography>
                <Paper component={Box} p={1}>
                    <TableContainer style={{ maxHeight: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Id Biometrico</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombres</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido P</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido M</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Departamento</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Cargo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empleadoCargo.length > 0 ? (
                                    empleadoCargo.map(e => (
                                        <TableRow key={e._id}>
                                            <TableCell>{e.id_bio}</TableCell>
                                            <TableCell>{e.firstNameEmp}</TableCell>
                                            <TableCell>{e.lastNameEmpP}</TableCell>
                                            <TableCell>{e.lastNameEmpM}</TableCell>
                                            <TableCell>{e.departamentEmp}</TableCell>
                                            <TableCell>{e.cargoEmp}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align='center' colSpan='6'>no existe informacion</TableCell>
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

export default ReporteCargos
