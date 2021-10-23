import { Container, Box, Grid, Paper, TextField, Typography, makeStyles, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, InputAdornment, Dialog, Tabs, Tab } from '@material-ui/core'
import axios from 'axios'
import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { PORT_URL } from '../../../PortURL'
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import { AlertDelete, AlertEdit, AlertRegister, AlertErrorRegisterPermiso } from '../../Atoms/Alerts/AlertReEdDe'
import PlayListAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))
const ControlPermisos = () => {
    const classes = useStyles()
    const [permiso, setPermiso] = useState([])
    const [perm, setPerm] = useState("")
    const [openEditPermiso, setOpenEditPermiso] = useState(false)
    const [openDeletePermiso, setOpenDeletePermiso] = useState(false)
    const [openAlertRegisterPermiso, setOpenAlertRegisterPermiso] = useState(false)
    const [openAlertEditPermiso, setOpenAlertEditPermiso] = useState(false)
    const [openAlertDeletePermiso, setOpenAlertDeletePermiso] = useState(false)
    const [openErrorAlertRegisterPermiso, setOpenErrorAlertRegisterPermiso] = useState(false)
    const [changeData, setChangeData] = useState({
        id_bio: '',
        namePermiso: '',
        tipoPermiso: '',
        fechaPermisoIni: '',
        fechaPermisoFin: ''
    })
    const [changeDataEdit, setChangeDataEdit] = useState({
        id_bio: '',
        namePermiso: '',
        tipoPermiso: '',
        fechaPermisoIni: '',
        fechaPermisoFin: ''
    })

    useEffect(() => {
        getPermiso()
    }, [])

    //----------------GET PERMISOS--------------------------------------------
    const getPermiso = async () => {
        await axios.get(`${PORT_URL}permiso`)
            .then(resp => {
                setPermiso(resp.data)
                console.log(resp.data)
            })
            .catch(err => { console.log(err) })
    }
    //----------------POST PERMISOS-------------------------------------------
    const postPermiso = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}permiso`, changeData)
            .then(resp => {
                openCloseAlertRegisterPermiso()
                console.log(resp.data)
            })
            .catch(err => {
                openCloseErrorAlertRegisterPermiso()
                console.log(err)
            })
        setChangeData({
            id_bio: '',
            namePermiso: '',
            tipoPermiso: '',
            fechaPermisoIni: '',
            fechaPermisoFin: ''
        })
        getPermiso()
    }
    //----------------EDIT PERMISOS-------------------------------------------
    const openModalEditPermiso = (e) => {
        setChangeDataEdit(e)
        setOpenEditPermiso(true)
    }
    const closeModalEditPermiso = () => {
        setOpenEditPermiso(false)
    }
    const sendEditPermiso = async (e) => {
        e.preventDefault()
        const id = changeDataEdit._id
        await axios.put(`${PORT_URL}permiso/${id}`, changeDataEdit)
            .then(resp => {
                openCloseAlertEditPermiso()
                console.log(resp.data)
            })
            .catch(err => { console.log(err) })
        closeModalEditPermiso()
        getPermiso()
    }
    //----------------DELETE PERMISOS-------------------------------------------
    const openModalDeletePermiso = (e) => {
        setChangeDataEdit(e)
        setOpenDeletePermiso(true)
    }
    const closeModalDeletePermiso = () => {
        setOpenDeletePermiso(false)
    }
    const sendDeletePermiso = async (e) => {
        e.preventDefault()
        const id = changeDataEdit._id
        await axios.delete(`${PORT_URL}permiso/${id}`)
            .then(resp => {
                openCloseAlertDeletePermiso()
                console.log(resp.data)
            })
            .catch(err => { console.log(err) })
        closeModalDeletePermiso()
        getPermiso()
    }
    //----------------BUSCADOR-------------------------------------------
    const searchPermiso = (perm) => {
        return function (x) {
            return x.id_bio.includes(perm) ||
                x.firstNameEmp.toLowerCase().includes(perm) ||
                x.namePermiso.toLowerCase().includes(perm) ||
                x.fechaPermisoIni.includes(perm) ||
                x.fechaPermisoFin.includes(perm) ||
                !perm
        }
    }
    //----------------ALERTAS-------------------------------------------
    const openCloseAlertRegisterPermiso = () => {
        setOpenAlertRegisterPermiso(!openAlertRegisterPermiso)
    }
    const openCloseErrorAlertRegisterPermiso = () => {
        setOpenErrorAlertRegisterPermiso(!openErrorAlertRegisterPermiso)
    }
    const openCloseAlertEditPermiso = () => {
        setOpenAlertEditPermiso(!openAlertEditPermiso)
    }
    const openCloseAlertDeletePermiso = () => {
        setOpenAlertDeletePermiso(!openAlertDeletePermiso)
    }
    //----------------POST PERMISOS-------------------------------------------

    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeEdit = (e) => {
        setChangeDataEdit({
            ...changeDataEdit,
            [e.target.name]: e.target.value
        })
    }

    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------

    // console.log(changeData)
    // console.log(changeDataEdit)
    return (
        <>
            <Container maxWidth={false} style={{paddingTop: '5rem'}}>
                <Container maxWidth='lg' >
                    <Grid item xs={12} sm={5}>
                        <Paper className={classes.spacingBott}>
                            <Tabs
                                value={scroll}
                                onChange={scrollChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                style={{ height: 60 }}
                            >
                                <Tab label="Registro Permisos" style={{ fontSize: 'x-small' }}  icon={<PlayListAddCheckIcon style={{ fontSize: 'large' }} />} />
                                <Tab label="Registro Feriados" style={{ fontSize: 'x-small' }} component={Link} to='/controlFeriados' icon={<CheckBoxIcon style={{ fontSize: 'large' }} />} />
                                <Tab label="Registro Vacaciones" style={{ fontSize: 'x-small' }} component={Link} to='/controlVacaciones' icon={<PlayListAddCheckIcon style={{ fontSize: 'large' }} />} />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Container>
                <Typography align='center' variant='h4' style={{ marginBottom: '2rem' }}>Control de Permisos</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper component={Box} p={2} style={{ marginTop: '4rem' }}>
                            <Typography align='center' className={classes.spacingBott}>Registrar Permiso</Typography>
                            <Grid item xs={12} sm={12} className={classes.spacingBott}>
                                <TextField
                                    name='id_bio'
                                    label='ID Biometrico'
                                    variant='outlined'
                                    size='small'
                                    fullWidth={true}
                                    onChange={handleChange}
                                    value={changeData.id_bio}

                                />
                            </Grid>
                            <Grid container spacing={3} className={classes.spacingBott}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='namePermiso'
                                        label='Nombre de Permiso'
                                        variant='outlined'
                                        size='small'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        value={changeData.namePermiso}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='tipoPermiso'
                                        label='Tipo de Permiso'
                                        size='small'
                                        type='number'
                                        variant='outlined'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        value={changeData.tipoPermiso}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className={classes.spacingBott}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='fechaPermisoIni'
                                        label='Fecha inicio'
                                        size='small'
                                        type='date'
                                        // defaultValue='yyyy-MM-dd'
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth={true}
                                        onChange={handleChange}
                                        value={changeData.fechaPermisoIni}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='fechaPermisoFin'
                                        label='Fecha fin'
                                        size='small'
                                        type='date'
                                        // defaultValue='yyyy-MM-dd'
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth={true}
                                        onChange={handleChange}
                                        value={changeData.fechaPermisoFin}
                                    />
                                </Grid>
                            </Grid>
                            <div align='center'>
                                <Button onClick={postPermiso} variant='contained' color='primary'>Registrar</Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={3} className={classes.spacingBott}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='h5'>Lista de Permisos</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper>
                                    {permiso &&
                                        <TextField
                                            fullWidth={true}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={e => setPerm(e.target.value)}
                                        />
                                    }
                                </Paper>
                            </Grid>
                        </Grid>
                        <Paper>
                            <TableContainer style={{ maxHeight: 440 }}>
                                <Table stickyHeader >
                                    <TableHead >
                                        <TableRow>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }} >ID Biometrico</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Permiso</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Inicio</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Fin</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {permiso &&
                                            permiso.filter(searchPermiso(perm)).map(p => (
                                                <TableRow key={p._id}>
                                                    <TableCell>{p.id_bio}</TableCell>
                                                    <TableCell>{p.firstNameEmp}</TableCell>
                                                    <TableCell>{p.namePermiso}</TableCell>
                                                    <TableCell>{p.fechaPermisoIni}</TableCell>
                                                    <TableCell>{p.fechaPermisoFin}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title='editar'>
                                                            <IconButton size='small' onClick={() => openModalEditPermiso(p)}>
                                                                <SettingsIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='eliminar'>
                                                            <IconButton size='small' onClick={() => openModalDeletePermiso(p)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={openEditPermiso}
                onClose={closeModalEditPermiso}
                maxWidth='md'
            >
                <Container fixed component={Box} p={2}>
                    <Typography variant='h6' align='center' className={classes.spacingBott}>Editar Permiso</Typography>
                    <Grid item xs={12} sm={12} className={classes.spacingBott}>
                        <TextField
                            disabled
                            name='id_bio'
                            label='ID Biometrico'
                            variant='outlined'
                            size='small'
                            fullWidth={true}
                            onChange={handleChangeEdit}
                            value={changeDataEdit.id_bio}

                        />
                    </Grid>
                    <Grid container spacing={3} className={classes.spacingBott}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='namePermiso'
                                label='Nombre de Permiso'
                                variant='outlined'
                                size='small'
                                fullWidth={true}
                                onChange={handleChangeEdit}
                                value={changeDataEdit.namePermiso}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='tipoPermiso'
                                label='Tipo de Permiso'
                                size='small'
                                type='number'
                                variant='outlined'
                                fullWidth={true}
                                onChange={handleChangeEdit}
                                value={changeDataEdit.tipoPermiso}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className={classes.spacingBott}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='fechaPermisoIni'
                                label='Fecha inicio'
                                size='small'
                                type='date'
                                // defaultValue='yyyy-MM-dd'
                                InputLabelProps={{ shrink: true }}
                                fullWidth={true}
                                onChange={handleChangeEdit}
                                value={changeDataEdit.fechaPermisoIni}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='fechaPermisoFin'
                                label='Fecha fin'
                                size='small'
                                type='date'
                                // defaultValue='yyyy-MM-dd'
                                InputLabelProps={{ shrink: true }}
                                fullWidth={true}
                                onChange={handleChangeEdit}
                                value={changeDataEdit.fechaPermisoFin}
                            />
                        </Grid>
                    </Grid>
                    <div align='center'>
                        <Button onClick={sendEditPermiso} variant='contained' color='primary' size='small' style={{ marginRight: '1rem' }}>Editar</Button>
                        <Button onClick={closeModalEditPermiso} variant='contained' color='secondary' size='small'>Cancelar</Button>
                    </div>
                </Container>
            </Dialog>
            <Dialog
                open={openDeletePermiso}
                onClose={closeModalDeletePermiso}
                maxWidth='md'
            >
                <Container maxWidth='lg' component={Box} p={2}>
                    <Typography variant='h6' className={classes.spacingBott}>Estas seguro de eliminar el permiso "{changeDataEdit.namePermiso}"</Typography>
                    <div align='center'>
                        <Button onClick={sendDeletePermiso} variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                        <Button onClick={closeModalDeletePermiso} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Container>
            </Dialog>
            <AlertRegister open={openAlertRegisterPermiso} onClose={openCloseAlertRegisterPermiso} />
            <AlertEdit name={changeDataEdit.firstNameEmp} open={openAlertEditPermiso} onClose={openCloseAlertEditPermiso} />
            <AlertDelete name={changeDataEdit.namePermiso} open={openAlertDeletePermiso} onClose={openCloseAlertDeletePermiso} />
            <AlertErrorRegisterPermiso open={openErrorAlertRegisterPermiso} onClose={openCloseErrorAlertRegisterPermiso} />
        </>
    )
}

export default ControlPermisos
