import { Container, Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import React from 'react'

const ControlPermisos = () => {
    return (
        <Container maxWidth='lg'>
            <Typography align='center' variant='h4' style={{marginTop:'5rem'}}>Control de Permisos</Typography>
            <Container maxWidth='md'>
                <MaterialTable>
                    
                </MaterialTable>
            </Container>
        </Container>
    )
}

export default ControlPermisos
