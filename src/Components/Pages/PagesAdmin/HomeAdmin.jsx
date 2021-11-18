import { Button, Paper, Container, Grid, makeStyles, Typography, CircularProgress, Backdrop } from '@material-ui/core'
import axios from 'axios'
// import React, { useState } from 'react'
import ReactFileReader from 'react-file-reader'
import { Link } from 'react-router-dom'
import { PORT_URL } from '../../../PortURL'
import espacio3 from '../../../images/espacio3.jpg'
import espacio4 from '../../../images/espacio4.jpg'
import espacio5 from '../../../images/espacio5.jpg'
import { useState } from 'react'


const useStyles = makeStyles((theme) => ({
    root1: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        // height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        width: 300,
        height: 200
    },
    root2: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        // height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        width: 300,
        height: 200
    },
    root3: {
        background: 'linear-gradient(45deg, #00897b 30%, #4db6ac 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        // height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        width: 300,
        height: 200
    },
    label: {
        textTransform: 'capitalize',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}))
var data;
const HomeAdmin = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [progress,setProgress]=useState(0)
    // const [openDialog, setOpenDialog] = useState(false)

    // const openCloseDialogUpdate = () => {
    //     setOpenDialog(!openDialog)
    // }
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
                if (tmp2 != undefined) {
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
            carga=i/nuevo
            carga=carga*100
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
    //-------OPSION 2-----------------
    // const abrirArchivo = e => {
    //     try {
    //         var array = []
    //         let archivo = e.target.files[0];
    //         if (archivo) {
    //             let reader = new FileReader();
    //             reader.onload = e => {
    //                 let contenido = e.target.result
    //                 let uno = contenido.split("\n")
    //                 let dos;
    //                 let tres;
    //                 const conta = uno.length
    //                 for (var i = 0; i < conta; i++) {
    //                     dos = uno[i].trim().split("\t")
    //                     tres = dos[1].split(" ")
    //                     array.push({
    //                         id_bio: dos[0],
    //                         fecha: tres[0],
    //                         hora: tres[1],
    //                     })
    //                     // console.log(dos)
    //                 }
    //                 console.log(array)
    //                 document.getElementById('contenido2').innerText = contenido;
    //             }
    //             reader.readAsText(archivo)
    //         } else {
    //             alert('no hay archivo')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // window.addEventListener('load', () => {
    //     document.getElementById('archivoTexto').addEventListener('change', abrirArchivo);
    // })
    //--------------------------------------
    // console.log(progress)
    return (
        <>
            <Container fixed style={{ paddingTop: '5rem' }}>
                {/* <Container fixed > */}
                <Typography align='center' variant='h5' style={{ marginBottom: '2rem' }}>ADMINISTRACION</Typography>
                <Container maxWidth='lg' align='center' style={{ marginBottom: '2rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={8} sm={4}>
                            <Button component={Link} to='/controluser' style={{ marginBottom: '1rem' }} classes={{ root: classes.root1, label: classes.label }}>USUARIOS</Button>
                            <Paper style={{ width: 300, height: 200 }}>
                                <Button component={Link} to='/controlHorarios' >
                                    <img src={espacio3} style={{ width: 280, height: 185, position: 'relative', display: 'inline-block' }} alt="#" />
                                    <div style={{ position: 'absolute', fontSize: '15px', color: 'white' }}>HORARIOS</div>
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Button component={Link} to='/controlEmp' style={{ marginBottom: '1rem' }} classes={{ root: classes.root2, label: classes.label }}>EMPLEADOS</Button>
                            <Paper style={{ width: 300, height: 200 }}>
                                <Button component={Link} to='/kardexPreRevision' >
                                    <img src={espacio4} style={{ width: 280, height: 185, position: 'relative', display: 'inline-block' }} alt="#" />
                                    <div style={{ position: 'absolute', fontSize: '15px', color: 'white' }}>ASISTENCIAS</div>
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Button component={Link} to='/registerCargo' style={{ marginBottom: '1rem' }} classes={{ root: classes.root3, label: classes.label }}>CARGOS</Button>
                            <Paper style={{ width: 300, height: 200 }}>
                                <Button component={Link} to='/controlPermisos' >
                                    <img src={espacio5} style={{ width: 280, height: 185, position: 'relative', display: 'inline-block' }} alt="#" />
                                    <div style={{ position: 'absolute', fontSize: '15px', color: 'white' }}>PERMISOS</div>
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                {/* <Button variant='contained' color='primary'>
            <input type='file'  onChange={(e)=>hadle(e)}></input>
            </Button> */}
                <Typography align='center' style={{ marginBottom: '2rem' }} variant='h5'>Subir Informacion a la base de datos</Typography>
                <Container style={{ width: 200 }} align='center' >
                    <span id='contenido'></span>
                    <ReactFileReader handleFiles={hadle} fileTypes={'.dat'} elementId='archivo' >
                        <Button style={{ marginBottom: '1rem' }} type='button' variant='contained' color='primary'>Cargar archivo</Button>
                    </ReactFileReader>
                    <Button onClick={confirmar} variant='contained' style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', marginBottom: '2rem' }}>Subir Datos</Button>
                </Container>

                {/*----------------OPSION 2----------------------------*/}
                {/* <input type='file' id="archivoTexto" />
                <textarea id='contenido2' cols='30' rows='10'></textarea> */}

            </Container>

            {/* <Button type='button' onClick={nuevo} variant='contained' style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>Aceptar</Button>

        <Dialog
            maxWidth='sm'
            open={openDialog}
            onClose={openCloseDialogUpdate}
        >
            <Typography variant='h5' style={{marginLeft:'3rem',marginRight:'3rem',marginTop:'1rem', marginBottom:'1rem'}} >¿Quieres Subir los datos al servidor?</Typography>
            <div style={{marginBottom:'2rem'}} align='center'>
            <Button onClick={e => postAsistencia(e)} defaultValue={true} variant='contained' style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>Aceptar</Button>
            <Button onClick={openCloseDialogUpdate}  variant='contained' style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', marginLeft: '1rem' }}>Cancelar</Button>
            </div>
        </Dialog> */}
            <Backdrop className={classes.backdrop} open={loading} onClick={closeLoading}>
                <CircularProgress color='inherit' variant='determinate' value={progress} />
            </Backdrop>
        </>
    )
}

export default HomeAdmin
