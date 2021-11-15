import { Box, Button, Container, Dialog, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../../PortURL'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'


const useStyles = makeStyles(() => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const UserControlVacaciones = () => {
    const classes = useStyles()
    const [vacaciones, setVacaiones] = useState([])
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
    //------------------POST VACACIONES-----------------------------
    const postVacaciones = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}vacacion`, changeData)
            .then(resp => {
                getVacaciones()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-------------------GET VACACIONES------------------------------
    const getVacaciones = async () => {
        await axios.get(`${PORT_URL}vacacion`)
            .then(resp => {
                setVacaiones(resp.data)
            })
            .catch(err => console.log(err))
    }
    //------------------EDITAR VACACIONES----------------------------
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
    //------------------DELETE VACACIONES----------------------
    const openModalDeleteVacaciones = (e) => {
        setChangeData(e)
        setOpenDeleteVacaciones(true)
    }
    const closeModalDeleteVacaciones = () => {
        setOpenDeleteVacaciones(false)
    }
    const deleteVacaciones = async(e) => {
        e.preventDefault()
        const id=changeData._id
        await axios.delete(`${PORT_URL}vacacion/${id}`)
        .then(resp=>{
            closeModalDeleteVacaciones()
            getVacaciones()
            console.log(resp.data)
        })
        .catch(err=>console.log(err))
    }
    //----------------------------------------------------
    //----------------HANDLE CHANGE-----------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------------SCROLL----------------------------------
    const [scroll, setScroll] = useState(2)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
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
                        <Tab label='permisos' component={Link} to='/userControlPermiso' />
                        <Tab label='Feriados' component={Link} to='/userControlFeriados' />
                        <Tab label='Vacaciones' />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography variant='h5' align='center' className={classes.spacingBot}>VACACIONES</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Paper component={Box} p={2}>
                            <Typography variant='subtitle1' align='center' className={classes.spacingBot}>REGISTRAR VACACIONES</Typography>
                            <form onSubmit={postVacaciones}>
                                <TextField
                                    name='id_bio'
                                    label='ID Biometrico'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    type='number'
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required

                                />
                                <TextField
                                    name='tipoVacacion'
                                    label='Tipo de Vacaciones'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required

                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechaVacacionIni'
                                            label='fecha Inicio'
                                            variant='outlined'
                                            size='small'
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
                                            name='fechaVacacionFin'
                                            label='Fecha Fin'
                                            variant='outlined'
                                            size='small'
                                            type='date'
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            className={classes.spacingBot}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <div align='center'>
                                    <Button size='small' type='submit' variant='outlined' color='primary'>registrar</Button>
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8}>
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
                                                                <IconButton size='small' style={{ color: 'lightgreen' }} onClick={() => openModalEditVacaciones(v)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='delete'>
                                                                <IconButton size='small' style={{ color: 'lightcoral' }} onClick={() => openModalDeleteVacaciones(v)}>
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
            {/*--------------------------EDITAR VACACIONES------------------------*/}
            <Dialog
                open={openEditVacaciones}
                onClose={closeModalEditVacaciones}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>EDITAR VACACION</Typography>
                    <form onSubmit={editVacaciones}>
                        <TextField
                            disabled
                            name='id_bio'
                            label='ID Biometrico'
                            variant='outlined'
                            size='small'
                            fullWidth
                            type='number'
                            className={classes.spacingBot}
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
                            className={classes.spacingBot}
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
                                className={classes.spacingBot}
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
                                className={classes.spacingBot}
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
            {/*--------------------------DELETE VACACIONES------------------------*/}
            <Dialog
                open={openDeleteVacaciones}
                onClose={closeModalDeleteVacaciones}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>¿Estas seguro de eliminar la vacacion de " {changeData.firstNameEmp} "?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='outlined' color='primary' onClick={deleteVacaciones}>delete</Button>
                        <Button size='small' variant='outlined' color='secondary' onClick={closeModalDeleteVacaciones}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default UserControlVacaciones
