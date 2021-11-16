import { Container, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import DrawerMenuPublic from '../../Organismsm/PublicMenu/DrawerMenuPublic'
import PublicMainMenu from '../../Organismsm/PublicMenu/PublicMainMenu'

const InformacionEMAP = () => {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <>
            <Container maxWidth={false}>
                {isMatch
                    ? <div align='right'><DrawerMenuPublic /></div>
                    : <div>
                        <nav id='menu-public'>
                            <Link to='/'>INICIO</Link>
                            <Link to='/informacion'>INFORMACION</Link>
                            <Link to="/consultas">CONSULTAS</Link>
                            <PublicMainMenu />
                        </nav>
                    </div>
                }
            </Container>
            <Container style={{paddingTop:'1.5rem'}}>
                <Typography align='center' variant='h5'>INFORMACION DE EMAP</Typography>
            </Container>
        </>
    )
}

export default InformacionEMAP
