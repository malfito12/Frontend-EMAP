import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const UserSubmit = () => {
    
    return (
        <Container  maxWidth='sm' style={{marginTop: '5rem'}}>
            <div>
            <Typography variant='h4' style={{paddingTop:'2rem'}} align='center'>Felicidades, tu cuenta a sido registrada</Typography>
            </div>
            <div>
            <Button component={Link} style={{marginTop: '5rem'}} variant='contained' color='primary' to='/controluser' >Pagina Princial</Button>
            </div>
        </Container>
    )
}

export default UserSubmit

