import { Button, Container, FormControlLabel, Box, FormLabel, Grid, makeStyles, Paper, Radio, RadioGroup, Tab, Tabs, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';
import { AlertAddPlanillaR, AlertErrorPlanillaR } from '../../../Atoms/Alerts/AlertReEdDe';


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
const RefrigerioPreRevision = () => {
    const classes = useStyles()
    const [planilla, setPlanilla] = useState([])
    const [openAlertPlanilla,setOpenAlertPlanilla]=useState(false)
    const [openAlertErrorPlanilla,setOpenAlertErrorPlanilla]=useState(false)
    const [openConfirmPlanilla,setOpenConfirmPlanilla]=useState(false)
    const [changeData, setChangeData] = useState({
        // id_bio:'',
        typePlanilla: '',
        fechaini: '',
        fechafin: ''
    })


    //------------GET PLANILLA REFRIGERIO--------------------------------
    const getPlanilla = async (e) => {
        e.preventDefault()
        const typePlanilla = changeData.typePlanilla
        const fechaini = changeData.fechaini
        const fechafin = changeData.fechafin
        await axios.get(`${PORT_URL}pre-planillarefrigerio?typePlanilla=${typePlanilla}&fechaini=${fechaini}&fechafin=${fechafin}`)
            .then(resp => {
                setPlanilla(resp.data)
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //---------------POST PLANILLA REFRIGERIO--------------------------------------
    const openModalConfirmPlanilla=()=>{
        setOpenConfirmPlanilla(true)
    }
    const closeModalConfirmPlanilla=()=>{
        setOpenConfirmPlanilla(false)
    }
    const postPlanilla=async(e)=>{
        e.preventDefault()
        if(planilla.length>0){
            await axios.post(`${PORT_URL}planillarefrigerio`,planilla)
            .then(resp=>{
                closeModalConfirmPlanilla()
                openCloseAlertPlanilla()
                // console.log(resp.data)
            })
            .catch(err=>console.log(err))
        }else{
            closeModalConfirmPlanilla()
            openCloseAlertErrorPlanilla()
        }
    }
    //---------------HANDLE CHANGE--------------------------------------
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
    //-----------------------------ALERTAS---------------------------------
    const openCloseAlertPlanilla=()=>{
        setOpenAlertPlanilla(!openAlertPlanilla)
    }
    const openCloseAlertErrorPlanilla=()=>{
        setOpenAlertErrorPlanilla(!openAlertErrorPlanilla)
    }
    //-----------------------------------------------------------------
    console.log(planilla)
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
                                <Tab label="Subir Info." style={{ fontSize: 'x-small' }} icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                                <Tab label="Control Resumen" style={{ fontSize: 'x-small' }} component={Link} to='/refrigerioRevision' icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
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
                                    <div align='center'><FormLabel >Refrigerio Tipo de Planilla</FormLabel></div>
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
                                <Table style={{ minWidth: 1000 }}>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell className={classes.tableHead} align='center'>Item</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>C.I.</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Apellidos y Nombres</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Cargo</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Dias Trab.</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Serv. Refrigerio P/dia</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Total Serv. Refrigerio</TableCell>
                                            <TableCell className={classes.tableHead} align='center' style={{width:'7%'}}>Trib. Fis. RC-IVA 13%</TableCell>
                                            <TableCell className={classes.tableHead} align='center' style={{width:'7%'}}>Trib. Fis. RC-IVA 13% Presentado</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Total Descuento</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Total Ganado</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Otros Descuentos</TableCell>
                                            <TableCell className={classes.tableHead} align='center'>Liquido Pagable</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
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
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell align='center' colSpan='10'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div align='center'>
                                <Button size='small' variant='contained' color='primary' onClick={openModalConfirmPlanilla}>guardar informacion</Button>
                            </div>
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
                    <Typography variant='subtitle1' align='center' >Los datos existentes se modificarán</Typography>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>¿Estas seguro de realizar esta acción?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={postPlanilla}>aceptar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalConfirmPlanilla}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
            {/*---------------------ALERTAS-----------------*/}
            <AlertAddPlanillaR open={openAlertPlanilla} onClose={openCloseAlertPlanilla} />
            <AlertErrorPlanillaR open={openAlertErrorPlanilla} onClose={openCloseAlertErrorPlanilla} />
        </>
    )
}

export default RefrigerioPreRevision
