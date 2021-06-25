import { AppBar, Button, Container, Dialog, IconButton, makeStyles, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
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
    const [openLogin, setOpenLogin] = useState(false)
    const classes = useStyles()
    const [changeData, setChangeData] = useState({
        email: '',
        password: '',
        rols: 'usuario'
    })

    const handleChange = e => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }

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
        setOpenLogin(!openLogin)
    }
    // console.log(changeData)
    return (
        <>
            <AppBar position='fixed' style={{ background: 'linear-gradient(45deg, #00897b 30%, #4db6ac 90%)' }}>
                <Toolbar>
                    <img src={logoemap} style={{ width: 110, height:50 }} alt="#"/>
                    <div style={{ flexGrow: 1}}></div>
                    <Typography style={{ color: 'black', marginRight:'0.5rem' }} >LOGIN</Typography>
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
                        <img src={loginimage} style={{ width: '20%' }} alt="#"/>
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
        </>
    )
}

export default PublicHome
