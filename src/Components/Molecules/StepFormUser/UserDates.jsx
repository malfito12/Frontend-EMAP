import React from 'react'
import { Button, Box, Container, Paper, TextField, Typography, MenuItem } from '@material-ui/core'

const UserDates = (props) => {
    const { sexo, rols,lastNameP,lastNameM,firstName,ciUser } = props.formData
    console.log(props.formData)
    return (
        <Container style={{ paddingTop: '5rem' }} maxWidth='sm'>
            <Typography variant='h4' style={{ paddingTop: '2rem' }} align='center'>Datos Personales</Typography>
            <Paper component={Box} p={2} elevation={10}>
                <TextField
                    label='Apellido Paterno'
                    name='lastNameP'
                    value={lastNameP}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    size='small'
                    required
                />
                <TextField
                    label='Apellido Materno'
                    name='lastNameM'
                    value={lastNameM}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    size='small'
                    required
                />
                <TextField
                    label='Nombres'
                    name='firstName'
                    value={firstName}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    size='small'
                    required
                />
                <TextField
                    label='Cedula de Identidad'
                    name='ciUser'
                    value={ciUser}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    size='small'
                    required
                />
                <TextField
                    label='Sexo'
                    name='sexo'
                    value={sexo}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    value={sexo}
                    size='small'
                    fullWidth
                    align='center'
                    required
                    select
                >
                    <MenuItem value='M'>Masculino</MenuItem>
                    <MenuItem value='F'>Femenino</MenuItem>
                </TextField>
                <TextField
                    align='center'
                    label='Roles'
                    name='rols'
                    value={rols}
                    select
                    size='small'
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    align='center'
                    autoComplete='off'
                    fullWidth
                    required
                >
                    <MenuItem value={'usuario'}>Usuario</MenuItem>
                    <MenuItem value={'admin'}>Administrador</MenuItem>
                </TextField>

                <div style={{ marginTop: '1rem' }} align='center'>
                    <Button
                        color='primary'
                        variant='contained'
                        style={{ marginRight: '1rem' }}
                        onClick={() => props.navigation.next()}
                    >Next</Button>
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={() => props.navigation.previous()}
                    >Back</Button>
                </div>
            </Paper>
        </Container>
    )
}

export default UserDates
