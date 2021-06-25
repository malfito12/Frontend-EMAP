import { Button,Box, Container, Dialog, FormControl, Grid, makeStyles, MenuItem, NativeSelect, Paper, Radio, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { PORT_URL } from '../../../PortURL'

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
const RegisterEmp = () => {
    const classes = useStyles()
    const [image,setImage]=useState(null)
    const [preview,setPreview]=useState(null)
    const [openMessage,setOpenMessage]=useState(false)
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
        fechaNacEmp: Date(),
        estadoEmp:'activo',
    })

    const fileInputRef = useRef();

    const postEmpleado = async () => {
        const formData= new FormData()
        formData.append('image', image)
        formData.append('itemEmp',changeData.itemEmp)
        formData.append('id_bio',changeData.id_bio)
        formData.append('firstNameEmp',changeData.firstNameEmp)
        formData.append('lastNameEmpP',changeData.lastNameEmpP)
        formData.append('lastNameEmpM',changeData.lastNameEmpM)
        formData.append('CIEmp',changeData.CIEmp)
        formData.append('emailEmp',changeData.emailEmp)
        formData.append('sexoEmp',changeData.sexoEmp)
        formData.append('numCelEmp',changeData.numCelEmp)
        formData.append('dirEmp',changeData.dirEmp)
        formData.append('nacionalityEmp',changeData.nacionalityEmp)
        formData.append('civilStatusEmp',changeData.civilStatusEmp)
        formData.append('professionEmp',changeData.professionEmp)
        formData.append('institutionDegreeEmp',changeData.institutionDegreeEmp)
        formData.append('ObserEmp',changeData.ObserEmp)
        formData.append('fechaNacEmp',changeData.fechaNacEmp)
        formData.append('estadoEmp',changeData.estadoEmp)
        await axios.post(`${PORT_URL}empleado`, formData)
            .then(resp => {
                // alert('empleado registrado')
                console.log(resp.data)
            })
    }
//----------------------------------------------------------------
    //EXTRA MODAL COMO ALERT
    const openModalMessage=()=>{
        setOpenMessage(true)
    }
    const closeModalMessage=()=>{
        setOpenMessage(false)
    }
    
    const addUserAndModal=()=>{
        postEmpleado()
        openModalMessage()
    }
//---------------------------------------------------------------------
    const handleChange=(e)=>{
        if(e.target.files && e.target.files.length>0){
            const file=e.target.files[0]
            if(file.type.includes('image')){
                const reader= new FileReader()
                reader.readAsDataURL(file)
                reader.onload=()=>{
                    setPreview(reader.result)
                    setImage(e.target.files[0])
                }
            }
            else{console.log('no funciona')}
        }
        setChangeData({
            ...changeData,
            [e.target.name]:e.target.value
        })
    }
    // console.log(props)
    console.log(changeData)
    return (
    <>
        <Container style={{paddingTop:'5rem'}} maxWidth='lg'>
            <Typography className={classes.TyphoAlineation} variant='h4' align='center'>Registro de Empleado</Typography>
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
                                style={{background:'white',borderRadius:5}}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <TextField
                                name='id_bio'
                                variant='outlined'
                                label='ID Biometrico'
                                type='number'
                                onChange={handleChange}
                                style={{background:'white',borderRadius:5}}
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
                                style={{background:'white',borderRadius:5}}
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
                                style={{background:'white',borderRadius:5}}
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
                                style={{background:'white',borderRadius:5}}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <TextField
                                name='CIEmp'
                                variant='outlined'
                                label='Celdula de Identidad'
                                type='text'
                                onChange={handleChange}
                                style={{minWidth:300,background:'white',borderRadius:5}}
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
                                style={{background:'white',borderRadius:5}}
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
                                style={{background:'white',borderRadius:5}}
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
                                style={{background:'white',borderRadius:5}}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <TextField
                                name='numCelEmp'
                                variant='outlined'
                                label='N° Celular'
                                type='number'
                                style={{minWidth:300}}
                                onChange={handleChange}
                                style={{background:'white',borderRadius:5}}
                                
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <TextField
                                name='ObserEmp'
                                variant='outlined'
                                label='Observaciones'
                                type='text'
                                fullWidth
                                onChange={handleChange}
                                style={{background:'white',borderRadius:5}}
                                
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div align='center' style={{ marginBottom: '1.5rem' }}>
                        <Paper component={Box} p={1} style={{background:'#bdbdbd', width:'290px',height:'277px'}}>
                            <img src={preview} style={{width:'100%', height:'100%'}} />
                        </Paper>
                        <input 
                            name='image'
                            type='file'
                            accept='image/*'
                            id='file-image'
                            style={{display:'none'}}
                            onChange={handleChange}
                            
                        />
                        <label htmlFor='file-image' >
                            <Button style={{ marginTop: '1rem' }} variant='contained' color='primary' component='span'>cargar</Button>
                        </label>
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
                                                background:'white'
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
                                <span style={{marginLeft:'2rem'}}>
                                    <Select
                                    style={{
                                        minWidth: 220,
                                        marginBottom: '1.5rem',
                                        border: '1px solid #ced4da',
                                        borderRadius: 4,
                                        background:'white'
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
                        <div align='center' style={{marginBottom:'1.5rem'} }>
                            <Typography variant='h6'>Sexo</Typography>
                                <span>Hombre
                                <Radio
                                    name='sexoEmp'
                                    color='primary'
                                    value='Masculino'
                                    checked={changeData.sexoEmp==='Masculino'}
                                    onChange={handleChange}
                                    style={{color:'white'}}
                                />
                                </span>
                                <span>Mujer</span>
                                <Radio
                                    name='sexoEmp'
                                    color='primary'
                                    value='Femenino'
                                    checked={changeData.sexoEmp==='Femenino'}
                                    onChange={handleChange}
                                    style={{color:'white'}}
                                />
                            
                        </div>
                        <div style={{ marginBottom: '1.5rem'}}>
                        <form style={{display:'flex',flexWrap:'wrap'}} noValidate>
                            <Typography variant='h6' style={{marginTop:'1rem'}}>Fecha de Nacimiento</Typography>
                                
                                <TextField 
                                name='fechaNacEmp'
                                label='fecha de Nacimiento'
                                type='date'
                                // defaultValue='yyyy-MM-dd'
                                className={classes.textField}
                                InputLabelProps={{shrink:true}}
                                onChange={handleChange}
                                style={{background:'white',borderRadius:5}}
                            />
                                
                            
                        </form>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <TextField
                                name='professionEmp'
                                variant='outlined'
                                label='Profesión'
                                type='text'
                                onChange={handleChange}
                                fullWidth
                                style={{background:'white',borderRadius:5}}
                                
                            />
                        </div>
                    </Grid>
                </Grid>
                <div align='center'>
                    <Button /*component={Link} to='/controlEmp'*/ onClick={addUserAndModal} style={{marginBottom:'3rem'}} variant='contained' color='primary'>REGISTRAR</Button>
                </div>
            </Container>
        </Container>
        <Dialog
            maxWidth='sm'
            open={openMessage}
            onClose={closeModalMessage}
        >
            <Container maxWidth='sm' align='center'>
            
            <Typography variant='h6' className={classes.TyphoAlineation}>Empleado Registrado</Typography>
            <Button style={{marginBottom:'1rem'}} variant='contained' color='primary' component={Link} to='/controlEmp'>aceptar</Button>
            </Container>
        </Dialog>
        </>
    )
}

export default RegisterEmp
