import { Button, Container, Dialog, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../PortURL'
import AlertEdit from '../../Atoms/Alerts/AlertEdit'
import AlertDelete from '../../Atoms/Alerts/AlertDelete'

const useStyles = makeStyles((theme) => ({
    alineation: {
        width: '93%',
        paddingBottom: 10,
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    nose: {
        marginTop: '1rem',
        marginBottom: '1.5rem',
        marginLeft: '10rem',
        marginRight: '10rem'
    }
}))

const ControlUsers = () => {
    const classes = useStyles()
    const [user, setUser] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openAlertDelete, setOpenAlertDelete] = useState(false)
    const [openAlertEdit, setOpenAlertEdit] = useState(false)
    
    const [changeData, setChangeData] = useState({
        username: '',
        password: '',
        email: '',
        rols: '',
        sexo: '',
        // tableData:false
    })
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        await axios.get(`${PORT_URL}user`, {
            headers:
                { 'Authorization': localStorage.getItem('token') }
        })
            .then(resp => {
                setUser(resp.data)
            })
    }
    //----------------------------------------------------------------------
    //EDITAR USUARIO
    const editUser = async (e) => {
        e.preventDefault()
        const otroid = changeData._id
        // console.log(otroid)
        await axios.put(`${PORT_URL}user/${otroid}`, changeData)
            .then(resp => console.log(resp.data))
        setOpenEdit(false)
        openCloseAlertEdit()

        getUser()
    }
    const openModalEdit = (ele) => {
        setChangeData(ele);
        setOpenEdit(true)
    }
    const closeModalEdit = () => {
        setOpenEdit(false)
    }
    
    //----------------------------------------------------------------------
    //ELIMINAR USUARIO
    const deleteUser = async () => {
        const id = changeData._id
        await axios.delete(`${PORT_URL}user/${id}`)
            .then(resp => console.log(resp.data))
        closeModalDelete()
        openCloseAlertDelete()
        getUser()

    }
    
    const openModalDelete = (ele) => {
        setChangeData(ele);
        setOpenDelete(true)
    }
    const closeModalDelete = () => {
        setOpenDelete(false)
    }
    //----------------------------------------------------------------------

    const handleChange = e => {
        const { name, value } = e.target;
        setChangeData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    //------------------------------------------------------------------------
    //ALERT
    const openCloseAlertDelete = () => {
        setOpenAlertDelete(!openAlertDelete)
    }
    const openCloseAlertEdit = () => {
        setOpenAlertEdit(!openAlertEdit)
    }
    const columnas = [
        { title: 'Name', field: 'username' },
        { title: 'Email', field: 'email' },
        { title: 'Sexo', field: 'sexo' },
        { title: 'Rol', field: 'rols' },
    ]
    
    // console.log(changeData)
    return (<>
        <Container style={{ paddingTop: '5rem' }} fixed>
            <Typography variant='h4' align='center' style={{ marginTop: '1.5rem' }}>Lista de Usuarios</Typography>
            <Button component={Link} to='/registeruser' variant='contained' color='primary'>Registrar Usuario</Button>
            <Container maxWidth='md' style={{ marginTop: '2rem' }}>
                <MaterialTable
                    title='Lista de Usuarios'
                    data={user}
                    columns={columnas}
                    options={{
                        headerStyle: {
                            backgroundColor: '#1a237e',
                            color: '#FFF'
                        },
                        actionsColumnIndex: -1
                    }}

                    actions={[
                        {
                            icon: 'edit',
                            iconProps: { style: { color: 'green' } },
                            tooltip: 'editar',
                            onClick: (e, rowData) => openModalEdit(rowData)
                        },
                        {
                            icon: 'delete',
                            iconProps: { style: { color: 'red' } },
                            tooltip: 'eliminar',
                            onClick: (e, rowData) => openModalDelete(rowData)
                        }
                    ]}
                    localization={{
                        header: {
                            actions: 'Acciones'
                        }
                    }}
                ></MaterialTable>
            </Container>
        </Container>
        <Dialog
            maxWidth='sm'
            open={openEdit}
            onClose={closeModalEdit}
        >
            <form onSubmit={editUser}>
                <Typography variant='h6' align='center' className={classes.nose}>Añadir usuario</Typography>
                <div className={classes.alineation}>
                    <TextField
                        variant="outlined"
                        name='username'
                        label='Nombre'
                        onChange={handleChange}
                        defaultValue={changeData && changeData.username}
                        className={classes.alineation} />

                </div>

                <div className={classes.alineation}>
                    <TextField
                        variant="outlined"
                        name='email'
                        type='email'
                        label='Correo Electronico'
                        onChange={handleChange}
                        defaultValue={changeData && changeData.email}
                        className={classes.alineation} />

                </div>
                <div className={classes.alineation}>
                    <TextField
                        variant="outlined"
                        name='password'
                        type='password'
                        label='Contraseña'
                        onChange={handleChange}
                        defaultValue={changeData && changeData.password}
                        className={classes.alineation} />

                </div>
                <div className={classes.alineation}>
                    <TextField
                        variant="outlined"
                        select
                        name='rols'
                        label='Rol'
                        onChange={handleChange}
                        value={changeData&&changeData.rols}
                        className={classes.alineation}>
                        <MenuItem value={'usuario'}>Usuario</MenuItem>
                        <MenuItem value={'admin'}>Administrador</MenuItem>
                    </TextField>

                </div>
                <div className={classes.alineation}>
                    <TextField
                        variant="outlined"
                        name='sexo'
                        label='Sexo'
                        onChange={handleChange}
                        defaultValue={changeData && changeData.sexo}
                        className={classes.alineation} />

                </div>

                <div style={{ marginBottom: '2rem' }} align='center'>
                    <Button type='submit' variant='contained' color='primary'>aceptar</Button>
                    <Button variant='contained' color='secondary' style={{ marginLeft: '2rem' }} onClick={closeModalEdit}>cancelar</Button>

                </div>
            </form>
        </Dialog>
        <Dialog
            maxWidth='sm'
            open={openDelete}
            onClose={closeModalDelete}
        >
            <Typography align='center' style={{ marginLeft: '3rem', marginRight: '3rem', marginTop: '1rem', marginBottom: '1rem' }} variant='h6'>estas seguro de borrar a {changeData && changeData.username} </Typography>
            <div style={{ marginBottom: '2rem' }} align='center'>
                <Button onClick={deleteUser} variant='contained' color='primary'>aceptar</Button>
                <Button variant='contained' style={{ marginLeft: '2rem', backgroundColor: 'red', color: 'white' }} onClick={closeModalDelete}>cancelar</Button>

            </div>
        </Dialog>
        <AlertDelete name={changeData.username} open={openAlertDelete} onClose={openCloseAlertDelete} />
        <AlertEdit name={changeData.username} open={openAlertEdit} onClose={openCloseAlertEdit} />
    </>
    )
}

export default ControlUsers
