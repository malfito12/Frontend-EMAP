// import { Box, Button, Container, FormControl, Grid, makeStyles, Paper, Radio, TextField, Typography } from '@material-ui/core'
// import axios from 'axios'
// import React, { useState } from 'react'
// import { PORT_URL } from '../../../PortURL'
// import loginimage from '../../../images/loginimage.png'
// import {Link} from 'react-router-dom'


// const useStyles = makeStyles((theme) => ({
//     root: {
//         marginTop: '5rem',
//         background: 'linear-gradient(45deg, #424242 30%, #757575 90%)',
//         color: 'white',
//         borderRadius: 10
//     },
//     alineation: {
//         width: '70%',
//         paddingBottom: 30
//     },
//     alineation2: {
//         paddingTop: 50,
//         paddingBottom: 30

//     },
//     typography: {
//         fontFamily: "Dubai Medium"
//     },

//     paper: {
//         backgroundColor: theme.palette.background.paper,
//         // border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }))

// const Login = () => {
//     const classes = useStyles()
//     const [login, setLogin] = useState({
//         form: {
//             email: '',
//             password: '',
//             rols: 'usuario'
//         }
//     })
//     const handleChange = e => {
//         setLogin({
//             form: {
//                 ...login.form,
//                 [e.target.name]: e.target.value
//             }
//         })
//     }
//     const iniciarSesion = async (e) => {
//         e.preventDefault()
//         const data = {
//             'email': login.form.email,
//             'password': login.form.password,
//             'rols': login.form.rols
//         }
//         await axios.post(`${PORT_URL}login`, data)
//             .then(resp => {
//                 localStorage.setItem('token', resp.data.token);
//                 if (login.form.rols === 'admin') {
//                     localStorage.setItem('rols', login.form.rols);
//                     window.location = '/homeadmin'
//                 } else if (login.form.rols === 'usuario') {
//                     localStorage.setItem('rols', login.form.rols);
//                     window.location = '/homeuser'
//                 }
//                 // alert('usuario logeado')
//             })
//             .catch(err => {
//                 alert('no se pudo iniciar sesion')
//                 console.log(err)
//             })

//     }
//     return (
//         <>
//         <Button variant='contained' component={Link} to='/homepublic'  color='primary'>login</Button>
//             <Container maxWidth='sm'>
//                 <div align='center'>
//                     <Paper className={classes.root} component={Box} p={3}>
//                         <img src={loginimage} style={{ width: '20%', }} alt="#"/>
//                         <form onSubmit={e => iniciarSesion(e)}>
//                             <Typography variant='h4' align='center' style={{ marginBottom: '1.5rem' }} >Iniciar Sesion</Typography>
//                             <Grid item container direction='column' xs={12} sm={12}>
//                                 <FormControl>
//                                     <div>
//                                         <TextField
//                                             type='email'
//                                             name='email'
//                                             variant='outlined'
//                                             // label='Correo Electronico'
//                                             placeholder='Correo Electronico'
//                                             size='small'
//                                             onChange={e => handleChange(e)}
//                                             style={{ minWidth: '100%', marginBottom: '1.5rem', backgroundColor: 'white', borderRadius: 5 }}
//                                         />
//                                     </div>
//                                     <div>
//                                         <TextField
//                                             type='password'
//                                             name='password'
//                                             variant='outlined'
//                                             // label='Contraseña'
//                                             placeholder='Contraseña'
//                                             size='small'
//                                             onChange={e => handleChange(e)}
//                                             style={{ minWidth: '100%', marginBottom: '1.5rem', backgroundColor: 'white', borderRadius: 5 }}
//                                         />
//                                     </div>
//                                     <div>
//                                         <div>
//                                             <span className={classes.typography}>Usuario</span>
//                                             <Radio
//                                                 name='rols'
//                                                 value='usuario'
//                                                 // color='primary'
//                                                 checked={login.form.rols === 'usuario'}
//                                                 onChange={e => handleChange(e)}
//                                                 style={{ color: 'white' }}
//                                             />
//                                         </div>
//                                         <div>
//                                             <span className={classes.typography}>Administrador</span>
//                                             <Radio
//                                                 name='rols'
//                                                 value='admin'
//                                                 // color='primary'
//                                                 onChange={e => handleChange(e)}
//                                                 checked={login.form.rols === 'admin'}
//                                                 style={{ color: 'white' }}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <Button type='submit' variant='contained' color='primary' style={{ marginTop: '2rem' }}>Iniciar Sesion</Button>
//                                     </div>
//                                 </FormControl>
//                             </Grid>
//                         </form>
//                     </Paper>
//                 </div>
//             </Container>
//         </>
//     )
// }

// export default Login
