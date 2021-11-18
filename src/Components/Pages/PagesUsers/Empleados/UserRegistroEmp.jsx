import { Button, Box, Container, Dialog, FormControl, Grid, makeStyles, MenuItem, NativeSelect, Paper, Radio, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { PORT_URL } from '../../../../PortURL'

const useStyles = makeStyles((theme) => ({
    TyphoAlineation: {
        marginTop: '1.5rem',
        marginBottom: '1.5rem'
    },
    image: {
        width: '50%',
        height: '320px',
    },
    margin: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}))
const UserRegistroEmp = () => {
    const classes = useStyles()
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [openMessage, setOpenMessage] = useState(false)
    const [departament, setDepartament] = useState([])
    const [cargo, setCargo] = useState([])
    const [horario, setHorario] = useState([])
    const [changeData, setChangeData] = useState({
        itemEmp: 0,
        id_bio: '',
        firstNameEmp: '',
        lastNameEmpP: '',
        lastNameEmpM: '',
        CIEmp: '',

        cargoEmp: '',
        departamentEmp: '',
        typeContrato: '',
        clasificacionLab: '',
        typeHorario: '',
        typeAntiguedad: '',
        AFP: '',
        cotizante: '',
        afilSindicato: '',
        fechaini: '',
        fechafin: '',

        emailEmp: '',
        sexoEmp: '',//
        numCelEmp: '',//
        dirEmp: '',
        photoImgEmp: '',//
        nacionalityEmp: '',
        civilStatusEmp: '',
        professionEmp: '',//
        institutionDegreeEmp: '',//
        ObserEmp: '',//
        fechaNacEmp: Date(),
        estadoEmp: 'activo',
    })

    //------------------USEEFFECT------------------------------------
    useEffect(() => {
        // getCargos()
        getHorario()
        getDepartament()
    }, [])
    //------------------------------------------------------

    const postEmpleado = async (e) => {
        e.preventDefault()
        var aux = changeData.cargoEmp
        aux = aux.split("/")
        const cargoEmp = aux[0]
        const haber_basico = aux[1]
        const formData = new FormData()
        formData.append('image', image)
        formData.append('itemEmp', changeData.itemEmp)
        formData.append('id_bio', changeData.id_bio)
        formData.append('firstNameEmp', changeData.firstNameEmp)
        formData.append('lastNameEmpP', changeData.lastNameEmpP)
        formData.append('lastNameEmpM', changeData.lastNameEmpM)
        formData.append('CIEmp', changeData.CIEmp)
        formData.append('emailEmp', changeData.emailEmp)
        formData.append('sexoEmp', changeData.sexoEmp)
        formData.append('numCelEmp', changeData.numCelEmp)
        formData.append('dirEmp', changeData.dirEmp)
        formData.append('nacionalityEmp', changeData.nacionalityEmp)
        formData.append('civilStatusEmp', changeData.civilStatusEmp)
        formData.append('professionEmp', changeData.professionEmp)
        formData.append('institutionDegreeEmp', changeData.institutionDegreeEmp)
        formData.append('ObserEmp', changeData.ObserEmp)
        formData.append('fechaNacEmp', changeData.fechaNacEmp)
        formData.append('estadoEmp', changeData.estadoEmp)

        // formData.append('cargoEmp', changeData.cargoEmp)
        formData.append('cargoEmp', cargoEmp)
        formData.append('haber_basico', haber_basico)

        formData.append('departamentEmp', changeData.departamentEmp)
        formData.append('typeContrato', changeData.typeContrato)
        formData.append('clasificacionLab', changeData.clasificacionLab)
        formData.append('typeHorario', changeData.typeHorario)
        formData.append('typeAntiguedad', changeData.typeAntiguedad)
        formData.append('AFP', changeData.AFP)
        formData.append('cotizante', changeData.cotizante)
        formData.append('afilSindicato', changeData.afilSindicato)
        formData.append('fechaini', changeData.fechaini)
        formData.append('fechafin', changeData.fechafin)
        await axios.post(`${PORT_URL}empleado`, formData)
            .then(resp => {
                openModalMessage()
                // alert('empleado registrado')
                console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------------GET CARGOS--------------------------------
    const getCargos = async (e) => {
        console.log(e)
        await axios.get(`${PORT_URL}cargo/${e}`)
            .then(resp => setCargo(resp.data))
            .catch(err => console.log(err))
    }
    // console.log(cargo)
    //-----------------------GET HORARIO    --------------------------------
    const getHorario = async () => {
        await axios.get(`${PORT_URL}horario`)
            .then(resp => setHorario(resp.data))
            .catch(err => console.log(err))
    }
    //------------------------GET DEPARTAMENT-----------------------------
    const getDepartament = async () => {
        await axios.get(`${PORT_URL}departament`)
            .then(resp => setDepartament(resp.data))
            .catch(err => console.log(err))
    }
    // console.log(departament)
    //----------------------------------------------------------------
    //EXTRA MODAL COMO ALERT
    const openModalMessage = (e) => {
        console.log(e)
        // console.log('hola')
        setOpenMessage(true)
    }
    const closeModalMessage = () => {
        setOpenMessage(false)
    }
    //---------------------------------------------------------------------
    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes('image')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setPreview(reader.result)
                    setImage(e.target.files[0])
                }
            }
            else { console.log('no funciona') }
        }
        // console.log(e.target.name)
        if (e.target.name === 'departamentEmp') {
            // setChangeData({cargoEmp:''})
            getCargos(e.target.value)
        }
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(props)
    // console.log(changeData)
    return (
        <>
            <Container style={{ paddingTop: '5rem' }} maxWidth='lg'>
                <Typography className={classes.TyphoAlineation} variant='h4' align='center'>Registro de Empleado</Typography>
                <Container maxWidth='lg'>
                    <form onSubmit={postEmpleado}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='id_bio'
                                        variant='outlined'
                                        label='ID Biometrico'
                                        type='number'
                                        onChange={handleChange}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='itemEmp'
                                        variant='outlined'
                                        label='N° de Item'
                                        type='number'
                                        onChange={handleChange}
                                        defaultValue={changeData.itemEmp}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='firstNameEmp'
                                        variant='outlined'
                                        label='Nombre Completo'
                                        type='text'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='lastNameEmpP'
                                        variant='outlined'
                                        label='Apellido Paterno'
                                        type='text'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='lastNameEmpM'
                                        variant='outlined'
                                        label='Apellido Materno'
                                        type='text'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='CIEmp'
                                        variant='outlined'
                                        label='Celdula de Identidad'
                                        type='text'
                                        onChange={handleChange}
                                        style={{ minWidth: 300, background: 'white', borderRadius: 5 }}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='departamentEmp'
                                        variant='outlined'
                                        label='Departamento'
                                        select
                                        onChange={handleChange}
                                        style={{ minWidth: 300, background: 'white', borderRadius: 5 }}
                                        value={changeData.departamentEmp}
                                        required
                                    >
                                        {departament && departament.map(d => (
                                            <MenuItem key={d._id} value={d.nameDepartament}>{d.nameDepartament}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='cargoEmp'
                                        variant='outlined'
                                        label='Cargo'
                                        select
                                        onChange={handleChange}
                                        style={{ minWidth: 300, background: 'white', borderRadius: 5 }}
                                        value={changeData.cargoEmp}
                                        required
                                    >
                                        {cargo && cargo.map(c => (
                                            <MenuItem key={c._id} value={`${c.nameCargo}/${c.haber_basico}`}>{c.nameCargo}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='typeContrato'
                                        variant='outlined'
                                        label='Contrato'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.typeContrato}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    >
                                        <MenuItem value='permanente'>Permanente</MenuItem>
                                        <MenuItem value='eventual'>Eventual</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='clasificacionLab'
                                        variant='outlined'
                                        label='Clasificacion Laboral'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.clasificacionLab}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    >
                                        <MenuItem value='operativo'>Operativo</MenuItem>
                                        <MenuItem value='administrativo'>Administrativo</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='typeHorario'
                                        variant='outlined'
                                        label='Horario'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.typeHorario}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    >
                                        {horario && horario.map(h => (
                                            <MenuItem key={h._id} value={h.descripcion}>{h.descripcion}</MenuItem>
                                        ))
                                        }
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='typeAntiguedad'
                                        variant='outlined'
                                        label='Antiguedad'
                                        select
                                        fullWidth
                                        onChange={handleChange}
                                        value={changeData.typeAntiguedad}
                                        style={{ background: 'white', borderRadius: 5 }}
                                        required
                                    >
                                        <MenuItem value='0'>Sin Antiguedad</MenuItem>
                                        <MenuItem value='1'>2 a 4 años</MenuItem>
                                        <MenuItem value='2'>5 a 7 años</MenuItem>
                                        <MenuItem value='3'>8 a 10 años</MenuItem>
                                        <MenuItem value='4'>11 a 14 años</MenuItem>
                                        <MenuItem value='5'>15 a 19 años</MenuItem>
                                        <MenuItem value='6'>20 a 24 años</MenuItem>
                                        <MenuItem value='7'>25 a 90 años</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='AFP'
                                        variant='outlined'
                                        label='AFP'
                                        select
                                        // fullWidth
                                        onChange={handleChange}
                                        value={changeData.AFP}
                                        style={{ minWidth: 300, background: 'white', borderRadius: 5 }}
                                    >
                                        <MenuItem value='prevision'>Prevision</MenuItem>
                                        <MenuItem value='re-prevision'>re Prevision</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='nacionalityEmp'
                                        variant='outlined'
                                        label='Nacionalidad'
                                        type='text'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        style={{ background: 'white', borderRadius: 5 }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='professionEmp'
                                        variant='outlined'
                                        label='Profesión'
                                        type='text'
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ background: 'white', borderRadius: 5 }}

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div align='center' style={{ marginBottom: '2.5rem' }}>
                                    <Paper component={Box} p={1} style={{ background: '#bdbdbd', width: '290px', height: '277px' }}>
                                        <img src={preview} style={{ width: '100%', height: '100%' }} alt='#' />
                                    </Paper>
                                    <input
                                        name='image'
                                        type='file'
                                        accept='image/*'
                                        id='file-image'
                                        style={{ display: 'none' }}
                                        onChange={handleChange}

                                    />
                                    <label htmlFor='file-image' >
                                        <Button style={{ marginTop: '1rem' }} variant='contained' color='primary' component='span'>cargar</Button>
                                    </label>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='emailEmp'
                                        variant='outlined'
                                        label='Correo Electrónico'
                                        type='email'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        style={{ background: 'white', borderRadius: 5 }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='dirEmp'
                                        variant='outlined'
                                        label='Direccion'
                                        type='text'
                                        fullWidth={true}
                                        onChange={handleChange}
                                        style={{ background: 'white', borderRadius: 5 }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='numCelEmp'
                                        variant='outlined'
                                        label='N° Celular'
                                        type='number'
                                        style={{ minWidth: 300, background: 'white', borderRadius: 5 }}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='afilSindicato'
                                        variant='outlined'
                                        label='Afiliado al Sindicado'
                                        select
                                        // fullWidth
                                        onChange={handleChange}
                                        value={changeData.afilSindicato}
                                        style={{ minWidth: 300, background: 'white', borderRadius: 5 }}
                                        required
                                    >
                                        <MenuItem value='si'>Si</MenuItem>
                                        <MenuItem value='no'>No</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        name='cotizante'
                                        variant='outlined'
                                        label='N° de Contizante'
                                        select
                                        // fullWidth
                                        onChange={handleChange}
                                        value={changeData.cotizante}
                                        style={{ minWidth: 300, background: 'white', borderRadius: 5 }}
                                        required
                                    >
                                        <MenuItem value='1'>1</MenuItem>
                                        <MenuItem value='8'>8</MenuItem>
                                    </TextField>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <FormControl >
                                        <Typography variant='h6'>Estado Civil
                                            <span style={{ marginLeft: '2rem' }}>
                                                <NativeSelect
                                                    name='civilStatusEmp'
                                                    style={{
                                                        minWidth: 220,
                                                        border: '1px solid #ced4da',
                                                        borderRadius: 4,
                                                        background: 'white'
                                                    }}
                                                    onChange={handleChange}

                                                >
                                                    <option aria-label='None' value='' />
                                                    <option>Casado(a)</option>
                                                    <option>Soltero(a)</option>
                                                    <option>Divorciado(a)</option>
                                                    <option>Otros</option>
                                                </NativeSelect>
                                            </span>
                                        </Typography>
                                    </FormControl>
                                </div>
                                <div >
                                    <FormControl >
                                        <Typography variant='h6'>Grado de Institucion
                                            <span style={{ marginLeft: '2rem' }}>
                                                <Select
                                                    style={{
                                                        minWidth: 220,
                                                        marginBottom: '1.5rem',
                                                        border: '1px solid #ced4da',
                                                        borderRadius: 4,
                                                        background: 'white'
                                                    }}
                                                    name='institutionDegreeEmp'
                                                    value={changeData.institutionDegreeEmp}
                                                    onChange={handleChange}
                                                    align='center'

                                                >
                                                    <MenuItem value=''>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={'Primaria'}>Primaria</MenuItem>
                                                    <MenuItem value={'Secundaria'}>Secundaria</MenuItem>
                                                    <MenuItem value={'Tecnico Medio'}>Tecnico Medio</MenuItem>
                                                    <MenuItem value={'Licenciatura'}>Licenciatura</MenuItem>
                                                </Select>
                                            </span>
                                        </Typography>
                                    </FormControl>
                                </div>
                                <div align='center' style={{ marginBottom: '1.5rem' }}>
                                    <Typography variant='h6'>Sexo</Typography>
                                    <span>Hombre
                                        <Radio
                                            name='sexoEmp'
                                            color='primary'
                                            value='Masculino'
                                            checked={changeData.sexoEmp === 'Masculino'}
                                            onChange={handleChange}
                                            style={{ color: 'white' }}
                                        />
                                    </span>
                                    <span>Mujer</span>
                                    <Radio
                                        name='sexoEmp'
                                        color='primary'
                                        value='Femenino'
                                        checked={changeData.sexoEmp === 'Femenino'}
                                        onChange={handleChange}
                                        style={{ color: 'white' }}
                                    />

                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }} noValidate>
                                        <Typography variant='h6' style={{ marginTop: '1rem' }}>Fecha de Nacimiento</Typography>

                                        <TextField
                                            name='fechaNacEmp'
                                            label='fecha de Nacimiento'
                                            type='date'
                                            // defaultValue='yyyy-MM-dd'
                                            className={classes.textField}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange}
                                            style={{ background: 'white', borderRadius: 5 }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }} noValidate>
                                        <Typography variant='h6' style={{ marginTop: '1rem' }}>Fecha de Ingreso</Typography>

                                        <TextField
                                            name='fechaini'
                                            label='fecha de Ingreso'
                                            type='date'
                                            // defaultValue='yyyy-MM-dd'
                                            className={classes.textField}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange}
                                            style={{ background: 'white', borderRadius: 5 }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }} noValidate>
                                        <Typography variant='h6' style={{ marginTop: '1rem' }}>Fecha de Fin</Typography>
                                        <TextField
                                            name='fechafin'
                                            label='fecha de Retiro'
                                            type='date'
                                            // defaultValue='yyyy-MM-dd'
                                            className={classes.textField}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange}
                                            style={{ background: 'white', borderRadius: 5 }}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='ObserEmp'
                                    variant='outlined'
                                    label='Observaciones'
                                    type='text'
                                    fullWidth
                                    onChange={handleChange}
                                    style={{ background: 'white', borderRadius: 5 }}

                                />
                            </div> */}
                            </Grid>
                        </Grid>
                        <div align='center'>
                            <Button type='submit' style={{ marginBottom: '3rem', marginRight: '1rem' }} variant='contained' color='primary'>REGISTRAR</Button>
                            <Button component={Link} to='/userControlEmp' style={{ marginBottom: '3rem' }} variant='contained' color='secondary'>cancelar</Button>
                        </div>
                    </form>
                </Container>
            </Container>
            <Dialog
                maxWidth='sm'
                open={openMessage}
                onClose={closeModalMessage}
            >
                <Container maxWidth='sm' align='center'>
                    <Typography variant='h6' className={classes.TyphoAlineation}>Empleado Registrado</Typography>
                    <Button style={{ marginBottom: '1rem' }} variant='contained' color='primary' component={Link} to='/userControlEmp'>aceptar</Button>
                </Container>
            </Dialog>
        </>
    )
}

export default UserRegistroEmp
