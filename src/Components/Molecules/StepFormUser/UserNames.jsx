import { Button, Container, TextField, Typography } from '@material-ui/core'
import React from 'react'

const UserNames = (props) => {
    const {username, password, email}=props.formData
    return (
        <Container style={{marginTop:'5rem'}} maxWidth='xs'>
            <Typography variant='h4' style={{paddingTop:'2rem'}} align='center'>Crear Cuenta</Typography>
            <TextField
                label='Nombre de Usuario'
                name='username'
                value={username}
                onChange={props.setFormData}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth
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
            />
            <Button
                variant='contained'
                fullWidth
                color='primary'
                style={{marginTop:'1.5rem'}}
                onClick={()=>props.navigation.next()}
            >Next</Button>
        </Container>
    )
}

export default UserNames
