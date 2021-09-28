import { Collapse, Divider, Drawer, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SendIcon from '@material-ui/icons/Send';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withRouter } from 'react-router-dom'
import logoemap from '../../../images/logoemap.png'

const drawerWidth=240;
const useStyles=makeStyles((theme)=>({
    drawer:{
        width: drawerWidth,
        flexShrink:0
    },
    drawerPaper:{
        width: drawerWidth,
        background: '#141e30'
    },
    drawerHeader:{
        display:'flex',
        alignItems: 'center',
        padding: theme.spacing(0,1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    diseño:{
        color:'white'
    },
    nested:{
        paddingLeft: theme.spacing(4),
        color: 'white'
    }
}))
const DrawerMenuAdmin = (props) => {
    const classes=useStyles()
    const [abrir,setAbrir]=useState(false)
    const [abrir2,setAbrir2]=useState(false)
    const [abrir3,setAbrir3]=useState(false)

    const handleClick=()=>{
        setAbrir(!abrir)
    }
    const handleClick2=()=>{
        setAbrir2(!abrir2)
    }
    const handleClick3=()=>{
        setAbrir3(!abrir3)
    }
    const removeToken=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('rols')
        window.location='/login'
    }
    const {history}=props
    const ItemList=[
        // {
        //     text: 'Home Admin',
        //     icon: <SendIcon color='primary' />,
        //     oncl: ()=>history.push('/homeadmin')
        // },
        {
            text: 'Usuarios',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/controluser')
        },
        {
            text: 'Personal',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/controlEmp')
        },
        {
            text: 'Cargos',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/controlCargos')
        },
        {
            text: 'Registrar Cargos',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/registerCargo')
        },
        {
            text: 'Configuracion General',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/generalConfig')
        },
        
    ]
    const ItemList2=[
        {
            text: 'Horarios',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/controlHorarios')
        },
        {
            text: 'Asignar Horario',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/asigHorario')
        },
        {
            text: 'Permisos',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/controlPermisos')
        },
        {
            text: 'Feriados',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/controlFeriados')
        },
        {
            text: 'Ver Kardex',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/kardexPreRevision')
        },
    ]
    const ItemList3=[
        {
            text: 'Sueldos',
            icon: <InboxIcon color='primary' />,
            oncl: ()=>history.push('/planillaSueldos')
        },
        
    ]
    return (
        <Drawer
            className={classes.drawer}
            anchor='left'
            open={props.open}
            onClose={props.CloseDrawer}
            classes={{
                paper: classes.drawerPaper
            }}
        >   
            <div className={classes.drawerHeader}>
            <img src={logoemap} style={{ width: 100, height:35, marginRight:'2rem' }} alt='#'/>
            {/* <div style={{flexGrow:1}}></div> */}
                <IconButton onClick={props.CloseDrawer}>
                    <ChevronLeftIcon className={classes.diseño} />
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem button onClick={handleClick} className={classes.diseño} >
                    <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Control Personal' />
                    {abrir ? <ExpandLess /> : <ExpandMore /> }
                </ListItem>
                <Collapse in={abrir} timeout='auto' unmountOnExit>
                <List component='div' disablePadding onClick={props.CloseDrawer}>
                    {ItemList.map((item)=>{
                        const {text, icon, oncl}=item
                        return(
                            <div key={text}>
                                <ListItem button className={classes.nested} onClick={oncl}>
                                    {icon&&<ListItemIcon>{icon}</ListItemIcon>}
                                    <ListItemText primary={text} />
                                </ListItem>
                            </div>
                        )
                    })

                    }
                </List>
                </Collapse>
                <ListItem button onClick={handleClick2} className={classes.diseño} >
                    <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Asistencias' />
                    {abrir2 ? <ExpandLess /> : <ExpandMore /> }
                </ListItem>
                <Collapse in={abrir2} timeout='auto' unmountOnExit>
                <List component='div' disablePadding onClick={props.CloseDrawer}>
                    {ItemList2.map((item)=>{
                        const {text, icon, oncl}=item
                        return(
                            <div key={text}>
                                <ListItem button className={classes.nested} onClick={oncl}>
                                    {icon&&<ListItemIcon>{icon}</ListItemIcon>}
                                    <ListItemText primary={text} />
                                </ListItem>
                            </div>
                        )
                    })

                    }
                </List>
                </Collapse>
                <ListItem button onClick={handleClick3} className={classes.diseño} >
                    <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Planillas' />
                    {abrir3 ? <ExpandLess /> : <ExpandMore /> }
                </ListItem>
                <Collapse in={abrir3} timeout='auto' unmountOnExit>
                <List component='div' disablePadding onClick={props.CloseDrawer}>
                    {ItemList3.map((item)=>{
                        const {text, icon, oncl}=item
                        return(
                            <div key={text}>
                                <ListItem button className={classes.nested} onClick={oncl}>
                                    {icon&&<ListItemIcon>{icon}</ListItemIcon>}
                                    <ListItemText primary={text} />
                                </ListItem>
                            </div>
                        )
                    })

                    }
                </List>
                </Collapse>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/controluser")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Usuarios' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/controlEmp")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Personal' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/kardexPreRevision")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Asistencia' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/controlPermisos")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Justificaciones' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/sueldosPreRevision")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Planillas' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/generalConfig")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Configuracion' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} />
                <ListItem button onClick={()=>removeToken()} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='cerrar' />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default withRouter(DrawerMenuAdmin)
