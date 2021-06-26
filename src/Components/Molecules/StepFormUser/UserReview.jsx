import { Accordion, Box, AccordionDetails, AccordionSummary, Button, Container, Dialog, IconButton, ListItemText, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../PortURL'


const UserReview = (props) => {
    const [error, setError] = useState(false)
    const { go } = props.navigation
    const {
        username,
        password,
        email,
        sexo,
        rols
    } = props.formData
    console.log(props.formData)

    const openCloseModalError = () => {
        setError(!error)
    }
    const postUser = async () => {
        if (props.formData.username && props.formData.password && props.formData.email
            && props.formData.sexo && props.formData.rols) {
            await axios.post(`${PORT_URL}user`, props.formData)
                .then(resp => console.log(resp.data))
                .catch(err => console.log(err))
            go('submit')
        } else {
            openCloseModalError()
        }

    }
    return (<>
        <Container style={{ paddingTop: '5rem' }} maxWidth='sm'>
            <Typography variant='h4' style={{ paddingTop: '2rem' }} align='center'>Vista de Cuenta</Typography>

            <RenderAccordion
                sum={<Typography>Informacion de Cuenta</Typography>}
                summary='Names'
                go={go}
                details={[
                    { 'Nombre Usuario': username },
                    { 'Contraseña': password },
                    { 'Correo Electronico': email }
                ]}
            />
            <RenderAccordion
                sum={<Typography>Datos Personales</Typography>}
                summary='Dates'
                go={go}
                details={[
                    { 'Sexo': sexo },
                    { 'Roles': rols }
                ]}
            />
            <div style={{ marginTop: '1.5rem' }} align='center'>
                <Button
                    color='primary'
                    variant='contained'
                    style={{ marginRight: '1rem' }}
                    onClick={postUser}
                // onClick={()=>go('submit')}
                >Registrar</Button>
                <Button
                    component={Link}
                    color='secondary'
                    variant='contained'
                    to='/controluser'
                >Cancelar</Button>
            </div>
        </Container>
        <Dialog
            open={error}
            onClose={openCloseModalError}
            maxWidth='sm'
        >
            <Paper component={Box} p={2}>
                <Typography variant='button' color='secondary' onClick={openCloseModalError}>Por favor llene todos los datos</Typography>
            </Paper>
        </Dialog>
    </>
    )
}

export default UserReview

export const RenderAccordion = ({ sum, summary, details, go }) => (
    <Accordion defaultExpanded>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >{sum}</AccordionSummary>
        <AccordionDetails>
            <div>
                {details.map((data, index) => {
                    const objKeys = Object.keys(data)[0]
                    const objValues = data[Object.keys(data)[0]]
                    return <ListItemText key={index}>{`${objKeys}: ${objValues}`}</ListItemText>
                })}
                <IconButton
                    color='primary'
                    component='span'
                    onClick={() => go(`${summary.toLowerCase()}`)}
                ><EditIcon /></IconButton>
            </div>
        </AccordionDetails>
    </Accordion>
)

