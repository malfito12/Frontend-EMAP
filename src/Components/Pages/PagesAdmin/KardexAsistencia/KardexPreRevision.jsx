import { Container, Grid, Paper, Typography, Box, makeStyles, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, BottomNavigation, BottomNavigationAction, Tabs, Tab } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { PORT_URL } from '../../../../PortURL'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const KardexPreRevision = () => {
    const classes = useStyles()
    const [empleado, setEmpleado] = useState([])
    const [marcaciones, setMarcaciones] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
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
        await axios.get(`${PORT_URL}empleadobio/${id}`)
            .then(resp => setEmpleado(resp.data))
            .catch(err => console.log(err))

        // await axios.get(`${PORT_URL}search/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
        // await axios.get(`${PORT_URL}sueldo/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
        await axios.get(`${PORT_URL}nuevoTodo/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => { setMarcaciones(resp.data) })
            .catch(err => { alert('el empleado no existe'); console.log(err) })
        // console.log(changeData)

        // console.log(marcaciones)
        // console.log(empleado)
    }
    //-----------------------------------------------------------------
    const subirInfo = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}subirinfo`, marcaciones)
            .then(resp => {
                alert('Informacion Guardada')
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------------------BOTTON DE NAVEGACION--------------------------------
    const [navigation, setNavigation] = useState(0)
    const handleNavigation = (e, newValue) => {
        setNavigation(newValue)
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //-----------------------------------------------------------------
    const [dos, setDos] = useState({
        fecha: '',
        ingreso1: '',
        ingreso2: '',
        salida1: '',
        salida2: '',
        dia: '',
        atraso: '',
        horasExtra: '',
        diaTrabajado: '',
        faltas: '',
        observaciones: ''
    })

    const openModalEdit = (e) => {
        setDos(e)
        setOpenEdit(true)
    }
    const closeModalEdit = () => {
        setOpenEdit(false)
    }
    const editar = (e) => {
        e.preventDefault()
        setDos({
            ...dos,
            ingreso1: dos.ingreso1
        })
        closeModalEdit()
    }
    const prueba = (e) => {
        setDos({
            ...dos,
            [e.target.name]: e.target.value
        })
    }
    console.log(dos)
    // console.log(changeData)
    return (
        <>
            <Container maxWidth={false} style={{ paddingTop: '4.5rem' }}>
                <Container maxWidth='lg'>
                    <Grid item xs={12} sm={5} >
                        <Paper className={classes.spacingBot}>
                            <Tabs
                                value={scroll}
                                onChange={scrollChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                style={{ height: 60 }}
                            >
                                <Tab label="Subir Info." style={{ fontSize: 'x-small' }} icon={<AcUnitIcon style={{fontSize:'large'}} />}/>
                                <Tab label="Control Resumen" style={{ fontSize: 'x-small' }} component={Link} to='/kardexRevision' icon={<AccountBalanceIcon style={{ fontSize:'large' }}/>} />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Container>
                <Typography className={classes.spacingBot} variant='h4' align='center'>Vista de Kardex</Typography>
                {/* <div align='center' style={{marginBottom:'3rem'}}>
            <Container maxWidth='sm'>
            <BottomNavigation variant='scrollable' style={{maxWidth:'sm'}} value={navigation} showLabels onChange={(e,newValue)=>handleNavigation(e,newValue)}>
                <BottomNavigationAction label='Subir Info.'  icon={<AcUnitIcon />} />
                <BottomNavigationAction label='Control Resumen' component={Link} to='/kardexRevision' icon={<AccountBalanceIcon />}/>
            </BottomNavigation>
            </Container>
            </div> */}
                <Grid container >
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography align='center' className={classes.spacingBot}>Introducir Informacion </Typography>
                                <form onSubmit={getMarcaciones}>
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
                            {empleado.length > 0 ? (
                                <>
                                    <Typography className={classes.spacingBot}>Nombre : {empleado[0].firstNameEmp} {empleado[0].lastNameEmpP} {empleado[0].lastNameEmpM}</Typography>
                                    <Typography className={classes.spacingBot}>C.I : {empleado[0].CIEmp}</Typography>
                                </>
                            ) : (<div></div>)}
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
                                            {/* <TableCell style={{ color: 'white', backgroundColor: "black" }}>Atraso1</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Atraso2</TableCell> */}
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
                                                    {/* <TableCell>{m.atraso1}</TableCell>
                                                <TableCell>{m.atraso2}</TableCell> */}
                                                    <TableCell >{m.observaciones}</TableCell>
                                                    {/* <TableCell>
                                                    <Button variant='contained' size='small' color='primary' onClick={()=>openModalEdit(m)}>edit</Button>
                                                </TableCell> */}
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
                                <Button variant='contained' size='small' color='primary' onClick={subirInfo}>subir informacion</Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={openEdit}
                onClose={closeModalEdit}
                maxWidth='md'
            >
                <Paper component={Box} p={1}>
                    <Typography variant='subtitle1' align='center'>editar</Typography>
                    <TextField
                        name='ingreso1'
                        defaultValue={dos.ingreso1}
                        onChange={prueba}
                    />
                    <Button variant='contained' color='primary' onClick={editar} >editar</Button>
                </Paper>
            </Dialog>
        </>
    )
}

export default KardexPreRevision
