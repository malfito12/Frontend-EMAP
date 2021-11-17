import { Button, Box, Container, Grid, Paper, TextField, Typography, makeStyles, MobileStepper, Dialog, MenuItem, Tab, Tabs } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { PORT_URL } from '../../../PortURL'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const GeneralConfig = () => {
    const classes = useStyles()
    const [openConfig, setOpenConfig] = useState(false)
    const [openEditConfig, setOpenEditConfig] = useState(false)
    const [openDeleteConfig, setOpenDeleteConfig] = useState(false)
    const [config, setConfig] = useState([])
    const [changeData, setChangeData] = useState({
        recargaNocturna: '',
        interinato: '',
        AFP: '',
        RCIVA: '',
        IUE: '',
        IT: '',
        salarioMinimo: '',
        bonoTeRefrigerio: '',
        valorAfiliacion: '',
        gestion: '',
        estado: '',
        teEventual: '',
    })

    useEffect(() => {
        getConfig()
    }, [])
    //-----------------GET CONFIG-----------------------
    const getConfig = async () => {
        await axios.get(`${PORT_URL}generalconfig`)
            .then(resp => {
                setConfig(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------POST CONFIG--------------------
    const openModalConfig = () => {
        setOpenConfig(true)
    }
    const closeModalConfig = () => {
        setOpenConfig(false)
    }
    const postConfig = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}generalconfig`, changeData)
            .then(resp => {
                closeModalConfig()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
        getConfig()
    }
    //------------------EDITAR CONFIGURACION------------------
    const openModalEditConfig = (e) => {
        // console.log(e)
        setChangeData(e)
        setOpenEditConfig(true)
    }
    const closeModalEditConfig = () => {
        setOpenEditConfig(false)
    }
    const editConfig = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.put(`${PORT_URL}generalconfig/${id}`, changeData)
            .then(resp => {
                closeModalEditConfig()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
        getConfig()
    }
    //------------------ELIMINAR CONFIGURACION------------------
    const openModalDeleteConfig = (e) => {
        setChangeData(e)
        setOpenDeleteConfig(true)
    }
    const closeModalDeleteConfig = () => {
        setOpenDeleteConfig(false)
    }
    const deleteConfig = async (e) => {
        e.preventDefault()
        const id = changeData._id
        await axios.delete(`${PORT_URL}deleteConfig/${id}`)
            .then(resp => {
                closeModalDeleteConfig()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
        getConfig()
    }
    //----------------HANDLE CHANGE--------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }

    //------------------------------------------
    // const maxSteps = data.length
    const maxSteps = config.length
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = (a) => {
        // console.log(a)
        setActiveStep((e) => e - 1)
    }
    const handleBack = (a) => {
        // console.log(a)
        setActiveStep((e) => e + 1)
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(0)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    //------------------------------------------
    console.log(changeData)
    // console.log(changeData2)
    // console.log(config)
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
                        <Tab label="Datos Generales" style={{ fontSize: 'x-small' }} icon={<AcUnitIcon style={{ fontSize: 'large' }} />} />
                        <Tab label="Antiguedad de Empleado" style={{ fontSize: 'x-small' }} component={Link} to='/antiguedadEmp' icon={<AccountBalanceIcon style={{ fontSize: 'large' }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography className={classes.spacingBot} align='center' variant='h4'>DATOS GENERALES</Typography>
                <Button size='small' variant='contained'className={classes.spacingBot} style={{ background: 'green', color: 'white' }} onClick={openModalConfig}>nuevo</Button>
                <Container maxWidth='md'>
                    <Paper component={Box} p={2}>
                        <Typography align='center' variant='h6' className={classes.spacingBot} >PORCENTAGES - VALORES</Typography>
                        {config.length > 0 ? (
                            <>
                                {/* <Typography align='center'>{config[activeStep].gestion}</Typography> */}
                                <form /*onSubmit={postConfig}*/>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                name='recargaNocturna'
                                                label='Recarga Nocturna'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].recargaNocturna}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='interinato'
                                                label='Interinato'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].interinato}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='AFP'
                                                label='AFP'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].AFP}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='RCIVA'
                                                label='RC-IVA'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].RCIVA}
                                                className={classes.spacingBot}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                name='IUE'
                                                label='IUE'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].IUE}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='IT'
                                                label='IT'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].IT}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='salarioMinimo'
                                                label='Salario Minimo'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].salarioMinimo}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='bonoTeRefrigerio'
                                                label='Bono Refrigerio'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].bonoTeRefrigerio}
                                                className={classes.spacingBot}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                name='valorAfiliacion'
                                                label='Valor de Afiliacion'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].valorAfiliacion}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='gestion'
                                                label='Gestion'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                value={config[activeStep].gestion}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='estado'
                                                label='Estado'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                value={config[activeStep].estado}
                                                className={classes.spacingBot}
                                            />
                                            <TextField
                                                name='teEventual'
                                                label='Bono Te Eventual'
                                                variant='outlined'
                                                type='number'
                                                size='small'
                                                fullWidth
                                                inputProps={{ step: 'any' }}
                                                value={config[activeStep].teEventual}
                                                className={classes.spacingBot}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container justify='space-evenly'>
                                        {/* <Button size='small' variant='contained' style={{ background: 'green', color: 'white' }} onClick={openModalConfig}>nuevo</Button> */}
                                        <Button size='small' variant='contained' color='primary' onClick={() => openModalEditConfig(config[activeStep])} >actualizar</Button>
                                        <Button size='small' variant='contained' color='secondary' onClick={() => openModalDeleteConfig(config[activeStep])} >eliminar</Button>
                                    </Grid>
                                </form>
                            </>
                        ) : (<div></div>)}
                    </Paper>
                </Container>
                <Container maxWidth='xs' style={{ maxWidth: 400, flexGrow: 1 }}>
                    <MobileStepper
                        style={{ background: 'black', color: 'white' }}
                        steps={maxSteps}
                        position='static'
                        variant='text'
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                color='primary'
                                onClick={() => handleNext(config[activeStep])}
                                // disabled={activeStep === maxSteps - 1}
                                disabled={activeStep === 0}
                            >next</Button>
                            // >back</Button>
                        }
                        backButton={
                            <Button
                                color='primary'
                                onClick={() => handleBack(config[activeStep])}
                                // disabled={activeStep === 0}
                                disabled={activeStep === maxSteps - 1}
                            >back</Button>
                            // >next</Button>
                        }
                    />
                </Container>
            </Container>
            {/*----------------REGISTER CONFIGURACION----------------------------*/}
            <Dialog
                open={openConfig}
                onClose={closeModalConfig}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>REGISTRAR</Typography>
                    <form onSubmit={postConfig}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={4} >
                                <TextField
                                    name='recargaNocturna'
                                    label='Recarga Nocturna'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='interinato'
                                    label='Interinato'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='AFP'
                                    label='AFP'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='RCIVA'
                                    label='RC-IVA'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='IUE'
                                    label='IUE'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='IT'
                                    label='IT'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='salarioMinimo'
                                    label='Salario Minimo'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='bonoTeRefrigerio'
                                    label='Bono Refrigerio'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='valorAfiliacion'
                                    label='Valor de Afiliacion'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='gestion'
                                    label='Gestion'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='estado'
                                    label='Estado'
                                    variant='outlined'
                                    size='small'
                                    select
                                    fullWidth
                                    value={changeData.estado}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='A'>A</MenuItem>
                                    <MenuItem value='B'>B</MenuItem>
                                    <MenuItem value='C'>C</MenuItem>
                                </TextField>
                                <TextField
                                    name='teEventual'
                                    label='Bono Te Eventual'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit' >aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalConfig} >cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*----------------EDIT CONFIGURACION----------------------------*/}
            <Dialog
                open={openEditConfig}
                onClose={closeModalEditConfig}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>EDITAR</Typography>
                    <form onSubmit={editConfig}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='recargaNocturna'
                                    label='Recarga Nocturna'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.recargaNocturna}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='interinato'
                                    label='Interinato'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.interinato}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='AFP'
                                    label='AFP'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.AFP}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='RCIVA'
                                    label='RC-IVA'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.RCIVA}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='IUE'
                                    label='IUE'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.IUE}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='IT'
                                    label='IT'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.IT}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='salarioMinimo'
                                    label='Salario Minimo'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.salarioMinimo}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='bonoTeRefrigerio'
                                    label='Bono Refrigerio'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.bonoTeRefrigerio}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='valorAfiliacion'
                                    label='Valor de Afiliacion'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.valorAfiliacion}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='gestion'
                                    label='Gestion'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    defaultValue={changeData.gestion}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='estado'
                                    label='Estado'
                                    variant='outlined'
                                    size='small'
                                    select
                                    fullWidth
                                    value={changeData.estado}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='A'>A</MenuItem>
                                    <MenuItem value='B'>B</MenuItem>
                                    <MenuItem value='C'>C</MenuItem>
                                </TextField>
                                <TextField
                                    name='teEventual'
                                    label='Bono Te Eventual'
                                    variant='outlined'
                                    type='number'
                                    size='small'
                                    fullWidth
                                    inputProps={{ step: 'any' }}
                                    defaultValue={changeData.teEventual}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit' >aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalEditConfig} >cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*----------------ELIMINAR CONFIGURACION----------------------------*/}
            <Dialog
                open={openDeleteConfig}
                onClose={closeModalDeleteConfig}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center'>Estas seguro de Eliminar "{changeData.gestion}" </Typography>
                    <Grid container justify='space-evenly'>
                        <Button variant='contained' color='primary' size='small' onClick={deleteConfig}>aceptar</Button>
                        <Button variant='contained' color='secondary' size='small' onClick={closeModalDeleteConfig}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>

        </>
    )
}

export default GeneralConfig
