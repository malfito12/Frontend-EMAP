import { Box, Button, Container, Dialog, Grid, IconButton, makeStyles, MenuItem, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../../PortURL'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const UserControlCargos = () => {
    const classes = useStyles()
    const [openRegisterDepartament, setOpenRegisterDepartament] = useState(false)
    const [openRegisterCargo, setOpenRegisterCargo] = useState(false)
    const [openEditDepartament, setOpenEditDepartament] = useState(false)
    const [openEditCargo, setOpenEditCargo] = useState(false)
    const [departament, setDepartament] = useState([])
    const [cargo, setCargo] = useState([])
    const [changeData, setChangeData] = useState({
        _id: '',
        cod_cargo: '',
        nameCargo: '',
        nameDepartament: '',
        haber_basico: ''
    })
    const [changeData2, setChangeData2] = useState({
        _id: '',
        cod_dep: '',
        nameDepartament: ''
    })


    useEffect(() => {
        getDepartament()
        getCargo()
    }, [])
    //-------------------------GET DEPARTAMENT-------------------------------
    const getDepartament = async () => {
        await axios.get(`${PORT_URL}departament`)
            .then(resp => setDepartament(resp.data))
            .catch(err => console.log(err))
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
    //----------------EDIT DEPARTAMENTO-------------------------------
    const openModalEditDepartament = (e) => {
        // console.log(e)
        setChangeData2(e)
        setOpenEditDepartament(true)
    }
    const closeModalEditDepartament = () => {
        setOpenEditDepartament(false)
    }
    const editDepartament = async (e) => {
        e.preventDefault()
        const id = changeData2._id
        await axios.put(`${PORT_URL}departament/${id}`, changeData2)
            .then(resp => {
                closeModalEditDepartament()
                getDepartament()
                getCargo()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //----------------GET CARGOS-------------------------------
    const getCargo = async () => {
        await axios.get(`${PORT_URL}cargo`)
            .then(resp => setCargo(resp.data))
            .catch(err => console.log(err))
    }
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
            .then(resp => {
                console.log(resp.data)
                closeModalRegisterCargo()
                getCargo()
            })
            .catch(err => console.log(err))
    }
    //-------------------EDIT CARGO--------------------------------
    const openModalEditCargo = (e) => {
        setChangeData(e)
        setOpenEditCargo(true)
    }
    const closeModalEditCargo = () => {
        setOpenEditCargo(false)
    }
    const editCargo = async (e) => {
        e.preventDefault()
        const contDep = departament.length
        var cod_dep;
        try {
            for (var i = 0; i < contDep; i++) {
                if (changeData.nameDepartament === departament[i].nameDepartament) {
                    cod_dep = departament[i].cod_dep
                    break;
                }
            }
            const data = {
                _id:changeData._id,
                cod_cargo: changeData.cod_cargo,
                nameCargo: changeData.nameCargo,
                cod_dep:cod_dep,
                nameDepartament: changeData.nameDepartament,
                haber_basico: changeData.haber_basico
            }
            const id=changeData._id
            await axios.put(`${PORT_URL}cargo/${id}`,data)
            .then(resp=>{
                closeModalEditCargo()
                getCargo()
                console.log(resp.data)
            })
            .catch(err=>console.log(err))
        } catch (error) {
            console.log(error)
        }
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
    //----------------SCROLL---------------------------------
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
                        <Tab label='Personal' component={Link} to='/userControlEmp' />
                        <Tab label='Cargos' />
                        <Tab label='Horarios' component={Link} to='/userControlHorario' />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Grid container spacing={2} className={classes.spacingBot}>
                    {/*-------------------TABLA DEPARTAMENTO-------------------*/}
                    <Grid item xs={12} sm={6}>
                        <Button onClick={openModalRegisterDepartament} className={classes.spacingBot} size='small' variant='contained' style={{ background: 'green', color: 'white' }}>add departamento</Button>
                        <Paper component={Box} p={1}>
                            <TableContainer style={{ maxHeight: 340 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>N°</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre Departamento</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {departament.length > 0 ? (
                                            departament.map((d, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index+1}</TableCell>
                                                    <TableCell>{d.nameDepartament}</TableCell>
                                                    <TableCell>
                                                        <Grid container justifyContent='space-evenly'>
                                                            <Tooltip title='editar'>
                                                                <IconButton size='small' onClick={() => openModalEditDepartament(d)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell align='center' colSpan='3'> no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    {/*----------------------TABLA CARGOS---------------------------------*/}
                    <Grid item xs={12} sm={6}>
                        <Button onClick={openModalRegisterCargo} className={classes.spacingBot} size='small' variant='contained' style={{ background: 'green', color: 'white' }}>add cargo</Button>
                        <Paper component={Box} p={1}>
                            <TableContainer style={{ maxHeight: 340 }}>
                                <Table stickyHeader style={{ minWidth: 700 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>N°</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Departamento</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Haber Basico</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cargo.length > 0 ? (
                                            cargo.map((c, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index+1}</TableCell>
                                                    <TableCell>{c.nameCargo}</TableCell>
                                                    <TableCell>{c.nameDepartament}</TableCell>
                                                    <TableCell>{c.haber_basico}</TableCell>
                                                    <TableCell>
                                                        <Grid container justifyContent='space-evenly'>
                                                            <Tooltip title='editar'>
                                                                <IconButton size='small' onClick={() => openModalEditCargo(c)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell align='center' colSpan='4'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/*-----------------MODAL DEPARTAMENTO---------------*/}
            <Dialog
                open={openRegisterDepartament}
                onClose={closeModalRegisterDepartament}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <div style={{ marginLeft: '15rem', marginRight: '15rem' }}></div>
                    <Typography variant='subtitle1' align='center'>Registrar Departamento</Typography>
                    <form onSubmit={postDepartament}>
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
                                required
                            />
                            <TextField
                                name='nameDepartament'
                                label='Nombre Departamento'
                                variant='outlined'
                                fullWidth
                                size='small'
                                className={classes.spacingBot}
                                onChange={handleChange2}
                                required
                            />
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' type='submit' variant='contained' color='primary' >registrar</Button>
                            <Button size='small' onClick={closeModalRegisterDepartament} variant='contained' color='secondary'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openEditDepartament}
                onClose={closeModalEditDepartament}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>EDITAR DEPARTAMENTO</Typography>
                    <form onSubmit={editDepartament}>
                        <Grid container >
                            <TextField
                                name='cod_dep'
                                label='Codigo de Departamento'
                                variant='outlined'
                                fullWidth
                                type='number'
                                size='small'
                                className={classes.spacingBot}
                                onChange={handleChange2}
                                defaultValue={changeData2.cod_dep}
                                required
                            />
                            <TextField
                                name='nameDepartament'
                                label='Nombre Departamento'
                                variant='outlined'
                                fullWidth
                                size='small'
                                className={classes.spacingBot}
                                onChange={handleChange2}
                                defaultValue={changeData2.nameDepartament}
                                required
                            />
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' type='submit' variant='contained' color='primary' >editar</Button>
                            <Button size='small' onClick={closeModalEditDepartament} variant='contained' color='secondary'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*-----------------------MODAL CARGO-----------------------*/}
            <Dialog
                open={openRegisterCargo}
                onClose={closeModalRegisterCargo}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <div style={{ marginLeft: '15rem', marginRight: '15rem' }}></div>
                    <Typography variant='subtitle1' align='center'>Registrar Cargo</Typography>
                    <form onSubmit={postCargo}>
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
                                required
                            >
                                {departament.length > 0 ? departament.map(d => (
                                    <MenuItem key={d._id} value={`${d.nameDepartament}/${d.cod_dep}`}>{d.nameDepartament}</MenuItem>
                                )) : (null)}
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
                                required
                            />
                            <TextField
                                name='nameCargo'
                                label='Nombre del Cargo'
                                variant='outlined'
                                fullWidth
                                size='small'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                required
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
                                required
                            />
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' type='submit' variant='contained' color='primary' >registrar</Button>
                            <Button size='small' onClick={closeModalRegisterCargo} variant='contained' color='secondary'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openEditCargo}
                onClose={closeModalEditCargo}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center'>EDITAR CARGO</Typography>
                    <form onSubmit={editCargo}>
                        <Grid container>
                            <TextField
                                name='nameDepartament'
                                label='Departamento'
                                variant='outlined'
                                align='center'
                                select
                                value={changeData.nameDepartament}
                                size='small'
                                fullWidth
                                className={classes.spacingBot}
                                onChange={handleChange}
                                required
                            >
                                {departament.length > 0 ? departament.map(d => (
                                    // <MenuItem key={d._id} value={`${d.nameDepartament}/${d.cod_dep}`}>{d.nameDepartament}</MenuItem>
                                    <MenuItem key={d._id} value={d.nameDepartament}>{d.nameDepartament}</MenuItem>
                                )) : (null)}
                            </TextField>
                            <TextField
                                name='cod_cargo'
                                label='Codigo de Cargo'
                                variant='outlined'
                                type='number'
                                fullWidth
                                size='small'
                                className={classes.spacingBot}
                                defaultValue={changeData.cod_cargo}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name='nameCargo'
                                label='Nombre del Cargo'
                                variant='outlined'
                                fullWidth
                                size='small'
                                className={classes.spacingBot}
                                defaultValue={changeData.nameCargo}
                                onChange={handleChange}
                                required
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
                                defaultValue={changeData.haber_basico}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' type='submit' variant='contained' color='primary' >editar</Button>
                            <Button size='small' onClick={closeModalEditCargo} variant='contained' color='secondary'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>


        </>
    )
}

export default UserControlCargos

