import { Container, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import DrawerMenuPublic from '../../Organismsm/PublicMenu/DrawerMenuPublic'
import PublicMainMenu from '../../Organismsm/PublicMenu/PublicMainMenu'
import image7 from '../../../images/imagesEmap/emap7.jpg'
import image8 from '../../../images/imagesEmap/emap8.jpg'

const InformacionEMAP = () => {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <>
            <Container maxWidth={false}>
                {isMatch
                    ? <div align='right'><DrawerMenuPublic /></div>
                    : <div>
                        <nav id='menu-public'>
                            <Link to='/'>INICIO</Link>
                            <Link to='/informacion'>INFORMACION</Link>
                            <Link to="/consultas">CONSULTAS</Link>
                            <PublicMainMenu />
                        </nav>
                    </div>
                }
            </Container>
            <section style={{ paddingTop: '2.5rem' }}>
                <article className='que-somos' style={{marginBottom:'1rem'}}>
                    <Container>
                        <div className='contenedor-sobre-nosotros'>
                            <div className='contenedor-imagen1'>
                                <img src={image7} alt="#" className='imagen-about-us'/>
                            </div>
                            <div className="contenido-textos1">
                                <Typography variant='h4' style={{ color: 'white' }}>¿Quienes Somos?</Typography>
                                <Typography variant='subtitle1' style={{ color: 'whitesmoke' }}>Somos una institución de atención en servicios de tratamiento de residuos sólidos. Prestando los servicios de tratamiento de Residuos Sólidos a través de los sistemas de Barrido, Recolección, Transporte, Disposición Final y Aprovechamiento. </Typography>
                            </div>
                        </div>
                    </Container>
                </article>
                <article >
                    <Container>
                        <div className='contenedor-mision'>
                            <div className="contenido-textos2">
                                <Typography variant='h4'>Misión</Typography>
                                <Typography variant='subtitle1'>Entidad líder y posicionada e la prestación de servicio integral en manejo de residuos sólidos, con capacidad financiera, respuesta técnica y estructura organizacional solida certificada bajo sistemas de calidad que reflejen estandarización y conformidad </Typography>
                            </div>
                            <div className='contenedor-imagen2'>
                                <img src={image8} alt="#" className='imagen-about-us2'/>
                            </div>
                        </div>
                    </Container>
                </article>
            </section>
        </>
    )
}

export default InformacionEMAP
