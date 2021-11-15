import { Box, Button, Container, Dialog, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../../PortURL'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(() => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const UserControlFeriados = () => {
    const classes = useStyles()
    const [feriados, setFeriados] = useState([])
    const [openEditFeriado, setOpenEditFeriado] = useState(false)
    const [openDeleteFeriado, setOpenDeleteFeriado] = useState(false)
    const [changeData, setChangeData] = useState({
        _id: '',
        nameFeriado: '',
        tipoFeriado: '',
        fechaFeriadoIni: '',
        fechaFeriadoFin: ''
    })

    useEffect(() => {
        getFeriado()
    }, [])
    //----------------------POST FERIADO---------------------------
    const postFeriado = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}feriado`, changeData)
            .then(resp => {
                getFeriado()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------------GET FERIADO-------------------------
    const getFeriado = async () => {
        await axios.get(`${PORT_URL}feriado`)
            .then(resp => {
                setFeriados(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------------EDITAR FERIADO------------------------------
    const openModalEditFeriado = (e) => {
        setChangeData(e)
        setOpenEditFeriado(true)
    }
    const closeModalEditFeriado = () => {
        setOpenEditFeriado(false)
    }
    const editFeriado = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.put(`${PORT_URL}feriado/${id}`, changeData)
            .then(resp => {
                closeModalEditFeriado()
                getFeriado()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------------DELETE FERIADO-------------------------
    const openModalDeleteFeriado = (e) => {
        setChangeData(e)
        setOpenDeleteFeriado(true)
    }
    const closeModalDeleteFeriado = () => {
        setOpenDeleteFeriado(false)
    }
    const deleteFeriado = async (e) => {
        e.preventDefault()
        const id=changeData._id
        await axios.delete(`${PORT_URL}feriado/${id}`)
        .then(resp=>{
            closeModalDeleteFeriado()
            getFeriado()
            console.log(resp.data)
        })
        .catch(err=>console.log(err))
    }
    //--------------------HANDLE CHANGE-------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------------SCROLL----------------------------------
    const [scroll, setScroll] = useState(1)
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
                        <Tab label='Feriados' />
                        <Tab label='Vacaciones' component={Link} to='/userControlVacaciones' />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography variant='h5' align='center' className={classes.spacingBot}>FERIADOS</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Paper component={Box} p={2}>
                            <Typography variant='subtitle1' align='center' className={classes.spacingBot}>REGISTRAR FERIADO</Typography>
                            <form onSubmit={postFeriado}>
                                <TextField
                                    name='nameFeriado'
                                    label='Nombre Feriado'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required

                                />
                                <TextField
                                    name='tipoFeriado'
                                    label='Tipo Feriado'
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                />
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechaFeriadoIni'
                                            label='Fecha Inicio'
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechaFeriadoFin'
                                            label='Fecha Fin'
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type='date'
                                            className={classes.spacingBot}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent='center'>
                                    <Button size='small' type='submit' variant='outlined' color='primary'>registrar</Button>
                                </Grid>
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
                                            <TableCell style={{ color: 'white', background: 'black' }}>Tipo</TableCell>
                                            <TableCell style={{ color: 'white', background: 'black' }}>Fecha Inicio</TableCell>
                                            <TableCell style={{ color: 'white', background: 'black' }}>Fecha Fin</TableCell>
                                            <TableCell style={{ color: 'white', background: 'black' }}>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {feriados.length > 0 ? (
                                            feriados.map((f, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{f.nameFeriado}</TableCell>
                                                    <TableCell>{f.tipoFeriado}</TableCell>
                                                    <TableCell>{f.fechaFeriadoIni}</TableCell>
                                                    <TableCell>{f.fechaFeriadoFin}</TableCell>
                                                    <TableCell>
                                                        <Grid container justifyContent='space-evenly' >
                                                            <Tooltip title='edit'>
                                                                <IconButton size='small' style={{ color: 'lightgreen' }} onClick={() => openModalEditFeriado(f)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='delete'>
                                                                <IconButton size='small' style={{ color: 'lightcoral' }} onClick={() => openModalDeleteFeriado(f)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan='5' align='center'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/*-------------------------EDITAR FERIADO-----------------------*/}
            <Dialog
                open={openEditFeriado}
                onClose={closeModalEditFeriado}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>EDITAR FERIADO</Typography>
                    <form onSubmit={editFeriado}>
                        <TextField
                            name='nameFeriado'
                            label='Nombre Feriado'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBot}
                            defaultValue={changeData.nameFeriado}
                            onChange={handleChange}
                            required

                        />
                        <TextField
                            name='tipoFeriado'
                            label='Tipo Feriado'
                            variant='outlined'
                            size='small'
                            type='number'
                            fullWidth
                            className={classes.spacingBot}
                            defaultValue={changeData.tipoFeriado}
                            onChange={handleChange}
                            required
                        />
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='fechaFeriadoIni'
                                    label='Fecha Inicio'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    value={changeData.fechaFeriadoIni}
                                    onChange={handleChange}
                                    required

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='fechaFeriadoFin'
                                    label='Fecha Fin'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    type='date'
                                    className={classes.spacingBot}
                                    value={changeData.fechaFeriadoFin}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    required

                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' type='submit' variant='outlined' color='primary'>editar</Button>
                            <Button size='small' onClick={closeModalEditFeriado} variant='outlined' color='secondary'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*-------------------------DELETE FERIADO-----------------------*/}
            <Dialog
                open={openDeleteFeriado}
                onClose={closeModalDeleteFeriado}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Container maxWidth='sm'>
                        <Typography variant='subtitle1' className={classes.spacingBot}>Estas seguro de Eliminar "{changeData.nameFeriado}"</Typography>
                        <Grid container justifyContent='space-evenly'>
                            <Button onClick={deleteFeriado} size='small' variant='outlined' color='primary'>delete</Button>
                            <Button size='small' onClick={closeModalDeleteFeriado} variant='outlined' color='secondary'>cancelar</Button>
                        </Grid>
                    </Container>
                </Paper>
            </Dialog>
        </>
    )
}

export default UserControlFeriados
