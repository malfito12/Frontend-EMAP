import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import {PORT_URL} from '../../../PortURL'

const useStyles=makeStyles((theme)=>({
    TyphoAlineation:{
        marginTop:'1.5rem',
        marginBottom:'1.5rem'
    },
    image:{
        width:'50%',
        height:'320px',
    },
    margin: {
        margin: theme.spacing(1),
    },
}))
const RegisterEmp = () => {
    const classes=useStyles()
    const [pathImage, setPathImage]=useState("https://img2.freepng.es/20181108/gkx/kisspng-computer-icons-clip-art-portable-network-graphics-government-los-santos-5be4b7db1f0f80.4023802615417159311272.jpg")
    const [empleado,setEmpleado]=useState([])
    const [changeData, setChangeData]=useState({
        itemEmp:'',
        id_bio:'',
        firstNameEmp:'',
        lastNameEmpP:'',
        lastNameEmpM:'',
        CIEmp:'',
        emailEmp:'',
        sexoEmp:'',//
        numCelEmp:'',//
        dirEmp:'',
        photoImgEmp:'',//
        nacionalityEmp:'',
        civilStatusEmp:'',
        professionEmp:'',//
        institutionDegreeEmp:'',//
        ObserEmp:'',//
        fechaNacEmp:'',//
    })

    const fileInputRef= useRef();
    const postEmpleado=async()=>{
        await axios.post(`${PORT_URL}empleado`,empleado)
        .then(resp=>{
            alert('empleado registrado')
            console.log(resp.data)
        })
    }
    return (
        <Container maxWidth='lg'>
            <Typography className={classes.TyphoAlineation} variant='h4' align='center'>Registro de Empleado</Typography>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='itemEmp'
                                variant='outlined'
                                label='N° de Item'
                                type='number'
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='id_bio'
                                variant='outlined'
                                label='ID Biometrico'
                                type='number'
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='firstNameEmp'
                                variant='outlined'
                                label='Nombre Completo'
                                type='text'
                                fullWidth={true}
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='lastNameEmpP'
                                variant='outlined'
                                label='Apellido Paterno'
                                type='text'
                                fullWidth={true}
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='lastNameEmpM'
                                variant='outlined'
                                label='Apellido Materno'
                                type='text'
                                fullWidth={true}
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='CIEmp'
                                variant='outlined'
                                label='Celdula de Identidad'
                                type='text'
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='emailEmp'
                                variant='outlined'
                                label='Correo Electrónico'
                                type='text'
                                fullWidth={true}
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='nacionalityEmp'
                                variant='outlined'
                                label='Nacionalidad'
                                type='text'
                                fullWidth={true}
                            />
                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='dirEmp'
                                variant='outlined'
                                label='Direccion'
                                type='text'
                                fullWidth={true}
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
                                    style={{marginBottom:'2rem'}}
                                    />
                                <input 
                                    name='photoImgEmp'
                                    type="file"
                                    style={{display:'none'}}
                                    ref={fileInputRef}
                                    accept='image/*'    
                                />
                            </div>
                            <div style={{marginBottom:'2rem'}}>
                                <Button
                                    variant='contained'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        fileInputRef.current.click()
                                    }}
                                    style={{backgroundColor:'green', color:'white'}}
                                >add image</Button>
                            </div>

                        </div>
                        <div style={{marginBottom:'1.5rem'}}>
                            <TextField
                                name='dirEmp'
                                variant='outlined'
                                label='Direccion'
                                type='text'
                                fullWidth={true}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}

export default RegisterEmp
