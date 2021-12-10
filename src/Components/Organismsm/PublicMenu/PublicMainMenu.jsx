import { Button, Box, Link, Dialog, Backdrop, CircularProgress, makeStyles, Paper, TextField, Typography, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'
import loginimage from '../../../images/loginimage.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { PORT_URL } from '../../../PortURL';

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}))

const PublicMainMenu = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [changeData, setChangeData] = useState({
        email: '',
        username: '',
        password: '',
        // rols: 'usuario'
    })

    //----------------------------------------------------------
    const handleChange = e => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }

    //-----------------------------------------------------------
    const iniciarSesion = async (e) => {
        e.preventDefault()
        openLoading()
        await axios.post(`${PORT_URL}login`, changeData)
            .then(resp => {
                // console.log(resp.data)
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('rols', resp.data.rols);
                localStorage.setItem('username', resp.data.username);
                // if (changeData.rols === 'admin') {
                if (localStorage.getItem('rols') === 'admin') {
                    // localStorage.setItem('rols', changeData.rols);
                    window.location = '/homeadmin'
                // } else if (changeData.rols === 'usuario') {
                } else if (localStorage.getItem('rols') === 'usuario') {
                    // localStorage.setItem('rols', changeData.rols);
                    window.location = '/homeuser'
                }
            })
            .catch(err => {
                closeLoading()
                alert('no se pudo iniciar sesion')
                console.log(err)
            })
    }
    //VERIFICAR SI EXISTE USUARIOS
    const openCloseModalLogin = () => {
        // if (user > 0) {
        //     setOpenLogin(!openLogin)
        // } else {
        //     openModalAddUser()
        // }
        setOpenLogin(!openLogin)
    }
    //---------------LOADING------------
    const openLoading = () => {
        setLoading(true)
    }
    const closeLoading = () => {
        setLoading(false)
    }
    //-----------------------------------------------------------
    const goPassword = () => {
        window.location = '/password'
    }
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    return (
        <>
            <Button style={{ color: 'white' }} startIcon={<AccountCircleIcon />} variant='outlined' color='inherit' onClick={openCloseModalLogin}>login</Button>
            <Dialog
                maxWidth='xs'
                open={openLogin}
                onClose={openCloseModalLogin}
            >
                <Paper component={Box} p={2}>
                    <div align='center'>
                        <img src={loginimage} style={{ width: '20%' }} alt="#" />
                        <Typography className={classes.spacingBott} variant='h5'>Iniciar Sesión</Typography>
                    </div>
                    <form onSubmit={iniciarSesion}>
                        <TextField
                            name='username'
                            label='Nombre de Usuario'
                            variant='outlined'
                            fullWidth
                            className={classes.spacingBott}
                            onChange={handleChange}
                            required
                            size='small'
                        />
                        <TextField
                            name='password'
                            label='Contraseña'
                            variant='outlined'
                            type='password'
                            fullWidth
                            className={classes.spacingBott}
                            onChange={handleChange}
                            required
                            size='small'
                        />
                        {/* <div align='center'>
                            <TextField
                                name='rols'
                                variant="outlined"
                                select
                                className={classes.spacingBott}
                                onChange={handleChange}
                                value={changeData.rols}
                                style={{ minWidth: 100 }}
                                size='small'
                            >

                                <MenuItem value={'usuario'}>Usuario</MenuItem>
                                <MenuItem value={'admin'}>Administrador</MenuItem>
                            </TextField>
                        </div> */}
                        <Grid container direction='column' alignItems='center' style={{ marginBottom: '2rem' }}>
                            <Backdrop className={classes.backdrop} open={loading} onClick={closeLoading}>
                                <CircularProgress color='inherit' />
                            </Backdrop>
                            <Button type='submit' fullWidth variant='contained' color='primary'>iniciar sesion</Button>
                        </Grid>
                    </form>
                    <div align='center'>
                        <Link underline='none' className={classes.spacingBott} component='button' onClick={goPassword}>¿Olvidaste tu Contraseña?</Link>
                    </div>
                </Paper>
            </Dialog>

        </>
    )
}

export default PublicMainMenu
