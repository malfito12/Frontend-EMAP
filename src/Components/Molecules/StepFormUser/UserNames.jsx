import { Button, Box, Container, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import {Link} from 'react-router-dom'

const UserNames = (props) => {
    const { username, password, email } = props.formData
    return (
        <Container style={{ paddingTop: '5rem' }} maxWidth='sm'>
            <Typography variant='h4' style={{ paddingTop: '2rem', marginBottom: '1rem' }} align='center'>Crear Cuenta</Typography>
            <Paper component={Box} p={2} elevation={10}>
                <TextField
                    label='Nombre de Usuario'
                    name='username'
                    value={username}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                />
                <TextField
                    label='Contraseña'
                    name='password'
                    type='password'
                    value={password}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                />
                <TextField
                    label='Correo Electronico'
                    name='email'
                    type='email'
                    value={email}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                />
                <div style={{ marginTop: '1.5rem' }} align='center'>
                    <Button
                        variant='contained'
                        color='primary'
                        style={{marginRight:'1rem'}}
                        onClick={() => props.navigation.next()}
                    >Next</Button>
                    <Button component={Link} to='/controluser' variant='contained' color='secondary'>atras</Button>
                </div>
            </Paper>
        </Container>
    )
}

export default UserNames
