import React, { useState } from 'react'
import { Typography, Container, Grid, Tabs, Tab } from '@material-ui/core'
import { Link } from 'react-router-dom'

const UserControlHorario = () => {

    //----------------SCROLL---------------------------------
    const [scroll, setScroll] = useState(2)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid container item xs={12} sm={6} justifyContent='center'>
                    <Tabs
                        style={{ background: 'white', borderRadius: 5, marginBottom: '2rem' }}
                        value={scroll}
                        onChange={scrollChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        <Tab label='Personal' component={Link} to='/userControlEmp' />
                        <Tab label='Cargos' component={Link} to='/userControlCargo' />
                        <Tab label='Horarios' />
                    </Tabs>
                </Grid>
            </Container>
        </>
    )
}

export default UserControlHorario
