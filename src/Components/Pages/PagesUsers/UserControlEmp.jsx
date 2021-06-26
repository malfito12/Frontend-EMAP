import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, makeStyles, IconButton } from '@material-ui/core'
import axios from 'axios'
import { PORT_URL } from '../../../PortURL'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme) => ({
    spacingBott: {
        marginBottom: '1rem'
    }
}))
const UserControlEmp = (props) => {
    const classes = useStyles()
    const [empleado, setEmpleado] = useState([])

    useEffect(() => {
        (async () => {
            await axios.get(`${PORT_URL}empleado`)
                .then(resp => { setEmpleado(resp.data) })
                .catch(err => console.log(err))
        })()
    }, [])
    //----------------INFO EMPLEADO---------------------------------
    const { history } = props
    const infoEmpleado=(e)=>{
        const id=e._id
        const id_bio=e.id_bio
        history.push('/infoEmp/'+id+"/"+id_bio)

    }
    console.log(empleado)
    return (
        <Container maxWidth={false}>
            <Typography variant='h5' align='center' style={{ paddingTop: '5rem' }} className={classes.spacingBott}>Personal de EMAP</Typography>
            <Container maxWidth='md'>
                <Paper>
                    <TableContainer style={{ maxHeight: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>ID Biometrico</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido P</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Apellido M</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Estado</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empleado &&
                                    empleado.map(e => (
                                        <TableRow key={e._id}>
                                            <TableCell>{e.id_bio}</TableCell>
                                            <TableCell>{e.firstNameEmp}</TableCell>
                                            <TableCell>{e.lastNameEmpP}</TableCell>
                                            <TableCell>{e.lastNameEmpM}</TableCell>
                                            {e.estadoEmp === 'activo'
                                                ? (<TableCell style={{ color: 'green' }}>{e.estadoEmp}</TableCell>)
                                                : (<TableCell style={{ color: 'red' }}>{e.estadoEmp}</TableCell>)
                                            }
                                            <TableCell>
                                                <div align='center'>
                                                    <IconButton size='small' onClick={()=>infoEmpleado(e)} >
                                                        <InfoIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </Container>
    )
}

export default UserControlEmp
