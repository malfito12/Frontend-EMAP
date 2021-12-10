import React, { useEffect, useState } from 'react'
import { Container, Grid, makeStyles, Paper, Box, Tab, Tabs, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TextField, InputAdornment, Tooltip, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimerIcon from '@material-ui/icons/Timer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import SearchIcon from '@material-ui/icons/Search';
import PrintICon from '@material-ui/icons/Print'
import axios from 'axios';
import { PORT_URL } from '../../../../PortURL';
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
            fontSize: 'x-small',
            padding: 0,
            textAlign: 'center'
        }
    },
}))
const ReporteMovimiento = () => {
    const classes = useStyles()
    const [movimiento, setMovimiento] = useState([])
    const [buscador, setBuscador] = useState("")

    useEffect(() => {
        getMovimiento()
    }, [])

    //---------------------------GET MOVIMIENTO---------------------------------
    const getMovimiento = async () => {
        await axios.get(`${PORT_URL}movimiento`)
            .then(resp => {
                setMovimiento(resp.data)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }
    //-----------------------BUSCARDOR----------------------------------
    const buscarMovimiento = (buscador) => {
        return function (x) {
            return x.firstNameEmp.includes(buscador) ||
                x.firstNameEmp.toLowerCase().includes(buscador) ||
                x.lastNameEmpP.includes(buscador) ||
                x.lastNameEmpP.toLowerCase().includes(buscador) ||
                x.lastNameEmpM.includes(buscador) ||
                x.lastNameEmpM.toLowerCase().includes(buscador) ||
                x.departamentEmp.includes(buscador) ||
                x.departamentEmp.toLowerCase().includes(buscador) ||
                x.cargoEmp.includes(buscador) ||
                x.cargoEmp.toLowerCase().includes(buscador) ||
                x.fechaMovimiento.includes(buscador) ||
                x.fechaMovimiento.toLowerCase().includes(buscador) ||
                x.id_bio.includes(buscador) ||
                x.id_bio.toLowerCase().includes(buscador) ||
                x.itemEmp.includes(buscador) ||
                x.itemEmp.toLowerCase().includes(buscador) ||
                !buscador
        }
    }
    //-----------------------PDF GENERATE--------------------------------
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        // var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        doc.setFontSize(12)
        doc.text("REPORTE MOVIMIENTO DE PERSONAL", pageWidth / 2, 0.5, 'center')
        doc.autoTable({ html: "#id-table", startY: 1 })
        doc.output("dataurlnewwindow")
    }
    //-----------------------------------------------------------------
    const [scroll, setScroll] = useState(1)
    const scrollChange = (e, newScroll) => {
        setScroll(newScroll)
    }
    //-----------------------------------------------------------------
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
                        <Tab label="Reporte Movimiento Personal" style={{ fontSize: 'x-small' }} icon={<DeviceHubIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Altas y Bajas" style={{ fontSize: 'x-small' }} component={Link} to='/reporteAltasBajas' icon={<TimerIcon style={{ height: 20 }} />} />
                        <Tab label="Reporte Cargos" style={{ fontSize: 'x-small' }} component={Link} to='/reporteCargos' icon={<AccountCircleIcon style={{ height: 20 }} />} />
                    </Tabs>
                </Grid>
            </Container>
            <Container maxWidth='lg'>
                <Typography variant='h5' align='center' className={classes.spacingBot}>REPORTE MOVIMIENTO DE PERSONAL</Typography>
                <article className={classes.spacingBot} align='right'>
                    {movimiento && (
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
                        <Button size='small' style={{ color: 'green' }} onClick={pdfGenerate}>
                            <PrintICon />
                        </Button>
                    </Tooltip>
                </article>
                <Paper component={Box} p={1}>
                    <TableContainer style={{ maxHeight: 540 }}>
                        <Table stickyHeader id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHead}>Fecha Movimiento</TableCell>
                                    <TableCell className={classes.tableHead}>ID Biometrico</TableCell>
                                    <TableCell className={classes.tableHead}>N° de Item</TableCell>
                                    <TableCell className={classes.tableHead}>Nombres</TableCell>
                                    <TableCell className={classes.tableHead}>Apellido P</TableCell>
                                    <TableCell className={classes.tableHead}>Apellido M</TableCell>
                                    <TableCell className={classes.tableHead}>Departamento</TableCell>
                                    <TableCell className={classes.tableHead}>Cargo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movimiento.length > 0 ? (
                                    movimiento.filter(buscarMovimiento(buscador)).map(m => (
                                        <TableRow key={m._id}>
                                            <TableCell>{m.fechaMovimiento}</TableCell>
                                            <TableCell>{m.id_bio}</TableCell>
                                            <TableCell>{m.itemEmp}</TableCell>
                                            <TableCell>{m.firstNameEmp}</TableCell>
                                            <TableCell>{m.lastNameEmpP}</TableCell>
                                            <TableCell>{m.lastNameEmpM}</TableCell>
                                            <TableCell>{m.departamentEmp}</TableCell>
                                            <TableCell>{m.cargoEmp}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align='center' colSpan='9'>No existe informacion</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    )
}

export default ReporteMovimiento
