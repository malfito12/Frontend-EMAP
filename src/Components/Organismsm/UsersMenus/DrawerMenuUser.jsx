import { Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { withRouter } from 'react-router-dom'

const drawerWidth=240;
const useStyles=makeStyles((theme)=>({
    drawer:{
        width: drawerWidth,
        flexShrink:0
    },
    drawerPaper:{
        width: drawerWidth,
        background: '#212121'
    },
    color:{
        // color:'#4e342e'
        color:'#283593'
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
const DrawerMenuUser = (props) => {
    const classes=useStyles()
    const [abrir,setAbrir]=useState(false)
    const [abrir3, setAbrir3] = useState(false)

    const handleClick=()=>{
        setAbrir(!abrir)
    }
    const handleClick3 = () => {
        setAbrir3(!abrir3)
    }

    const removeToken=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('rols')
        localStorage.removeItem('username')
        window.location='/'
    }
    const {history}=props
    const ItemList=[
        {
            text: 'Personal',
            icon: <SendIcon className={classes.color} />,
            oncl: ()=>history.push('/userControlEmp')
        },
        {
            text: 'Permisos',
            icon: <SendIcon className={classes.color} />,
            oncl: ()=>history.push('/userControlPermiso')
        },
        {
            text: 'Horarios',
            icon: <SendIcon className={classes.color} />,
            oncl: ()=>history.push('/userControlHorario')
        },
        {
            text: 'Reportes',
            icon: <SendIcon className={classes.color} />,
            oncl: ()=>history.push('/userControlReporte')
        },
        {
            text: 'Planillas',
            icon: <SendIcon className={classes.color} />,
            oncl: ()=>history.push('/userControlPlanilla')
        }
    ]
    const ItemList3 = [
        {
            text: 'Sueldos',
            icon: <InboxIcon color='primary' />,
            oncl: () => history.push('/sueldosPreRevision')
        },
        {
            text: 'Refrigerio',
            icon: <InboxIcon color='primary' />,
            oncl: () => history.push('/refrigerioPreRevision')
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
                <IconButton onClick={props.CloseDrawer}>
                    <ChevronLeftIcon className={classes.diseño} />
                </IconButton>
            </div>
            <Divider/>
            <List>
                {/* <ListItem button onClick={handleClick} className={classes.diseño} >
                    <ListItemIcon>
                        <SendIcon color='secondary' />
                    </ListItemIcon>
                    <ListItemText primary='Modulos' />
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
                </Collapse> */}
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/generalConfig")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Datos Generales' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/userControlEmp")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Personal' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/userControlPermiso")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Justificaciones' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/kardexPreRevision")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Asistencias' />
                </ListItem>
                </div>
                <ListItem button onClick={handleClick3} className={classes.diseño} >
                    <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Planillas' />
                    {abrir3 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={abrir3} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding onClick={props.CloseDrawer}>
                        {ItemList3.map((item) => {
                            const { text, icon, oncl } = item
                            return (
                                <div key={text}>
                                    <ListItem button className={classes.nested} onClick={oncl}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItem>
                                </div>
                            )
                        })

                        }
                    </List>
                </Collapse>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/reportePersonal")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Reportes' />
                </ListItem>
                </div>
                <div onClick={props.CloseDrawer} >
                <ListItem button onClick={()=>history.push("/memorandums")} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='Memorando' />
                </ListItem>
                </div>
                {/* <div onClick={props.CloseDrawer} />
                <ListItem button onClick={()=>removeToken()} className={classes.diseño}>
                   <ListItemIcon>
                        <SendIcon color='primary' />
                    </ListItemIcon> 
                    <ListItemText primary='cerrar' />
                </ListItem> */}
            </List>
        </Drawer>
    )
}

export default withRouter (DrawerMenuUser)
