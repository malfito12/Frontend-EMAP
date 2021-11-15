import React, { useEffect, useState } from 'react'
import { Typography, Container, Grid, Tabs, Tab, makeStyles, Button, Dialog, Paper, Box, TextField, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PORT_URL } from '../../../../PortURL'
import { CheckBox } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    ultimo: {
        marginBottom: '1rem',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 0
        }
    }
}))

const UserControlHorario = () => {
    const classes = useStyles()
    const [openAddHorario, setOpenAddHorario] = useState(false)
    const [openEditHorario, setOpenEditHorario] = useState(false)
    const [openDeleteHorario, setOpenDeleteHorario] = useState(false)
    const [horario, setHorario] = useState([])
    const [changeData, setChangeData] = useState({
        _id: '',
        descripcion: '',
        cod: '',
        tolerancia: '',
        ingreso1: '00:00',
        salida1: '00:00',
        ingreso2: '00:00',
        salida2: '00:00',
        feriado: '',
        orden: '',
        est: '',

        Lunes: '',
        Martes: '',
        Miercoles: '',
        Jueves: '',
        Viernes: '',
        Sabado: '',
        Domingo: ''

    })

    useEffect(() => {
        getHorario()
    }, [])

    //----------------POST HORARIO-----------------------------
    const openModalAddHorario = () => {
        setOpenAddHorario(true)
    }
    const closeModalAddHorario = () => {
        setChecked({ lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false })
        setOpenAddHorario(false)
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
                closeModalAddHorario()
                getHorario()
            })
            .catch(err => { alert('el nombre del horario ya existe'); console.log(err) })
        // closeModalAddHrs()
        // getHorario()
    }
    //-----------------GET HORARIOS--------------------------
    const getHorario = async () => {
        await axios.get(`${PORT_URL}horario`)
            .then(resp => {
                setHorario(resp.data)

                // console.log(array)
            })
            .catch(err => console.log(err))
    }
    var array = []
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
    //--------------------EDIT HORARIO-------------------------
    const openModalEditHorario = (e) => {
        setChangeData(e)
        setChecked({lunes: e.Lunes, martes: e.Martes, miercoles: e.Miercoles, jueves: e.Jueves, viernes: e.Viernes, sabado: e.Sabado, domingo: e.Domingo})
        setOpenEditHorario(true)
    }
    const closeModalEditHorario = () => {
        setOpenEditHorario(false)
    }
    const editHorario = async(e) => {
        e.preventDefault()
        const id=changeData._id
        var lunes, martes, miercoles, jueves, viernes, sabado, domingo,typeHorarioMod, aux;
        //---asignar tipo de horario------
        if (changeData.est === 'Diurno') {
            typeHorarioMod = 1
        } else typeHorarioMod = 2

        //convertir los dias se semana en cod
        if (checked.lunes === true) { lunes = '1' } else { lunes = '0' }
        if (checked.martes === true) { martes = '1' } else { martes = '0' }
        if (checked.miercoles === true) { miercoles = '1' } else { miercoles = '0' }
        if (checked.jueves === true) { jueves = '1' } else { jueves = '0' }
        if (checked.viernes === true) { viernes = '1' } else { viernes = '0' }
        if (checked.sabado === true) { sabado = '1' } else { sabado = '0' }
        if (checked.domingo === true) { domingo = '1' } else { domingo = '0' }
        const result = lunes + martes + miercoles + jueves + viernes + sabado + domingo
        aux = { cod: result, tipoHorario:typeHorarioMod }
        const data = { ...changeData, ...aux }
        await axios.put(`${PORT_URL}horario/${id}`,data)
        .then(resp=>{
            closeModalEditHorario()
            getHorario()
        })
        .catch(err=>console.log(err))
    }
    //--------------------DELETE HORARIO--------------------------
    const openModalDeleteHorario=(e)=>{
        setChangeData(e)
        setOpenDeleteHorario(true)
    }
    const closeModalDeleteHorario=()=>{
        setOpenDeleteHorario(false)
    }
    const deleteHorario=async(e)=>{
        e.preventDefault()
        const id = changeData._id
        await axios.delete(`${PORT_URL}horario/${id}`)
            .then(resp => { 
                closeModalDeleteHorario()
                getHorario()
                // console.log(resp.data) 
            })
            .catch(err => { console.log(err) })
    }
    //-------------------------------------------------
    //-------------------------------------------------
    //-----------------HANDLE CHANGE----------------------------
    const handleChange = (e) => {
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
    //----------------SCROLL---------------------------------
    const [scroll, setScroll] = useState(2)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    // console.log(horario)
    // console.log(array.length)
    // console.log(changeData)
    // console.log(checked)

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
                        <Tab label='Personal' component={Link} to='/userControlEmp' />
                        <Tab label='Cargos' component={Link} to='/userControlCargo' />
                        <Tab label='Horarios' />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography align='center' variant='h5' className={classes.spacingBot}>HORARIOS</Typography>
                <Button className={classes.spacingBot} variant='contained' size='small' style={{ background: 'green', color: 'white' }} onClick={openModalAddHorario}>ADD HORARIO</Button>
                <Grid container justifyContent='space-evenly'>
                    {array.length > 0 ? (
                        array.map((h, index) => (
                            <Paper component={Box} p={2} key={index} style={{ width: 500 }} className={classes.spacingBot}>
                                <Typography variant='h6' align='center'>{h.descripcion}</Typography>
                                <Typography>TIPO DE HORARIO: {h.est}</Typography>
                                <Typography>ORDEN : {h.orden}</Typography>
                                <Typography>OBSERVACIONES : {h.feriado}</Typography>
                                {/* <Typography>Observaciones : {h.observaciones}</Typography> */}
                                <Typography >HORARIO : {h.ingreso1} - {h.salida1} - {h.ingreso2} - {h.salida2}</Typography>
                                <div align='center' className={classes.spacingBott}>
                                    <FormControlLabel control={<CheckBox size='small' color='primary' checked={h.Lunes} />} label='Lunes' />
                                    <FormControlLabel control={<Checkbox size='small' color='primary' checked={h.Martes} />} label='Martes' />
                                    <FormControlLabel control={<Checkbox size='small' color='primary' checked={h.Miercoles} />} label='Miercoles' />
                                    <FormControlLabel control={<Checkbox size='small' color='primary' checked={h.Jueves} />} label='Jueves' />
                                    <FormControlLabel control={<Checkbox size='small' color='primary' checked={h.Viernes} />} label='Viernes' />
                                    <FormControlLabel control={<Checkbox size='small' color='primary' checked={h.Sabado} />} label='Sabado' />
                                    <FormControlLabel control={<Checkbox size='small' color='primary' checked={h.Domingo} />} label='Domingo' />
                                </div>
                                <Grid container justifyContent='space-evenly'>
                                    <Button onClick={() => openModalEditHorario(h)} size='small' variant='contained' color='primary' >editar</Button>
                                    <Button onClick={() => openModalDeleteHorario(h)} size='small' variant='contained' color='secondary'>eliminar</Button>
                                </Grid>
                            </Paper>
                        ))
                    ) : (<Paper component={Box} p={2}><Typography align='center' variant='subtitle1'>NO EXISTEN HORARIOS</Typography>  </Paper>)}
                </Grid>
            </Container>
            {/*----------------------REGISTRAR HORARIO--------------------*/}
            <Dialog
                open={openAddHorario}
                onClose={closeModalAddHorario}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>REGISTRAR HORARIO</Typography>
                    <form onSubmit={postHorario}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='descripcion'
                                    label='Descripción'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='tolerancia'
                                    label='Tolerancia'
                                    variant='outlined'
                                    type='number'
                                    fullWidth
                                    size='small'
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='feriado'
                                    label='Feriado'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    select
                                    value={changeData.feriado}
                                    className={classes.ultimo}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='feriado'>Feriado</MenuItem>
                                    <MenuItem value='no feriado'>No Feriado</MenuItem>
                                </TextField>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='orden'
                                    label='Orden'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                // required
                                />
                                <TextField
                                    name='est'
                                    label='Estado'
                                    variant='outlined'
                                    fullWidth
                                    select
                                    size='small'
                                    value={changeData.est}
                                    className={classes.spacingBot}
                                    onChange={handleChange}
                                // required
                                >
                                    <MenuItem value='Diurno/1'>Diurno</MenuItem>
                                    <MenuItem value='Nocturno/2'>Nocturno</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} justifyContent='space-evenly' className={classes.spacingBot}>
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
                        <Grid container item xs={12} sm={12} justifyContent='space-evenly' className={classes.spacingBot} >
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
                        <div align='center'>
                            <Button size='small' type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                            <Button size='small' onClick={closeModalAddHorario} variant='contained' color='secondary'>cancelar</Button>
                        </div>
                    </form>
                </Paper>
            </Dialog>
            {/*----------------------EDITAR HORARIO--------------------*/}
            <Dialog
                open={openEditHorario}
                onClose={closeModalEditHorario}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>ACTUALIZAR HORARIO</Typography>
                    <form onSubmit={editHorario}>
                        <Container maxWidth='lg'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='descripcion'
                                        label='Descripción'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBot}
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
                                        size='small'
                                        className={classes.spacingBot}
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
                                        size='small'
                                        value={changeData.feriado}
                                        className={classes.ultimo}
                                        onChange={handleChange}
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
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        value={changeData.est}
                                        required
                                    >
                                        <MenuItem value='Diurno'>Diurno</MenuItem>
                                        <MenuItem value='Nocturno'>Nocturno</MenuItem>
                                    </TextField>
                                    <TextField
                                        name='orden'
                                        label='Orden'
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        defaultValue={changeData.orden}
                                    // required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={12} justifyContent='space-evenly' className={classes.spacingBot}>
                                <FormControlLabel control={<Checkbox name='lunes' color='primary' checked={checked.lunes} onChange={hanldeChecked} />} label='Lunes' />
                                <FormControlLabel control={<Checkbox name='martes' color='primary' checked={checked.martes} onChange={hanldeChecked} />} label='Martes' />
                                <FormControlLabel control={<Checkbox name='miercoles' color='primary' checked={checked.miercoles} onChange={hanldeChecked} />} label='Miercoles' />
                                <FormControlLabel control={<Checkbox name='jueves' color='primary' checked={checked.jueves} onChange={hanldeChecked} />} label='Jueves' />
                                <FormControlLabel control={<Checkbox name='viernes' color='primary' checked={checked.viernes} onChange={hanldeChecked} />} label='Viernes' />
                                <FormControlLabel control={<Checkbox name='sabado' color='primary' checked={checked.sabado} onChange={hanldeChecked} />} label='Sabado' />
                                <FormControlLabel control={<Checkbox name='domingo' color='primary' checked={checked.domingo} onChange={hanldeChecked} />} label='Domingo' />
                            </Grid>
                            <Grid container item xs={12} sm={12} justifyContent='space-evenly' className={classes.spacingBot} >
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
                            <Button size='small' type='submit' variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                            <Button size='small' onClick={closeModalEditHorario} variant='contained' color='secondary'>cancelar</Button>
                        </div>
                    </form>
                </Paper>
            </Dialog>
            {/*----------------------DELETE HORARIO--------------------*/}
            <Dialog
                open={openDeleteHorario}
                onClose={closeModalDeleteHorario}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>Estas seguro de Eliminar el Hoario "{changeData.descripcion}"</Typography>
                    <div align='center'>
                        <Button size='small' onClick={deleteHorario} variant='contained' color='primary' style={{ marginRight: '1rem' }}>aceptar</Button>
                        <Button size='small' onClick={closeModalDeleteHorario} variant='contained' color='secondary'>cancelar</Button>
                    </div>
                </Paper>
            </Dialog>
            {/*----------------------REGISTRAR HORARIO--------------------*/}

        </>
    )
}

export default UserControlHorario
