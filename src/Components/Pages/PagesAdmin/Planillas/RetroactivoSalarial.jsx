import { Box, Container, makeStyles, Dialog, Grid, MenuItem, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { PORT_URL } from '../../../../PortURL'
import SearchIcon from '@material-ui/icons/Search'
import PrintIcon from '@material-ui/icons/Print'
import RegisterApp from '@material-ui/icons/CloudUpload'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo2emap from '../../../../images/logo2emap.png'

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    headTable: {
        padding: 0,
        color: 'white',
        background: 'black',
    }
}))

const RetroactivoSalarial = () => {
    const classes = useStyles()
    const [openAddRetro, setOpenAddRetro] = useState(false)
    const [restrospectiva, setRetrospectiva] = useState([])
    const [changeData, setChangeData] = useState({
        year: '',
        porcentaje: '',
        descripcion: ''
    })
    const [changeData2, setChangeData2] = useState({
        year: '',
        mes: ''
    })

    //----------------post Retrospectivos--------------------
    const openModalAddRetro = () => {
        setOpenAddRetro(true)
    }
    const closeModalAddRetro = () => {
        setOpenAddRetro(false)
    }
    const postRetrospectiva = async (e) => {
        e.preventDefault()
        await axios.post(`${PORT_URL}restrospectivaSalarial`, changeData)
            .then(resp => {
                closeModalAddRetro()
                console.log(resp.data)
            })
            .catch(err => {
                alert('ya exsiten registros de ese año')
                console.log(err)
            })

    }
    //------------------GET RESTROSPECTIVA----------------
    const getRetrospectiva = async (e) => {
        e.preventDefault()
        await axios.get(`${PORT_URL}restrospectivaSalarial?year=${changeData2.year}&mes=${changeData2.mes}`)
            .then(resp => {
                setRetrospectiva(resp.data)
                // console.log(resp.data)
            })
            .catch(err => console.log(err))
    }

    //---------------PDF GENERATE-------------------
    var image = logo2emap
    const pdfGenerate=()=>{
        const doc= new jsPDF({orientation: 'landscape', unit: 'in', format: [14, 7]})
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        document.getElementById('firma').style.display='block'
        doc.setFontSize(12)
        doc.addImage(image, 0.5, 0, 1.5, 1)
        doc.text("PLANILLA DE RETROACTIVO POR INCREMENTO SALARIAL", pageWidth / 2, 0.5, 'center')
        doc.text("PERSONAL PERMANENTE EN FUNCIONAMIENTO", pageWidth / 2, 0.7, 'center')
        doc.setFontSize(9)
        doc.text(`Correspondiente al mes de ${changeData2.mes} de ${changeData2.year}` , pageWidth / 2, 0.9, 'center')
        doc.autoTable({ html: "#id-table", startY: 1.2, styles: { fontSize: 5, halign: 'center' } })
        
        doc.setFontSize(8)
        doc.text('-----------------------------------',pageWidth/6.4, doc.lastAutoTable.finalY+0.9)
        doc.text('REALIZADO POR',pageWidth/6, doc.lastAutoTable.finalY+1)
        doc.text('-----------------------------------',pageWidth/2, doc.lastAutoTable.finalY+0.9,'center')
        doc.text('REVISADO POR',pageWidth/2, doc.lastAutoTable.finalY+1,'center')
        doc.text('-----------------------------------',pageWidth/1.33, doc.lastAutoTable.finalY+0.9,)
        doc.text('APROBADO POR',pageWidth/1.3, doc.lastAutoTable.finalY+1)

        document.getElementById('firma').style.display='none'
        window.open(doc.output('bloburi'))
    }
    //---------------HANDLE CHANGE-------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------------HANDLE CHANGE 2------------------
    const handleChange2 = (e) => {
        setChangeData2({
            ...changeData2,
            [e.target.name]: e.target.value
        })
    }
    //------------------------------------
    // console.log(changeData)
    // console.log(changeData2)
    return (
        <>
            <Container style={{ paddingTop: '5rem' }}>
                <Typography align='center' variant='h5' className={classes.spacingBot}>RETROACTIVO - INCREMENTO SALARIAL</Typography>
                {/* <Grid item xs={12} sm={4}>
                    <Paper component={Box} p={1} className={classes.spacingBot}>
                        <Button fullWidth color='primary' variant='contained' onClick={openModalAddRetro}>registrar</Button>
                    </Paper>
                </Grid> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Container maxWidth='xs'>
                            <Paper component={Box} p={2}>
                                <Typography align='center' className={classes.spacingBot} variant='subtitle1'>RETROACTIVO</Typography>
                                <form onSubmit={getRetrospectiva}>
                                    <TextField
                                        name='year'
                                        label='Año (emjemplo 2020)'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBot}
                                        onChange={handleChange2}
                                        required
                                    />
                                    <TextField
                                        name='mes'
                                        label='Mes'
                                        variant='outlined'
                                        size='small'
                                        select
                                        fullWidth
                                        className={classes.spacingBot}
                                        onChange={handleChange2}
                                        value={changeData2.mes}
                                        align='center'
                                        required
                                    >
                                        <MenuItem value='ENERO'>ENERO</MenuItem>
                                        <MenuItem value='FEBRERO'>FEBRERO</MenuItem>
                                        <MenuItem value='MARZO'>MARZO</MenuItem>
                                        <MenuItem value='ABRIL'>ABRIL</MenuItem>
                                        <MenuItem value='MAYO'>MAYO</MenuItem>
                                        <MenuItem value='JUNIO'>JUNIO</MenuItem>
                                        <MenuItem value='JULIO'>JULIO</MenuItem>
                                        <MenuItem value='AGOSTO'>AGOSTO</MenuItem>
                                        <MenuItem value='SEPTIEMBRE'>SEPTIEMBRE</MenuItem>
                                        <MenuItem value='OCTUBRE'>OCTUBRE</MenuItem>
                                        <MenuItem value='NOVIEMBRE'>NOVIEMBRE</MenuItem>
                                        <MenuItem value='DICIEMBRE'>DICIEMBRE</MenuItem>
                                    </TextField>
                                    <Grid container justifyContent='center' className={classes.spacingBot}>
                                        <Button type='submit' variant='contained' size='small' fullWidth color='primary' endIcon={<SearchIcon />}>buscar</Button>
                                    </Grid>
                                </form>
                                <Button size='small' fullWidth color='primary' endIcon={<RegisterApp/>} variant='contained' onClick={openModalAddRetro} className={classes.spacingBot}>registrar</Button>
                                <Button variant='contained' size='small' fullWidth style={{background:'green',color:'white'}} endIcon={<PrintIcon />} onClick={pdfGenerate}>imprimir</Button>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper component={Box} p={1}>
                            <TableContainer style={{ maxHeight: 440 }} className={classes.spacingBot}>
                                <Table style={{ minWidth: 1400 }} id='id-table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Item N°</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>CI</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Apellidos y Nombres</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Cargo</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Dias Trab.</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Haber Anterior</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Haber Actual</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Incremento</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Total Gan. Dias Trab.</TableCell>
                                            <TableCell className={classes.headTable} colSpan='3' align='center'>Diferencia</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Total Ganado</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>A.F.P.S.</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Total Desc.</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' align='center'>Liquido Pagable</TableCell>
                                            <TableCell className={classes.headTable} rowSpan='2' style={{display:'none'}} id='firma'>Firma</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.headTable} align='center'>B. Antig</TableCell>
                                            <TableCell className={classes.headTable} align='center'>Rec. Noct.</TableCell>
                                            <TableCell className={classes.headTable} align='center'>Interinato</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {restrospectiva.length > 0 ? (
                                            restrospectiva.map((r, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{r.numItem}</TableCell>
                                                    <TableCell>{r.ci}</TableCell>
                                                    <TableCell>{r.fullName}</TableCell>
                                                    <TableCell>{r.nameCargo}</TableCell>
                                                    <TableCell>{r.diasTrab}</TableCell>
                                                    <TableCell>{r.haberAnterior}</TableCell>
                                                    <TableCell>{r.haberActual}</TableCell>
                                                    <TableCell>{r.incremento}</TableCell>
                                                    <TableCell align='center'>{r.totalGanadoPorDia}</TableCell>
                                                    <TableCell>{r.bonoAntiguedad}</TableCell>
                                                    <TableCell>{r.recargaNocturna}</TableCell>
                                                    <TableCell>{r.interinato}</TableCell>
                                                    <TableCell>{r.totalGanado}</TableCell>
                                                    <TableCell>{r.afps}</TableCell>
                                                    <TableCell>{r.totalDescuento}</TableCell>
                                                    <TableCell>{r.liquidoPagable}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell align='center' colSpan='15'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/*-------------------REGISTRO DE RETROSPECTIVA------------------------*/}
            <Dialog
                open={openAddRetro}
                onClose={closeModalAddRetro}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>REGISTRAR</Typography>
                    <form onSubmit={postRetrospectiva} >
                        <TextField
                            name='year'
                            label='Año de Retrospectiva Salarial (ejemplo 2020)'
                            variant='outlined'
                            fullWidth
                            size='small'
                            type='number'
                            className={classes.spacingBot}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name='porcentaje'
                            label='Pocentaje (ejemplo 0.03)'
                            variant='outlined'
                            fullWidth
                            size='small'
                            inputProps={{ step: 'any' }}
                            type='number'
                            className={classes.spacingBot}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name='descripcion'
                            label='Descripcion'
                            variant='outlined'
                            fullWidth
                            size='small'
                            onChange={handleChange}
                            className={classes.spacingBot}
                        />
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' color='primary' variant='contained' type='submit'>aceptar</Button>
                            <Button size='small' color='secondary' variant='contained' onClick={closeModalAddRetro}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
        </>
    )
}

export default RetroactivoSalarial
