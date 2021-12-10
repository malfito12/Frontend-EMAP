import { Box, Button, Container, Grid, makeStyles, MobileStepper, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils'
import emap2 from '../../../images/imagesEmap/emap2.jpg'
import emap3 from '../../../images/imagesEmap/emap3.jpg'
import emap4 from '../../../images/imagesEmap/emap4.jpg'
import emap5 from '../../../images/imagesEmap/emap5.jpg'
import emap6 from '../../../images/imagesEmap/emap6.jpg'
import PublicMainMenu from '../../Organismsm/PublicMenu/PublicMainMenu';
import DrawerMenuPublic from '../../Organismsm/PublicMenu/DrawerMenuPublic';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    delanteDe: {
        position: 'relative',
        zIndex: '2',
        paddingTop: '5rem'
    },
    // objetivo: {
    //     marginTop: '20%',
    //     [theme.breakpoints.down("sm")]: {
    //         // margin: 0,
    //         position: 'center'
    //     }
    // },
    sizeImg: {
        marginTop: '15%',
        [theme.breakpoints.down("sm")]: {
            marginTop: 10,
            position: 'center'
        }
    },
    imageResponsive: {
        height: 350,
        [theme.breakpoints.down('xs')]: {
            height: 250
        }
    }
}))
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: emap2,
    },
    {
        label: 'Bird',
        imgPath: emap3,
    },
    {
        label: 'Bali, Indonesia',
        imgPath: emap4,
    },
    {
        label: 'Goč, Serbia',
        imgPath: emap5,
    },
    {
        label: 'uno, otro',
        imgPath: emap6,
    },
    // {
    //     label: 'Goč, Serbia',
    //     imgPath:emap1,
    // },
];
const date = new Date()
const Home = () => {
    const classes = useStyles()
    const theme = useTheme();
    const maxSteps = images.length;
    const [activeStep, setActiveStep] = useState(0);
    const [dateTime, setDateTime] = useState({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        diaSemana: date.getDay(),
        dia: date.getDate(),
        mes: date.getMonth(),
        year: date.getFullYear(),
    })

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date()
            setDateTime({
                hours: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds(),
                diaSemana: date.getDay(),
                dia: date.getDate(),
                mes: date.getMonth(),
                year: date.getFullYear(),
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])


    //-----------------------------------------------------------------
    //-----------------------------------------------------------------

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    //-------------------RELOG--------------------------------
    var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    var nameSemana = semana[dateTime.diaSemana]
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var nameMes = meses[dateTime.mes]

    return (
        <Container maxWidth={false}>
            {isMatch
                ? <div align='right'><DrawerMenuPublic /></div>
                : <div>
                    <nav id='menu-public'>
                        {/* <a href="/informacion">INFORMACION</a>
                        <a href="/consultas">CONSULTAS</a> */}
                        <Link to='/'>INICIO</Link>
                        <Link to='/informacion'>INFORMACION</Link>
                        <Link to="/consultas">CONSULTAS</Link>
                        <PublicMainMenu />
                    </nav>
                </div>
            }
            <section>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} container justifyContent='center' alignContent='center' >
                        {/* <Typography align='center' variant='h5' style={{fontFamily:'Arial, Helvetica, sans-serif',color:'white'}}>ENTIDAD MUNICIPAL DE ASEO POTOSI EMAP</Typography> */}
                        <Typography align='center' variant='h5' style={{fontFamily:'sans-serif',color:'white'}}>ENTIDAD MUNICIPAL DE ASEO POTOSI EMAP</Typography>
                        <div className='wrap'>
                            <div className='widget'>
                                <div className='fecha'>
                                    <p className='diaSemana'>{nameSemana}</p>
                                    <p className='dia'>{dateTime.dia}</p>
                                    <p>de</p>
                                    <p className='mes'>{nameMes}</p>
                                    <p>del</p>
                                    <p className='year'>{dateTime.year}</p>
                                </div>
                                <div className='reloj'>
                                    <p className='horas'>{dateTime.hours < 10 ? "0" + dateTime.hours : dateTime.hours}</p>
                                    <p>:</p>
                                    <p className='minutos'>{dateTime.minutes < 10 ? "0" + dateTime.minutes : dateTime.minutes}</p>
                                    <p>:</p>
                                    <p className='segundos'>{dateTime.seconds < 10 ? "0" + dateTime.seconds : dateTime.seconds}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} container justifyContent='center' alignContent='center' >
                        <div className={classes.sizeImg}>
                            <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
                                {/* <Paper
                                square
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: 50,
                                    pl: 2,
                                    bgcolor: 'background.default',
                                }}
                            >
                                <Typography>{images[activeStep].label}</Typography>
                            </Paper> */}
                                <AutoPlaySwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={activeStep}
                                    onChangeIndex={handleStepChange}
                                    enableMouseEvents
                                >
                                    {images.map((step, index) => (
                                        <div key={step.label}>
                                            {Math.abs(activeStep - index) <= 2 ? (
                                                <Box
                                                    style={{ borderRadius: 5 }}
                                                    component="img"
                                                    sx={{
                                                        // height: 350,
                                                        display: 'block',
                                                        maxWidth: 600,
                                                        // overflow: 'hidden',
                                                        width: '100%',
                                                    }}
                                                    className={classes.imageResponsive}
                                                    src={step.imgPath}
                                                    alt={step.label}
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                                </AutoPlaySwipeableViews>
                                <MobileStepper
                                    style={{ background: 'black', display: 'none' }}
                                    steps={maxSteps}
                                    position="static"
                                    activeStep={activeStep}
                                    nextButton={
                                        <Button
                                            style={{ color: 'white' }}
                                            size="small"
                                            onClick={handleNext}
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            Next
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowLeft />
                                            ) : (
                                                <KeyboardArrowRight />
                                            )}
                                        </Button>
                                    }
                                    backButton={
                                        <Button style={{ color: 'white' }} size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowRight />
                                            ) : (
                                                <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button>
                                    }
                                />
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </section>
        </Container>
    )
}

export default Home

