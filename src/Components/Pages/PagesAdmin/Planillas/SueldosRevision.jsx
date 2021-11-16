import { Container, Box, Grid, makeStyles, Paper, Tab, Tabs, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, Dialog } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';
import EditIcon from '@material-ui/icons/Edit'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PrintIcon from '@material-ui/icons/Print'
import moment from 'moment';
import logo2emap from '../../../../images/logo2emap.png'

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
const SueldosRevision = () => {
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
        interinato: '',
        bajaMedica: '',
    })

    useEffect(() => {
        getDepartament()
    }, [])

    //------------------GET PLANILLA DE SUELDOS--------------------------------------
    const getPlanilla = async (e) => {
        e.preventDefault()
        const typePlanilla = changeData.typePlanilla
        const fechaini = changeData.fechaini
        const fechafin = changeData.fechafin
        await axios.get(`${PORT_URL}planillaSueldo?typePlanilla=${typePlanilla}&fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => {
                setPlanilla(resp.data)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //----------------------EDIT PLANILLA DE SUELDOS--------------------------------------
    const openModalEDitPlanilla = (e) => {
        setChangeDataEdit(e)
        setOpenEditPlanilla(true)
    }
    const closeModalEditPlanilla = () => {
        setOpenEditPlanilla(false)
    }

    const editPlanilla = async (e) => {
        e.preventDefault()
        const id = changeDataEdit._id
        console.log(id)
        await axios.put(`${PORT_URL}planillaSueldo/${id}`, changeDataEdit)
            .then(resp => {
                closeModalEditPlanilla()
                getPlanilla(e)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------------------------------------------------------
    const handleChangeEdit = (e) => {
        setChangeDataEdit({
            ...changeDataEdit,
            [e.target.name]: e.target.value
        })
    }
    //-----------------------------------------------------------------
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
    //---------------------------PDF GENERATE-------------------------------
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
    // console.log(numeroAnio)
    var image = logo2emap
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        doc.setFontSize(12)
        doc.addImage(image, 0.5, 0, 1.5, 1)
        doc.text("PLANILLA DE SUELDOS", pageWidth / 2, 0.5, 'center')
        doc.text(`${(changeData.typePlanilla).toUpperCase()}`, pageWidth / 2, 0.7, 'center');
        doc.setFontSize(10)
        doc.text(`Correspondiente al mes de ${mes} del ${numeroAnio}`, pageWidth / 2, 0.9, 'center');
        doc.text(`(En Bolivianos)`, pageWidth / 2, 1.1, 'center');
        doc.autoTable({ html: "#id-table", startY: 1.5, styles: { fontSize: 5, halign: 'center' } })
        // doc.output('dataurlnewwindow')
        window.open(doc.output('bloburi'))
    }
    //-----------------------------------------------------------------
    // console.log(planilla)
    // console.log(departamento)
    // console.log(changeData)
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
                        <Tab label="Subir Info." style={{ fontSize: 'x-small' }} component={Link} to='/sueldosPreRevision' icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                        <Tab label="Control Sueldos" style={{ fontSize: 'x-small' }} icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth={false}>
                <Typography variant='h5' align='center' className={classes.spacingBot}>CONTROL DE SUELDOS</Typography>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography variant='subtitle1' align='center' className={classes.spacingBot}>INFORMACION</Typography>
                                <form onSubmit={getPlanilla}>
                                    <div align='center'><FormLabel>Tipo de Planilla</FormLabel> </div>
                                    <RadioGroup
                                        name='typePlanilla'
                                        defaultValue=''
                                        style={{ marginLeft: '15%' }}
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value='permanente' control={<Radio color='primary' />} label='Permanente' />
                                        <FormControlLabel value='eventual' control={<Radio color='primary' />} label='Eventual' />
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
                                        <Button size='small' variant='contained' color='primary' type='submit' >Buscar</Button>
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
                            <TableContainer style={{ maxHeight: 440 }}>
                                <Table style={{ minWidth: 2000 }} id='id-table'>
                                    <TableHead id='id-head'>
                                        <TableRow size='small'>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>N° Item</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Carnet de Identidad</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Apellidos y Nombres</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Nacionalidad</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Sexo</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Ocupacion que Desempeña</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Fecha de Ingreso</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Haber Básico</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Dias Trab. Mes</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Sueldos</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Bono de Antiguedad</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Bonos Rec. Noc.</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Interinato</TableCell>
                                            <TableCell colSpan='2' className={classes.tableHead} align='center'>Dom y Fer</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Total Ganado</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Atraso</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Faltas</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Sancion/Faltas/Atrasos</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Baja Medica S.S.U.</TableCell>
                                            <TableCell colSpan='2' className={classes.tableHead} align='center'>Descuentos</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Sindicato</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Total Descuento</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Liquido Pagable</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHead} align='center'>N° de Domingos</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Domingos Feriados</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>AFP</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>RC-IVA</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {array1.length > 0 && planilla.length > 0 ? (
                                        array1.map((d, index) => (
                                            <TableBody key={index}>
                                                <TableRow >
                                                    <TableCell colSpan='4'>{d.nameDepartament}</TableCell>
                                                </TableRow>
                                                {planilla.map((p, index) => (
                                                    <Fragment key={index}>
                                                        {d.nameDepartament === p.departamentEmp ? (
                                                            <TableRow>
                                                                <TableCell align='center' className={classes.tablebody}>{p.numItem}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.CIEmp}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.nameEmp}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.nacionality}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.sexoEmp}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.cargoEmp}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.fechaIng}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.haber_basico}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.diasTrabajados}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.sueldo}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.bonoDeAntiguedad}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.bonoRecargaNoc}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.interinato}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.numDominical}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.domingosFeriados}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.auxTotalGanado}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.atrasos}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.faltas}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.sancionFaltasAtrasos}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.bajaMedica}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.AFP}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.RC_IVA}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.sind}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.auxTotalDescuento}</TableCell>
                                                                <TableCell align='center' className={classes.tablebody}>{p.auxLiquidoPagable}</TableCell>
                                                                <TableCell>
                                                                    <Tooltip title='edit'>
                                                                        <IconButton size='small' onClick={() => openModalEDitPlanilla(p)}>
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
                                                <TableCell align='center' colSpan='8'>no existe informacion</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                    {/* <TableBody>
                                        {planilla.length > 0
                                            ? (planilla.map(p => (
                                                <TableRow key={p._id}>
                                                    <TableCell align='center' className={classes.tablebody}>{p.numItem}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.CIEmp}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.nameEmp}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.nacionality}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.sexoEmp}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.cargoEmp}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.fechaIng}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.haber_basico}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.diasTrabajados}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.sueldo}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.bonoDeAntiguedad}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.bonoRecargaNoc}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.interinato}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.numDominical}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.domingosFeriados}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.auxTotalGanado}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.atrasos}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.faltas}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.sancionFaltasAtrasos}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.bajaMedica}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.AFP}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.RC_IVA}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.sind}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.auxTotalDescuento}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.auxLiquidoPagable}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title='edit'>
                                                            <IconButton size='small' onClick={() => openModalEDitPlanilla(p)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))) : (
                                                <TableRow>
                                                    <TableCell colSpan='9' align='center'>No existe informacion</TableCell>
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
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography className={classes.spacingBot} align='center' variant='subtitle1'>EDITAR PLANILLA</Typography>
                    <form onSubmit={editPlanilla}>
                        <Grid container direction='column'>
                            <TextField
                                name='interinato'
                                label='Interinato'
                                variant='outlined'
                                size='small'
                                type='number'
                                inputProps={{ step: 'any' }}
                                required
                                defaultValue={changeDataEdit.interinato}
                                className={classes.spacingBot}
                                onChange={handleChangeEdit}
                            />
                            <TextField
                                name='bajaMedica'
                                label='Baja Medica S.S.U.'
                                variant='outlined'
                                size='small'
                                type='number'
                                inputProps={{ step: 'any' }}
                                required
                                defaultValue={changeDataEdit.bajaMedica}
                                className={classes.spacingBot}
                                onChange={handleChangeEdit}
                            />
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalEditPlanilla}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
        </>
    )
}

export default SueldosRevision
