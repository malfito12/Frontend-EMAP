import { BottomNavigation, Box, BottomNavigationAction, Button, Container, Grid, makeStyles, Paper, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, Dialog, Tabs, Tab } from '@material-ui/core'
import React, { useState } from 'react'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';
import EditIcon from "@material-ui/icons/Edit"



const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const KardexRevision = () => {
    const classes = useStyles()
    const [navigation, setNavigation] = useState(1)
    const [marcaciones, setMarcaciones] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [changeData, setChangeData] = useState({
        id_bio: '',
        fechaini: '',
        fechafin: ''
    })
    const [changeDataEdit, setChangeDataEdit] = useState({
        _id:'',
        id_bio: '',
        fecha: '',
        dia: '',
        ingreso1: '',
        ingreso2: '',
        salida1: '',
        salida2: '',
        atraso: '',
        horasExtra: '',
        diaTrabajado: '',
        faltas: '',
        observaciones: '',
    })

    //------------------------GET MARCACIONES---------------------------------
    const getMarcaciones = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        const fechaini = changeData.fechaini
        const fechafin = changeData.fechafin
        await axios.get(`${PORT_URL}kardexAsistencia/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => setMarcaciones(resp.data))
            .catch(err => console.log(err))
    }
    //------------------------EDITAR MARCACION-------------------------------------
    const openModalEdit = (e) => {
        // console.log(e._id)
        setChangeDataEdit(e)
        setOpenEdit(true)
    }
    const closeModalEdit = () => {
        setOpenEdit(false)
    }
    const editMarcacion = async (e) => {
        e.preventDefault()
        const id = changeDataEdit._id
        await axios.put(`${PORT_URL}kardexAsistencia/${id}`, changeDataEdit)
            .then(resp => {
                closeModalEdit()
                getMarcaciones(e)
                console.log(resp.data)
            }
            )
            .catch(err => console.log(err))
    }
    //-------------------------HANDLE CHANGE EDIT--------------------------------
    const handleChangeEdit = (e) => {
        setChangeDataEdit({
            ...changeDataEdit,
            [e.target.name]: e.target.value
        })
    }
    //------------------------------------------------------------------------
    //--------------------------HANDLE CHANGE-------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //---------------------------BOTTON DE NAVEGACION--------------------------------
    const handleNavigation = (e, newValue) => {
        setNavigation(newValue)
    }
    //-----------------------------------------------------------------
     const [scroll, setScroll] = useState(1)
     const scrollChange = (e, newScroll) => {
         setScroll(newScroll)
     }
     //-----------------------------------------------------------------
    // console.log(changeData)
    console.log(marcaciones)
    // console.log(changeDataEdit)
    return (
        <>
            <Container maxWidth={false} style={{paddingTop:'4.5rem'}}>
                <Container maxWidth='lg'>
                <Grid item xs={12} sm={5}>
                    <Paper className={classes.spacingBot}>
                        <Tabs
                            value={scroll}
                            onChange={scrollChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            style={{ height: 60 }}
                        >
                            <Tab label="Subir info." style={{ fontSize: 'x-small' }} component={Link} to='/kardexPreRevision' icon={<AcUnitIcon style={{ fontSize:'large' }} />} />
                            <Tab label="Control Resumen" style={{ fontSize: 'x-small' }} icon={<AccountBalanceIcon style={{ fontSize:'large' }} />} />
                        </Tabs>
                    </Paper>
                </Grid>
                </Container>
                <Typography  className={classes.spacingBot} variant='h4' align='center' >Kaxdex de Asistencia</Typography>
                {/* <div align='center' style={{ marginBottom: '3rem' }}>
                    <BottomNavigation style={{ width: 500 }} value={navigation} showLabels onChange={(e, newValue) => handleNavigation(e, newValue)}>
                        <BottomNavigationAction label='Subir Info.' component={Link} to='/kardexPreRevision' icon={<AcUnitIcon />} />
                        <BottomNavigationAction label='Control Resumen' icon={<AccountBalanceIcon />} />
                    </BottomNavigation>
                </div> */}
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography align='center' className={classes.spacingBot}>Introducir Informacion </Typography>
                                <form onSubmit={getMarcaciones}>
                                    <TextField
                                        name='id_bio'
                                        label='ID Biometrico'
                                        variant='outlined'
                                        type='number'
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='fechaini'
                                        label='fecha Inicio'
                                        variant='outlined'
                                        type='date'
                                        fullWidth
                                        size='small'
                                        InputLabelProps={{ shrink: true }}
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required

                                    />
                                    <TextField
                                        name='fechafin'
                                        label='fecha fin'
                                        variant='outlined'
                                        type='date'
                                        fullWidth
                                        size='small'
                                        InputLabelProps={{ shrink: true }}
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div align='center'>
                                        <Button variant='contained' color='primary' size='small' type='submit'>Buscar</Button>
                                    </div>
                                </form>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper component={Box} p={1}>
                            <TableContainer style={{ maxHeight: 440 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Fecha</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Dia</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Ingreso1</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Salida1</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Ingreso2</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Salida2</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Atraso</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Hrs. Extra</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Hrs. Trabj.</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Dia Trab.</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Faltas</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}>Observaciones</TableCell>
                                            <TableCell style={{ color: 'white', backgroundColor: "black" }}></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {marcaciones.length > 0 ? (
                                            marcaciones.map(m => (
                                                <TableRow key={m._id}>
                                                    <TableCell>{m.fecha}</TableCell>
                                                    <TableCell>{m.dia}</TableCell>
                                                    <TableCell>{m.ingreso1}</TableCell>
                                                    <TableCell>{m.salida1}</TableCell>
                                                    <TableCell>{m.ingreso2}</TableCell>
                                                    <TableCell>{m.salida2}</TableCell>
                                                    <TableCell>{m.atraso}</TableCell>
                                                    <TableCell>{m.horasExtra}</TableCell>
                                                    <TableCell>{m.horasDeTrabajo}</TableCell>
                                                    <TableCell>{m.diaTrabajado}</TableCell>
                                                    <TableCell>{m.faltas}</TableCell>
                                                    <TableCell>{m.observaciones}</TableCell>
                                                    <TableCell align='center'>
                                                        <Tooltip title='edit' onClick={() => openModalEdit(m)}>
                                                            <IconButton size='small'>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell align='center' colSpan='11'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container >
            <Dialog
                open={openEdit}
                onClose={closeModalEdit}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' >Editar Marcacion</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='ingreso1'
                                label='Ingreso 1'
                                variant='outlined'
                                size='small'
                                fullWidth
                                type='time'
                                InputLabelProps={{ shrink: true }}
                                className={classes.spacingBot}
                                defaultValue={changeDataEdit.ingreso1}
                                onChange={handleChangeEdit}
                            />
                            <TextField
                                name='ingreso2'
                                label='Ingreso 2'
                                variant='outlined'
                                size='small'
                                fullWidth
                                type='time'
                                InputLabelProps={{ shrink: true }}
                                className={classes.spacingBot}
                                defaultValue={changeDataEdit.ingreso2}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='salida1'
                                label='Salida 1'
                                variant='outlined'
                                size='small'
                                fullWidth
                                type='time'
                                InputLabelProps={{ shrink: true }}
                                className={classes.spacingBot}
                                defaultValue={changeDataEdit.salida1}
                                onChange={handleChangeEdit}
                            />
                            <TextField
                                name='salida2'
                                label='Salida 2'
                                variant='outlined'
                                size='small'
                                fullWidth
                                type='time'
                                InputLabelProps={{ shrink: true }}
                                className={classes.spacingBot}
                                defaultValue={changeDataEdit.salida2}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={editMarcacion}>aceptar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalEdit}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default KardexRevision
