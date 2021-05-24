import { Button, Container, Dialog, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {PORT_URL} from '../../../PortURL'

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '2rem'
    }
}))
const RegisterCargo = (props) => {
    var data = props.location.pathname.split("/")
    console.log(data)
    const classes = useStyles()
    const [openModalRegister,setOpenModalRegister]=useState(false)
    const [changeData,setChangeData]=useState({
        id_bio:data[3],
        idEmp:data[2],
        nameCargo:'',
        cod_cargo:'',
        des_cargo:'',
        t_perma:'',
        haber_b:'',
        nivel:'',
        estado:'',
        gestion:''        
    })
//----------------------------------------------------
    //REGISTRO CARGOS
    const postCargo=async()=>{
        await axios.post(`${PORT_URL}cargo`, changeData)
        .then(resp=>{
            console.log(resp.data)})
        .catch(err=>console.log(err))
    }
    const handleChange=(e)=>{
        setChangeData({
            ...changeData,
            [e.target.name]:e.target.value
        })
    }
//-----------------------------------------------------------------
    //DIALOG
    const openCloseModalRegister=()=>{
        setOpenModalRegister(!openModalRegister)
    }
    
//---------------------------------------------------------------
    const registerAndModal=()=>{
        postCargo()
        openCloseModalRegister()
    }
    
    console.log(changeData)
    return (
        <>
        <Container maxWidth='lg'>
            <Typography className={classes.spacingBott} variant='h4' align='center' style={{ marginTop: '5rem' }}>Formulario para asignación de Cargo</Typography>
            <Container maxWidth='lg' align='center'>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <div className={classes.spacingBott}>
                            <Typography variant='h6'>{"Nombre: "+data[4]}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div className={classes.spacingBott}>
                            <Typography variant='h6'>{`Apellido P: ${data[5]}`}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div className={classes.spacingBott}>
                            <Typography variant='h6'>{`Apellido M: ${data[6]}`}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div className={classes.spacingBott}>
                            <Typography variant='h6'>{`ID BIO: ${data[3]}`}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='nameCargo'
                                label='Nombre Cargo'
                                type='text'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='cod_cargo'
                                label='Codigo de Cargo'
                                type='number'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='des_cargo'
                                label='Des_cargo'
                                type='text'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='estado'
                                label='Estado'
                                type='text'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='t_perma'
                                label='Tipo permanencia'
                                type='text'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='haber_b'
                                label='Haber basico'
                                type='number'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='nivel'
                                label='Nivel'
                                type='number'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.spacingBott}>
                            <TextField
                                variant='outlined'
                                name='gestion'
                                label='Gestion'
                                type='number'
                                style={{ minWidth: 300 }}
                                onChange={handleChange}
                            />
                        </div>
                    </Grid>
                </Grid>
                <div align='center' className={classes.spacingBott}>
                    <Button onClick={registerAndModal} variant='contained' style={{backgroundColor:'green', color:'white', marginRight:'1rem'}} >Asignar Cargo</Button>
                    <Button component={Link} to='/controlCargos' variant='contained' style={{backgroundColor:'red', color:'white'}}>Cancelar</Button>
                </div>
            </Container>
        </Container>
        <Dialog
            maxWidth='sm'
            open={openModalRegister}
            onClose={openCloseModalRegister}
        >
            <Container maxWidth='xs' align='center'>
                <Typography variant='h6' style={{marginTop:'1.5rem',marginBottom:'1.5rem'}}>Cargo registrado</Typography>
                <Button style={{marginBottom:'1rem',backgroundColor:'green',color:'white'}}component={Link} to='/controlCargos' variant='contained'>aceptar</Button>
            </Container>
        </Dialog>
        </>
    )
}

export default RegisterCargo
