import { Box, Button, Container, FormControlLabel, FormLabel, RadioGroup, Radio, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Tabs, Tab } from '@material-ui/core'
import axios from 'axios'
import {Link} from 'react-router-dom'
import React, { useState } from 'react'
import { PORT_URL } from '../../../../PortURL'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

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
    const [changeData, setChangeData] = useState({
        // id_bio:'',
        typePlanilla: '',
        fechaini: '',
        fechafin: ''
    })

    //-------------------GET PRE-PLANILLA DE SUELDO--------------------------------
    const getPlanilla = async (e) => {
        e.preventDefault()
        // const id = changeData.id_bio
        const typePlanilla = changeData.typePlanilla
        const fechaini = changeData.fechaini
        const fechafin = changeData.fechafin
        // console.log(id)
        // console.log(fechaini)
        // console.log(fechafin)
        // await axios.get(`${PORT_URL}sueldo/${id}?fechaini=${fechaini}&fechafin=${fechafin}`)
        await axios.get(`${PORT_URL}pre-planillasueldo?typePlanilla=${typePlanilla}&fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => {
                setPlanilla(resp.data)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //--------------------POST PLANILLA DE SUELDOS------------------------------------
    const postPlanilla=async(e)=>{
        e.preventDefault()
        await axios.post(`${PORT_URL}planillaSueldo`,planilla)
        .then(resp=>console.log(resp.data))
        .catch(err=>console.log(err))
    }
    //-----------------------------------------------------------------
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
            <Container maxWidth={false} style={{ paddingTop: '4.5rem' }}>
                <Container maxWidth='lg'>
                    <Grid item xs={12} sm={5} >
                        <Paper className={classes.spacingBot}>
                            <Tabs
                                value={scroll}
                                onChange={scrollChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                style={{ height: 60 }}
                            >
                                <Tab label="Subir Info." style={{ fontSize: 'x-small' }} icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                                <Tab label="Control Resumen" style={{ fontSize: 'x-small' }} component={Link} to='/sueldosRevision' icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Container>
                <Typography variant='h5' align='center' className={classes.spacingBot}>PRE - PLANILLA DE SUELDOS</Typography>
                <Grid container >
                    <Grid item xs={12} sm={5}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2} className={classes.spacingBot}>
                                <Typography variant='subtitle1' align='center' className={classes.spacingBot}>BUSCAR INFORMACION</Typography>
                                <form onSubmit={getPlanilla}>
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
                        <Paper component={Box} p={1}>
                            <TableContainer style={{ maxHeight: 440 }} className={classes.spacingBot}>
                                <Table style={{ minWidth: 2000 }}>
                                    <TableHead>
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
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHead} align='center'>N° de Domingos</TableCell>
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
                            <div align='center'>
                                <Button onClick={postPlanilla} variant='contained' color='primary' size='small'>Subir informacion</Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/* <div style={{ paddingTop: '5rem' }}>
                <div align='center'>
                    <h2 className={classes.spacingBot} >Panilla de Sueldos</h2>
                    <div>
                        <form onSubmit={getPlanilla}>
                            <div className={classes.spacingBot}>
                                <input
                                    name='id_bio'
                                    type='number'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.spacingBot}>
                                <input
                                    name='fechaini'
                                    type='date'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.spacingBot}>
                                <input
                                    name='fechafin'
                                    type='date'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.spacingBot}>
                                <button type='submit'>enviar</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div> */}
        </>
    )
}

export default SueldosPreRevision
