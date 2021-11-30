import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, makeStyles, IconButton, Grid, Tabs, Tab, Button, Box, Tooltip, Dialog, TextField, MenuItem, RadioGroup, FormControlLabel, Radio, InputAdornment } from '@material-ui/core'
import axios from 'axios'
import { PORT_URL } from '../../../../PortURL'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import { AlertEditEmpleado } from '../../../Atoms/Alerts/AlertReEdDe'
import SearchIcon from '@material-ui/icons/Search';
import PrintICon from '@material-ui/icons/Print'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo2emap from '../../../../images/logo2emap.png'

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    },
    searchSize: {
        width: '40%',
        [theme.breakpoints.down("xs")]: {
            width: '100%'
        }
    }
}))
const UserControlEmp = (props) => {
    const classes = useStyles()
    const [empleado, setEmpleado] = useState([])
    const [openEditEmpleado, setOpenEditEmpleado] = useState(false)
    const [departament, setDepartament] = useState([])
    const [horario, setHorario] = useState([])
    const [cargoId, setCargoId] = useState([])
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [openAlertEditEmpleado,setOpenAlertEditEmpleado]=useState(false)
    const [buscador, setBuscador] = useState("")
    const [changeData, setChageData] = useState({
        _id: '',
        itemEmp: '',
        id_bio: '',
        firstNameEmp: '',
        lastNameEmpP: '',
        lastNameEmpM: '',
        CIEmp: '',

        cargoEmp: '',
        departamentEmp: '',
        typeContrato: '',
        clasificacionLab: '',
        typeHorario: '',
        typeAntiguedad: '',
        AFP: '',
        cotizante: '',
        afilSindicato: '',
        fechaini: '',
        fechafin: '',

        emailEmp: '',
        sexoEmp: '',//
        numCelEmp: '',//
        dirEmp: '',
        photoImgEmp: '',//
        nacionalityEmp: '',
        civilStatusEmp: '',
        professionEmp: '',//
        institutionDegreeEmp: '',//
        ObserEmp: '',//
        fechaNacEmp: Date(),
        estadoEmp: '',
        motivoCambio: '',
    })

    useEffect(() => {
        // (async () => {
        //     await axios.get(`${PORT_URL}empleado`)
        //         .then(resp => { setEmpleado(resp.data) })
        //         .catch(err => console.log(err))
        // })()
        getEmpleado()
        getDepartament()
        getHorario()
    }, [])

    //------------------GET EMPLEADO---------------------------
    const getEmpleado = async () => {
        await axios.get(`${PORT_URL}empleado`)
            .then(resp => { setEmpleado(resp.data) })
            .catch(err => console.log(err))
    }
    //--------------------GET DEPARTAMENTO-----------------------
    const getDepartament = async () => {
        await axios.get(`${PORT_URL}departament`)
            .then(resp => setDepartament(resp.data))
            .catch(err => console.log(err))
    }
    //--------------------GET CARGO ID-----------------------
    const getCargoId = async (e) => {
        // console.log(e)
        await axios.get(`${PORT_URL}cargo/${e}`)
            .then(resp => setCargoId(resp.data))
            .catch(err => console.log(err))
    }

    //--------------------GET HORARIO-----------------------
    const getHorario = async () => {
        await axios.get(`${PORT_URL}horario`)
            .then(resp => setHorario(resp.data))
            .catch(err => console.log(err))
    }
    //--------------------EDIT EMPLEADO-----------------------
    const openModalEditEmpleado = (e) => {
        setChageData(e)
        setPreview(e.avatar)
        getCargoId(e.departamentEmp)
        setOpenEditEmpleado(true)
    }
    const closeModalEditEmpleado = () => {
        setOpenEditEmpleado(false)
    }
    const editEmpleado = async (e) => {
        e.preventDefault()
        const id = changeData._id
        const formData = new FormData()
        formData.append('image', image)
        formData.append('itemEmp', changeData.itemEmp)
        formData.append('id_bio', changeData.id_bio)
        formData.append('firstNameEmp', changeData.firstNameEmp)
        formData.append('lastNameEmpP', changeData.lastNameEmpP)
        formData.append('lastNameEmpM', changeData.lastNameEmpM)
        formData.append('CIEmp', changeData.CIEmp)
        formData.append('emailEmp', changeData.emailEmp)
        formData.append('sexoEmp', changeData.sexoEmp)
        formData.append('numCelEmp', changeData.numCelEmp)
        formData.append('dirEmp', changeData.dirEmp)
        formData.append('nacionalityEmp', changeData.nacionalityEmp)
        formData.append('civilStatusEmp', changeData.civilStatusEmp)
        formData.append('professionEmp', changeData.professionEmp)
        formData.append('institutionDegreeEmp', changeData.institutionDegreeEmp)
        formData.append('ObserEmp', changeData.ObserEmp)
        formData.append('fechaNacEmp', changeData.fechaNacEmp)
        formData.append('estadoEmp', changeData.estadoEmp)
        formData.append('motivoCambio', changeData.motivoCambio)

        formData.append('cargoEmp', changeData.cargoEmp)
        formData.append('departamentEmp', changeData.departamentEmp)
        formData.append('typeContrato', changeData.typeContrato)
        formData.append('clasificacionLab', changeData.clasificacionLab)
        formData.append('typeHorario', changeData.typeHorario)
        formData.append('typeAntiguedad', changeData.typeAntiguedad)
        formData.append('AFP', changeData.AFP)
        formData.append('cotizante', changeData.cotizante)
        formData.append('afilSindicato', changeData.afilSindicato)
        formData.append('fechaini', changeData.fechaini)
        formData.append('fechafin', changeData.fechafin)
        await axios.put(`${PORT_URL}empleado/${id}`, formData)
            .then(resp =>{
                closeModalEditEmpleado()
                openCloseAlertEditEmpleado()
                getEmpleado()
            })
            .catch(err=>console.log(err))

        // console.log(changeData)
    }
    //----------------HANLDECHANGE---------------------------------
    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes('image')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setPreview(reader.result)
                    setImage(e.target.file[0])
                }
            }
            else { console.log('no funciona') }
        }
        if (e.target.name === 'departamentEmp') {
            getCargoId(e.target.value)
        }
        setChageData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //-------------------------------------------------------
    const handleChange2 = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
            setImage(file)
        }
    }
    //----------------ALERTAS EMPLEADO----------------------------
    const openCloseAlertEditEmpleado=()=>{
        setOpenAlertEditEmpleado(!openAlertEditEmpleado)
    }
    //----------------SCROLL---------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //----------------INFO EMPLEADO---------------------------------
    const { history } = props
    const infoEmpleado = (e) => {
        const id = e._id
        const id_bio = e.id_bio
        history.push('/infoEmp/' + id + "/" + id_bio)
    }
    //------------------------NUEVO ARRAY-------------------------------
    const array = []
    var name
    const contEmp = empleado.length
    for (var i = 0; i < contEmp; i++) {
        name = empleado[i].firstNameEmp + " " + empleado[i].lastNameEmpP + " " + empleado[i].lastNameEmpM
        var uno = { allName: name }
        var dos = { ...empleado[i], ...uno }
        array.push(dos)
    }
    //------------------------BUSCADOR-------------------------------
    const buscarEmpleado = (buscador) => {
        return function (x) {
            return x.allName.includes(buscador) ||
                x.allName.toLowerCase().includes(buscador) ||
                x.id_bio.includes(buscador) ||
                !buscador
        }
    }
    //------------------------PDF GENERATE-------------------------------
    var image2=logo2emap
    const pdfGenerate = (e) => {
        // console.log(e)
        var data=e
        const doc = new jsPDF({ orientation: 'portrait', unit: 'in', format: [8, 7] })
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        doc.setFontSize(12)
        // doc.addFont('Calibri', 'Calibri', 'normal');
        // doc.setFont('Calibri');
        doc.addImage(image2, 0.5, 0, 1.5, 1)
        doc.text("FORMULARIO PERSONAL", pageWidth / 2, 0.5, 'center')
        doc.setFontSize(11)
        doc.text("I. DATOS PERSONALES", 1,1)
        doc.setFontSize(10)
        doc.text(`Nombres y Apellidos:   ${e.allName}`, 1,1.4)
        doc.text(`CI:   ${e.CIEmp}`, 1,1.7)
        doc.text(`Domicilio:   ${e.dirEmp}`, 1,2)
        doc.text(`Estado Civil:   ${e.civilStatusEmp}`, 1,2.3)
        doc.text(`Nacionalidad:   ${e.nacionalityEmp}`, 1,2.6)
        doc.text(`Fono - Celular:   ${e.numCelEmp}`, 1,2.9)
        doc.text(`Profesion u Oficio:   `, 1,3.2)
        doc.text(`Correo Electronico:   ${e.emailEmp}`, 1,3.5)
        doc.addImage(e.avatar,4.5, 1.1, 2, 2.2)
        doc.text(`Fecha de Nacimiento:   ${e.fechaNacEmp}`, 3,3.8)
        doc.text(`Grado de Institucion:   ${e.institutionDegreeEmp}`, 3,4.1)

        doc.setFontSize(11)
        doc.text("II. DATOS DE AFILIACION", 1,5)
        doc.setFontSize(10)
        doc.text(`Nro. Item:   ${e.itemEmp}`,1,5.3)
        doc.text(`Cargo Actual en la Entidad:   ${e.cargoEmp}`,1,5.6)
        doc.text(`Fecha de Ingreso:   ${e.fechaini}`,1,5.9)

        // doc.autoTable({
        //     head: [[
        //         { content: 'N° Item' },
        //         { content: 'ID Bio' },
        //         { content: 'Nombre' },
        //         { content: 'Apellido P' },
        //         { content: 'Apellido M' },
        //     ]],
        //     body: [[
        //         {data.itemEmp},

        //     ]],
        //     startY: 1,
        // })
        // doc.output('dataurlnewwindow')
        window.open(doc.output('bloburi'))
    }
    //---------------------------------------------------------------------
    //----------------REGISTER EMPLEADO---------------------------------
    // const registerEmpleado=()=>{
    //     const id='usuario'
    //     history.push({pathname: '/registerEmp', data:id})
    // }
    //----------------------------------------------------



    // console.log(empleado)
    // console.log(changeData)
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
                        <Tab label='Personal' />
                        <Tab label='Cargos' component={Link} to='/userControlCargo' />
                        <Tab label='Horarios' component={Link} to='/userControlHorario' />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Button component={Link} to={{ pathname: '/userRegisterEmp', data: 'usuario' }} variant='contained' endIcon={<AccountCircleIcon />} style={{ background: 'green', color: 'white' }} className={classes.spacingBott}>registrar</Button>
                <Typography variant='h5' align='center' className={classes.spacingBott}>PERSONAL DE TRABAJO EMAP</Typography>
                <article className={classes.spacingBott} align='right'>
                    {array && (
                        <TextField
                            className={classes.searchSize}
                            style={{ background: 'white', borderRadius: 5 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={e => setBuscador(e.target.value)}
                        />
                    )}
                </article>
                <Grid container spacing={1} justifyContent='center' className={classes.spacingBott}>
                    {array.length > 0 ? (
                        array.filter(buscarEmpleado(buscador)).map((e, index) => (
                            <Grid key={index} item xs={12} sm={3}>
                                <Paper component={Box} p={2}>
                                    <div align='center'>
                                        <Paper component={Box} p={1} style={{ width: "80%", height: "200px", background: '#bdbdbd' }}>
                                            {e.avatar
                                                ? <img src={e.avatar} style={{ width: '100%', height: '100% ' }} alt="#" />
                                                : <img src={null} style={{ width: '100%', height: '100% ' }} alt="#" />
                                            }
                                        </Paper>
                                    </div>
                                    <div align='center'>
                                        {e.estadoEmp === 'activo'
                                            ? (<Typography style={{ color: 'green' }}>{e.estadoEmp}</Typography>)
                                            : (<Typography style={{ color: 'red' }}>{e.estadoEmp}</Typography>)
                                        }
                                        <Typography variant='subtitle1'>ID Biometrico : {e.id_bio}</Typography>
                                        <Typography variant='subtitle1'>{e.firstNameEmp} {e.lastNameEmpP} {e.lastNameEmpM}</Typography>
                                        <Typography variant='subtitle1'>C.I.: {e.CIEmp}</Typography>
                                    </div>
                                    <Grid container justifyContent='space-evenly'>
                                        <Tooltip title='Editar'>
                                            <IconButton style={{ background: 'green', color: 'white' }} size='small' onClick={() => openModalEditEmpleado(e)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='imprimir' onClick={()=>pdfGenerate(e)}>
                                            <IconButton style={{ background: '#1976d2', color: 'white' }} size='small'>
                                                <PrintICon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))
                    ) : (null)}
                </Grid>
                {/* <Container maxWidth='md'>
                    <Paper>
                        <TableContainer style={{ maxHeight: 440 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>ID Biometrico</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido P</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido M</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Estado</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {empleado &&
                                        empleado.map(e => (
                                            <TableRow key={e._id}>
                                                <TableCell>{e.id_bio}</TableCell>
                                                <TableCell>{e.firstNameEmp}</TableCell>
                                                <TableCell>{e.lastNameEmpP}</TableCell>
                                                <TableCell>{e.lastNameEmpM}</TableCell>
                                                {e.estadoEmp === 'activo'
                                                    ? (<TableCell style={{ color: 'green' }}>{e.estadoEmp}</TableCell>)
                                                    : (<TableCell style={{ color: 'red' }}>{e.estadoEmp}</TableCell>)
                                                }
                                                <TableCell>
                                                    <div align='center'>
                                                        <IconButton size='small' onClick={() => infoEmpleado(e)} >
                                                            <InfoIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container> */}

                {/*--------------------------------EDITAR EMPLEADO---------------------------------*/}
                <Dialog
                    open={openEditEmpleado}
                    onClose={closeModalEditEmpleado}
                    maxWidth='md'
                >
                    <Paper component={Box} p={2}>
                        <Typography variant='subtitle1' align='center' className={classes.spacingBott}>EDITAR EMPLEADO</Typography>
                        <form onSubmit={editEmpleado}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='id_bio'
                                        variant='outlined'
                                        label='ID Biometrico'
                                        type='number'
                                        size='small'
                                        className={classes.spacingBott}
                                        defaultValue={changeData.id_bio}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name='itemEmp'
                                        variant='outlined'
                                        label='N° de Item'
                                        type='number'
                                        size='small'
                                        className={classes.spacingBott}
                                        defaultValue={changeData.itemEmp}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name='firstNameEmp'
                                        variant='outlined'
                                        label='Nombre Completo'
                                        type='text'
                                        size='small'
                                        className={classes.spacingBott}
                                        defaultValue={changeData.firstNameEmp}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name='lastNameEmpP'
                                        variant='outlined'
                                        label='Apellido Paterno'
                                        type='text'
                                        size='small'
                                        className={classes.spacingBott}
                                        defaultValue={changeData.lastNameEmpP}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name='lastNameEmpM'
                                        variant='outlined'
                                        label='Apellido Materno'
                                        type='text'
                                        size='small'
                                        className={classes.spacingBott}
                                        defaultValue={changeData.lastNameEmpM}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name='CIEmp'
                                        variant='outlined'
                                        label='Celdula de Identidad'
                                        type='text'
                                        size='small'
                                        className={classes.spacingBott}
                                        defaultValue={changeData.CIEmp}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name='departamentEmp'
                                        variant='outlined'
                                        label='Departamento'
                                        size='small'
                                        select
                                        className={classes.spacingBott}
                                        value={changeData.departamentEmp}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {departament.length > 0 ? (
                                            departament.map((d, index) => (
                                                <MenuItem key={index} value={d.nameDepartament}>{d.nameDepartament}</MenuItem>
                                            ))
                                        ) : (null)}
                                    </TextField>
                                    <TextField
                                        name='cargoEmp'
                                        variant='outlined'
                                        label='Cargo'
                                        size='small'
                                        select
                                        className={classes.spacingBott}
                                        value={changeData.cargoEmp}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {cargoId.length > 0 ? (
                                            cargoId.map((c, index) => (
                                                <MenuItem key={index} value={c.nameCargo}>{c.nameCargo}</MenuItem>
                                            ))
                                        ) : (null)}
                                    </TextField>
                                    <TextField
                                        name='typeContrato'
                                        variant='outlined'
                                        label='Contrato'
                                        size='small'
                                        select
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={changeData.typeContrato}
                                        fullWidth
                                    >
                                        <MenuItem value='permanente'>Permanente</MenuItem>
                                        <MenuItem value='eventual'>Eventual</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='clasificacionLab'
                                        variant='outlined'
                                        label='Clasificacion Laboral'
                                        size='small'
                                        select
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={changeData.clasificacionLab}
                                    >
                                        <MenuItem value='operativo'>Operativo</MenuItem>
                                        <MenuItem value='administrativo'>Administrativo</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='typeHorario'
                                        variant='outlined'
                                        label='Horario'
                                        size='small'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.typeHorario}
                                        className={classes.spacingBott}
                                    >
                                        {horario.length > 0 ? (horario.map(h => (
                                            <MenuItem key={h._id} value={h.descripcion}>{h.descripcion}</MenuItem>
                                        ))) : (null)
                                        }
                                    </TextField>
                                    <TextField
                                        name='typeAntiguedad'
                                        variant='outlined'
                                        label='Antiguedad'
                                        size='small'
                                        align='center'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.typeAntiguedad}
                                        className={classes.spacingBott}
                                    >
                                        <MenuItem value='0'>Sin Antiguedad</MenuItem>
                                        <MenuItem value='1'> 2 a 4 años</MenuItem>
                                        <MenuItem value='2'> 5 a 7 años</MenuItem>
                                        <MenuItem value='3'> 8 a 10 años</MenuItem>
                                        <MenuItem value='4'> 11 a 14 años</MenuItem>
                                        <MenuItem value='5'> 15 a 19 años</MenuItem>
                                        <MenuItem value='6'> 20 a 24 años</MenuItem>
                                        <MenuItem value='7'> 25 a 90 años</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='AFP'
                                        variant='outlined'
                                        label='AFP'
                                        size='small'
                                        select
                                        fullWidth
                                        align='center'
                                        onChange={handleChange}
                                        value={changeData.AFP}
                                        className={classes.spacingBott}
                                    >
                                        <MenuItem value='prevision'>Prevision</MenuItem>
                                        <MenuItem value='re-prevision'>re Prevision</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='nacionalityEmp'
                                        variant='outlined'
                                        label='Nacionalidad'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        onChange={handleChange}
                                        defaultValue={changeData.nacionalityEmp}
                                        className={classes.spacingBott}
                                    />
                                    <TextField
                                        name='professionEmp'
                                        variant='outlined'
                                        label='Profesión'
                                        size='small'
                                        type='text'
                                        onChange={handleChange}
                                        defaultValue={changeData.professionEmp}
                                        className={classes.spacingBott}
                                        fullWidth
                                    />
                                    <TextField
                                        name='emailEmp'
                                        variant='outlined'
                                        label='Correo Electrónico'
                                        type='email'
                                        size='small'
                                        fullWidth
                                        onChange={handleChange}
                                        defaultValue={changeData.emailEmp}
                                        className={classes.spacingBott}
                                    />
                                    <TextField
                                        name='dirEmp'
                                        variant='outlined'
                                        label='Direccion'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        onChange={handleChange}
                                        defaultValue={changeData.dirEmp}
                                        className={classes.spacingBott}
                                    />
                                    <TextField
                                        name='ObserEmp'
                                        variant='outlined'
                                        label='Observaciones'
                                        size='small'
                                        type='text'
                                        fullWidth
                                        onChange={handleChange}
                                        defaultValue={changeData.ObserEmp}
                                        className={classes.spacingBott}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div align='center' className={classes.spacingBott}>
                                        <Paper component={Box} p={1} style={{ background: '#bdbdbd', width: '170px', height: '170px' }}>
                                            <img src={preview} style={{ width: '100%', height: '100%' }} alt="#" />
                                        </Paper>
                                        <input
                                            name='image'
                                            type='file'
                                            accept='image/*'
                                            id='file-name'
                                            style={{ display: 'none' }}
                                            onChange={e => handleChange2(e)}
                                        />
                                        <label htmlFor="file-name">
                                            <Button
                                                size='small'
                                                style={{ marginTop: '0.5rem' }}
                                                variant='contained'
                                                color='primary'
                                                component='span'
                                            >cargar</Button>
                                        </label>
                                    </div>
                                    <TextField
                                        name='nacionalityEmp'
                                        variant='outlined'
                                        label='Nacionalidad'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        onChange={handleChange}
                                        defaultValue={changeData.nacionalityEmp}
                                        className={classes.spacingBott}
                                    />
                                    <TextField
                                        name='numCelEmp'
                                        variant='outlined'
                                        label='N° Celular'
                                        type='number'
                                        size='small'
                                        onChange={handleChange}
                                        defaultValue={changeData.numCelEmp}
                                        className={classes.spacingBott}
                                        fullWidth
                                    />
                                    <TextField
                                        name='afilSindicato'
                                        variant='outlined'
                                        label='Afiliado al Sindicado'
                                        size='small'
                                        select
                                        fullWidth
                                        align='center'
                                        onChange={handleChange}
                                        value={changeData.afilSindicato}
                                        className={classes.spacingBott}
                                    >
                                        <MenuItem value='si'>Si</MenuItem>
                                        <MenuItem value='no'>No</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='cotizante'
                                        variant='outlined'
                                        label='N° de Cotizante'
                                        align='center'
                                        size='small'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.cotizante}
                                        className={classes.spacingBott}
                                    >
                                        <MenuItem value='1'>SI</MenuItem>
                                        <MenuItem value='8'>NO</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='civilStatusEmp'
                                        variant='outlined'
                                        label='Estado Civil'
                                        align='center'
                                        size='small'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.civilStatusEmp}
                                        className={classes.spacingBott}
                                    >
                                        <MenuItem value='Soltero(a)'>Soltero(a)</MenuItem>
                                        <MenuItem value='Casado(a)'>Casado(a)</MenuItem>
                                        <MenuItem value='Divorciado(a)'>Divorciado(a)</MenuItem>
                                        <MenuItem value='Otros'>Otros</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='institutionDegreeEmp'
                                        variant='outlined'
                                        label='Grado de Institución'
                                        align='center'
                                        size='small'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.institutionDegreeEmp}
                                        className={classes.spacingBott}
                                    >
                                        <MenuItem value='Primaria'>Primaria</MenuItem>
                                        <MenuItem value='Secundaria'>Secundaria</MenuItem>
                                        <MenuItem value='Tecnico Medio'>Tecnico Medio</MenuItem>
                                        <MenuItem value='Licenciatura'>Licenciatura</MenuItem>
                                        <MenuItem value='Otros'>Otros</MenuItem>
                                    </TextField>
                                    <Typography align='center'>Sexo</Typography>
                                    <Grid container justifyContent='center' item xs={12} sm={12} className={classes.spacingBott}>
                                        <RadioGroup row>
                                            <FormControlLabel labelPlacement='start' label='Masculino' control={<Radio name='sexoEmp' color='primary' value='Masculino' checked={changeData.sexoEmp === 'Masculino'} onChange={handleChange} />} />
                                            <FormControlLabel labelPlacement='start' label='Femenino' control={<Radio name='sexoEmp' color='primary' value='Femenino' checked={changeData.sexoEmp === 'Femenino'} onChange={handleChange} />} />
                                        </RadioGroup>
                                    </Grid>
                                    <FormControlLabel
                                        labelPlacement='start'
                                        label='Fecha de Nacimiento'
                                        className={classes.spacingBott}
                                        control={
                                            <TextField
                                                id='fechaNacEmp'
                                                name='fechaNacEmp'
                                                type='date'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                defaultValue={changeData.fechaNacEmp}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        labelPlacement='start'
                                        label='Fecha de Ingreso'
                                        className={classes.spacingBott}
                                        control={
                                            <TextField
                                                name='fechaini'
                                                type='date'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                defaultValue={changeData.fechaNacEmp}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        labelPlacement='start'
                                        label='Fecha Fin'
                                        className={classes.spacingBott}
                                        control={
                                            <TextField
                                                name='fechafin'
                                                type='date'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                defaultValue={changeData.fechafin}
                                            />
                                        }
                                    />
                                    <TextField
                                        name='estadoEmp'
                                        variant='outlined'
                                        label='Estado'
                                        size='small'
                                        select
                                        align='center'
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.estadoEmp}
                                        className={classes.spacingBott}
                                    >
                                        <MenuItem value='activo'>Activo</MenuItem>
                                        <MenuItem value='baja'>Baja</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='motivoCambio'
                                        variant='outlined'
                                        label='Motivo Cambio de Estado'
                                        size='small'
                                        fullWidth
                                        onChange={handleChange}
                                        className={classes.spacingBott}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='center'>
                                <Button style={{ marginRight: '1rem' }} variant='contained' size='small' color='primary' type='submit'>editar</Button>
                                <Button variant='contained' size='small' color='secondary' onClick={closeModalEditEmpleado}>cancelar</Button>
                            </Grid>
                        </form>
                    </Paper>
                </Dialog>
            </Container>
            {/*------------------------------ALERTAS-------------------------*/}
            <AlertEditEmpleado name={changeData.firstNameEmp} open={openAlertEditEmpleado} onClose={openCloseAlertEditEmpleado} />
        </>
    )
}

export default UserControlEmp
