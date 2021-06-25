import { Button, Box, Container, Dialog, makeStyles, Paper, Typography, Grid, TextField, MenuItem } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PORT_URL } from '../../../PortURL'

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))

const ControlHorario = () => {
    const classes = useStyles()
    const [openAddHrs, setOpenAddHrs] = useState(false)
    const [openEditHrs, setOpenEditHrs] = useState(false)
    const [openDeleteHrs, setOpenDeleteHrs] = useState(false)
    const [horario, setHorario] = useState([])
    const [changeData, setChangeData] = useState({
        descripcion: '',
        observaciones: '',
        tolerancia: '',
        ingreso1: '00:00',
        salida1: '00:00',
        ingreso2: '00:00',
        salida2: '00:00',
        tipoHorario: '',
        feriado: '',
        orden: '',
        est: '',
    })

    useEffect(() => {
        getHorario()
    }, [])
    //-----------------GET---------------------------------
    const getHorario = async () => {
        await axios.get(`${PORT_URL}horario`)
            .then(resp => {
                setHorario(resp.data)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------POST---------------------------------
    const openModalAddHrs = () => {
        setOpenAddHrs(true)
    }
    const closeModalAddHrs = () => {
        setOpenAddHrs(false)
    }
    const postHorario = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}horario`, changeData)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
        closeModalAddHrs()
        getHorario()
    }
    //-----------------PUT---------------------------------
    const openModalEditHrs = (h) => {
        setChangeData(h)
        setOpenEditHrs(true)
    }
    const closeModalEditHrs = () => {
        setOpenEditHrs(false)
    }
    const editHorario = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.put(`${PORT_URL}horario/${id}`, changeData)
            .then(resp => { console.log(resp.data) })
            .catch(err => { console.log(err) })
        closeModalEditHrs()
        getHorario()
    }
    //-----------------DELETE---------------------------------
    const openModalDeleteHrs = (h) => {
        setChangeData(h)
        setOpenDeleteHrs(true)
    }
    const closeModalDeleteHrs = () => {
        setOpenDeleteHrs(false)
    }
    const deleteHorario = async () => {
        const id = changeData._id
        await axios.delete(`${PORT_URL}horario/${id}`)
            .then(resp => { console.log(resp.data) })
            .catch(err => { console.log(err) })
        closeModalDeleteHrs()
        getHorario()
    }
    //-----------------CHANGE_DATA---------------------------------
    const handleChange = e => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(changeData)
    // console.log(horario)
    return (
        <>
            <Container maxWidth={false}>
                <Typography align='center' variant='h4' className={classes.spacingBott} style={{ paddingTop: '5rem' }}>HORARIOS</Typography>
                <Container maxWidth='md'>
                    <Button onClick={openModalAddHrs} variant='contained' style={{ background: 'green', color: 'white', marginBottom: '2rem' }}  >Regitrar Horario</Button>
                </Container>
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justify='center'>
                        {horario && horario.map(h => (
                            <div style={{ paddingBottom: '1rem', paddingRight: '1rem' }} key={h._id}>
                                <Paper component={Box} p={2} >
                                    <Grid container spacing={3}>
                                        <Grid item xs={8}>
                                            <div style={{ paddingRight: '5rem' }}>
                                                <Typography variant='h6' align='center'>{h.descripcion}</Typography>
                                                <Typography>Esdato: {h.est}</Typography>
                                                <Typography>Orden : {h.orden}</Typography>
                                                <Typography>Feriado : {h.feriado}</Typography>
                                                <Typography>Observaciones : {h.observaciones}</Typography>
                                                <Typography>horario : {h.ingreso1} {h.salida1} {h.ingreso2} {h.salida2}</Typography>
                                            </div>
                                        </Grid>

                                        <Grid container item xs={4} direction='column' justify='center'  >
                                            <div  >
                                                <Button onClick={() => openModalEditHrs(h)} size='small' variant='contained' color='primary' className={classes.spacingBott}>editar</Button>
                                                <Button onClick={() => openModalDeleteHrs(h)} size='small' variant='contained' color='secondary'>eliminar</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        ))}
                    </Grid>
                </Container>
            </Container>
            <Dialog
                open={openAddHrs}
                onClose={closeModalAddHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2} >
                    <Typography variant='h6' align='center' className={classes.spacingBott}>Registrar Horario</Typography>
                    <form onSubmit={postHorario}>
                        <Container maxWidth='lg'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='descripcion'
                                        label='Descripción'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='tolerancia'
                                        label='Tolerancia'
                                        variant='outlined'
                                        type='number'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='feriado'
                                        label='Feriado'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        value={changeData.feriado}
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value='feriado'>Feriado</MenuItem>
                                        <MenuItem value='no feriado'>No Feriado</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='est'
                                        label='Estado'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='observaciones'
                                        label='Observaciones'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='tipoHorario'
                                        label='Tipo de Horario'
                                        variant='outlined'
                                        fullWidth
                                        type='number'
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='orden'
                                        label='Orden'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Container >
                                    <Grid container spacing={3} style={{ marginBottom: '1.5rem' }}>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='ingreso1'
                                                label='ingreso1'
                                                type='time'
                                                defaultValue='00:00'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='salida1'
                                                label='salida1'
                                                type='time'
                                                defaultValue='00:00'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='ingreso2'
                                                label='ingreso2'
                                                type='time'
                                                defaultValue='00:00'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='salida2'
                                                label='salida2'
                                                type='time'
                                                defaultValue='00:00'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Grid>

                        </Container>
                        <div align='center'>
                            <Button type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                            <Button onClick={closeModalAddHrs} variant='contained' color='secondary'>cancelar</Button>
                        </div>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openEditHrs}
                onClose={closeModalEditHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2} >
                    <Typography variant='h6' align='center' className={classes.spacingBott}>Registrar Horario</Typography>
                    <form onSubmit={editHorario}>
                        <Container maxWidth='lg'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='descripcion'
                                        label='Descripción'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.descripcion}
                                        required
                                    />
                                    <TextField
                                        name='tolerancia'
                                        label='Tolerancia'
                                        variant='outlined'
                                        type='number'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.tolerancia}
                                        required
                                    />
                                    <TextField
                                        name='feriado'
                                        label='Feriado'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        value={changeData.feriado}
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        // defaultValue={changeData.feriado}
                                        required
                                    >
                                        <MenuItem value='feriado'>Feriado</MenuItem>
                                        <MenuItem value='no feriado'>No Feriado</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='est'
                                        label='Estado'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.est}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='observaciones'
                                        label='Observaciones'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.observaciones}
                                        required
                                    />
                                    <TextField
                                        name='tipoHorario'
                                        label='Tipo de Horario'
                                        variant='outlined'
                                        fullWidth
                                        type='number'
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.tipoHorario}
                                        required
                                    />
                                    <TextField
                                        name='orden'
                                        label='Orden'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.orden}
                                        required
                                    />
                                </Grid>
                                <Container >
                                    <Grid container spacing={3} style={{ marginBottom: '1.5rem' }}>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='ingreso1'
                                                label='ingreso1'
                                                type='time'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                defaultValue={changeData.ingreso1}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='salida1'
                                                label='salida1'
                                                type='time'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                defaultValue={changeData.salida1}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='ingreso2'
                                                label='ingreso2'
                                                type='time'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                defaultValue={changeData.ingreso2}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                name='salida2'
                                                label='salida2'
                                                type='time'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                defaultValue={changeData.salida2}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Grid>


                        </Container>
                        <div align='center'>
                            <Button type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                            <Button onClick={closeModalEditHrs} variant='contained' color='secondary'>cancelar</Button>
                        </div>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openDeleteHrs}
                onClose={closeModalDeleteHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='h6' className={classes.spacingBott}>Estas seguro de Eliminar el Hoario "{changeData.descripcion}"</Typography>
                    <div align='center'>
                        <Button size='small' onClick={deleteHorario} variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                        <Button size='small' onClick={closeModalDeleteHrs} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Paper>
            </Dialog>
        </>
    )
}

export default ControlHorario
