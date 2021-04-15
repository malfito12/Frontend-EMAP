import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'

const UserSubmit = () => {
    return (
        <Container maxWidth='sm' syle={{marginTop: '4rem'}}>
            <div>
            <Typography variant='h4' style={{paddingTop:'2rem'}} align='center'>Felicidades, tu cuenta a sido registrada</Typography>
            </div>
            <div>
            <Button variant='contained' color='primary' href='/controluser' >Pagina Princial</Button>
            </div>
        </Container>
    )
}

export default UserSubmit

