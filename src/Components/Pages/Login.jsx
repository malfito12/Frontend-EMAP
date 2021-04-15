import { Button, Container, FormControl, Grid, makeStyles, Radio, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import {PORT_URL} from '../../PortURL'


const useStyles= makeStyles((theme)=>({
    alineation: {
        width: '70%',
        paddingBottom: 30
    },
    alineation2: {
        paddingTop:100,
        paddingBottom: 30
        
    },
    typography:{
        fontFamily:"Dubai Medium"
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
}))

const Login = () => {
    const classes=useStyles()
    const [login,setLogin]=useState({
        form:{
            email:'',
            password:'',
            rols:'usuario'
        }
    })
    const handleChange=e=>{
        setLogin({
            form:{
                ...login.form,
                [e.target.name]:e.target.value
            }
        })
    }
    const iniciarSesion=async(e)=>{
        e.preventDefault()
        const data={
            'email': login.form.email,
            'password': login.form.password,
            'rols': login.form.rols
        }
        await axios.post(`${PORT_URL}login`,data)
        .then(resp=>{
            localStorage.setItem('token', resp.data.token);
            if(login.form.rols==='admin'){
                localStorage.setItem('rols', login.form.rols);
                window.location='/homeadmin'
            }else if(login.form.rols==='usuario'){
                localStorage.setItem('rols', login.form.rols);
                window.location='/homeuser' 
            }
            // alert('usuario logeado')
        })
        .catch(err=>{
            alert('no se pudo iniciar sesion')
            console.log(err)})
        
    }
    return (
        <Container fixed>
            <Typography variant='h3' align='center' className={classes.alineation2}>Iniciar Sesion</Typography>
            <div align='center'>
                <form onSubmit={e=>iniciarSesion(e)}>
                    <Grid item container direction='column' xs={11} sm={6}>
                        <FormControl>
                            <div>
                                <TextField
                                    type='email'
                                    name='email'
                                    variant='outlined'
                                    label='Correo Electronico'
                                    className={classes.alineation}
                                    onChange={e=>handleChange(e)}
                                />
                            </div>
                            <div>
                                <TextField
                                    type='password'
                                    name='password'
                                    variant='outlined'
                                    label='Contraseña'
                                    className={classes.alineation}
                                    onChange={e=>handleChange(e)}
                                />
                            </div>
                            <div>
                                <div>
                                    <span className={classes.typography}>Usuario</span>
                                    <Radio 
                                        name='rols'
                                        value='usuario'
                                        color='primary'
                                        checked={login.form.rols==='usuario'}
                                        onChange={e=>handleChange(e)}
                                    />
                                </div>
                                <div>
                                    <span className={classes.typography}>Administrador</span>
                                    <Radio 
                                        name='rols'
                                        value='admin'
                                        color='primary'
                                        onChange={e=>handleChange(e)}
                                        checked={login.form.rols==='admin'}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button type='submit' variant='contained' color='primary' style={{marginTop: '2rem'}}>Iniciar Sesion</Button>
                            </div>
                        </FormControl>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login
