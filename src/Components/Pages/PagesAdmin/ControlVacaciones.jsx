import { Container, Grid, makeStyles, Paper, Tab, Tabs, Box, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Tooltip, IconButton, Dialog, MenuItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlayListAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import { PORT_URL } from '../../../PortURL';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


const useStyles = makeStyles(() => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))
const ControlVacaciones = () => {
    const classes = useStyles()
    const [vacaciones, setVacaciones] = useState([])
    const [openEditVacaciones, setOpenEditVacaciones] = useState(false)
    const [openDeleteVacaciones, setOpenDeleteVacaciones] = useState(false)
    const [changeData, setChangeData] = useState({
        _id: '',
        id_bio: '',
        nameVacaciones: 'Vacaciones',
        tipoVacacion: '',
        fechaVacacionIni: '',
        fechaVacacionFin: '',
    })
    useEffect(() => {
        getVacaciones()
    }, [])
    //---------------------GET VACACIONES------------------------------
    const getVacaciones = async () => {
        await axios.get(`${PORT_URL}vacacion`)
            .then(resp => {
                setVacaciones(resp.data)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------------POST VACACIONES------------------------------
    const postVacaciones = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}vacacion`, changeData)
            .then(resp => {
                if (resp.data == 'la vacacion ya existe de ese mes') {
                    alert(resp.data)
                } else if (resp.data == "0" ||resp.data == "1" || resp.data == "2" || resp.data == "3" || resp.data == "4" || resp.data == "5" || resp.data == "6" || resp.data == "7" || resp.data == "8" || resp.data == "9" || resp.data == "10" || resp.data == "11" || resp.data == "12" || resp.data == "13" || resp.data == "14" || resp.data == "15" || resp.data == "16") {
                    // } else if (resp.data=='hola') {
                    alert('error en los dias de vacacion, tienes ' + resp.data + ' dias')
                }else if(resp.data==='los'){
                    alert('los dias de vacacion es mayor a lo permitido')
                }
                getVacaciones()

                // console.log(resp.data)
            })
            .catch(err => {
                alert('Error ya se Registro de vacacion o no cumple con los requisitos')
                console.log(err)
            })
        // setChangeData({
        //     id_bio: '',
        //     nameVacaciones: 'Vacaciones',
        //     tipoVacacion: '',
        //     fechaVacacionIni: '',
        //     fechaVacacionFin: '',
        // })

    }
    //---------------------EDIT VACACIONES------------------------------
    const openModalEditVacaciones = (e) => {
        setChangeData(e)
        setOpenEditVacaciones(true)
    }
    const closeModalEditVacaciones = () => {
        setOpenEditVacaciones(false)
    }
    const editVacaciones = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.put(`${PORT_URL}vacacion/${id}`, changeData)
            .then(resp => {
                getVacaciones()
                closeModalEditVacaciones()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------------DELETE VACACIONES------------------------------
    const openModalDeleteVacaciones = (e) => {
        setChangeData(e)
        setOpenDeleteVacaciones(true)
    }
    const closeModalDeleteVacaciones = () => {
        setOpenDeleteVacaciones(false)
    }

    const deleteVacaciones = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.delete(`${PORT_URL}vacacion/${id}`)
            .then(resp => {
                closeModalDeleteVacaciones()
                getVacaciones()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------------HANDLE CHANGE------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(2)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //--------------------BUSCAR INFORMACION ANTES DE REGISTRAR VACACION---------------------------------------
    const [name, setName] = useState([])
    const postPrueba = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        await axios.get(`${PORT_URL}personalAsisSearch/${id}`)
            .then(resp => setName(resp.data))
            .catch(err => console.log(err))
    }
    //----------------------------------------------------------------
    //-----------------------------------------------------------------
    // console.log(changeData)
    // console.log(name)
    return (
        <>
            <Container maxWidth={false} style={{ paddingTop: '5rem' }}>
                <Container maxWidth='lg'>
                    <Grid item xs={12} sm={5}>
                        <Paper className={classes.spacingBott}>
                            <Tabs
                                value={scroll}
                                onChange={scrollChange}
                                variant='scrollable'
                                scrollButtons='auto'
                                style={{ height: 60 }}
                            >
                                <Tab label='Registro Permisos' style={{ fontSize: 'x-small' }} component={Link} to='/controlPermisos' icon={<PlayListAddCheckIcon style={{ fontSize: 'large' }} />} />
                                <Tab label='Registro Feriados' style={{ fontSize: 'x-small' }} component={Link} to='/controlFeriados' icon={<CheckBoxIcon style={{ fontSize: 'large' }} />} />
                                <Tab label='Registro Vacaciones' style={{ fontSize: 'x-small' }} icon={<PlayListAddCheckIcon style={{ fontSize: 'large' }} />} />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Container>
                <Typography variant='h5' align='center' className={classes.spacingBott}>VACACIONES</Typography>
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <Paper component={Box} p={2}>
                                <Typography variant='subtitle1' align='center' className={classes.spacingBott}>Registrar Vacación</Typography>
                                <form onSubmit={postPrueba}>
                                    <TextField
                                        name='id_bio'
                                        label='ID Biometrico'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        type='number'
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                    />
                                    <Button type='submit' style={{ display: 'none' }}>ss</Button>
                                </form>
                                {name.length > 0 ? (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label='Nombre'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                className={classes.spacingBott}
                                                value={name[0].firstNameEmp}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label='Apellido P'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                className={classes.spacingBott}
                                                value={name[0].lastNameEmpP}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label='Apellido M'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                className={classes.spacingBott}
                                                value={name[0].lastNameEmpM}
                                            />
                                        </Grid>
                                    </Grid>
                                ) : null}
                                <form onSubmit={postVacaciones}>
                                    <TextField
                                        name='tipoVacacion'
                                        label='Tipo de Vacaciones'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        align='center'
                                        select
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={changeData.tipoVacacion}
                                        required

                                    >
                                        <MenuItem value='Vacación Anual'>Vacación Anual</MenuItem>
                                        <MenuItem value='Cuenta Vacación'>Cuenta Vacación</MenuItem>
                                    </TextField>
                                    <Grid container justifyContent='space-evenly'>
                                        <TextField
                                            name='fechaVacacionIni'
                                            label='fecha Inicio'
                                            variant='outlined'
                                            size='small'
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            className={classes.spacingBott}
                                            onChange={handleChange}
                                            required

                                        />
                                        <TextField
                                            name='fechaVacacionFin'
                                            label='Fecha Fin'
                                            variant='outlined'
                                            size='small'
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            className={classes.spacingBott}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <div align='center'>
                                        <Button size='small' type='submit' variant='outlined' color='primary'>registrar</Button>
                                    </div>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Paper component={Box} p={1}>
                                <TableContainer style={{ maxHeight: 440 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ color: 'white', background: 'black' }}>Nombre</TableCell>
                                                <TableCell style={{ color: 'white', background: 'black' }}>Apellidos</TableCell>
                                                <TableCell style={{ color: 'white', background: 'black' }}>Tipo</TableCell>
                                                <TableCell style={{ color: 'white', background: 'black' }}>Fecha Inicio</TableCell>
                                                <TableCell style={{ color: 'white', background: 'black' }}>Fecha Fin</TableCell>
                                                <TableCell style={{ color: 'white', background: 'black' }}>Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {vacaciones.length > 0 ? (
                                                vacaciones.map(v => (
                                                    <TableRow key={v._id}>
                                                        <TableCell>{v.firstNameEmp}</TableCell>
                                                        <TableCell>{v.lastNameEmpP} {v.lastNameEmpM}</TableCell>
                                                        <TableCell>{v.tipoVacacion}</TableCell>
                                                        <TableCell>{v.fechaVacacionIni}</TableCell>
                                                        <TableCell>{v.fechaVacacionFin}</TableCell>
                                                        <TableCell>
                                                            <Grid container justifyContent='space-evenly'>
                                                                <Tooltip title='edit'>
                                                                    <IconButton size='small' onClick={() => openModalEditVacaciones(v)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title='delete'>
                                                                    <IconButton size='small' onClick={() => openModalDeleteVacaciones(v)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        </TableCell>
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
                        </Grid>
                    </Grid>
                </Container>
            </Container>
            <Dialog
                open={openEditVacaciones}
                onClose={closeModalDeleteVacaciones}
                maxWidth="sm"
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBott}>EDITAR VACACION</Typography>
                    <form onSubmit={editVacaciones}>
                        <TextField
                            disabled
                            name='id_bio'
                            label='ID Biometrico'
                            variant='outlined'
                            size='small'
                            fullWidth
                            type='number'
                            className={classes.spacingBott}
                            defaultValue={changeData.id_bio}
                            onChange={handleChange}
                            required

                        />
                        <TextField
                            name='tipoVacacion'
                            label='Tipo de Vacaciones'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBott}
                            defaultValue={changeData.tipoVacacion}
                            onChange={handleChange}
                            required

                        />
                        <Grid container justifyContent='space-evenly'>
                            <TextField
                                name='fechaVacacionIni'
                                label='fecha Inicio'
                                variant='outlined'
                                size='small'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                                className={classes.spacingBott}
                                defaultValue={changeData.fechaVacacionIni}
                                onChange={handleChange}
                                required

                            />
                            <TextField
                                name='fechaVacacionFin'
                                label='Fecha Fin'
                                variant='outlined'
                                size='small'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                                className={classes.spacingBott}
                                defaultValue={changeData.fechaVacacionFin}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' type='submit' variant='outlined' color='primary'>editar</Button>
                            <Button size='small' variant='outlined' color='secondary' onClick={closeModalEditVacaciones}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openDeleteVacaciones}
                onClose={closeModalDeleteVacaciones}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBott}>¿Estas seguro de eliminar la vacacion de " {changeData.firstNameEmp} "?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='outlined' color='primary' onClick={deleteVacaciones}>aceptar</Button>
                        <Button size='small' variant='outlined' color='secondary' onClick={closeModalDeleteVacaciones}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default ControlVacaciones
