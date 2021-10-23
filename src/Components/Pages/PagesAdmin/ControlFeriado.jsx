import { Container, Typography, Paper, Box, TextField, Grid, makeStyles, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, Dialog, IconButton, Tooltip, Tabs, Tab } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { PORT_URL } from '../../../PortURL'
import DeleteIcon from '@material-ui/icons/Delete';
import PlayListAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(() => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))
const ControlFeriado = () => {
    const classes = useStyles()
    const [feriado, setFeriado] = useState([])
    const [openDeleteFeriado, setOpenDeleteFeriado] = useState(false)
    const [changeData, setChangeData] = useState({
        nameFeriado: '',
        tipoFeriado: '',
        fechaFeriadoIni: '',
        fechaFeriadoFin: ''
    })
    const [changeDataDelete, setChangeDataDelete] = useState({
        nameFeriado: '',
        tipoFeriado: '',
        fechaFeriadoIni: '',
        fechaFeriadoFin: ''
    })

    useEffect(() => {
        getFeriado()
    }, [])

    //---------------------GET------------------------------
    const getFeriado = async () => {
        await axios.get(`${PORT_URL}feriado`)
            .then(resp => { setFeriado(resp.data) })
            .catch(err => console.log(err))
    }
    //---------------------POST------------------------------
    const postFeriado = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}feriado`, changeData)
            .then(resp => { console.log(resp.data) })
            .catch(err => console.log(err))
        setChangeData({
            nameFeriado: '',
            tipoFeriado: '',
            fechaFeriadoIni: '',
            fechaFeriadoFin: ''
        })
        getFeriado()
    }
    //---------------------GET------------------------------
    //---------------------DELETE------------------------------
    const openModalDeleteFeriado = (e) => {
        setChangeDataDelete(e)
        setOpenDeleteFeriado(true)
    }
    const closeModalDeleteFeriado = () => {
        setOpenDeleteFeriado(false)
    }
    const deleteFeriado = async (e) => {
        e.preventDefault()
        const id = changeDataDelete._id
        await axios.delete(`${PORT_URL}feriado/${id}`)
            .then(resp => { console.log(resp.data) })
            .catch(err => console.log(err))
        closeModalDeleteFeriado()
        getFeriado()
    }
    //---------------------GET------------------------------
    //---------------------GET------------------------------
    //---------------------GET------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(1)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    // console.log(changeData)
    return (
        <>
            <Container maxWidth={false} style={{ paddingTop: '5rem' }}>
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
                                <Tab label="Registro Permisos" style={{ fontSize: 'x-small' }} component={Link} to='/controlPermisos' icon={<PlayListAddCheckIcon style={{ fontSize: 'large' }} />} />
                                <Tab label="Registro Feriados" style={{ fontSize: 'x-small' }} icon={<CheckBoxIcon style={{ fontSize: 'large' }} />} />
                                <Tab label="Registro Vacaciones" style={{ fontSize: 'x-small' }} component={Link} to='/controlVacaciones' icon={<PlayListAddCheckIcon style={{ fontSize: 'large' }} />} />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Container>
                <Typography variant='h4' align='center' className={classes.spacingBott}>Feriados</Typography>
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper component={Box} p={2}>
                                <Typography variant='subtitle1' align='center' className={classes.spacingBott}>Registrar Feriado</Typography>
                                <form onSubmit={postFeriado}>
                                    <TextField
                                        name='nameFeriado'
                                        label='Nombre Feriado'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={changeData.nameFeriado}
                                        required

                                    />
                                    <TextField
                                        name='tipoFeriado'
                                        label='Tipo Feriado'
                                        variant='outlined'
                                        size='small'
                                        type='number'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={changeData.tipoFeriado}
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
                                                value={changeData.fechaFeriadoIni}
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
                                                className={classes.spacingBott}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                value={changeData.fechaFeriadoFin}

                                            />
                                        </Grid>
                                    </Grid>
                                    <div align='center'>
                                        <Button type='submit' variant='outlined' color='primary'>registrar</Button>
                                    </div>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper>
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
                                            {feriado &&
                                                feriado.map(f => (
                                                    <TableRow key={f._id}>
                                                        <TableCell>{f.nameFeriado}</TableCell>
                                                        <TableCell>{f.tipoFeriado}</TableCell>
                                                        <TableCell>{f.fechaFeriadoIni}</TableCell>
                                                        <TableCell>{f.fechaFeriadoFin}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title='eliminar'>
                                                                <IconButton size='small' style={{ color: 'red' }} onClick={() => openModalDeleteFeriado(f)}>
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
            </Container>
            <Dialog
                open={openDeleteFeriado}
                onClose={closeModalDeleteFeriado}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Container maxWidth='sm'>
                        <Typography variant='subtitle1' className={classes.spacingBott}>Estas seguro de Eliminar "{changeDataDelete.nameFeriado}"</Typography>
                        <div align='center'>
                            <Button onClick={deleteFeriado} size='small' variant='outlined' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                            <Button size='small' onClick={closeModalDeleteFeriado} variant='outlined' color='secondary'>cancelar</Button>
                        </div>
                    </Container>
                </Paper>
            </Dialog>
        </>
    )
}
export default ControlFeriado