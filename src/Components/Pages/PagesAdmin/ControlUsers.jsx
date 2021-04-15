import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'

const ControlUsers = () => {
    return (
        <Container fixed>
            <Typography variant='h4' align='center' style={{marginTop:'1.5rem'}}>Lista de Usuarios</Typography>
            <Button variant='contained' color='primary' href='/registeruser'>Registrar Usuario</Button>
        </Container>
    )
}

export default ControlUsers
