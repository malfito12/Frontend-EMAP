import { Box, Button, Container, MenuItem, FormControlLabel, FormLabel, RadioGroup, Radio, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Tabs, Tab, Dialog } from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { PORT_URL } from '../../../../PortURL'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import RegisterApp from '@material-ui/icons/CloudUpload'
import SearchIcon from '@material-ui/icons/Search'
import { AlertAddPlanillaS, AlertErrorPlanillaS } from '../../../Atoms/Alerts/AlertReEdDe'

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
const SueldosPreRevision = () => {
    const classes = useStyles()
    const [planilla, setPlanilla] = useState([])
    const [openConfirmPlanilla, setOpenConfirmPlanilla] = useState(false)
    const [openAlertPlanilla, setOpenAlertPlanilla] = useState(false)
    const [openAlertErrorPlanilla, setOpenAlertErrorPlanilla] = useState(false)
    const [changeData, setChangeData] = useState({
        // id_bio:'',
        typePlanilla: '',
        fechaini: '',
        fechafin: '',
        mes: '',
        year: '',
    })

    //-------------------GET PRE-PLANILLA DE SUELDO--------------------------------
    const getPlanilla = async (e) => {
        e.preventDefault()
        const typePlanilla = changeData.typePlanilla
        // const fechaini = changeData.fechaini
        // const fechafin = changeData.fechafin
        const mes = changeData.mes
        const year = changeData.year

        // await axios.get(`${PORT_URL}sueldo/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
        // await axios.get(`${PORT_URL}pre-planillasueldo?typePlanilla=${typePlanilla}&fechaini=${fechaini}&fechafin=${fechafin}`)
        await axios.get(`${PORT_URL}pre-planillasueldo?typePlanilla=${typePlanilla}&mes=${mes}&year=${year}`)
            .then(resp => {
                setPlanilla(resp.data)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //--------------------POST PLANILLA DE SUELDOS------------------------------------
    const openModalConfirmPlanilla = () => {
        setOpenConfirmPlanilla(true)
    }
    const closeModalConfirmPlanilla = () => {
        setOpenConfirmPlanilla(false)
    }
    const postPlanilla = async (e) => {
        e.preventDefault()
        if (planilla.length > 0) {
            await axios.post(`${PORT_URL}planillaSueldo`, planilla)
                .then(resp => {
                    closeModalConfirmPlanilla()
                    openCloseAlertPlanilla()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            closeModalConfirmPlanilla()
            openCloseAlertErrorPlanilla()
        }
    }
    //------------------------ALERTAS--------------------------------------
    //-----------------------------ALERTAS---------------------------------
    const openCloseAlertPlanilla = () => {
        setOpenAlertPlanilla(!openAlertPlanilla)
    }
    const openCloseAlertErrorPlanilla = () => {
        setOpenAlertErrorPlanilla(!openAlertErrorPlanilla)
    }
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    // console.log(changeData)
    // console.log(planilla)
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
                        <Tab label="Subir Info." style={{ fontSize: 'x-small' }} icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                        <Tab label="Control Sueldos" style={{ fontSize: 'x-small' }} component={Link} to='/sueldosRevision' icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth={false} >
                <Typography variant='h5' align='center' className={classes.spacingBot}>BUSQUEDA DE INFORMACION SUELDOS</Typography>
                <Grid container >
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography variant='subtitle1' align='center' className={classes.spacingBot}>BUSCAR INFORMACION</Typography>
                                <form onSubmit={getPlanilla} className={classes.spacingBot}>
                                    <div align='center'><FormLabel >Tipo de Planilla</FormLabel></div>
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
                                    {/* <TextField
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
                                        label='A??o (ejemplo 2020)'
                                        variant='outlined'
                                        fullWidth
                                        type='number'
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div align='center'>
                                        <Button variant='contained' color='primary' type='submit' fullWidth size='small' endIcon={<SearchIcon />}>Buscar</Button>
                                    </div>
                                </form>
                                <Button onClick={openModalConfirmPlanilla} variant='contained' color='primary' size='small' fullWidth endIcon={<RegisterApp />}>Subir informacion</Button>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper component={Box} p={1}>
                            <TableContainer style={{ maxHeight: 440 }} className={classes.spacingBot}>
                                <Table style={{ minWidth: 2000 }}>
                                    <TableHead>
                                        <TableRow size='small'>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>N?? Item</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Carnet de Identidad</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Apellidos y Nombres</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Nacionalidad</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Sexo</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Ocupacion que Desempe??a</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Fecha de Ingreso</TableCell>
                                            <TableCell rowSpan='2' className={classes.tableHead} align='center'>Haber B??sico</TableCell>
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
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHead} align='center'>N?? de Domingos</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Domingos Feriados</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>AFP</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>RC-IVA</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {planilla.length > 0
                                            ? (planilla.map((p, index) => (
                                                <TableRow key={index}>
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
                                                    <TableCell align='center' className={classes.tablebody}>{p.totalGanado}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.atraso}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.faltas}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.sancionFaltasAtrasos}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.bajaMedica}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.AFP}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.RC_IVA}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.sind}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.totalDescuento}</TableCell>
                                                    <TableCell align='center' className={classes.tablebody}>{p.liquidoPagable}</TableCell>
                                                </TableRow>
                                            ))) : (
                                                <TableRow>
                                                    <TableCell align='center' colSpan='9'>no existe informacion</TableCell>
                                                </TableRow>
                                            )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/*----------------MODAL DE CONFIRMACION--------------*/}
            <Dialog
                open={openConfirmPlanilla}
                onClose={closeModalConfirmPlanilla}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' >Los datos existentes se modificar??n</Typography>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>??Estas seguro de realizar esta acci??n?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={postPlanilla}>aceptar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalConfirmPlanilla}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
            {/*---------------------ALERTAS-----------------*/}
            <AlertAddPlanillaS open={openAlertPlanilla} onClose={openCloseAlertPlanilla} />
            <AlertErrorPlanillaS open={openAlertErrorPlanilla} onClose={openCloseAlertErrorPlanilla} />
        </>
    )
}

export default SueldosPreRevision
