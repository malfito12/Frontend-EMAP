import { Accordion, AccordionDetails, AccordionSummary, Button, Container, IconButton, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {PORT_URL} from '../../../PortURL'


const UserReview = (props) => {
    const {go}=props.navigation
    const {
        username,
        password,
        email,
        sexo,
        rols
    }=props.formData
    console.log(props.formData)

    const postUser=async()=>{
        await axios.post(`${PORT_URL}user`,props.formData)
        .then(resp=>console.log(resp.data))
        .catch(err=>console.log(err))
        go('submit')
    }
    return (
        <Container style={{marginTop:'5rem'}} maxWidth='sm'>
            <Typography variant='h4' style={{paddingTop:'2rem'}} align='center'>Vista de Cuenta</Typography>
            
            <RenderAccordion
                sum={<Typography>Informacion de Cuenta</Typography>}
                summary='Names'
                go={go}
                details={[
                    {'Nombre Usuario': username},
                    {'Contraseña': password},
                    {'Correo Electronico': email}
                ]}
            />
            <RenderAccordion
                sum={<Typography>Datos Personales</Typography>}
                summary='Dates'
                go={go}
                details={[
                    {'Sexo': sexo},
                    {'Roles': rols}
                ]}
            />
            <div style={{marginTop:'1.5rem'}} align='center'>
                <Button
                    color='primary'
                    variant='contained'
                    style={{marginRight:'1rem'}}
                    onClick={postUser}
                    // onClick={()=>go('submit')}
                >Enviar</Button>
                <Button
                    component={Link}
                    color='secondary'
                    variant='contained'
                    to='/controluser'
                >Cancelar</Button>
            </div>
            
            
            
        </Container>
    )
}

export default UserReview

export const RenderAccordion=({sum, summary, details, go})=>(
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >{sum}</AccordionSummary>
        <AccordionDetails>
            <div>
                {details.map((data,index)=>{
                    const objKeys=Object.keys(data)[0]
                    const objValues=data[Object.keys(data)[0]]
                    return <ListItemText key={index}>{`${objKeys}: ${objValues}`}</ListItemText>
                })}
                <IconButton
                    color='primary'
                    component='span'
                    onClick={()=>go(`${summary.toLowerCase()}`)}
                ><EditIcon/></IconButton>
            </div>
        </AccordionDetails>
    </Accordion>
)

