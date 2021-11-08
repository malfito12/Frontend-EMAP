import { Container, Grid, makeStyles, Typography, Paper, Tab, TextField, Box, Button, Tabs, FormLabel, RadioGroup, FormControlLabel, Radio, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, Dialog } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../../PortURL';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EditIcon from "@material-ui/icons/Edit"
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PrintIcon from '@material-ui/icons/Print'
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    tableHead: {
        color: 'white',
        background: 'black',
        fontSize: 'x-small',
        padding: 0
    },
    tablebody: {
        fontSize: 'x-small',
        // padding: 0
    }
}))

const RefrigerioRevision = () => {
    const classes = useStyles()
    const [planilla, setPlanilla] = useState([])
    const [departamento, setDepartamento] = useState([])
    const [openEditPlanilla, setOpenEditPlanilla] = useState(false)
    const [changeData, setChangeData] = useState({
        // id_bio:'',
        typePlanilla: '',
        fechaini: '',
        fechafin: ''
    })
    const [changeDataEdit, setChangeDataEdit] = useState({
        _id: '',
        fullName: '',
        RC_IVA_presentado: "",
        otrosDescuentos: '',
        diasTrabajado: "",

    })

    useEffect(() => {
        getDepartament()
    }, [])
    //------------GET PLANILLA REFRIGERIO--------------------------------
    const getPlanilla = async (e) => {
        e.preventDefault()
        const typePlanilla = changeData.typePlanilla
        const fechaini = changeData.fechaini
        const fechafin = changeData.fechafin
        await axios.get(`${PORT_URL}planillarefrigerio?typePlanilla=${typePlanilla}&fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => {
                setPlanilla(resp.data)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------EDTI PLANILLA REFRIGERIO--------------------------------------
    const openModalEditPlanilla = (e) => {
        setChangeDataEdit(e)
        setOpenEditPlanilla(true)
    }
    const closeModalEditPlanilla = () => {
        setOpenEditPlanilla(false)
    }
    const editPlanilla = async (e) => {
        e.preventDefault()
        const id = changeDataEdit._id
        await axios.put(`${PORT_URL}planillarefrigerio/${id}`, changeDataEdit)
            .then(resp => {
                closeModalEditPlanilla()
                getPlanilla(e)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------HANDLE CHANGE EDIT--------------------------------------
    const handleChangeEdit = (e) => {
        setChangeDataEdit({
            ...changeDataEdit,
            [e.target.name]: e.target.value
        })
    }
    //---------------HANDLE CHANGE--------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------------------GET DEPATTAMENTO-------------------------------
    const getDepartament = async () => {
        await axios.get(`${PORT_URL}departament`)
            .then(resp => {
                setDepartamento(resp.data)
                // console.log('departamentos')
            })
            .catch(err => console.log(err))
    }
    //------------------------OPERACIONES PARA NUEVA TABLA-------------------------------
    const array1 = []
    var a = 0;
    const contDep = departamento.length
    const contPlanilla = planilla.length
    while (a < contDep) {
        for (var i = 0; i < contPlanilla; i++) {
            if (departamento[a].nameDepartament === planilla[i].departamentEmp) {
                array1.push(departamento[a])
                break;
            }
        }
        a++;
    }
    // console.log(array1)
    //--------------------PDF GENERATE------------------------------------
    var numeroMes = moment(changeData.fechaini).get('month')
    var numeroAnio = moment(changeData.fechaini).get('year')
    var mes = ''
    switch (numeroMes) {
        case 0: mes = 'ENERO'; break;
        case 1: mes = 'FEBRERO'; break;
        case 2: mes = 'MARZO'; break;
        case 3: mes = 'ABRIL'; break;
        case 4: mes = 'MAYO'; break;
        case 5: mes = 'JUNIO'; break;
        case 6: mes = 'JULIO'; break;
        case 7: mes = 'AGOSTO'; break;
        case 8: mes = 'SEPTIEMBRE'; break;
        case 0: mes = 'OCTUBRE'; break;
        case 0: mes = 'NOVIEMBRE'; break;
        case 0: mes = 'DICIEMBRE'; break;
        default: mes = 'mes no valido'
    }
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        doc.setFontSize(12)
        doc.text("PLANILLA SERVICIO DE REFRIGERIO", pageWidth / 2, 0.5, 'center')
        doc.setFontSize(11)
        doc.text(`Correspondiente al mes de ${mes} de ${numeroAnio}`, pageWidth / 2, 0.7, 'center');
        doc.setFontSize(12)
        doc.text(`PERSONAL ${(changeData.typePlanilla).toUpperCase()} EN FUNCIONAMIENTO`, pageWidth / 2, 0.9, 'center');
        doc.autoTable({ html: "#id-table", startY: 1, styles: { fontSize: 5, halign: 'center' } })
        doc.output('dataurlnewwindow')
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(1)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    // console.log(changeDataEdit)
    return (
        <>
            <Container maxWidth={false} style={{ paddingTop: '4.5rem' }}>
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
                                <Tab label="Subir Info." style={{ fontSize: 'x-small' }} component={Link} to='/refrigerioPreRevision' icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                                <Tab label="Control Resumen" style={{ fontSize: 'x-small' }} icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Container>
                <Typography align='center' variant='h5' className={classes.spacingBot}>SERVICIO DE REFRIGERIO</Typography>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography variant='subtitle1' align='center' className={classes.spacingBot}>BUSCAR INFORMACION</Typography>
                                <form onSubmit={getPlanilla}>
                                    <div align='center'><FormLabel  >Tipo de Planilla</FormLabel></div>
                                    <RadioGroup
                                        name='typePlanilla'
                                        defaultValue=""
                                        onChange={handleChange}
                                        className={classes.spacingBot}
                                        style={{ marginLeft: '15%' }}
                                    >
                                        <FormControlLabel value="permanente" control={<Radio color='primary' />} label="Permanente" />
                                        <FormControlLabel value="eventual" control={<Radio color='primary' />} label="Eventual" />

                                    </RadioGroup>
                                    <TextField
                                        name='fechaini'
                                        label='Fecha Inicial'
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                        type='date'
                                        InputLabelProps={{ shrink: true }}
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        name='fechafin'
                                        label='Fecha Inicial'
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                        type='date'
                                        InputLabelProps={{ shrink: true }}
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                    />
                                    <div align='center'>
                                        <Button variant='contained' color='primary' type='submit' >Buscar</Button>
                                    </div>
                                </form>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <div align='right'>
                            <Button size='small' style={{ backgroundColor: '#689f38', color: 'white', marginBottom: '0.5rem' }} variant='contained' onClick={pdfGenerate} endIcon={<PrintIcon />} >Imprimir</Button>
                        </div>
                        <Paper component={Box} p={1}>
                            <TableContainer style={{ maxHeight: 440 }} className={classes.spacingBot}>
                                <Table style={{ minWidth: 1000 }} id='id-table'>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell className={classes.tableHead} align='center'>Item</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>C.I.</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Apellidos y Nombres</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Cargo</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Dias Trab.</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Serv. Refrigerio P/dia</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Total Serv. Refrigerio</TableCell>
                                            <TableCell className={classes.tableHead} align='center' style={{ width: '7%' }}>Trib. Fis. RC-IVA 13%</TableCell>
                                            <TableCell className={classes.tableHead} align='center' style={{ width: '7%' }}>Trib. Fis. RC-IVA 13% Presentado</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Total Descuento</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Total Ganado</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Otros Descuentos</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Liquido Pagable</TableCell>
                                            <TableCell className={classes.tableHead} align='center'></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {array1.length > 0 && planilla.length > 0 ? (
                                        array1.map((d, index) => (
                                            <TableBody key={index}>
                                                <TableRow>
                                                    <TableCell colSpan='4'>{d.nameDepartament}</TableCell>
                                                </TableRow>
                                                {planilla.map((p, index) => (
                                                    <Fragment key={index}>
                                                        {d.nameDepartament === p.departamentEmp ? (
                                                            <TableRow>
                                                                <TableCell align='center' className={classes.tablebody}>{p.itemEmp}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.CIEmp}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.fullName}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.cargoEmp}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.diasTrabajado}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.pagoPorDia}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.totalServicio}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.RC_IVA}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.RC_IVA_presentado}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.totalDescuento}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.totalGanado}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.otrosDescuentos}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.liquidoPagable}</TableCell>
                                                                <TableCell>
                                                                    <Tooltip title='edit'>
                                                                        <IconButton size='small' onClick={() => openModalEditPlanilla(p)}>
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : (null)}
                                                    </Fragment>
                                                ))}
                                            </TableBody>
                                        ))
                                    ) : (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align='center' colSpan='12'>no existe informacion</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                    {/* <TableBody>
                                        {planilla.length > 0 ? (
                                            planilla.map((p, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align='center' className={classes.tablebody}>{p.itemEmp}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.CIEmp}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.fullName}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.cargoEmp}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.diasTrabajado}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.pagoPorDia}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.totalServicio}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.RC_IVA}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.RC_IVA_presentado}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.totalDescuento}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.totalGanado}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.otrosDescuentos}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.liquidoPagable}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title='edit'>
                                                            <IconButton size='small' onClick={() => openModalEditPlanilla(p)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell align='center' colSpan='10'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody> */}
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={openEditPlanilla}
                onClose={closeModalEditPlanilla}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>EDITAR PLANILLA REFRIGERIO</Typography>
                    <form onSubmit={editPlanilla}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='fullName'
                                    label='Nombre Completo'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    value={changeDataEdit.fullName}
                                    // onChange={handleChangeEdit}
                                    className={classes.spacingBot}
                                    required
                                />
                                <TextField
                                    name='diasTrabajado'
                                    label='Dias Trabajados'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    type='number'
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeDataEdit.diasTrabajado}
                                    onChange={handleChangeEdit}
                                    className={classes.spacingBot}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='RC_IVA_presentado'
                                    label='RC IVA Presentado'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    type='number'
                                    inputProps={{ step: 'any' }}
                                    value={changeDataEdit.RC_IVA_presentado}
                                    onChange={handleChangeEdit}
                                    className={classes.spacingBot}
                                    required
                                />
                                <TextField
                                    name='otrosDescuentos'
                                    label='Otros Descuentos'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    type='number'
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeDataEdit.otrosDescuentos}
                                    onChange={handleChangeEdit}
                                    className={classes.spacingBot}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit' >aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalEditPlanilla} >cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
        </>
    )
}

export default RefrigerioRevision
