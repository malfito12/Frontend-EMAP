import { Box, Button, Container, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import DrawerMenuPublic from '../../Organismsm/PublicMenu/DrawerMenuPublic'
import PublicMainMenu from '../../Organismsm/PublicMenu/PublicMainMenu'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { PORT_URL } from '../../../PortURL'

const useStyles = makeStyles((theme) => ({
    spacingHead: {
        marginBottom: '3rem'
    },
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const RecuperarPass = () => {
    const classes = useStyles()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const [password, setPassword] = useState([])
    const [changeData, setChangeData] = useState({
        ciPass: '',
        namePass: '',
        lastNamePPass: '',
        lastNameMPass: '',
        emailPass: '',
        contraPass: '',
    })

    //-------------------POST-------------------------
    // const postPassword = async (e) => {
    //     e.preventDefault()
    //     // console.log(changeData)
    //     try {
    //         await axios.post(`${PORT_URL}password`, changeData)
    //             .then(resp => { console.log(resp.data) })
    //             .catch(err => { console.log(err) })
    //     } catch (error) {

    //     }
    // }
    //----------------GET---------------------------
    const getPassword = async (e) => {
        e.preventDefault()
        // console.log(changeData)
        try {
            await axios.post(`${PORT_URL}recuperar-password`, changeData)
                .then(resp => {
                    setPassword(resp.data)
                    document.getElementById("password").style.display = 'none'
                    document.getElementById("recuperado").style.display = 'block'
                    // console.log(resp.data)
                })
                .catch(err => {
                    alert('Datos incorrectos, el Usurio no existe')
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }
    //----------------HANDLE CHANGE--------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //----------------------------------------------
    // console.log(password)
    return (
        <>
            <Container maxWidth={false} className={classes.spacingHead}>
                {isMatch
                    ? <div align='right'><DrawerMenuPublic /></div>
                    : <div>
                        <nav id='menu-public'>
                            <Link to='/'>INICIO</Link>
                            <Link to='/informacion'>INFORMACION</Link>
                            <Link to="/consultas">CONSULTAS</Link>
                            <PublicMainMenu />
                        </nav>
                    </div>
                }
            </Container>
            <Container maxWidth='xs'>
                <Paper component={Box} p={2} id='password'>
                    <Typography align='center' variant='h6' className={classes.spacingBot}>INRODUSCA LOS DATOS</Typography>
                    {/* <form onSubmit={postPassword}> */}
                    <form onSubmit={getPassword}>
                        <Grid container>
                            <TextField
                                name='ciPass'
                                label='Cedula de Indentidad'
                                variant='outlined'
                                size='small'
                                fullWidth
                                className={classes.spacingBot}
                                onChange={handleChange}
                            />
                            <TextField
                                name='namePass'
                                label='Nombre'
                                variant='outlined'
                                size='small'
                                fullWidth
                                className={classes.spacingBot}
                                onChange={handleChange}
                            />
                            {/* <TextField
                                name='lastNamePPass'
                                label='Apellido Paterno'
                                variant='outlined'
                                size='small'
                                fullWidth
                                className={classes.spacingBot}
                                onChange={handleChange}
                            />
                            <TextField
                                name='lastNameMPass'
                                label='Apellido Materno'
                                variant='outlined'
                                size='small'
                                fullWidth
                                className={classes.spacingBot}
                                onChange={handleChange}
                            /> */}
                            <TextField
                                name='emailPass'
                                label='Correo Electronico'
                                variant='outlined'
                                size='small'
                                type='email'
                                fullWidth
                                className={classes.spacingBot}
                                onChange={handleChange}
                            />
                            {/* <TextField
                                name='contraPass'
                                label='Contraseña'
                                variant='outlined'
                                size='small'
                                type='password'
                                fullWidth
                                className={classes.spacingBot}
                                onChange={handleChange}
                            /> */}
                        </Grid>
                        {/* <a href="mailto:alextufielamigo@gmail.com">contactame</a> */}
                        <Grid container className={classes.spacingBot}>
                            <Button variant='contained' color='primary' size='small' fullWidth type='submit'>Enviar</Button>
                        </Grid>
                    </form>
                </Paper>
                {/*---------------------MOSTRAR CONTRASEÑA--------------------------*/}
                <Paper component={Box} p={2} id='recuperado' style={{ display: 'none' }}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>INFORMACION OBTENIDA</Typography>
                    <Typography variant='subtitle2' className={classes.spacingBot}>Nombre de Usuario: {password.user}</Typography>
                    <Typography variant='subtitle2' className={classes.spacingBot}>Contraseña: {password.password}</Typography>
                    <Grid container justifyContent='center'>
                        <Button variant='contained' style={{background:'green',color:'white'}} size='small' fullWidth component={Link} to='/'>volver</Button>
                    </Grid>
                </Paper>
            </Container>

        </>
    )
}

export default RecuperarPass
