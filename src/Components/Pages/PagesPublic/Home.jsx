import { Box, Button, Container, Grid, makeStyles, MobileStepper, Paper, TextField, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils'
import emap1 from '../../../images/imagesEmap/emap1.jpg'
import emap2 from '../../../images/imagesEmap/emap2.jpg'
import emap3 from '../../../images/imagesEmap/emap3.jpg'
import emap4 from '../../../images/imagesEmap/emap4.jpg'
import emap5 from '../../../images/imagesEmap/emap5.jpg'
import emap6 from '../../../images/imagesEmap/emap6.jpg'
const useStyles = makeStyles((theme) => ({
    delanteDe: {
        position: 'relative',
        zIndex: '2',
        paddingTop: '5rem'
    },
    objetivo: {
        marginTop: '20%',
        [theme.breakpoints.down("sm")]: {
            margin: 0
        }
    },
    sizeImg: {
        marginTop: '15%',
        [theme.breakpoints.down("sm")]: {
            margin: 0
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
        imgPath:emap3,
    },
    {
        label: 'Bali, Indonesia',
        imgPath: emap4,
    },
    {
        label: 'Goč, Serbia',
        imgPath:emap5,
    },
    {
        label: 'uno, otro',
        imgPath:emap6,
    },
    // {
    //     label: 'Goč, Serbia',
    //     imgPath:emap1,
    // },
];

const Home = () => {
    const classes = useStyles()
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    return (
        <Container maxWidth={false}  >
            <section className={classes.delanteDe}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                        <div className={classes.objetivo}>
                            <Typography
                                align='center' variant='h2'
                                style={{ fontFamily: 'cursive', fontWeight: 'bold', fontStyle: 'italic' }}
                            >EMAP</Typography>
                            <Typography
                                align='center' variant='h5'
                                style={{ fontFamily: 'cursive', fontWeight: 'bold', fontStyle: 'italic' }}
                            >
                                Empresa de prestación de servicio de aseo y recolección para la gestión integral de residuos sólidos reduciendo significativamente la contaminacion
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div align='center' className={classes.sizeImg}>
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
                                                        height: 350,
                                                        display: 'block',
                                                        // maxWidth: 400,
                                                        // overflow: 'hidden',
                                                        width: '100%',
                                                    }}
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

