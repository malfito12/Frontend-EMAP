import { Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SendIcon from '@material-ui/icons/Send';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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

    const handleClick=()=>{
        setAbrir(!abrir)
    }
    const removeToken=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('rols')
        window.location='/login'
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
                <ListItem button onClick={handleClick} className={classes.diseño} >
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
                </Collapse>
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

export default withRouter (DrawerMenuUser)
