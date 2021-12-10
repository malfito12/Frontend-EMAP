import { Box, Button, Container, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState, Fragment } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import PrintIcon from '@material-ui/icons/Print'
import axios from 'axios'
import { PORT_URL } from '../../../../PortURL'
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo2emap from '../../../../images/logo2emap.png'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    tableHead: {
        color: 'white',
        background: 'black',
        fontSize: 'x-small',
        padding: 4
    },
    tablebody: {
        fontSize: 'x-small',
        // padding: 10
    }
}))

const AportesPatronales = () => {
    const classes = useStyles()
    const [planilla, setPlanilla] = useState([])
    const [departamento, setDepartamento] = useState([])
    const [changeData, setChangeData] = useState({
        // id_bio:'',
        typePlanilla: '',
        fechaini: '',
        fechafin: ''
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
        await axios.get(`${PORT_URL}planillaAportesPatronales?typePlanilla=${typePlanilla}&fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => {
                setPlanilla(resp.data)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
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
    //-----------------------------------------------------------------
    const array1 = []
    var a = 0;
    const contDep = departamento.length
    const contPlanilla = planilla.length
    while (a < contDep) {
        for (var i = 0; i < contPlanilla; i++) {
            if (departamento[a].nameDepartament === planilla[i].departament) {
                array1.push(departamento[a])
                break;
            }
        }
        a++;
    }
    //-------------------------PDF GENERATE---------------------------------
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
        case 9: mes = 'OCTUBRE'; break;
        case 10: mes = 'NOVIEMBRE'; break;
        case 11: mes = 'DICIEMBRE'; break;
        default: mes = 'mes no valido'
    }
    var image = logo2emap
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        // var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        doc.setFontSize(12)
        doc.addImage(image, 0.5, 0, 1.5, 1)
        doc.text("PLANILLA DE APORTES PATRONALES", pageWidth / 2, 0.5, 'center')
        doc.setFontSize(11)
        doc.text(`CORRESPONDIENTE AL MES DE ${mes} DEL ${numeroAnio}`, pageWidth / 2, 0.7, 'center');
        doc.text(`PERSONAL ${(changeData.typePlanilla).toUpperCase()} POR FUNCIONAMIENTO`, pageWidth / 2, 0.9, 'center');
        // doc.text(`(En Bolivianos)`, pageWidth / 2, 1.1, 'center');
        doc.autoTable({ html: "#id-table", startY: 1.2, styles: { fontSize: 5, halign: 'center' } })
        doc.setFontSize(8)
        doc.text('-----------------------------------', pageWidth / 6.4, doc.lastAutoTable.finalY + 0.9)
        doc.text('REALIZADO POR', pageWidth / 6, doc.lastAutoTable.finalY + 1)
        doc.text('-----------------------------------', pageWidth / 2, doc.lastAutoTable.finalY + 0.9, 'center')
        doc.text('REVISADO POR', pageWidth / 2, doc.lastAutoTable.finalY + 1, 'center')
        doc.text('-----------------------------------', pageWidth / 1.33, doc.lastAutoTable.finalY + 0.9,)
        doc.text('APROBADO POR', pageWidth / 1.3, doc.lastAutoTable.finalY + 1)
        // doc.output('dataurlnewwindow')
        window.open(doc.output('bloburi'))
    }
    //-------------------------HANDLE CHANGE-------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(planilla)
    return (
        <Container maxWidth={false} style={{ paddingTop: '5rem' }}>
            <Typography variant='h6' align='center' className={classes.spacingBot}>APORTES PATRONALES</Typography>
            <Grid container>
                <Grid item xs={12} sm={5}>
                    <Container maxWidth='xs'>
                        <Paper component={Box} p={2} className={classes.spacingBot}>
                            <Typography variant='subtitle1' align='center' className={classes.spacingBot}>INFORMACION</Typography>
                            <form onSubmit={getPlanilla}>
                                <div align='center'><FormLabel>Tipo de Planilla</FormLabel></div>
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
                                <div align='center' className={classes.spacingBot}>
                                    <Button endIcon={<SearchIcon />} fullWidth size='small' variant='contained' color='primary' type='submit' >Buscar</Button>
                                </div>
                            </form>
                            <Button endIcon={<PrintIcon />} size='small' fullWidth variant='contained' style={{ background: 'green', color: 'white' }} onClick={pdfGenerate}>imprimir</Button>
                        </Paper>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Paper component={Box} p={1}>
                        <TableContainer style={{ maxHeight: 440 }}>
                            <Table style={{ minWidth: 1200 }} id='id-table'>
                                <TableHead id='id-head'>
                                    <TableRow size='small'>
                                        <TableCell className={classes.tableHead} align='center'>N° Item</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Carnet de Identidad</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Apellidos y Nombres</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Cargo</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Total Ganado</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>S.S.U. 10%</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Bajas Medicas S.S.U</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Riesgo Profesion al 1.71%</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Aporte Solidario 3%</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Pro Viviendas 2%</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Provision Aguinaldo 8.33%</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Prevision Indeminiz a 8.33%</TableCell>
                                        <TableCell className={classes.tableHead} align='center'>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* <TableBody></TableBody> */}
                                {array1.length > 0 && planilla.length > 0 ? (
                                    array1.map((d, index) => (
                                        <TableBody key={index}>
                                            <TableRow >
                                                <TableCell colSpan='4'>{d.nameDepartament}</TableCell>
                                            </TableRow>
                                            {planilla.map((p, index) => (
                                                <Fragment key={index}>
                                                    {d.nameDepartament === p.departament ? (
                                                        <TableRow>
                                                            <TableCell align='center' className={classes.tablebody}>{p.itemEmp}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.ciEmp}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.fullName}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.cargo}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.totalGanado}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.ssu}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.bajasMedicas}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.riesgoProfesion}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.aporteSolidario}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.proVivienda}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.provisionAguinaldo}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.previsionIndeminiz}</TableCell>
                                                            <TableCell align='center' className={classes.tablebody}>{p.total}</TableCell>

                                                            {/* <TableCell>
                                                                <Tooltip title='edit'>
                                                                    <IconButton size='small' onClick={() => openModalEDitPlanilla(p)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell> */}
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
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AportesPatronales
