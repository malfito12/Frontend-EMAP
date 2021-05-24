import React from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'

const UserDates = (props) => {
    const {sexo, rols}=props.formData
    return (
        <Container style={{marginTop:'5rem'}} maxWidth='xs'>
            <Typography variant='h4' style={{paddingTop:'2rem'}} align='center'>Datos Personales</Typography>
            <TextField
                label='Sexo'
                name='sexo'
                value={sexo}
                onChange={props.setFormData}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth
            />
            <TextField
                label='Roles'
                name='rols'
                value={rols}
                onChange={props.setFormData}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth
            />
            <div style={{marginTop:'1rem'}}>
            <Button 
                color='secondary' 
                variant='contained'
                style={{marginRight:'1rem', marginLeft:'7rem'}}
                onClick={()=>props.navigation.previous()}
            >Back</Button>
            <Button 
                color='primary' 
                variant='contained'
                onClick={()=>props.navigation.next()}
            >Next</Button>
            </div>
        </Container>
    )
}

export default UserDates
