import { Button, Box, Container, Dialog, FormControl, Grid, makeStyles, MenuItem, NativeSelect, Radio, Select, TextField, Typography, Tooltip, Paper, IconButton } from '@material-ui/core'
import axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { PORT_URL, PORT_URL_IMAGE } from '../../../PortURL'
import AlertDelete from '../../Atoms/Alerts/AlertDelete'
import AlertEdit from '../../Atoms/Alerts/AlertEdit'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    TyphoAlineation: {
        marginTop: '1.5rem',
        marginBottom: '1.5rem'
    },
    distancia: {
        marginTop: '1rem',
        marginBottom: '1.5rem',
        marginLeft: '30rem',
        marginRight: '30rem'
    },
    alineation: {
        width: '93%',
        paddingBottom: 10,
        // marginTop:'1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        marginBottom: '1rem',
    },
    image: {
        width: '50%',
        height: '320px',
    },
    margin: {
        margin: theme.spacing(1),
    },

}))

const ControlEmpleado = (props) => {
    const classes = useStyles()
    const [empleado, setEmpleado] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openAlertDelete, setOpenAlertDelete] = useState(false)
    const [openAlertEdit, setOpenAlertEdit] = useState(false)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [changeData, setChangeData] = useState({
        itemEmp: '',
        id_bio: '',
        firstNameEmp: '',
        lastNameEmpP: '',
        lastNameEmpM: '',
        CIEmp: '',
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
        estadoEmp: '',
        image: '',
        fechaNacEmp: Date()
    })

    useEffect(() => {
        getEmpleado()
    }, [])
    const getEmpleado = async () => {
        await axios.get(`${PORT_URL}empleado`)
            .then(resp => {
                setEmpleado(resp.data)
            })
    }
    //--------------------------------------------------------------
    //EDITAR
    const openModalEdit = (ele) => {
        setChangeData(ele)
        setOpenEdit(true)
    }
    const closeModalEdit = () => {
        setOpenEdit(false)
    }
    const editEmpleado = async (e) => {
        e.preventDefault()
        const id = changeData._id
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
        await axios.put(`${PORT_URL}empleado/${id}`, formData)
            .then(resp => console.log(resp.data))
        setPreview(null)
        setImage(null)
        setOpenEdit(false)
        openCloseAlertEdit()
        getEmpleado()
    }

    //--------------------------------------------------------------
    //DELETE
    const openModalDelete = (ele) => {
        setChangeData(ele)
        setOpenDelete(true)
    }
    const closeModalDelete = () => {
        setOpenDelete(false)
    }
    const deleteEmpleado = async () => {
        const id = changeData._id
        // console.log(id)
        await axios.delete(`${PORT_URL}empleado/${id}`)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
        closeModalDelete()
        openCloseAlertDelete()
        getEmpleado()

    }
    //--------------------------------------------------------------
    //INFORMACION
    const infoEmpleado=(e)=>{
        const id=e._id
        const id_bio=e.id_bio
        history.push('/infoEmp/'+id+"/"+id_bio)

    }
    //--------------------------------------------------------------

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes('image')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setPreview(reader.result)
                    setImage(e.target.file[0])
                }
            }
            else { console.log('no funciona') }
        }
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    const handleChange2 = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
            setImage(file)
        }
    }
    //------------------------------------------------------------------------
    //ALERT
    const openCloseAlertDelete = () => {
        setOpenAlertDelete(!openAlertDelete)
    }
    const openCloseAlertEdit = () => {
        setOpenAlertEdit(!openAlertEdit)
    }
    //--------------------------------------------------------------------

    // console.log(new Date(fecha).toLocaleDateString().split('/').reverse().join('/'));


    const { history } = props
    const columnas = [
        { title: 'ID BIO', field: 'id_bio' },
        { title: 'Nombre', field: 'firstNameEmp' },
        { title: 'Email', field: 'emailEmp' },
        { title: 'Sexo', field: 'sexoEmp' },
        {
            title: 'Estado', field: 'estadoEmp', render: (row) => row.estadoEmp === 'activo'
                ? <div style={{ color: 'green' }}>{row.estadoEmp}</div>
                : <div style={{ color: 'red' }}>{row.estadoEmp}</div>
        },
    ]

    // console.log(empleado)
    // console.log(changeData)
    return (
        <>
            <Container style={{ paddingTop: '5rem' }} maxWidth='lg'>
                <Typography variant='h4' align='center' className={classes.TyphoAlineation}>Lista de Empleados</Typography>
                <Button component={Link} to='/registerEmp' style={{ marginBottom: '2rem', backgroundColor: '#689f38', color: 'white' }} variant='contained' >registrar empleado</Button>
                <Container maxWidth='md'>
                    <MaterialTable
                        title='Lista de Empleados'
                        columns={columnas}
                        data={empleado}
                        options={{
                            headerStyle: {
                                backgroundColor: '#689f38',
                                color: 'white'
                            },
                            actionsColumnIndex: -1
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'editar',
                                onClick: (e, rowData) => openModalEdit(rowData)
                            },
                            {
                                icon: 'delete',
                                tooltip: 'eliminar',
                                onClick: (e, rowData) => openModalDelete(rowData)
                            },
                            {
                                icon: 'save',
                                tooltip: 'informacion',
                                // onClick:(e,rowData)=>console.log('se hiza '+rowData.firstNameEmp)
                                onClick: (e, rowData) => history.push('/infoEmp/' + rowData._id + '/' + rowData.id_bio + '/' + rowData.firstNameEmp)
                            }
                        ]}

                    >
                    </MaterialTable>
                </Container>
            </Container>
            <Container maxWidth='lg'>
                <Typography align='center' variant='h5' style={{ paddingTop: '1rem', paddingBottom: '1rem', color: 'white' }}>Nueva lista</Typography>
                <Grid container spacing={3} justify='center'>
                    {empleado &&
                        empleado.map(e => (
                            <Grid key={e._id} item xs={12} sm={3}>
                                <Paper component={Box} p={2}>
                                    <div align='center'>
                                        <Paper component={Box} p={1} style={{ width: '80%', height: '200px', background: '#bdbdbd' }}>
                                            {
                                                e.path
                                                    ? <img src={`${PORT_URL_IMAGE}` + e.path} style={{ width: '100%', height: '100% ' }} alt="#"/>
                                                    : <img src={preview} style={{ width: '100%', height: '100%' }} alt="#"/>
                                            }

                                        </Paper>
                                    </div>
                                    <div align='center'>
                                        <Typography variant='subtitle1'>ID Biometrico : {e.id_bio}</Typography>
                                        <Typography variant='subtitle1'>{e.firstNameEmp} {e.lastNameEmpP} {e.lastNameEmpM}</Typography>
                                        <Typography variant='subtitle1'>{e.emailEmp}</Typography>
                                    </div>
                                    <Grid container justify='space-evenly'>
                                        <Tooltip title='edit'>
                                            <IconButton style={{ color: 'green' }} onClick={() => openModalEdit(e)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='delete'>
                                            <IconButton style={{ color: 'red' }} onClick={() => openModalDelete(e)} >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='info'>
                                            <IconButton style={{ color: 'black' }} onClick={() => infoEmpleado(e)}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
            <Dialog
                maxWidth='lg'
                open={openEdit}
                onClose={closeModalEdit}
            >
                <div className={classes.distancia}></div>
                <Typography variant='h6' align='center' style={{ marginBottom: '1rem' }}>Editar Empleado</Typography>
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='itemEmp'
                                    variant='outlined'
                                    label='N° de Item'
                                    type='number'
                                    onChange={handleChange}
                                    defaultValue={changeData.itemEmp}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='id_bio'
                                    variant='outlined'
                                    label='ID Biometrico'
                                    type='number'
                                    onChange={handleChange}
                                    defaultValue={changeData.id_bio}
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
                                    defaultValue={changeData.firstNameEmp}
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
                                    defaultValue={changeData.lastNameEmpP}
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
                                    defaultValue={changeData.lastNameEmpM}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='CIEmp'
                                    variant='outlined'
                                    label='Celdula de Identidad'
                                    type='text'
                                    onChange={handleChange}
                                    style={{ minWidth: 300 }}
                                    defaultValue={changeData.CIEmp}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='emailEmp'
                                    variant='outlined'
                                    label='Correo Electrónico'
                                    type='email'
                                    fullWidth={true}
                                    onChange={handleChange}
                                    defaultValue={changeData.emailEmp}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='nacionalityEmp'
                                    variant='outlined'
                                    label='Nacionalidad'
                                    type='text'
                                    fullWidth={true}
                                    onChange={handleChange}
                                    defaultValue={changeData.nacionalityEmp}
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
                                    defaultValue={changeData.dirEmp}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='numCelEmp'
                                    variant='outlined'
                                    label='N° Celular'
                                    type='number'
                                    style={{ minWidth: 300 }}
                                    onChange={handleChange}
                                    defaultValue={changeData.numCelEmp}

                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='ObserEmp'
                                    variant='outlined'
                                    label='Observaciones'
                                    type='text'
                                    fullWidth={true}
                                    onChange={handleChange}
                                    defaultValue={changeData.ObserEmp}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div align='center'>
                                <Paper component={Box} p={1} style={{ background: '#bdbdbd', width: '270px', height: '270px' }}>
                                    {/* {changeData.path ? <img src={'http://192.168.100.6:8000/' + changeData.path} style={{ width: '100%', height: '100% ' }} /> */}
                                    {changeData.path ? <img src={`${PORT_URL_IMAGE}` + changeData.path} style={{ width: '100%', height: '100% ' }} alt="#"/>
                                        // : <img src={'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} style={{ width: '100%', height: '100%' }} />}
                                        : <img src={preview} style={{ width: '100%', height: '100%' }} alt="#"/>}
                                </Paper>
                                <input
                                    name='image'
                                    type='file'
                                    accept='image/*'
                                    id='file-name'
                                    style={{ display: 'none' }}
                                    onChange={e => handleChange2(e)}
                                />
                                <label htmlFor="file-name">
                                    <Button style={{ marginBottom: '1rem', marginTop: '1rem' }} variant='contained' color='primary' component='span' >cargar</Button>
                                </label>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <FormControl>
                                    <Typography variant='h6'>Estado Civil
                                        <span style={{ marginLeft: '2rem' }}>
                                            <NativeSelect
                                                name='civilStatusEmp'
                                                style={{
                                                    minWidth: 220,
                                                    border: '1px solid #ced4da',
                                                    borderRadius: 4
                                                }}
                                                onChange={handleChange}
                                                defaultValue={changeData.civilStatusEmp}

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
                                                    borderRadius: 4
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
                                    />
                                </span>
                                <span>Mujer</span>
                                <Radio
                                    name='sexoEmp'
                                    color='primary'
                                    value='Femenino'
                                    checked={changeData.sexoEmp === 'Femenino'}
                                    onChange={handleChange}
                                />

                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <form style={{ display: 'flex', flexWrap: 'wrap' }} noValidate>
                                    <Typography variant='h6' style={{ marginTop: '1rem', marginRight: '1rem' }}>Fecha de Nacimiento</Typography>

                                    <TextField
                                        id='fechaNacEmp'
                                        name='fechaNacEmp'
                                        label='fecha de Nacimiento'
                                        type='date'
                                        className={classes.textField}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleChange}
                                        defaultValue={changeData.fechaNacEmp}

                                    />


                                </form>
                            </div>
                            <div style={{ marginBottom: '1.5rem', marginTop: '2.3rem' }}>
                                <TextField
                                    name='professionEmp'
                                    variant='outlined'
                                    label='Profesión'
                                    type='text'
                                    style={{ minWidth: 300 }}
                                    onChange={handleChange}
                                    defaultValue={changeData.professionEmp}

                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <TextField
                                    name='estadoEmp'
                                    variant='outlined'
                                    label='Estado'
                                    select
                                    style={{ minWidth: 300 }}
                                    onChange={handleChange}
                                    value={changeData.estadoEmp}

                                >
                                    <MenuItem value='activo'>Activo</MenuItem>
                                    <MenuItem value='baja'>Dar de Baja</MenuItem>
                                </TextField>
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{ marginBottom: '2rem', marginTop: '2rem' }} align='center'>
                        <Button
                            size='small'
                            variant='contained'
                            color='primary'
                            onClick={editEmpleado}
                        >Editar</Button>
                        <Button
                            size='small'
                            variant='contained'
                            color='secondary'
                            style={{ marginLeft: '2rem' }}
                            onClick={closeModalEdit}
                        >cancelar</Button>
                    </div>
                </Container>
            </Dialog>
            <Dialog
                maxWidth='sm'
                open={openDelete}
                onClose={closeModalDelete}
            >
                <div style={{ marginLeft: '3rem', marginRight: '3rem', marginTop: '1rem', marginBottom: '1rem' }}>
                    <Typography align='center' variant='h6'>
                        Estas seguro de borrar a {changeData.firstNameEmp}
                    </Typography>
                    <div style={{ marginTop: '1rem' }} align='center'>
                        <Button onClick={deleteEmpleado} size='small' variant='contained' color='primary'>aceptar</Button>
                        <Button size='small' variant='contained' color='secondary' style={{ marginLeft: '2rem' }} onClick={closeModalDelete}>cancelar</Button>
                    </div>
                </div>
            </Dialog>
            <AlertDelete name={changeData.firstNameEmp} open={openAlertDelete} onClose={openCloseAlertDelete} />
            <AlertEdit name={changeData.firstNameEmp} open={openAlertEdit} onClose={openCloseAlertEdit} />
        </>
    )
}

export default withRouter(ControlEmpleado)
