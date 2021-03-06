import { Container, Grid, Box, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, TextField, InputAdornment, Tooltip, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimerIcon from '@material-ui/icons/Timer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';
import SearchIcon from '@material-ui/icons/Search';
import PrintICon from '@material-ui/icons/Print'
import jsPDF from 'jspdf';

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    searchSize: {
        width: '40%',
        [theme.breakpoints.down("sm")]: {
            width: '80%'
        }
    },
    tableHead: {
        color: 'white',
        background: 'black',
        [theme.breakpoints.down('sm')]: {
            color: 'white',
            background: 'black',
            // fontSize: 'x-small',
            padding: 0,
            textAlign: 'center'
        }
    },
}))

const ReporteAltasBajas = () => {
    const classes = useStyles()
    const [altasBajas, setAltasBajas] = useState([])
    const [buscador, setBuscador] = useState("")

    useEffect(() => {
        getAltasBasjas()
    }, [])
    //-------------------------GET ALTAS Y BAJAS---------------------------------
    const getAltasBasjas = async () => {
        await axios.get(`${PORT_URL}empleadoAltasBajas`)
            .then(resp => {
                setAltasBajas(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-------------------------BUSCADOR--------------------------------
    const buscarAltasBajas = (buscador) => {
        return function (x) {
            return x.fullName.includes(buscador) ||
                x.fullName.toLowerCase().includes(buscador) ||
                x.fechaAltasBajas.includes(buscador) ||
                x.fechaAltasBajas.toLowerCase().includes(buscador) ||
                x.id_bio.includes(buscador) ||
                x.id_bio.toLowerCase().includes(buscador) ||
                x.estadoEmp.includes(buscador) ||
                x.estadoEmp.toLowerCase().includes(buscador) ||
                !buscador

        }
    }
    //-----------------------PDF GENERATE--------------------------------
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        // const doc = new jsPDF()
        // var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        doc.setFontSize(12)
        doc.text("REPORTE ALTAS Y BAJAS DE PERSONAL", pageWidth / 2, 0.5, 'center')
        doc.autoTable({ html: "#id-table", startY: 1 })

        doc.text('Aqui van las firmas', 2, doc.lastAutoTable.finalY + 1)

        //---------------ULTIMA PAGINA-------------------
        // var pageCount = doc.internal.getNumberOfPages(); // pageCount es el n?? de p??ginas
        // for (let i = 0; i < pageCount; i++) { // c??digo que se repite para cada p??gina (bucle)
        //     if(i==(pageCount-1)){
        //         doc.text(5, 5, "??LTIMA P??GINA"); // escribir '??LTIMA P??GINA'
        //     }

        // }

        doc.output("dataurlnewwindow")
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(2)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
    // console.log(altasBajas)
    return (
        <>
            <Container maxWidth='lg' style={{ paddingTop: '4.5rem' }}>
                <Grid container item xs={12} sm={7} justifyContent='flex-start'>
                    <Tabs
                        value={scroll}
                        onChange={scrollChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        style={{ height: 60, background: 'white', borderRadius: 5, marginBottom: '2rem' }}
                    >
                        <Tab label="Reporte Personal" style={{ fontSize: 'x-small' }} component={Link} to='/reportePersonal' icon={<AccountCircleIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Movimiento Personal" style={{ fontSize: 'x-small' }} component={Link} to='/reporteMovimiento' icon={<DeviceHubIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Altas y Bajas" style={{ fontSize: 'x-small' }} icon={<TimerIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Cargos" style={{ fontSize: 'x-small' }} component={Link} to='/reporteCargos' icon={<AccountCircleIcon style={{ height: 20 }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography variant='h5' align='center' className={classes.spacingBot}>REPORTE LISTA ALTAS Y BAJAS</Typography>
                <article className={classes.spacingBot} align='right'>
                    {altasBajas && (
                        <TextField
                            className={classes.searchSize}
                            style={{ background: 'white', borderRadius: 5 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={e => setBuscador(e.target.value)}
                        />
                    )}
                    <Tooltip title='Imprimir'>
                        <Button size='small' style={{ color: 'green' }} onClick={pdfGenerate} >
                            <PrintICon />
                        </Button>
                    </Tooltip>
                </article>
                <Paper component={Box} p={1}>
                    <TableContainer style={{ maxHeight: 440 }}>
                        <Table stickyHeader id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHead}>Fecha</TableCell>
                                    <TableCell className={classes.tableHead}>ID Biometrico</TableCell>
                                    <TableCell className={classes.tableHead}>Nombres y Apellidos</TableCell>
                                    <TableCell className={classes.tableHead}>Motivo</TableCell>
                                    <TableCell className={classes.tableHead}>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    altasBajas.length > 0 ? (
                                        altasBajas.filter(buscarAltasBajas(buscador)).map(a => (
                                            <TableRow key={a._id}>
                                                <TableCell>{a.fechaAltasBajas}</TableCell>
                                                <TableCell>{a.id_bio}</TableCell>
                                                <TableCell>{a.fullName}</TableCell>
                                                <TableCell>{a.motivoCambio}</TableCell>
                                                <TableCell>{a.estadoEmp === 'activo'
                                                    ? <div style={{ color: 'green' }}>{a.estadoEmp}</div>
                                                    : <div style={{ color: 'red' }}>{a.estadoEmp}</div>
                                                }</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align='center' colSpan='6'>no existe informacion</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    )
}

export default ReporteAltasBajas
