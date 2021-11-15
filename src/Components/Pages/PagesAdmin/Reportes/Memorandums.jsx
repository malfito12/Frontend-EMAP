import { Container, Paper, Box, Typography, FormControl, FormControlLabel, TextField, InputLabel, Input, FormHelperText, Grid, TextareaAutosize, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import PrintIcon from '@material-ui/icons/Print'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
// import moment from 'moment'
const moment = require('moment')

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const Memorandums = () => {
    const classes = useStyles()
    const [changeData, setChangeData] = useState({
        de: '',
        para: '',
        motivo: '',
        fecha: '',
        descripcion: '',
    })

    //------------------------------------------------------
    //----------------------PDF GENERATE---------------------------
    const pdfGenerate = () => {
        // const doc= new jsPDF({orientation:'portrait',unit:'in',format:[14,7]})
        const doc = new jsPDF("p", "in", "letter")
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        // console.log(width)
        // console.log(height)
        doc.setFontSize(14)
        doc.text('MEMORANDO',pageWidth / 2,1,'center')
        doc.setFontSize(11)
        doc.text("Fecha",5,1.5)
        doc.text(changeData.fecha,6,1.5)
        doc.text("DE:",1,2)
        doc.text(changeData.de,2,2)
        doc.text("PARA:",1,2.5)
        doc.text(changeData.para,2,2.5)
        doc.text("MOTIVO:",1,3)
        doc.text(changeData.motivo,2,3)

        var lines = doc.splitTextToSize(changeData.descripcion, 6.5)
        doc.text(lines,1,3.5)
        doc.output('dataurlnewwindow')
    }
    //------------------HANDLE CHANGE------------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------------------------------------------------
    // console.log(changeData)
    return (
        <Container maxWidth='sm' style={{ paddingTop: '5rem' }}>
            <Typography align='center' variant='h5' className={classes.spacingBot}>GENERAR MEMORANDO</Typography>
            <Paper component={Box} p={3}>
                <Typography variant='subtitle1' align='center'>MEMORANDO</Typography>
                <form>
                    <Grid container direction='column'>
                        <TextField
                            name='de'
                            label='De'
                            variant='standard'
                            className={classes.spacingBot}
                            onChange={handleChange}

                        />
                        <TextField
                            name='para'
                            label='Para'
                            variant='standard'
                            className={classes.spacingBot}
                            onChange={handleChange}
                        />
                        <TextField
                            name='motivo'
                            label='Motivo'
                            variant='standard'
                            className={classes.spacingBot}
                            onChange={handleChange}
                        />
                        <TextField
                            name='fecha'
                            label='Fecha'
                            variant='standard'
                            InputLabelProps={{ shrink: true }}
                            style={{ width: '50%' }}
                            type='date'
                            className={classes.spacingBot}
                            onChange={handleChange}
                        />
                        <TextareaAutosize
                            id='descripcion'
                            name='descripcion'
                            placeholder=' Descripción'
                            className={classes.spacingBot}
                            style={{ width: '100%', height: 200 }}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid container justifyContent='center'>
                        <Button variant='contained' endIcon={<PrintIcon />} color='primary' size='small' onClick={pdfGenerate}>imprimir</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Memorandums