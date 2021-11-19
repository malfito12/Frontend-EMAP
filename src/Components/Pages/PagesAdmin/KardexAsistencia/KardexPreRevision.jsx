import { Container, Grid, Paper, Typography, Box, makeStyles, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, Tabs, Tab } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { PORT_URL } from '../../../../PortURL'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Link } from 'react-router-dom'
import { AlertAddAsistencia, AlertErrorAsistencia } from '../../../Atoms/Alerts/AlertReEdDe'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const KardexPreRevision = () => {
    const classes = useStyles()
    // const [empleado, setEmpleado] = useState([])
    const [marcaciones, setMarcaciones] = useState([])
    const [openConfirmDatos, setOpenConfirmDatos] = useState(false)
    const [openAlertAdd, setOpenAlertAdd] = useState(false)
    const [openAlertError, setOpenAlertError] = useState(false)
    const [changeData, setChangeData] = useState({
        id_bio: '',
        fechaini: '',
        fechafin: ''
    })

    //---------------GET MARCACIONES--------------------------------
    const getMarcaciones = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        const fechaini = changeData.fechaini
        const fechafin = changeData.fechafin
        //busqueda de empleado
        // await axios.get(`${PORT_URL}personalAsisSearch/${id}`)
        //     .then(resp => setEmpleado(resp.data))
        //     .catch(err => console.log(err))

        //buscqueda de marcaciones
        await axios.get(`${PORT_URL}nuevoTodo/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => { setMarcaciones(resp.data) })
            .catch(err => { alert('el empleado no existe'); console.log(err) })

    }
    //---------------------------SUBIR DATOS ---------------------------------
    const openModalCofirmDatos = () => {
        setOpenConfirmDatos(true)
    }
    const closeModalConfirmDatos = () => {
        setOpenConfirmDatos(false)
    }
    const subirInfo = async (e) => {
        e.preventDefault()
        if (marcaciones.length > 0) {
            await axios.post(`${PORT_URL}subirinfo`, marcaciones)
                .then(resp => {
                    closeModalConfirmDatos()
                    openCloseAlertAdd()
                    // console.log(resp.data)
                })
                .catch(err => console.log(err))
        } else {
            closeModalConfirmDatos()
            openCloseAlertError()
        }
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //---------------------ALERT REGISTER---------------------------------------
    const openCloseAlertAdd = () => {
        setOpenAlertAdd(!openAlertAdd)
    }
    const openCloseAlertError = () => {
        setOpenAlertError(!openAlertError)
    }
    //-----------------------------------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //--------------------BUSCAR INFORMACION DE EMPLEADO---------------------------------------
    const [name, setName] = useState([])
    const getPrueba = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        await axios.get(`${PORT_URL}personalAsisSearch/${id}`)
            .then(resp => setName(resp.data))
            .catch(err => console.log(err))
    }
    //-----------------------------------------------------------------

    // console.log(dos)
    // console.log(changeData)
    // console.log(empleado)
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid container item xs={12} sm={6} justifyContent='flex-start'>
                    <Tabs
                        value={scroll}
                        onChange={scrollChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        style={{ height: 60, background: 'white', borderRadius: 5, marginBottom: '2rem' }}
                    >
                        <Tab label="Subir Info." style={{ fontSize: 'x-small' }} icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                        <Tab label="Control Resumen" style={{ fontSize: 'x-small' }} component={Link} to='/kardexRevision' icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth={false} >
                <Typography className={classes.spacingBot} variant='h5' align='center'>ASISTENCIAS DE PERSONAL</Typography>
                <Grid container >
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography align='center' className={classes.spacingBot}>Introducir Informacion </Typography>
                                <form onSubmit={getPrueba}>
                                    <TextField
                                        name='id_bio'
                                        label='ID Biometrico'
                                        variant='outlined'
                                        type='number'
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button type='submit' style={{ display: 'none' }}></Button>
                                </form>
                                {name.length > 0 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label='Nombre'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                className={classes.spacingBot}
                                                value={name[0].firstNameEmp}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label='Apellido P'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                className={classes.spacingBot}
                                                value={name[0].lastNameEmpP}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label='Apellido M'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                className={classes.spacingBot}
                                                value={name[0].lastNameEmpM}
                                            />
                                        </Grid>
                                    </Grid>
                                ) : null}
                                <form onSubmit={getMarcaciones}>
                                    <TextField
                                        name='fechaini'
                                        label='fecha Inicio'
                                        variant='outlined'
                                        type='date'
                                        fullWidth
                                        size='small'
                                        InputLabelProps={{ shrink: true }}
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required

                                    />
                                    <TextField
                                        name='fechafin'
                                        label='fecha fin'
                                        variant='outlined'
                                        type='date'
                                        fullWidth
                                        size='small'
                                        InputLabelProps={{ shrink: true }}
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div align='center'>
                                        <Button variant='contained' color='primary' size='small' type='submit'>Buscar</Button>
                                    </div>
                                </form>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper component={Box} p={1}>
                            {/* {empleado.length > 0 ? (
                                <>
                                    <Typography className={classes.spacingBot}>Nombre : {empleado[0].firstNameEmp} {empleado[0].lastNameEmpP} {empleado[0].lastNameEmpM}</Typography>
                                    <Typography className={classes.spacingBot}>C.I : {empleado[0].CIEmp}</Typography>
                                </>
                            ) : (null)} */}
                            <TableContainer style={{ maxHeight: 440 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: 'white', backgroundColor: "black", width: '15%' }}>Fecha</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Dia</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Ingreso1</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Salida1</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Ingreso2</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Salida2</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Atraso</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Horas Extra</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Horas Trabj.</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Dia Trab.</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Faltas</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Observaciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {marcaciones.length > 0 ? (
                                            marcaciones.map((m, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{m.fecha}</TableCell>
                                                    <TableCell>{m.dia}</TableCell>
                                                    <TableCell>{m.ingreso1}</TableCell>
                                                    <TableCell>{m.salida1}</TableCell>
                                                    <TableCell>{m.ingreso2}</TableCell>
                                                    <TableCell>{m.salida2}</TableCell>
                                                    <TableCell>{m.atraso}</TableCell>
                                                    <TableCell>{m.horasExtra}</TableCell>
                                                    <TableCell>{m.horasDeTrabajo}</TableCell>
                                                    <TableCell>{m.diaTrabajado}</TableCell>
                                                    <TableCell>{m.faltas}</TableCell>
                                                    <TableCell >{m.observaciones}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell align='center' colSpan='9'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div align='center'>
                                <Button variant='contained' size='small' color='primary' onClick={openModalCofirmDatos}>subir informacion</Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={openConfirmDatos}
                onClose={closeModalConfirmDatos}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center'>Los Datos Existentes de modificarán</Typography>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>¿Estas seguro de realizar esta acción?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={subirInfo} >aceptar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalConfirmDatos} >cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
            <AlertAddAsistencia name={changeData.id_bio} open={openAlertAdd} onClose={openCloseAlertAdd} />
            <AlertErrorAsistencia open={openAlertError} onClose={openCloseAlertError} />
        </>
    )
}

export default KardexPreRevision
