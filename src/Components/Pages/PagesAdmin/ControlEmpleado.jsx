import { Button, Container, Dialog, FormControl, Grid, makeStyles, MenuItem, NativeSelect, Radio, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useRef, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { PORT_URL } from '../../../PortURL'
import AlertDelete from '../../Atoms/Alerts/AlertDelete'
import AlertEdit from '../../Atoms/Alerts/AlertEdit'

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
    const [pathImage, setPathImage] = useState("https://img2.freepng.es/20181108/gkx/kisspng-computer-icons-clip-art-portable-network-graphics-government-los-santos-5be4b7db1f0f80.4023802615417159311272.jpg")
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
        await axios.put(`${PORT_URL}empleado/${id}`, changeData)
            .then(resp => console.log(resp.data))
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
        await axios.delete(`${PORT_URL}empleado?id=${id}`)
            .then(resp => console.log(resp.data))
        // .catch(err=>console.log(err))
        closeModalDelete()
        openCloseAlertDelete()
        getEmpleado()
    }
    //--------------------------------------------------------------

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes('image')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
            }
            else { console.log('no funciona') }
        }
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
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
    const fileInputRef = useRef();

    // console.log(new Date(fecha).toLocaleDateString().split('/').reverse().join('/'));


    const { history } = props
    const columnas = [
        { title: 'ID BIO', field: 'id_bio' },
        { title: 'Nombre', field: 'firstNameEmp' },
        { title: 'Email', field: 'emailEmp' },
        { title: 'Sexo', field: 'sexoEmp' },
        { title: 'Estado Civil', field: 'civilStatusEmp' },
    ]


    return (
        <>
            <Container style={{ marginTop: '5rem' }} maxWidth='lg'>
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
                                <div>
                                    <img
                                        className={classes.image}
                                        src={pathImage}
                                        alt="imagen"
                                        style={{ marginBottom: '2rem' }}
                                        defaultValue={changeData.photoImgEmp}


                                    />
                                    <input
                                        name='photoImgEmp'
                                        type="file"
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        accept='image/*'
                                        onChange={handleChange}

                                    />
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <Button
                                        variant='contained'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            fileInputRef.current.click()
                                        }}
                                        style={{ backgroundColor: 'green', color: 'white' }}
                                    >add image</Button>
                                </div>

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
                            <div style={{ marginBottom: '1.5rem', marginTop: '3.2rem' }}>
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
                            <div style={{ marginBottom: '1.5rem', marginTop: '2.2rem' }}>
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
