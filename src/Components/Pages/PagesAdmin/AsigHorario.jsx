import { Button, Box, Container, Dialog, makeStyles, Paper, Typography, Grid, TextField, MenuItem, InputAdornment } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PORT_URL } from '../../../PortURL'
// import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))
const AsigHorario = () => {
    const classes = useStyles()
    const [search, setSearch] = useState("")
    const [openAddAsigHrs, setOpenAddAsigHrs] = useState(false)
    const [openEditAsigHrs, setOpenEditAsigHrs] = useState(false)
    const [openDeleteAsigHrs, setOpenDeleteAsigHrs] = useState(false)
    const [horario, setHorario] = useState([])
    const [asigHorario, setAsigHorario] = useState([])
    const [changeData, setChangeData] = useState({
        id_bio: '',
        descripcion: '',
        fechaini: '',
        fechafin: ''
    })

    useEffect(() => {
        getHorario()
        getAsigHorario()
    }, [])

    //--------------------GET HORARIO------------------------
    const getHorario = async () => {
        await axios.get(`${PORT_URL}horario`)
            .then(resp => {
                setHorario(resp.data)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //--------------------GET------------------------
    const getAsigHorario = async () => {
        await axios.get(`${PORT_URL}horarioasig`)
            .then(resp => {
                setAsigHorario(resp.data)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //--------------------POST------------------------
    const openModalAddAsigHrs = () => {
        setOpenAddAsigHrs(true)
    }
    const closeModalAddAsigHrs = () => {
        setOpenAddAsigHrs(false)
    }
    const postAsigHorario = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}horarioasig`, changeData)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
        closeModalAddAsigHrs()
        getAsigHorario()

    }
    //--------------------UPDATE------------------------
    const openModalEditAsigHrs = (e) => {
        setChangeData(e)
        setOpenEditAsigHrs(true)
    }
    const closeModalEditAsigHrs = () => {
        setOpenEditAsigHrs(false)
    }
    const editAsigHorario = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.put(`${PORT_URL}horarioasig/${id}`, changeData)
            .then(resp => { console.log(resp.data) })
            .catch(err => console.log(err))
        closeModalEditAsigHrs()
        getAsigHorario()
    }
    //--------------------DELETE------------------------
    const openModalDeleteHrs = (e) => {
        setChangeData(e)
        setOpenDeleteAsigHrs(true)
    }
    const closeModalDeleteHrs = () => {
        setOpenDeleteAsigHrs(false)
    }
    const deleteAsigHoario = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.delete(`${PORT_URL}horarioasig/${id}`)
            .then(resp => { console.log(resp.data) })
            .catch(err => console.log(err))
        closeModalDeleteHrs()
        getAsigHorario()
    }
    //--------------------BUSCADOR------------------------
    const searchAsigHorario = (search) => {
        return function (x) {
            return x.id_bio.toString().includes(search) ||
                x.firstNameEmp.toLowerCase().includes(search) ||
                x.lastNameEmpP.toLowerCase().includes(search) ||
                x.lastNameEmpM.toLowerCase().includes(search) ||
                x.descripcion.toLowerCase().includes(search) ||
                !search
        }

    }
    //--------------------GET------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }

    console.log(changeData)
    return (
        <>
            <Container maxWidth={false}>
                <Typography variant='h4' style={{ paddingTop: '5rem' }} className={classes.spacingBott} align='center'>Asignación de Hoarios</Typography>
                <Container maxWidth='md'>
                    <Button onClick={openModalAddAsigHrs} variant='contained' style={{ background: 'green', color: 'white' }} className={classes.spacingBott}>asignar horario</Button>
                </Container>
                <Container maxWidth='sm'>
                    <Paper style={{ marginBottom: '2rem' }}>
                        {asigHorario &&
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={e => setSearch(e.target.value)}
                            />
                        }
                    </Paper>
                </Container>

                <Container>
                    <Grid container spacing={3}>
                        {asigHorario &&
                            asigHorario.filter(searchAsigHorario(search)).map(a => (
                                <div key={a._id} style={{ marginRight: '1rem', marginBottom: '1rem' }}>
                                    <Paper component={Box} p={2}>
                                        <div className={classes.spacingBott}>
                                            <Typography variant='subtitle1'>Nombre : <span style={{ color: '#616161' }} > {a.firstNameEmp} {a.lastNameEmpP} {a.lastNameEmpM}</span></Typography>
                                            <Typography variant='subtitle1'>ID Biometrico : <span style={{ color: '#616161' }} > {a.id_bio}</span></Typography>
                                            <Typography variant='subtitle1'>Descripción de Horario: <span style={{ color: '#616161' }} > {a.descripcion}</span></Typography>
                                            <Typography variant='subtitle1'>Tipo de Horario: <span style={{ color: '#616161' }} > {a.tipoHorario}</span></Typography>
                                            <Typography variant='subtitle1'>Horarios: <span style={{ color: '#616161' }} > {a.ingreso1} - {a.salida1} - {a.ingreso2} - {a.salida2}</span></Typography>
                                            <Typography variant='subtitle1'>Fecha Inicio: <span style={{ color: '#616161' }} > {a.fechaini}</span></Typography>
                                            <Typography variant='subtitle1'>Fecha Fin: <span style={{ color: '#616161' }} >{a.fechafin}</span></Typography>
                                        </div>
                                        <div align='center' >
                                            <Button onClick={() => openModalEditAsigHrs(a)} size='small' variant='outlined' color='primary' style={{ marginRight: '1rem' }}>editar</Button>
                                            <Button onClick={() => openModalDeleteHrs(a)} size='small' variant='outlined' color='secondary'>eliminar</Button>
                                        </div>
                                    </Paper>
                                </div>
                            ))
                        }
                    </Grid>
                </Container>
            </Container>
            <Dialog
                open={openAddAsigHrs}
                onClose={closeModalAddAsigHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='h5' className={classes.spacingBott} align='center'>Asignar Horario</Typography>
                    <Container>
                        <form onSubmit={postAsigHorario}>
                            <TextField
                                name='id_bio'
                                label='ID BIOMETRICO'
                                variant='outlined'
                                size='small'
                                fullWidth
                                type='number'
                                className={classes.spacingBott}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name='descripcion'
                                label='Tipo de horario'
                                variant='outlined'
                                size='small'
                                select
                                fullWidth
                                className={classes.spacingBott}
                                value={changeData.descripcion}
                                onChange={handleChange}
                                required
                            >
                                {horario && horario.map(p => (
                                    <MenuItem key={p._id} value={p.descripcion}>{p.descripcion}</MenuItem>
                                ))}
                            </TextField>
                            <div style={{ paddingBottom: '1rem' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechaini'
                                            label='Fecha de Inicio'
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechafin'
                                            label='Fecha Fin'
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            required
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div align='center'>
                                <Button type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                                <Button onClick={closeModalAddAsigHrs} variant='contained' color='secondary'>cancelar</Button>
                            </div>
                        </form>
                    </Container>
                </Paper>
            </Dialog>
            <Dialog
                open={openEditAsigHrs}
                onClose={closeModalEditAsigHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='h6' className={classes.spacingBott}>Editar Asignación</Typography>
                    <Container>
                        <form onSubmit={editAsigHorario}>
                            <TextField
                                disabled
                                name='id_bio'
                                label='ID BIOMETRICO'
                                variant='outlined'
                                size='small'
                                fullWidth
                                type='number'
                                defaultValue={changeData.id_bio}
                                className={classes.spacingBott}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name='descripcion'
                                label='Tipo de horario'
                                variant='outlined'
                                size='small'
                                select
                                fullWidth
                                className={classes.spacingBott}
                                value={changeData.descripcion}
                                onChange={handleChange}
                                required
                            >
                                {horario && horario.map(p => (
                                    <MenuItem key={p._id} value={p.descripcion}>{p.descripcion}</MenuItem>
                                ))}
                            </TextField>
                            <div style={{ paddingBottom: '1rem' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechaini'
                                            label='Fecha de Inicio'
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            required
                                            onChange={handleChange}
                                            defaultValue={changeData.fechaini}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='fechafin'
                                            label='Fecha Fin'
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            required
                                            onChange={handleChange}
                                            defaultValue={changeData.fechafin}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div align='center'>
                                <Button type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                                <Button onClick={closeModalEditAsigHrs} variant='contained' color='secondary'>cancelar</Button>
                            </div>
                        </form>
                    </Container>
                </Paper>
            </Dialog>
            <Dialog
                open={openDeleteAsigHrs}
                onClose={closeModalDeleteHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography className={classes.spacingBott} variant='subtitle1'>Estas seguro de Eliminar la asignacion de "{changeData.firstNameEmp}"</Typography>
                    <div align='center'>
                        <Button onClick={deleteAsigHoario} variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                        <Button onClick={closeModalDeleteHrs} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Paper>
            </Dialog>
        </>
    )
}

export default AsigHorario
