import { AppBar, Button, Box, Container, Dialog, IconButton, makeStyles, MenuItem, Paper, TextField, Toolbar, Typography, Grid } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import loginimage from '../../../images/loginimage.png'
import logoemap from '../../../images/logoemap.png'
import { PORT_URL } from '../../../PortURL'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))
const PublicHome = () => {
    const classes = useStyles()
    const [user, setUser] = useState()
    const [openAddUser, setOpenAddUser] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [changeData, setChangeData] = useState({
        email: '',
        password: '',
        rols: 'usuario'
    })
    const [changeDataUser, setChangeDataUser] = useState({
        rols:'admin',
        username: '',
        password: '',
        repitPassword: '',
        email: '',
        sexo: '',
        telefono: '',
    })

    useEffect(() => {
        getUser()
    }, [])
    //----------------------------------------------------------
    const handleChange = e => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeUser = (e) => {
        setChangeDataUser({
            ...changeDataUser,
            [e.target.name]: e.target.value
        })
    }
    //------------------------GET USARIOS------------------------------
    const getUser = async () => {
        await axios.get(`${PORT_URL}consultaUser`)
            .then(resp =>{ 
                // console.log(resp.data)
                setUser(resp.data)})
            .catch(err => console.log(err))
    }
    // console.log(user)
    //------------------------ADD USER--------------------------------
    const openModalAddUser = () => {
        setOpenAddUser(true)
    }
    const closeModalAddUser = () => {
        setOpenAddUser(false)
    }
    const postUser = async (e) => {
        e.preventDefault()
        try {
            if (changeDataUser.password === changeDataUser.repitPassword) {
                await axios.post(`${PORT_URL}user`, changeDataUser)
                .then(resp=>{
                    console.log(resp.data)
                    closeModalAddUser()
                    getUser()
                })
                .catch(err=>{
                    console.log(err)
                    alert('ocurrio algun error no se pudo registrar el usuario')
                })
            } else {
                alert('error verifique su contraseña')
            }
        } catch (error) {
            console.log(error)
        }
    }
    //-----------------------------------------------------------
    const iniciarSesion = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}login`, changeData)
            .then(resp => {
                localStorage.setItem('token', resp.data.token);
                if (changeData.rols === 'admin') {
                    localStorage.setItem('rols', changeData.rols);
                    window.location = '/homeadmin'
                } else if (changeData.rols === 'usuario') {
                    localStorage.setItem('rols', changeData.rols);
                    window.location = '/homeuser'
                }
            })
            .catch(err => {
                alert('no se pudo iniciar sesion')
                console.log(err)
            })
    }

    const openCloseModalLogin = () => {
        if (user > 0) {
            setOpenLogin(!openLogin)
        } else {
            openModalAddUser()
        }
    }
    // console.log(changeData)
    // console.log(changeDataUser)
    return (
        <>
            <AppBar position='fixed' style={{ background: 'linear-gradient(45deg, #00897b 30%, #4db6ac 90%)' }}>
                <Toolbar>
                    <img src={logoemap} style={{ width: 110, height: 50 }} alt="#" />
                    <div style={{ flexGrow: 1 }}></div>
                    <Typography style={{ color: 'black', marginRight: '0.5rem' }} >LOGIN</Typography>
                    <IconButton onClick={openCloseModalLogin}>
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Dialog
                maxWidth='md'
                open={openLogin}
                onClose={openCloseModalLogin}

            >
                <Container maxWidth='lg'>
                    <div style={{ marginLeft: '15rem', marginRight: '15rem', marginTop: '2rem' }}></div>
                    <div align='center'>
                        <img src={loginimage} style={{ width: '20%' }} alt="#" />
                        <Typography className={classes.spacingBott} variant='h5'>Iniciar Sesión</Typography>
                    </div>
                    <form onSubmit={iniciarSesion}>
                        <TextField
                            name='email'
                            label='Correo Electronico'
                            variant='outlined'
                            type='email'
                            fullWidth
                            className={classes.spacingBott}
                            onChange={handleChange}
                            required
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
                        />
                        <div align='center'>
                            <TextField
                                name='rols'
                                variant="outlined"
                                select
                                className={classes.spacingBott}
                                onChange={handleChange}
                                value={changeData.rols}
                                style={{ minWidth: 100 }}
                            >

                                <MenuItem value={'usuario'}>Usuario</MenuItem>
                                <MenuItem value={'admin'}>Administrador</MenuItem>
                            </TextField>
                        </div>
                        <div align='center' style={{ marginBottom: '2rem' }}>
                            <Button type='submit' variant='contained' color='primary'>iniciar sesion</Button>
                        </div>
                    </form>
                </Container>
            </Dialog>

            <Dialog
                open={openAddUser}
                onClose={closeModalAddUser}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1'>REGISTRO 1° USUARIO</Typography>
                    <form onSubmit={postUser}>
                        <TextField
                            name='username'
                            label='Nombre de Usuario'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBott}
                            onChange={handleChangeUser}
                            required
                        />
                        <TextField
                            name='password'
                            label='Contraseña'
                            variant='outlined'
                            size='small'
                            fullWidth
                            type='password'
                            className={classes.spacingBott}
                            onChange={handleChangeUser}
                            required
                        />
                        <TextField
                            name='repitPassword'
                            label='Repita Contraseña'
                            variant='outlined'
                            size='small'
                            fullWidth
                            type='password'
                            className={classes.spacingBott}
                            onChange={handleChangeUser}
                            required
                        />
                        <TextField
                            name='email'
                            label='Correo Electronico'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBott}
                            onChange={handleChangeUser}
                            required
                        />
                        <TextField
                            name='sexo'
                            label='Sexo'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBott}
                            onChange={handleChangeUser}
                            value={changeDataUser.sexo}
                            required
                            select
                        >
                            <MenuItem value='M'>Maculino</MenuItem>
                            <MenuItem value='F'>Femenino</MenuItem>
                        </TextField>
                        <TextField
                            name='telefono'
                            label='Telefono'
                            variant='outlined'
                            size='small'
                            fullWidth
                            type='number'
                            className={classes.spacingBott}
                            onChange={handleChangeUser}
                        />
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalAddUser}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
        </>
    )
}

export default PublicHome
