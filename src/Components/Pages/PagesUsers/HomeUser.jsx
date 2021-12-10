import React from 'react'
import { Backdrop, Box, Button, CircularProgress, Container, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import asistencias from '../../../images/imagesMenu/asistencias.png'
import empleados from '../../../images/imagesMenu/empleados.png'
import configuracion from '../../../images/imagesMenu/configuracion.png'
import justificaciones from '../../../images/imagesMenu/justificaciones.png'
import memorando from '../../../images/imagesMenu/memorando.png'
import planillaBono from '../../../images/imagesMenu/planillaBono.png'
import planillaSueldos from '../../../images/imagesMenu/planillaSueldos.png'
import reportes from '../../../images/imagesMenu/reportes.png'
import { useState } from 'react'
import { PORT_URL } from '../../../PortURL'
import axios from 'axios'
import ReactFileReader from 'react-file-reader'


const useStyles = makeStyles((theme) => ({
    label: {
        textTransform: 'capitalize',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    sizeHomeAdmin: {
        justifyContent: "space-evenly",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    spacingBot: {
        marginBottom: '1rem'
    }
}))

var data;
const HomeUser = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    //---------------LOADING------------
    const openLoading = () => {
        setLoading(true)
    }
    const closeLoading = () => {
        setLoading(false)
    }
    //-----------------------------------------------------
    const hadle = files => {
        const reader = new FileReader()
        var array = []
        var tmp;
        var tmp2;
        var tmp3;
        reader.onload = () => {
            var texto = reader.result
            var lines = texto.split("\n")
            for (var i in lines) {
                // for (var i = 0; i < lines.length; i++) {
                tmp = lines[i].trim().split("\t")
                tmp2 = tmp[1]
                if (tmp2 !== undefined) {
                    tmp3 = tmp2.split(" ")
                    array.push({
                        id_bio: tmp[0],
                        fecha: tmp3[0],
                        hora: tmp3[1]
                    })
                }
            }
            data = array
            // console.log(data)
            var nombre = document.getElementById('archivo').files[0].name
            document.getElementById('contenido').innerHTML = "Archivo : " + nombre + " cargado"
        }
        reader.readAsText(files[0])
    }
    const postAsistencia = async (e) => {
        e.preventDefault()
        const nuevo = data.length
        openLoading()
        var carga;
        for (var i = 0; i < nuevo; i++) {
            carga = i / nuevo
            carga = carga * 100
            setProgress(carga)
            await axios.post(`${PORT_URL}asistencia`, data[i])
                .then(resp => {
                    // console.log(resp.data)
                })
                .catch(err => console.log(err))
            if (i >= nuevo - 1) {
                closeLoading()
                // return alert('informacion subida al servidor')
            }
            console.log(data[i])
        }
    }
    const confirmar = (e) => {
        const a = window.confirm('¿deseas subir los datos?')
        if (a === true) {
            postAsistencia(e)
        }
    }
    //---------------------------------------------
    return (
        <>
            <Container maxWidth={false}>
                <Typography variant='h5' align='center' style={{ paddingTop: '5rem', marginBottom: '2rem' }}>Administracion Usuario</Typography>
                <Container maxWidth='lg' align='center' style={{ marginBottom: '2rem' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <Grid container spacing={2} className={classes.sizeHomeAdmin} >
                            {/* <Box>
                                <IconButton component={Link} to="/controluser">
                                    <img src={user} alt="#" />
                                </IconButton>
                                <Typography>USUARIOS</Typography>
                            </Box> */}
                            <Box>
                                <IconButton component={Link} to="/userControlEmp">
                                    <img src={empleados} alt="#" />
                                </IconButton>
                                <Typography>PERSONAL</Typography>
                            </Box>
                            <Box>
                                <IconButton component={Link} to="/kardexPreRevision">
                                    <img src={asistencias} alt="#" />
                                </IconButton>
                                <Typography>ASISTENCIAS</Typography>
                            </Box>
                            <Box>
                                <IconButton component={Link} to="/userControlPermiso">
                                    <img src={justificaciones} alt="#" />
                                </IconButton>
                                <Typography>PERMISOS</Typography>
                            </Box>
                            <Box>
                                <IconButton component={Link} to="/generalConfig">
                                    <img src={configuracion} alt="#" />
                                </IconButton>
                                <Typography>DATOS GENERALES</Typography>
                            </Box>
                        </Grid>
                    </div>
                    <div style={{ marginBottom: '3rem' }}>
                        <Grid container spacing={2} className={classes.sizeHomeAdmin} >
                            <Box>
                                <IconButton component={Link} to="/sueldosPreRevision">
                                    <img src={planillaSueldos} alt="#" />
                                </IconButton>
                                <Typography>PLANILLA SUELDOS</Typography>
                            </Box>
                            <Box>
                                <IconButton component={Link} to="/reportePersonal">
                                    <img src={reportes} alt="#" />
                                </IconButton>
                                <Typography>REPORTES</Typography>
                            </Box>
                            <Box>
                                <IconButton component={Link} to="/refrigerioPreRevision">
                                    <img src={planillaBono} alt="#" />
                                </IconButton>
                                <Typography>PLANILLA TE-REFRIGERIO</Typography>
                            </Box>
                            <Box>
                                <IconButton component={Link} to="/memorandums">
                                    <img src={memorando} alt="#" />
                                </IconButton>
                                <Typography>MEMORANDO</Typography>
                            </Box>
                            
                        </Grid>
                    </div>
                </Container>
                <Typography align='center' style={{ marginBottom: '2rem' }} variant='h5'>Subir Informacion a la base de datos</Typography>
                <Container style={{ width: 200 }} align='center' >
                    <span id='contenido'></span>
                    <ReactFileReader handleFiles={hadle} fileTypes={'.dat'} elementId='archivo' >
                        <Button style={{ marginBottom: '1rem' }} type='button' variant='contained' color='primary'>Cargar archivo</Button>
                    </ReactFileReader>
                    <Button onClick={confirmar} variant='contained' style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', marginBottom: '2rem' }}>Subir Datos</Button>
                </Container>
            </Container>
            <Backdrop className={classes.backdrop} open={loading} onClick={closeLoading}>
                <CircularProgress color='inherit' variant='determinate' value={progress} />
            </Backdrop>
        </>
    )
}

export default HomeUser

