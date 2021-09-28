import { Button, Box, Container, Dialog, makeStyles, Paper, Typography, TextField, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, MenuItem, Tabs, Tab } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { PORT_URL } from '../../../PortURL'
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimerIcon from '@material-ui/icons/Timer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const RegisterCargo = () => {
    const classes = useStyles()
    const [openRegisterDepartament, setOpenRegisterDepartament] = useState(false)
    const [openDeleteDepartament, setOpenDeleteDepartament] = useState(false)
    const [departament, setDepartament] = useState([])
    const [openRegisterCargo, setOpenRegisterCargo] = useState(false)
    const [openDeleteCargo, setOpenDeleteCargo] = useState(false)
    const [cargo, setCargo] = useState([])
    const [changeData, setChangeData] = useState({
        cod_cargo: '',
        nameCargo: '',
        nameDepartament: '',
        haber_basico: ''
    })
    const [changeData2, setChangeData2] = useState({
        cod_dep: '',
        nameDepartament: ''
    })

    useEffect(() => {
        getCargo()
        getDepartament()
    }, [])
    //----------------POST CARGO-----------------------------
    const openModalRegisterCargo = () => {
        setOpenRegisterCargo(true)
    }
    const closeModalRegisterCargo = () => {
        setOpenRegisterCargo(false)
    }

    const postCargo = async (e) => {
        e.preventDefault()
        var aux = changeData.nameDepartament
        aux = aux.split("/")
        const data = {
            cod_dep: aux[1],
            nameDepartament: aux[0],
            cod_cargo: changeData.cod_cargo,
            nameCargo: changeData.nameCargo,
            haber_basico: changeData.haber_basico
        }
        await axios.post(`${PORT_URL}cargo`, data)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
        closeModalRegisterCargo()
        getCargo()
    }
    //---------------------GET CARGO---------------------------------
    const getCargo = async () => {
        await axios.get(`${PORT_URL}cargo`)
            .then(resp => setCargo(resp.data))
            .catch(err => console.log(err))

    }
    // console.log(cargo)
    //--------------------------------------------------------------
    //----------------------DELETE CARGO--------------------------------
    const openModalDeleteCargo = (e) => {
        setChangeData(e)
        setOpenDeleteCargo(true)
    }
    const closeModaldeleteCargo = () => {
        setOpenDeleteCargo(false)
    }
    const deleteCargo = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.delete(`${PORT_URL}cargo/${id}`)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
        closeModaldeleteCargo()
        getCargo()
    }
    //-------------------------POST DEPARTAMENT-------------------------------
    const openModalRegisterDepartament = (e) => {
        // setChangeData2(e)
        setOpenRegisterDepartament(true)
    }
    const closeModalRegisterDepartament = () => {
        setOpenRegisterDepartament(false)
    }
    const postDepartament = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}departament`, changeData2)
            .then(resp => {
                closeModalRegisterDepartament()
                getDepartament()
                console.log(resp.data)
            })
            .catch(err => { alert('el N° de codigo ya existe'); console.log(err) })

    }
    //--------------------------GET DEPARTAMENT-----------------------
    const getDepartament = async () => {
        await axios.get(`${PORT_URL}departament`)
            .then(resp => setDepartament(resp.data))
            .catch(err => console.log(err))

    }
    //-------------------------UPDATE DEPARTAMENT-----------------------
    //--------------------------DELETE DEPARTAMENT----------------------
    const openModalDeteleDepartament = (e) => {
        setChangeData2(e)
        setOpenDeleteDepartament(true)
    }
    const closeModalDeleteDepartament = () => {
        setOpenDeleteDepartament(false)
    }
    const deleteDepartament = async (e) => {
        e.preventDefault()
        const id = changeData2._id
        await axios.delete(`${PORT_URL}departament/${id}`)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
        closeModalDeleteDepartament()
        getDepartament()
    }
    //-----------------------------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    const handleChange2 = (e) => {
        setChangeData2({
            ...changeData2,
            [e.target.name]: e.target.value
        })
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(1)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    //--------------------------------------------------------------
    console.log(changeData)
    // console.log(changeData2)
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid item xs={12} sm={5}>
                    <Paper  className={classes.spacingBot}>
                        <Tabs
                            value={scroll}
                            onChange={scrollChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            style={{ height: 60 }}
                        >
                            <Tab label="Pesonal" style={{ fontSize: 'x-small' }} component={Link} to='/controlEmp' icon={<AccountCircleIcon style={{ height: 20 }} />} />
                            <Tab label="Cargos" style={{ fontSize: 'x-small' }} component={Link} to='/registerCargo' icon={<DeviceHubIcon style={{ height: 20 }} />} />
                            <Tab label="Horarios" style={{ fontSize: 'x-small' }} component={Link} to='/controlHorarios' icon={<TimerIcon style={{ height: 20 }} />} />
                        </Tabs>
                    </Paper>
                </Grid>
                <Typography className={classes.spacingBot} variant='h5' align='center'>Registro de Cargos</Typography>
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        {/*----------------------------TABLE DEPARTAMENT---------------------------*/}
                        <Grid item xs={12} sm={6}>
                            <Button onClick={openModalRegisterDepartament} className={classes.spacingBot} variant='contained' color='primary'>Registrar Departamento</Button>
                            <Paper>
                                <TableContainer style={{ maxHeight: 440 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Codigo</TableCell>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre Departamento</TableCell>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {departament.length > 0 ? (departament.map(d => (
                                                <TableRow key={d._id}>
                                                    <TableCell>{d.cod_dep}</TableCell>
                                                    <TableCell>{d.nameDepartament}</TableCell>
                                                    <TableCell>
                                                        <Grid container justify='space-evenly'>
                                                            <Tooltip title='editar'>
                                                                <IconButton size='small' >
                                                                    <SettingsIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='eliminar'>
                                                                <IconButton size='small' onClick={() => openModalDeteleDepartament(d)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))) : (
                                                <TableRow>
                                                    <TableCell align='center' colSpan='3'>no existen datos</TableCell>
                                                </TableRow>
                                            )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                        {/*----------------------------TABLE CARGO---------------------------*/}
                        <Grid item xs={12} sm={6}>
                            <Button onClick={openModalRegisterCargo} className={classes.spacingBot} variant='contained' color='primary'>Registrar Cargo</Button>
                            <Paper>
                                <TableContainer style={{ maxHeight: 440 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Codigo</TableCell>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Depatamento</TableCell>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}>Haber Basico</TableCell>
                                                <TableCell style={{ color: 'white', backgroundColor: "black" }}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cargo.length > 0 ? (cargo.map(c => (
                                                <TableRow key={c._id}>
                                                    <TableCell>{c.cod_cargo}</TableCell>
                                                    <TableCell>{c.nameCargo}</TableCell>
                                                    <TableCell>{c.nameDepartament}</TableCell>
                                                    <TableCell>{c.haber_basico}</TableCell>
                                                    <TableCell>
                                                        <Grid container justify='space-evenly'>
                                                            <Tooltip title='editar'>
                                                                <IconButton size='small' >
                                                                    <SettingsIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='eliminar'>
                                                                <IconButton size='small' onClick={() => openModalDeleteCargo(c)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))) : (
                                                <TableRow>
                                                    <TableCell align='center' colSpan='4'>no existen datos</TableCell>
                                                </TableRow>
                                            )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Container>
            {/*-------------------------------DEPARTAMENT------------------------------*/}
            <Dialog
                open={openRegisterDepartament}
                onClose={closeModalRegisterDepartament}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <div style={{ marginLeft: '15rem', marginRight: '15rem' }}></div>
                    <Typography variant='subtitle1' align='center'>Registrar Departamento</Typography>
                    <Grid container direction='column'>
                        <TextField
                            name='cod_dep'
                            label='Codigo de Departamento'
                            variant='outlined'
                            fullWidth
                            type='number'
                            size='small'
                            className={classes.spacingBot}
                            onChange={handleChange2}
                        />
                        <TextField
                            name='nameDepartament'
                            label='Nombre Departamento'
                            variant='outlined'
                            fullWidth
                            size='small'
                            className={classes.spacingBot}
                            onChange={handleChange2}
                        />
                    </Grid>
                    <Grid container justify='space-evenly'>
                        <Button onClick={postDepartament} variant='contained' color='primary' >registrar</Button>
                        <Button onClick={closeModalRegisterDepartament} variant='contained' color='secondary'>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
            {/*-------------------------------CARGO------------------------------*/}
            <Dialog
                open={openRegisterCargo}
                onClose={closeModalRegisterCargo}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <div style={{ marginLeft: '15rem', marginRight: '15rem' }}></div>
                    <Typography variant='subtitle1' align='center'>Registrar Cargo</Typography>
                    <Grid container direction='column'>
                        <TextField
                            name='nameDepartament'
                            label='Departamento'
                            variant='outlined'
                            select
                            value={changeData.nameDepartament}
                            size='small'
                            className={classes.spacingBot}
                            onChange={handleChange}
                        >
                            {departament && departament.map(d => (
                                <MenuItem key={d._id} value={`${d.nameDepartament}/${d.cod_dep}`}>{d.nameDepartament}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            name='cod_cargo'
                            label='Codigo de Cargo'
                            variant='outlined'
                            type='number'
                            fullWidth
                            size='small'
                            className={classes.spacingBot}
                            onChange={handleChange}
                        />
                        <TextField
                            name='nameCargo'
                            label='Nombre del Cargo'
                            variant='outlined'
                            fullWidth
                            size='small'
                            className={classes.spacingBot}
                            onChange={handleChange}
                        />
                        <TextField
                            name='haber_basico'
                            label='Haber Basico'
                            variant='outlined'
                            fullWidth
                            type='number'
                            inputProps={{ step: 'any' }}
                            size='small'
                            className={classes.spacingBot}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid container justify='space-evenly'>
                        <Button onClick={postCargo} variant='contained' color='primary' >registrar</Button>
                        <Button onClick={closeModalRegisterCargo} variant='contained' color='secondary'>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
            {/* //--------------------MODAL DELETE DEPARTAMENT---------------------- */}
            <Dialog
                open={openDeleteDepartament}
                onClose={closeModalDeleteDepartament}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography className={classes.spacingBot} variant='subtitle1' align='center'>Estas seguro de eliminar el Departamento "{changeData2.nameDepartament}"</Typography>
                    <Grid container justify='space-evenly'>
                        <Button onClick={deleteDepartament} size='small' variant='contained' color='primary'>aceptar</Button>
                        <Button onClick={closeModalDeleteDepartament} size='small' variant='contained' color='secondary'>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
            {/* //--------------------MODAL DELETE CARGO---------------------- */}
            <Dialog
                open={openDeleteCargo}
                onClose={closeModaldeleteCargo}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography className={classes.spacingBot} variant='subtitle1' align='center'>Estas seguro de eliminar el Cargo "{changeData.nameCargo}"</Typography>
                    <Grid container justify='space-evenly'>
                        <Button onClick={deleteCargo} size='small' variant='contained' color='primary'>aceptar</Button>
                        <Button onClick={closeModaldeleteCargo} size='small' variant='contained' color='secondary'>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default RegisterCargo
