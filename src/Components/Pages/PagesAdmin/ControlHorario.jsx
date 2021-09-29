import { Button, Box, Container, Dialog, makeStyles, Paper, Typography, Grid, TextField, MenuItem, Checkbox, FormControlLabel, Switch, Tabs, Tab } from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { PORT_URL } from '../../../PortURL'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimerIcon from '@material-ui/icons/Timer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))

const ControlHorario = () => {
    const classes = useStyles()
    const [openAddHrs, setOpenAddHrs] = useState(false)
    const [openEditHrs, setOpenEditHrs] = useState(false)
    const [openDeleteHrs, setOpenDeleteHrs] = useState(false)
    const [horario, setHorario] = useState([])
    const [hrsContinuo, setHrsContinuo] = useState([])
    const [openCambio, setOpenCambio] = useState(false)
    const [changeData, setChangeData] = useState({
        descripcion: '',
        cod: '',
        // observaciones: '',
        tolerancia: '',
        ingreso1: '00:00',
        salida1: '00:00',
        ingreso2: '00:00',
        salida2: '00:00',
        // tipoHorario: '',
        feriado: '',
        orden: '',
        est: '',
        // observaciones2:''
    })
    useEffect(() => {
        getHorario()
        getHorarioContinuo()
    }, [])
    //-----------------GET---------------------------------
    const getHorario = async () => {
        await axios.get(`${PORT_URL}horario`)
            .then(resp => {
                setHorario(resp.data)

                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    var array = []
    // console.log(horario.length)
    // console.log(horario)
    for (var i = 0; i < horario.length; i++) {
        var lunes, martes, miercoles, jueves, viernes, sabado, domingo, aux, data;
        var codigo = horario[i].cod
        codigo = codigo.split("")
        // console.log(codigo)
        if (codigo[0] === '1') { lunes = true } else (lunes = false)
        if (codigo[1] === '1') { martes = true } else (martes = false)
        if (codigo[2] === '1') { miercoles = true } else (miercoles = false)
        if (codigo[3] === '1') { jueves = true } else (jueves = false)
        if (codigo[4] === '1') { viernes = true } else (viernes = false)
        if (codigo[5] === '1') { sabado = true } else (sabado = false)
        if (codigo[6] === '1') { domingo = true } else (domingo = false)
        aux = { Lunes: lunes, Martes: martes, Miercoles: miercoles, Jueves: jueves, Viernes: viernes, Sabado: sabado, Domingo: domingo }
        data = { ...horario[i], ...aux }
        array.push(data)
    }

    //-----------------POST---------------------------------
    const openModalAddHrs = () => {
        setOpenAddHrs(true)
    }
    const closeModalAddHrs = () => {
        setOpenAddHrs(false)
    }
    const postHorario = async (e) => {
        e.preventDefault()
        var lunes, martes, miercoles, jueves, viernes, sabado, domingo, aux;

        if (checked.lunes === true) { lunes = '1' } else { lunes = '0' }
        if (checked.martes === true) { martes = '1' } else { martes = '0' }
        if (checked.miercoles === true) { miercoles = '1' } else { miercoles = '0' }
        if (checked.jueves === true) { jueves = '1' } else { jueves = '0' }
        if (checked.viernes === true) { viernes = '1' } else { viernes = '0' }
        if (checked.sabado === true) { sabado = '1' } else { sabado = '0' }
        if (checked.domingo === true) { domingo = '1' } else { domingo = '0' }
        const result = lunes + martes + miercoles + jueves + viernes + sabado + domingo
        aux = { cod: result }
        var data = { ...changeData, ...aux }
        await axios.post(`${PORT_URL}horario`, data)
            .then(resp => {
                closeModalAddHrs()
                getHorario()
                // console.log(resp.data)
            })
            .catch(err => { alert('el nombre del horario ya existe'); console.log(err) })
        // closeModalAddHrs()
        getHorario()
    }

    //-----------------PUT---------------------------------
    const openModalEditHrs = (h) => {
        setChangeData(h)
        console.log(h)
        setOpenEditHrs(true)
    }
    const closeModalEditHrs = () => {
        setOpenEditHrs(false)
    }
    const editHorario = async (e) => {
        e.preventDefault()
        const id = changeData._id
        var typeHorarioMod;
        if (changeData.est === 'Diurno') {
            typeHorarioMod = 1
        } else typeHorarioMod = 2
        var data = {
            descripcion: changeData.descripcion,
            cod: changeData.cod,
            tolerancia: changeData.tolerancia,
            ingreso1: changeData.ingreso1,
            salida1: changeData.salida1,
            ingreso2: changeData.ingreso2,
            salida2: changeData.salida2,
            feriado: changeData.feriado,
            orden: changeData.orden,
            est: changeData.est,
            tipoHorario: typeHorarioMod
        }
        await axios.put(`${PORT_URL}horario/${id}`, data)
            .then(resp => { console.log(resp.data) })
            .catch(err => { console.log(err) })
        closeModalEditHrs()
        getHorario()
    }
    //-----------------DELETE---------------------------------
    const openModalDeleteHrs = (h) => {
        setChangeData(h)
        setOpenDeleteHrs(true)
    }
    const closeModalDeleteHrs = () => {
        setOpenDeleteHrs(false)
    }
    const deleteHorario = async () => {
        const id = changeData._id
        await axios.delete(`${PORT_URL}horario/${id}`)
            .then(resp => { console.log(resp.data) })
            .catch(err => { console.log(err) })
        closeModalDeleteHrs()
        getHorario()
    }
    //-----------------CHANGE_DATA---------------------------------
    const handleChange = e => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------DIAS DE LA SEMANA--------------------------
    const [checked, setChecked] = useState({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false
    })

    const hanldeChecked = (e) => {
        setChecked({
            ...checked,
            [e.target.name]: e.target.checked
        })
    }
    // var data = [
    //     { cod: '1111100', observacion: 'Lunes a Viernes' },
    //     { cod: '1111110', observacion: 'Lunes a Sabado' },
    //     { cod: '1111111', observacion: 'Lunes a Domingo' },
    //     { cod: '0000011', observacion: 'Sabado y Domingo' },
    // ]
    // const aux = horario.length
    // for (var i = 0; i < aux; i++) {
    //     if (horario[i].cod === '1111100') {
    //         horario[i].cod = horario[i].cod + "/" + horario[i].observaciones
    //     } else if (horario[i].cod === '1111110') {
    //         horario[i].cod = horario[i].cod + "/" + horario[i].observaciones
    //     } else if (horario[i].cod === '1111111') {
    //         horario[i].cod = horario[i].cod + "/" + horario[i].observaciones
    //     } else if (horario[i].cod === '0000011') {
    //         horario[i].cod = horario[i].cod + "/" + horario[i].observaciones
    //     }
    // }
    //-------------------------HORARIO CONTINUO----------------------------------
    const [prueba, setPrueba] = useState({
        type: ''
    })
    const openModalCambio = (e) => {
        setPrueba(e)
        // console.log(e)
        setOpenCambio(true)
    }
    const closeModalCambio = () => {
        setOpenCambio(false)
    }
    const getHorarioContinuo = async () => {
        await axios.get(`${PORT_URL}horarioContinuo`)
            .then(resp => setHrsContinuo(resp.data))
            .catch(err => console.log(err))
    }

    const editHorarioContinuo = async (e) => {
        e.preventDefault()
        // console.log(prueba)
        const id = prueba._id
        await axios.put(`${PORT_URL}horarioContinuo/${id}`, prueba)
            .then(resp => {
                closeModalCambio()
                console.log(resp.data)
            })
            .catch(err => console.log(err))
        getHorarioContinuo()

    }
    const toggleChecked = (e) => {
        // console.log(e.target.checked)
        setPrueba({
            ...prueba,
            [e.target.name]: e.target.checked
        })
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(2)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    //------------------------------------------------------------------
    // console.log(hrsContinuo)
    // console.log(changeData)
    // console.log(horario)
    // console.log(array)
    // console.log(checket)
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid item xs={12} sm={5}>
                    <Paper className={classes.spacingBott}>
                        <Tabs
                            value={scroll}
                            onChange={scrollChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            style={{ height: 60 }}
                        >
                            <Tab label="Pesonal" style={{ fontSize: 'x-small' }} component={Link} to='/controlEmp' icon={<AccountCircleIcon style={{ height: 20 }} />} />
                            <Tab label="Cargos" style={{ fontSize: 'x-small' }} component={Link} to='/registerCargo' icon={<DeviceHubIcon style={{ height: 20 }} />} />
                            <Tab label="Horarios" style={{ fontSize: 'x-small' }} icon={<TimerIcon style={{ height: 20 }} />} />
                        </Tabs>
                    </Paper>
                </Grid>
                <Typography align='center' variant='h4' className={classes.spacingBott}>HORARIOS</Typography>
                <Container maxWidth='md'>
                    <Button onClick={openModalAddHrs} variant='contained' style={{ background: 'green', color: 'white', marginBottom: '2rem' }}  >Regitrar Horario</Button>
                    {/*---------------HORARIO CONTINUO MODAL-----------------------*/}
                    <Button variant='contained' color='primary' onClick={() => openModalCambio(hrsContinuo[0])} style={{ marginBottom: '2rem' }}>Cambio horario</Button>
                    <Dialog
                        open={openCambio}
                        onClose={closeModalCambio}
                        maxWidth='sm'
                    >
                        <Paper component={Box} p={2}>
                            <Typography align='center' variant='subtitle1'>Cambiar tipo de Horario</Typography>
                            <FormControlLabel
                                // control={<Switch name='type' defaultChecked={prueba.type} onChange={()=>toggleChecked(prueba)} />}
                                control={<Switch name='type' checked={prueba.type} onChange={toggleChecked} />}
                                label='cambio de horario'
                            />
                            <Grid container justify='space-evenly'>
                                <Button size='small' variant='contained' color='primary' onClick={editHorarioContinuo}>aceptar</Button>
                                <Button size='small' variant='contained' color='secondary' onClick={closeModalCambio}>cancelar</Button>
                            </Grid>
                        </Paper>
                    </Dialog>

                </Container>
                {/*-------------BOTTON DE RESGISTRO DE HORARIOS----------------*/}
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justify='center'>
                        {array && array.map(h => (
                            <div style={{ paddingBottom: '1rem', paddingRight: '1rem' }} key={h._id}>
                                <Paper component={Box} p={2} >
                                    <Grid container spacing={3}>
                                        <Grid item xs={9}>
                                            <div style={{ paddingRight: '5rem' }}>
                                                <Typography variant='h6' align='center'>{h.descripcion}</Typography>
                                                <Typography>Esdato: {h.est}</Typography>
                                                <Typography>Orden : {h.orden}</Typography>
                                                <Typography>Feriado : {h.feriado}</Typography>
                                                {/* <Typography>Observaciones : {h.observaciones}</Typography> */}
                                                <FormControlLabel control={<Checkbox color='primary' checked={h.Lunes} />} label='Lunes' />
                                                <FormControlLabel control={<Checkbox color='primary' checked={h.Martes} />} label='Martes' />
                                                <FormControlLabel control={<Checkbox color='primary' checked={h.Miercoles} />} label='Miercoles' />
                                                <FormControlLabel control={<Checkbox color='primary' checked={h.Jueves} />} label='Jueves' />
                                                <FormControlLabel control={<Checkbox color='primary' checked={h.Viernes} />} label='Viernes' />
                                                <FormControlLabel control={<Checkbox color='primary' checked={h.Sabado} />} label='Sabado' />
                                                <FormControlLabel control={<Checkbox color='primary' checked={h.Domingo} />} label='Domingo' />
                                                <Typography>horario : {h.ingreso1} {h.salida1} {h.ingreso2} {h.salida2}</Typography>
                                            </div>
                                        </Grid>

                                        <Grid container item xs={3} direction='column' justify='center'  >
                                            <div  >
                                                <Button onClick={() => openModalEditHrs(h)} size='small' variant='contained' color='primary' className={classes.spacingBott}>editar</Button>
                                                <Button onClick={() => openModalDeleteHrs(h)} size='small' variant='contained' color='secondary'>eliminar</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        ))}
                    </Grid>
                </Container>
            </Container>
            <Dialog
                open={openAddHrs}
                onClose={closeModalAddHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2} >
                    <Typography variant='h6' align='center' className={classes.spacingBott}>Registrar Horario</Typography>
                    <form onSubmit={postHorario}>
                        <Container maxWidth='lg'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='descripcion'
                                        label='Descripción'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='tolerancia'
                                        label='Tolerancia'
                                        variant='outlined'
                                        type='number'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='feriado'
                                        label='Feriado'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        value={changeData.feriado}
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value='feriado'>Feriado</MenuItem>
                                        <MenuItem value='no feriado'>No Feriado</MenuItem>
                                    </TextField>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <TextField
                                        name='observaciones'
                                        label='Observaciones'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={changeData.observaciones}
                                        required
                                    >
                                        {data.map((d, index) => (
                                            <MenuItem key={index} value={`${d.cod}/${d.observacion}`} >{d.observacion}</MenuItem>
                                        ))}
                                    </TextField> */}
                                    {/* <TextField
                                        name='tipoHorario'
                                        label='Tipo de Horario'
                                        variant='outlined'
                                        fullWidth
                                        type='number'
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    /> */}
                                    <TextField
                                        name='orden'
                                        label='Orden'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='est'
                                        label='Estado'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        value={changeData.est}
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value='Diurno/1'>Diurno</MenuItem>
                                        <MenuItem value='Nocturno/2'>Nocturno</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={12} justify='space-evenly' className={classes.spacingBott}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // defaultChecked
                                            color='primary'
                                            name='lunes'
                                            checked={checked.lunes}
                                            onChange={hanldeChecked}
                                        />
                                    }
                                    label='Lunes'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // defaultChecked
                                            color='primary'
                                            name='martes'
                                            checked={checked.martes}
                                            onChange={hanldeChecked}
                                        />
                                    }
                                    label='Martes'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // defaultChecked
                                            color='primary'
                                            name='miercoles'
                                            checked={checked.miercoles}
                                            onChange={hanldeChecked}
                                        />
                                    }
                                    label='Miercoles'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // defaultChecked
                                            color='primary'
                                            name='jueves'
                                            checked={checked.jueves}
                                            onChange={hanldeChecked}
                                        />
                                    }
                                    label='Jueves'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // defaultChecked
                                            color='primary'
                                            name='viernes'
                                            checked={checked.viernes}
                                            onChange={hanldeChecked}
                                        />
                                    }
                                    label='Viernes'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // defaultChecked
                                            color='primary'
                                            name='sabado'
                                            checked={checked.sabado}
                                            onChange={hanldeChecked}
                                        />
                                    }
                                    label='Sabado'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // defaultChecked
                                            color='primary'
                                            name='domingo'
                                            checked={checked.domingo}
                                            onChange={hanldeChecked}
                                        />
                                    }
                                    label='Domingo'
                                />
                            </Grid>
                            {/* <Button variant='contained' color='primary' onClick={prueba}>prueba</Button> */}
                            <Grid container item xs={12} sm={12} justify='space-evenly' className={classes.spacingBott} >
                                <TextField
                                    name='ingreso1'
                                    label='ingreso1'
                                    type='time'
                                    defaultValue='00:00'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='salida1'
                                    label='salida1'
                                    type='time'
                                    defaultValue='00:00'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='ingreso2'
                                    label='ingreso2'
                                    type='time'
                                    defaultValue='00:00'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='salida2'
                                    label='salida2'
                                    type='time'
                                    defaultValue='00:00'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                        </Container>
                        <div align='center'>
                            <Button type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                            <Button onClick={closeModalAddHrs} variant='contained' color='secondary'>cancelar</Button>
                        </div>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openEditHrs}
                onClose={closeModalEditHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2} >
                    <Typography variant='h6' align='center' className={classes.spacingBott}>Editar Horario</Typography>
                    <form onSubmit={editHorario}>
                        <Container maxWidth='lg'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='descripcion'
                                        label='Descripción'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.descripcion}
                                        required
                                    />
                                    <TextField
                                        name='tolerancia'
                                        label='Tolerancia'
                                        variant='outlined'
                                        type='number'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.tolerancia}
                                        required
                                    />
                                    <TextField
                                        name='feriado'
                                        label='Feriado'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        value={changeData.feriado}
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        // defaultValue={changeData.feriado}
                                        required
                                    >
                                        <MenuItem value='feriado'>Feriado</MenuItem>
                                        <MenuItem value='no feriado'>No Feriado</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='est'
                                        label='Estado'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={changeData.est}
                                        required
                                    >
                                        <MenuItem value='Diurno'>Diurno</MenuItem>
                                        <MenuItem value='Nocturno'>Nocturno</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='cod'
                                        label='Observaciones'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.cod}
                                        required
                                    />
                                    {/* <TextField
                                        name='tipoHorario'
                                        label='Tipo de Horario'
                                        variant='outlined'
                                        fullWidth
                                        type='number'
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.tipoHorario}
                                        required
                                    /> */}
                                    <TextField
                                        name='orden'
                                        label='Orden'
                                        variant='outlined'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={changeData.orden}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            {/* <Grid container item xs={12} sm={12} justify='space-evenly' className={classes.spacingBott}>
                                <FormControlLabel control={<Checkbox name='lunes' color='primary' checked={changeData.Lunes} />} label='Lunes' />
                                <FormControlLabel control={<Checkbox name='Martes' color='primary' checked={changeData.Martes} />} label='Martes' />
                                <FormControlLabel control={<Checkbox name='Miercoles' color='primary' checked={changeData.Miercoles} />} label='Miercoles' />
                                <FormControlLabel control={<Checkbox name='Jueves' color='primary' checked={changeData.Jueves} />} label='Jueves' />
                                <FormControlLabel control={<Checkbox name='Viernes' color='primary' checked={changeData.Viernes} />} label='Viernes' />
                                <FormControlLabel control={<Checkbox name='Sabado' color='primary' checked={changeData.Sabado} />} label='Sabado' />
                                <FormControlLabel control={<Checkbox name='Domingo' color='primary' checked={changeData.Domingo} />} label='Domingo' />
                            </Grid> */}
                            <Grid container item xs={12} sm={12} justify='space-evenly' className={classes.spacingBott} >
                                <TextField
                                    name='ingreso1'
                                    label='ingreso1'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    defaultValue={changeData.ingreso1}
                                    required
                                />
                                <TextField
                                    name='salida1'
                                    label='salida1'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    defaultValue={changeData.salida1}
                                    required
                                />
                                <TextField
                                    name='ingreso2'
                                    label='ingreso2'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    defaultValue={changeData.ingreso2}
                                    required
                                />
                                <TextField
                                    name='salida2'
                                    label='salida2'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    defaultValue={changeData.salida2}
                                    required
                                />
                            </Grid>
                        </Container>
                        <div align='center'>
                            <Button type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                            <Button onClick={closeModalEditHrs} variant='contained' color='secondary'>cancelar</Button>
                        </div>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openDeleteHrs}
                onClose={closeModalDeleteHrs}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='h6' className={classes.spacingBott}>Estas seguro de Eliminar el Hoario "{changeData.descripcion}"</Typography>
                    <div align='center'>
                        <Button size='small' onClick={deleteHorario} variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                        <Button size='small' onClick={closeModalDeleteHrs} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Paper>
            </Dialog>

        </>
    )
}

export default ControlHorario
