import { Button, Box, Container, Dialog, Grid, IconButton, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from '@material-ui/core'
import axios from 'axios'
// import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { PORT_URL } from '../../../PortURL'
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { AlertRegisterCargo,AlertDeleteCargo, AlertErrorDeleteCargo, AlertErrorRegisterCargo,AlertEditCargo,AlertErrorEditCargo } from '../../Atoms/Alerts/AlertReEdDe'

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1.5rem'
    }
}))

const ControlCargos = () => {
    const classes = useStyles()
    const [empleado, setEmpleado] = useState([])
    const [openModalCargo, setOpenModalCargo] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openAlertErrorDelete,setOpenAlertErrorDelete]=useState(false)
    const [openAlertDelete,setOpenAlertDelete]=useState(false)
    const [openAlertRegister,setOpenAlertRegister]=useState(false)
    const [openErrorAlertRegister,setOpenErrorAlertRegister]=useState(false)
    const [openAlertEditCargo,setOpenAlertEditCargo]=useState(false)
    const [openErrorAlertEditCargo,setOpenErrorAlertEditCargo]=useState(false)
    const [changeData, setChangeData] = useState({
        // _id: '',
        id_bio: '',
        // firstNameEmp: '',
        // lastNameEmp: '',
        // cargoEmp: '',
        nameCargo: '',
        cod_cargo: '',
        des_cargo: '',
        t_perma: '',
        haber_b: '',
        nivel: '',
        estado: '',
        gestion: ''
    })

    useEffect(() => {
        getEmpledoCargo()
    }, [])

    const getEmpledoCargo = () => {
        axios.get(`${PORT_URL}cargo`)
            .then(resp => {
                setEmpleado(resp.data)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //------------------------------------------------------------------------
    //BUSCADOR
    // const searchingTerm = (term) => {
    //     return function (x) {
    //         return x.firstNameEmp.toLowerCase().includes(term) ||
    //             x.lastNameEmpP.toLowerCase().includes(term) ||
    //             x.lastNameEmpM.toLowerCase().includes(term) ||
    //             x.nameCargo.toLowerCase().includes(term) ||
    //             x.id_bio.includes(term) ||
    //             !term
    //     }
    // }

    //------------------CREAR CARGO--------------------------------------
    const openCloseAddCargo = () => {
        setOpenModalCargo(!openModalCargo)
    }

    const postCargo = async () => {
        await axios.post(`${PORT_URL}cargo`, changeData)
            .then(resp => {
                openCloseALertRegister()
                console.log(resp.data)
            })
            .catch(err => {
                openCloseErrorAlertRegister()
                console.log(err)
            })
        openCloseAddCargo()
        getEmpledoCargo()
    }
    //----------------------EDITAR CARGO-------------------------------------
    const openModalEditCargo = (e) => {
        setChangeData(e)
        setOpenModalEdit(true)
    }
    const closeModalEditCargo = () => {
        setOpenModalEdit(false)
    }
    const sendEditCargo = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        await axios.put(`${PORT_URL}cargo/${id}`, changeData)
            .then(resp => {
                openCloseAlertEditCargo()
                console.log(resp.data)
            })
            .catch(err => { 
                openCloseErrorAlertEditCargo()
                console.log(err) })
        closeModalEditCargo()
        getEmpledoCargo()
    }

    //----------------------DELETE CARGO-------------------------------
    const openModalDeleteCargo = (e) => {
        setChangeData(e)
        setOpenModalDelete(true)
    }
    const closeModalDeleteCargo = () => {
        setOpenModalDelete(false)
    }

    const sendDeleteCargo = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        await axios.delete(`${PORT_URL}cargo/${id}`)
            .then(resp => { 
                openCloseAlertDelete()
                console.log(resp.data) })
            .catch(err => {
                openCloseAlertErrorDelete()
                console.log(err) })
        closeModalDeleteCargo()
        getEmpledoCargo()
    }
    //--------------------------------------------------------------------
    //-----------------------ALERTAS----------------------------------
    const openCloseALertRegister=()=>{
        setOpenAlertRegister(!openAlertRegister)
    }
    const openCloseErrorAlertRegister=()=>{
        setOpenErrorAlertRegister(!openErrorAlertRegister)
    }
    const openCloseAlertEditCargo=()=>{
        setOpenAlertEditCargo(!openAlertEditCargo)
    }
    const openCloseErrorAlertEditCargo=()=>{
        setOpenErrorAlertEditCargo(!openErrorAlertEditCargo)
    }
    const openCloseAlertErrorDelete = () => {
        setOpenAlertErrorDelete(!openAlertErrorDelete)
    }
    const openCloseAlertDelete=()=>{
        setOpenAlertDelete(!openAlertDelete)
    }
    //--------------------------------------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    console.log(changeData)
    // const columnas = [
    //     { title: "Nombre", field: 'firstNameEmp' },
    //     { title: "Apellido P", field: 'lastNameEmpP' },
    //     { title: "Apellido M", field: 'lastNameEmpM' },
    //     { title: "Cargo", field: 'cargoEmp' },
    // ]

    const columms = [
        { id: 'id_bio', label: 'ID Biometrico' },
        { id: 'firstName', label: 'Nombre' },
        { id: 'lastNameP', label: 'Apellido P' },
        { id: 'lastNameM', label: 'Apellido M' },
        { id: 'cargo', label: 'Cargo' },
        { id: 'action', label: 'Acciones' },
    ]

    return (
        <>
            <Container maxWidth='lg'>
                <Typography className={classes.spacingBott} align='center' variant='h4' style={{ paddingTop: '5rem' }}>Tabla de Cargos Asignados</Typography>
                <Typography className={classes.spacingBott} align='center' variant='h4' style={{ color:'red' }}>EN OBSERVACION (aún en desarrollo)</Typography>
                <Container maxWidth='md'>
                    <Button onClick={openCloseAddCargo} className={classes.spacingBott} variant='contained' color='primary'>Asignar Cargo</Button>
                    <Button onClick={openCloseAddCargo} className={classes.spacingBott} variant='contained' color='primary'>Asignar Cargo</Button>
                    {/* <MaterialTable
                    title='Lista de Cargos'
                    columns={columnas}
                    data={empleado}
                    options={{
                        headerStyle:{
                            backgroundColor: 'black',
                            color: '#FFF'
                        },
                        actionsColumnIndex: -1
                    }}
                    actions={[
                        {
                            icon:()=><SettingsIcon style={{color:'#6200ea'}} />,
                            tooltip:'asignar cargo',
                            onClick:(e, rowData)=>history.push('/registerCargo/'
                            +rowData.id+'/'+
                            +rowData.id_bio+"/"
                            +rowData.firstNameEmp+'/'
                            +rowData.lastNameEmpP+'/'
                            +rowData.lastNameEmpM
                            )
                        }
                    ]}

                >

                </MaterialTable> */}

                    <Paper>
                        <TableContainer style={{ maxHeight: 440 }}>
                            <Toolbar>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}><Typography>lista de Cargos</Typography></Grid>
                                    <Grid item xs={6} align='right'>
                                        {empleado && (
                                            <TextField
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                size='small'
                                                // onChange={e => setTerm(e.target.value)}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Toolbar>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: 'black' }}>
                                        {columms.map(c => (
                                            <TableCell
                                                style={{ color: 'white',backgroundColor: "black"}}
                                                key={c.id}
                                                align='center'
                                            >
                                                {c.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {empleado &&
                                        // empleado.filter(searchingTerm(term)).map(e => (
                                            empleado.map(e=>(
                                            <TableRow key={e.id} style={{ maxHeight: 1 }}>
                                                <TableCell align='center'>{e.id_bio}</TableCell>
                                                <TableCell align='center'>{e.firstNameEmp}</TableCell>
                                                <TableCell align='center'>{e.lastNameEmpP}</TableCell>
                                                <TableCell align='center'>{e.lastNameEmpM}</TableCell>
                                                <TableCell align='center'>{e.nameCargo}</TableCell>
                                                <TableCell align='right'>
                                                    <Tooltip title='Editar'>
                                                        <IconButton edge='start' size='small' style={{ marginRight: '1rem' }} onClick={() => openModalEditCargo(e)}>
                                                            <SettingsIcon style={{ color: '#6200ea' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title='Eliminar'>
                                                        <IconButton edge='start' size='small' onClick={() => openModalDeleteCargo(e)}>
                                                            <DeleteIcon style={{ color: '#e53935' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Container>
            <Dialog
                maxWidth='md'
                open={openModalCargo}
                onClose={openCloseAddCargo}
            >
                <Container maxWidth='lg'>
                    <Typography variant='h6' align='center' style={{ marginBottom: '1rem', marginTop: '1rem' }} >Asignar Cargo</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label='id_bio'
                                name='id_bio'
                                variant='outlined'
                                size='small'
                                type='number'
                                onChange={handleChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                label='Nombre de Cargo'
                                name='nameCargo'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                className={classes.spacingBott}
                                onChange={handleChange}

                            />
                            <TextField
                                label='Codigo de Cargo'
                                name='cod_cargo'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='des cargo'
                                name='des_cargo'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='t perma'
                                name='t_perma'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                label='haber basico'
                                name='haber_b'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='nivel'
                                name='nivel'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Estado'
                                name='estado'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Gestion'
                                name='gestion'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.spacingBott} align='center'>
                        <Button onClick={postCargo} variant='contained' color='primary' style={{ marginRight: '2rem' }} >asignar</Button>
                        <Button onClick={openCloseAddCargo} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Container>
            </Dialog>
            <Dialog
                open={openModalEdit}
                onClose={closeModalEditCargo}
                maxWidth='md'
            >
                <Container fixed>
                    <Typography variant='h6' align='center' style={{ marginBottom: '1rem', marginTop: '1rem' }} >Editar Cargo</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                label='id_bio'
                                name='id_bio'
                                variant='outlined'
                                size='small'
                                type='number'
                                defaultValue={changeData.id_bio}
                                onChange={handleChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                label='Nombre de Cargo'
                                name='nameCargo'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                defaultValue={changeData.nameCargo}
                                className={classes.spacingBott}
                                onChange={handleChange}

                            />
                            <TextField
                                label='Codigo de Cargo'
                                name='cod_cargo'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                defaultValue={changeData.cod_cargo}
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='des cargo'
                                name='des_cargo'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                defaultValue={changeData.des_cargo}
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='t perma'
                                name='t_perma'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                defaultValue={changeData.t_perma}
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                label='haber basico'
                                name='haber_b'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                defaultValue={changeData.haber_b}
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='nivel'
                                name='nivel'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                defaultValue={changeData.nivel}
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Estado'
                                name='estado'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                defaultValue={changeData.estado}
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Gestion'
                                name='gestion'
                                variant='outlined'
                                fullWidth={true}
                                size='small'
                                type='number'
                                defaultValue={changeData.gestion}
                                className={classes.spacingBott}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.spacingBott} align='center'>
                        <Button onClick={sendEditCargo} variant='contained' color='primary' style={{ marginRight: '2rem' }} >editar</Button>
                        <Button onClick={closeModalEditCargo} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Container>
            </Dialog>
            <Dialog
                open={openModalDelete}
                onClose={closeModalDeleteCargo}
                maxWidth='sm'
            >
                <Container fixed component={Box} p={2}>
                    <Typography variant='h6' style={{marginBottom:'1rem'}}>Estas seguro de eliminar el cargo "{changeData.nameCargo}" de {changeData.firstNameEmp}</Typography>
                    <div align='center'>
                        <Button onClick={sendDeleteCargo} variant='contained' color='primary' size='small' style={{ marginRight: '1rem' }}>aceptar</Button>
                        <Button onClick={closeModalDeleteCargo} variant='contained' color='secondary' size='small'>canccelar</Button>
                    </div>
                </Container>
            </Dialog>
            <AlertRegisterCargo open={openAlertRegister} onClose={openCloseALertRegister} />
            <AlertErrorRegisterCargo open={openErrorAlertRegister} onClose={openCloseErrorAlertRegister} />
            <AlertEditCargo name={changeData.firstNameEmp} open={openAlertEditCargo} onClose={openCloseAlertEditCargo} />
            <AlertErrorEditCargo open={openErrorAlertEditCargo} onClose={openCloseErrorAlertEditCargo} />
            <AlertDeleteCargo name={changeData.firstNameEmp} open={openAlertDelete} onClose={openCloseAlertDelete}/>
            <AlertErrorDeleteCargo open={openAlertErrorDelete} onClose={openCloseAlertErrorDelete} />

        </>
    )
}

export default ControlCargos