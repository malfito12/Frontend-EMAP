import React from 'react'
import { Button, Box, Container, Paper, TextField, Typography, MenuItem } from '@material-ui/core'

const UserDates = (props) => {
    const { sexo, rols } = props.formData
    console.log(props.formData)
    return (
        <Container style={{ paddingTop: '5rem' }} maxWidth='sm'>
            <Typography variant='h4' style={{ paddingTop: '2rem' }} align='center'>Datos Personales</Typography>
            <Paper component={Box} p={2} elevation={10}>
                <TextField
                    label='Sexo'
                    name='sexo'
                    value={sexo}
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                />
                <TextField
                    align='center'
                    label='Roles'
                    name='rols'
                    value={rols}
                    select
                    onChange={props.setFormData}
                    margin='normal'
                    variant='outlined'
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
