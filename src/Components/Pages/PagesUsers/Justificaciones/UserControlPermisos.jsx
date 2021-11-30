import { Box, Button, Container, Dialog, Grid, IconButton, MenuItem, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../../PortURL'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const UserControlPermisos = () => {
    const classes = useStyles()
    const [permisos, setPermisos] = useState([])
    const [openEditPermiso, setOpenEditPermiso] = useState(false)
    const [openDeletePermiso, setOpenDeletePermiso] = useState(false)
    const [changeData, setChangeData] = useState({
        id_bio: '',
        namePermiso: '',
        tipoPermiso: '',
        fechaPermisoIni: '',
        fechaPermisoFin: ''
    })

    useEffect(() => {
        getPermisos()
    }, [])
    //-----------------POST PERMISO-----------------------------
    const postPermiso = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}permiso`, changeData)
            .then(resp => {
                getPermisos()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------GET PERMISOS-----------------------------
    const getPermisos = async () => {
        await axios.get(`${PORT_URL}permiso`)
            .then(resp => {
                setPermisos(resp.data)
            })
            .catch(err => console.log(err))
    }
    //------------------EDIT PERMISO-------------------------
    const openModalEditPermiso = (e) => {
        setChangeData(e)
        setOpenEditPermiso(true)
    }
    const closeModalEditPermiso = () => {
        setOpenEditPermiso(false)
    }
    const editPermiso = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.put(`${PORT_URL}permiso/${id}`, changeData)
            .then(resp => {
                closeModalEditPermiso()
                getPermisos()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------------DELETE PERMISO-------------------------
    const openModalDeletePermiso = (e) => {
        setChangeData(e)
        setOpenDeletePermiso(true)
    }
    const closeModalDeletePermiso = () => {
        setOpenDeletePermiso(false)
    }
    const deletePermiso = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.delete(`${PORT_URL}permiso/${id}`)
            .then(resp => {
                closeModalDeletePermiso()
                getPermisos()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-------------------HANDLE CHANGE---------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //----------------SCROLL---------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //--------------------BUSCAR INFORMACION ANTES DE REGISTRAR EL PERMISO---------------------------------------
    const [name, setName] = useState([])
    const postPrueba = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        await axios.get(`${PORT_URL}personalAsisSearch/${id}`)
            .then(resp => setName(resp.data))
            .catch(err => console.log(err))
    }

    // console.log(permisos)
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid container item xs={12} sm={6} justifyContent='center'>
                    <Tabs
                        style={{ background: 'white', borderRadius: 5, marginBottom: '2rem' }}
                        value={scroll}
                        onChange={scrollChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        <Tab label='permisos' />
                        <Tab label='Feriados' component={Link} to='/userControlFeriados' />
                        <Tab label='Vacaciones' component={Link} to='/userControlVacaciones' />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg' >
                <Typography variant='h5' align='center' className={classes.spacingBot}>CONTROL DE PERMISOS</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Paper component={Box} p={2}>
                            <Typography variant='subtitle1' align='center' className={classes.spacingBot}>REGISTRAR PERMISO</Typography>
                            <form onSubmit={postPrueba}>
                                <TextField
                                    name='id_bio'
                                    label='ID Biometrico'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                />
                                <Button variant='contained' style={{ display: 'none' }} type='submit'>enviar</Button>
                            </form>
                            {name.length > 0 ? (
                                <Grid container spacing={2}>
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
                            <form onSubmit={postPermiso}>
                                <TextField
                                    name='namePermiso'
                                    label='Nombre de Permiso'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='tipoPermiso'
                                    label='Tipo de Permiso'
                                    size='small'
                                    type='number'
                                    variant='outlined'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                    select
                                    value={changeData.tipoPermiso}
                                >
                                    <MenuItem value='2'>Un dia</MenuItem>
                                    <MenuItem value='3'>Varios Dias</MenuItem>
                                </TextField>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechaPermisoIni'
                                            label='Fecha inicio'
                                            size='small'
                                            variant='outlined'
                                            type='date'
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            className={classes.spacingBot}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechaPermisoFin'
                                            label='Fecha fin'
                                            size='small'
                                            variant='outlined'
                                            type='date'
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            className={classes.spacingBot}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent='center'>
                                    <Button type='submit' size='small' variant='contained' color='primary'>registrar</Button>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper>
                            <TableContainer style={{ maxHeight: 440 }}>
                                <Table stickyHeader>
                                    <TableHead>
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
                                        {permisos.length > 0 ? (
                                            permisos.map((p, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{p.id_bio}</TableCell>
                                                    <TableCell>{p.firstNameEmp}</TableCell>
                                                    <TableCell>{p.namePermiso}</TableCell>
                                                    <TableCell>{p.fechaPermisoIni}</TableCell>
                                                    <TableCell>{p.fechaPermisoFin}</TableCell>
                                                    <TableCell>
                                                        <Grid container justifyContent='space-evenly'>
                                                            <Tooltip title='editar'>
                                                                <IconButton size='small' style={{ color: 'lightgreen' }} onClick={() => openModalEditPermiso(p)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='eliminar'>
                                                                <IconButton size='small' style={{ color: 'lightcoral' }} onClick={() => openModalDeletePermiso(p)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan='6' align='center'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/*---------------------EDITAR PERMISO--------------------*/}
            <Dialog
                open={openEditPermiso}
                onClose={closeModalEditPermiso}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>EDITAR PERMISO</Typography>
                    <form onSubmit={editPermiso}>
                        <TextField
                            disabled
                            name='id_bio'
                            label='ID Biometrico'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBot}
                            defaultValue={changeData.id_bio}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name='namePermiso'
                            label='Nombre de Permiso'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBot}
                            defaultValue={changeData.namePermiso}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name='tipoPermiso'
                            label='Tipo de Permiso'
                            size='small'
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classes.spacingBot}
                            defaultValue={changeData.tipoPermiso}
                            onChange={handleChange}
                            required
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='fechaPermisoIni'
                                    label='Fecha inicio'
                                    variant='outlined'
                                    size='small'
                                    type='date'
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                    value={changeData.fechaPermisoIni}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='fechaPermisoFin'
                                    label='Fecha fin'
                                    size='small'
                                    variant='outlined'
                                    type='date'
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                    value={changeData.fechaPermisoFin}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button type='submit' size='small' variant='contained' color='primary'>editar</Button>
                            <Button onClick={closeModalEditPermiso} size='small' variant='contained' color='secondary'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*---------------------ELIMINAR PERMISO--------------------*/}
            <Dialog
                open={openDeletePermiso}
                onClose={closeModalDeletePermiso}
                maxWidth='md'
            >
                <Container maxWidth='lg' component={Box} p={2}>
                    <Typography variant='subtitle1' className={classes.spacingBot}>Estas seguro de eliminar el permiso de "{changeData.firstNameEmp}"</Typography>
                    <div align='center'>
                        <Button size='small' onClick={deletePermiso} variant='contained' color='primary' style={{ marginRight: '1rem' }}>borrar</Button>
                        <Button size='small' onClick={closeModalDeletePermiso} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Container>
            </Dialog>
        </>
    )
}

export default UserControlPermisos
