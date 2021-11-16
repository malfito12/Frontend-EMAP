import { Box, Button, Container, Dialog, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import axios from 'axios';
import { PORT_URL } from '../../../PortURL';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const AntiguedadEmp = () => {
    const classes = useStyles()
    const [antiguedad, setAntiguedad] = useState([])
    const [openAddAntiguedad, setOpenAddAntiguedad] = useState(false)
    const [openEditAntiguedad, setOpenEditAntiguedad] = useState(false)
    const [openDeleteAntiguedad, setOpenDeleteAntiguedad] = useState(false)
    const [changeData, setChangeData] = useState({
        cod: '',
        inicio: '',
        fin: '',
        porcentaje: '',
    })

    useEffect(() => {
        getAntiguedad()
    }, [])
    //-------------------------GET ANTIGUEDAD---------------------------------
    const getAntiguedad = async () => {
        await axios.get(`${PORT_URL}antiguedad`)
            .then(resp => {
                setAntiguedad(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------------POST ANTIGUEDAD------------------------------
    const openModalAddAntiguedad = () => {
        setOpenAddAntiguedad(true)
    }
    const closeModalAddAntiguedad = () => {
        setOpenAddAntiguedad(false)
    }
    const postAntiguedad = async (e) => {
        e.preventDefault()
        // console.log(changeData)
        await axios.post(`${PORT_URL}antiguedad`, changeData)
            .then(resp => {
                closeModalAddAntiguedad()
                getAntiguedad()
                console.log(resp.data)
            })
            .catch(err => {
                alert('El Codigo de Antiguedad ya existe')
                console.log(err)
            })
    }
    //----------------------EDIT ANTIGUEDAD-----------------------------------
    const openModalEditAntiguedad = (e) => {
        setChangeData(e)
        setOpenEditAntiguedad(true)
    }
    const closeModalEditAntiguedad = () => {
        setOpenEditAntiguedad(false)
    }
    const editAntiguedad = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.put(`${PORT_URL}antiguedad/${id}`, changeData)
            .then(resp => {
                getAntiguedad()
                closeModalEditAntiguedad()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //----------------------DELETE ANTIGUEDAD-----------------------------------
    const openModalDeleteAntiguedad = (e) => {
        setChangeData(e)
        setOpenDeleteAntiguedad(true)
    }
    const closeModalDeleteAntiguedad = () => {
        setOpenDeleteAntiguedad(false)
    }
    const deleteAntiguedad = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.delete(`${PORT_URL}antiguedad/${id}`)
            .then(resp => {
                getAntiguedad()
                closeModalDeleteAntiguedad()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //----------------------CHANGE DATA-----------------------------------
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
    // console.log(antiguedad)

    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid container item xs={12} sm={6} justifyContent='flex-start'>
                    <Tabs
                        value={scroll}
                        onChange={scrollChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        style={{ height: 60, background: 'white', borderRadius: 5, marginBottom: '2rem' }}
                    >
                        <Tab label="Datos Generales" style={{ fontSize: 'x-small' }} component={Link} to='/generalConfig' icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                        <Tab label="Antiguedad de Empleado" style={{ fontSize: 'x-small' }} icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography align='center' variant='h5' className={classes.spacingBot} >ANTIGUEDAD</Typography>
                <Container maxWidth='sm'>
                    <div align='right' className={classes.spacingBot}>
                        <Button size='small' variant='contained' style={{ background: 'green', color: 'white' }} onClick={openModalAddAntiguedad}>Nuevo</Button>
                    </div>
                    <Paper component={Box} p={1} /*maxWidth='600px'*/>
                        <TableContainer style={{ maxHeight: 340 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }} align='center'>Codigo</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }} align='center'>Año Inicio</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }} align='center'>Año Fin</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }} align='center'>Porcentaje "%"</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black", width: '18%' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {antiguedad.length > 0 ? (
                                        antiguedad.map(a => (
                                            <TableRow key={a._id}>
                                                <TableCell align='center'>{a.cod}</TableCell>
                                                <TableCell align='center'>{a.inicio} años</TableCell>
                                                <TableCell align='center'>{a.fin} años</TableCell>
                                                <TableCell align='center'>{a.porcentaje} %</TableCell>
                                                <TableCell>
                                                    <Grid>
                                                        <Tooltip title='edit'>
                                                            <IconButton size='small' onClick={() => openModalEditAntiguedad(a)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='delete'>
                                                            <IconButton size='small' onClick={() => openModalDeleteAntiguedad(a)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell>no existe informacion</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Container>
            <Dialog
                open={openAddAntiguedad}
                onClose={closeModalAddAntiguedad}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>Registrar Informacion</Typography>
                    <form onSubmit={postAntiguedad}>
                        <Grid container direction='column'>
                            <TextField
                                name='cod'
                                label='Codigo de Antiguedad'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name='inicio'
                                label='Año Inicial'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name='fin'
                                label='Año Final'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name='porcentaje'
                                label='Porcentaje'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid container justify='space-evenly'>
                            <Button style={{ fontSize: 'xx-small' }} variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button style={{ fontSize: 'xx-small' }} variant='contained' color='secondary' onClick={closeModalAddAntiguedad} >cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openEditAntiguedad}
                onClose={closeModalEditAntiguedad}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>Registrar Informacion</Typography>
                    <form onSubmit={editAntiguedad}>
                        <Grid container direction='column'>
                            <TextField
                                name='cod'
                                label='Codigo de Antiguedad'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                defaultValue={changeData.cod}
                                required
                            />
                            <TextField
                                name='inicio'
                                label='Año Inicial'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                defaultValue={changeData.inicio}
                                required
                            />
                            <TextField
                                name='fin'
                                label='Año Final'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                defaultValue={changeData.fin}
                                required
                            />
                            <TextField
                                name='porcentaje'
                                label='Porcentaje'
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                defaultValue={changeData.porcentaje}
                                required
                            />
                        </Grid>
                        <Grid container justify='space-evenly'>
                            <Button style={{ fontSize: 'xx-small' }} variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button style={{ fontSize: 'xx-small' }} variant='contained' color='secondary' onClick={closeModalEditAntiguedad} >cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openDeleteAntiguedad}
                onClose={closeModalDeleteAntiguedad}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1'>Estas seguro de Borrar Antiguedad " {changeData.cod} "</Typography>
                    <Grid container justify='space-evenly'>
                        <Button style={{ fontSize: 'xx-small' }} variant='contained' color='primary' onClick={deleteAntiguedad}>aceptar</Button>
                        <Button style={{ fontSize: 'xx-small' }} variant='contained' color='secondary' onClick={closeModalDeleteAntiguedad} >cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default AntiguedadEmp
