import { Box, Button, Container, Grid, makeStyles, Paper, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, Dialog, Tabs, Tab, TableFooter, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';
import EditIcon from "@material-ui/icons/Edit"
import jsPDF from 'jspdf';
import PrintIcon from '@material-ui/icons/Print'
import { AlertErrorAsistenciaPrint } from '../../../Atoms/Alerts/AlertReEdDe';
import moment from 'moment';



const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const KardexRevision = () => {
    const classes = useStyles()
    const [marcaciones, setMarcaciones] = useState([])
    const [empleado, setEmpleado] = useState([])
    const [openAlertErrorPrint, setOpenAlertErrorPrint] = useState("")
    const [openEdit, setOpenEdit] = useState(false)
    const [changeData, setChangeData] = useState({
        id_bio: '',
        fechaini: '',
        fechafin: '',
        mes:'',
        year:'',
    })
    const [changeDataEdit, setChangeDataEdit] = useState({
        _id: '',
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
        // const fechaini = changeData.fechaini
        // const fechafin = changeData.fechafin

        const mes=changeData.mes
        const year=changeData.year
        // console.log(changeData)
        //busqueda de empleado
        await axios.get(`${PORT_URL}personalAsisSearch/${id}`)
            .then(resp => setEmpleado(resp.data))
            .catch(err => console.log(err))

        //buscqueda de marcaciones
        // await axios.get(`${PORT_URL}kardexAsistencia/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
        await axios.get(`${PORT_URL}kardexAsistencia/${id}?mes=${mes}&year=${year}`)
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
    //--------------------------PDF GENERATE--------------------------------------
    const pdfGenerate = () => {
        try {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'in', format: [8, 7] })
            // var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
            var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
            doc.setFontSize(11)
            doc.text("KARDEX DE ASISTENCIA", pageWidth / 2, 0.5, 'center')
            doc.setFontSize(7)
            // doc.text(`DESDE:    ${changeData.fechaini}        HASTA:    ${changeData.fechafin}`, pageWidth / 2, 0.7, 'center');
            doc.text(`MES DE ${changeData.mes}`, pageWidth / 2, 0.7, 'center');
            doc.setFontSize(5)
            doc.text(`ID_BIO:   ${empleado[0].id_bio}`, 0.6, 1);
            doc.text(`NOMBRE:   ${empleado[0].firstNameEmp} ${empleado[0].lastNameEmpP} ${empleado[0].lastNameEmpM} `, 2.2, 1);
            doc.text(`CARGO:   ${empleado[0].cargoEmp} `, 0.6, 1.2);
            doc.text(`DPTO:   ${empleado[0].departamentEmp} `, 2.2, 1.2);
            doc.text(`HORARIO:   ${empleado[0].typeHorario} `, 4.5, 1.2);
            doc.autoTable({ html: "#id-table", startY: 1.5, styles: { fontSize: 5, halign: 'center' } })
            doc.output('dataurlnewwindow')
        } catch (error) {
            console.log(error)
            openCloseAlertErrorPrint()
        }
    }
    //--------------------------HANDLE CHANGE-------------------------------
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
    //-----------------------ALERTAS-----------------------------------
    const openCloseAlertErrorPrint = () => {
        setOpenAlertErrorPrint(!openAlertErrorPrint)
    }
    //--------------------BUSCAR INFORMACION DE EMPLEADO---------------------------------------
    const [name, setName] = useState([])
    const getPrueba = async (e) => {
        e.preventDefault()
        const id = changeData.id_bio
        await axios.get(`${PORT_URL}personalAsisSearch/${id}`)
            .then(resp => setName(resp.data))
            .catch(err => console.log(err))
    }
    //-----------------------------------------------------------------
    const array=[]
    var sumaAtraso= moment(`1990-01-01 00:00:00`)
    var sumaExtras=moment(`1990-01-01 00:00:00`)
    var sumaHoras=0;
    var diaTrab=0;
    var sumaFaltas=0;
    for(var a=0;a<marcaciones.length;a++){
        var sumaAtrasoAux=marcaciones[a].atraso
        var sumaExtrasAux=marcaciones[a].horasExtra
        sumaAtrasoAux=sumaAtrasoAux.split(":")
        sumaExtrasAux=sumaExtrasAux.split(":")
        sumaAtraso=moment(sumaAtraso).add(parseInt(sumaAtrasoAux[0]),'h').add(parseInt(sumaAtrasoAux[1]),'m').add(parseInt(sumaAtrasoAux[2]),'s')
        sumaExtras=moment(sumaExtras).add(parseInt(sumaExtrasAux[0]),'h').add(parseInt(sumaExtrasAux[1]),'m').add(parseInt(sumaExtrasAux[2]),'s')
        sumaHoras=sumaHoras+parseFloat(marcaciones[a].horasDeTrabajo)
        diaTrab=diaTrab+parseFloat(marcaciones[a].diaTrabajado)
        sumaFaltas=sumaFaltas+parseFloat(marcaciones[a].faltas)



        // sumaExtras=sumaExtras+parseFloat(marcaciones[a].horasExtra)
    }
    sumaAtraso=moment(sumaAtraso).format("HH:mm:ss")
    sumaExtras=moment(sumaExtras).format("HH:mm:ss")
    array.push({
        sumaAtr:sumaAtraso,
        sumaExt:sumaExtras,
        sumaHor:sumaHoras.toFixed(2),
        sumaDiaTrab:diaTrab,
        sumaFalt:sumaFaltas
    })
    // console.log(array)
    //-----------------------------------------------------------------
    // console.log(changeData)
    // console.log(empleado)
    // console.log(marcaciones)
    // console.log(changeDataEdit)
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
                        <Tab label="Subir info." style={{ fontSize: 'x-small' }} component={Link} to='/kardexPreRevision' icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                        <Tab label="Control Resumen" style={{ fontSize: 'x-small' }} icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth={false}>
                <Typography className={classes.spacingBot} variant='h5' align='center' >CONTROL DE ASISTENCIAS</Typography>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography align='center' className={classes.spacingBot}>Introducir Informacion </Typography>
                                <form onSubmit={getPrueba}>
                                    <TextField
                                        name='id_bio'
                                        label='ID Biometrico'
                                        variant='outlined'
                                        type='number'
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                    />
                                    <Button type='submit' style={{display:'none'}}></Button>
                                </form>
                                {name.length > 0 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label='Nombre'
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            className={classes.spacingBot}
                                            value={name[0].firstNameEmp}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label='Apellido P'
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            className={classes.spacingBot}
                                            value={name[0].lastNameEmpP}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label='Apellido M'
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            className={classes.spacingBot}
                                            value={name[0].lastNameEmpM}
                                        />
                                    </Grid>
                                </Grid>
                            ) : null}
                                <form onSubmit={getMarcaciones}>
                                    {/* <TextField
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
                                    /> */}
                                    <TextField
                                        name='mes'
                                        label='Mes'
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                        select
                                        className={classes.spacingBot}
                                        value={changeData.mes}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value='ENERO'>ENERO</MenuItem>
                                        <MenuItem value='FEBRERO'>FEBRERO</MenuItem>
                                        <MenuItem value='MARZO'>MARZO</MenuItem>
                                        <MenuItem value='ABRIL'>ABRIL</MenuItem>
                                        <MenuItem value='MAYO'>MAYO</MenuItem>
                                        <MenuItem value='JUNIO'>JUNIO</MenuItem>
                                        <MenuItem value='JULIO'>JULIO</MenuItem>
                                        <MenuItem value='AGOSTO'>AGOSTO</MenuItem>
                                        <MenuItem value='SEPTIEMBRE'>SEPTIEMBRE</MenuItem>
                                        <MenuItem value='OCTUBRE'>OCTUBRE</MenuItem>
                                        <MenuItem value='NOVIEMBRE'>NOVIEMBRE</MenuItem>
                                        <MenuItem value='DICIEMBRE'>DICIEMBRE</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='year'
                                        label='A??o'
                                        variant='outlined'
                                        fullWidth
                                        type='number'
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required
                                    />

                                    <div align='center'>
                                        <Button variant='contained' color='primary' size='small' type='submit' fullWidth endIcon={<SearchIcon />} className={classes.spacingBot} >Buscar informacion</Button>
                                    </div>
                                </form>
                            <Button size='small' style={{ backgroundColor: '#689f38', color: 'white', marginBottom: '0.5rem' }} fullWidth variant='contained' onClick={pdfGenerate} endIcon={<PrintIcon />} >Imprimir</Button>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper component={Box} p={1} className={classes.spacingBot}>
                            <TableContainer style={{ maxHeight: 500 }}>
                                <Table stickyHeader id='id-table'>
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
                                                            <IconButton size='small' style={{ color: 'green' }}>
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
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan='6' align='center'>Total</TableCell>
                                            <TableCell>{array[0].sumaAtr}</TableCell>
                                            <TableCell>{array[0].sumaExt}</TableCell>
                                            <TableCell>{array[0].sumaHor}</TableCell>
                                            <TableCell>{array[0].sumaDiaTrab}</TableCell>
                                            <TableCell>{array[0].sumaFalt}</TableCell>
                                        </TableRow>
                                    </TableFooter>
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
            {/*------------------ALERTAS-------------------------*/}
            <AlertErrorAsistenciaPrint open={openAlertErrorPrint} onClose={openCloseAlertErrorPrint} />
        </>
    )
}

export default KardexRevision
