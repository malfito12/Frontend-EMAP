import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom';
import PublicMainMenu from './PublicMainMenu';

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: '230px',
        background: '#141e30'
    },
    textColor: {
        color: 'white'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
}))
const DrawerMenuPublic = () => {
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(false)

    //------------OPEN CLOSE DRAWER--------------------------
    const openCloseDrawerMenu = () => {
        setOpenDrawer(!openDrawer)
    }
    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={openCloseDrawerMenu}
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={openCloseDrawerMenu}>
                        <ChevronLeftIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem component={Link} to='/' button onClick={openCloseDrawerMenu} style={{ color: 'white' }}>
                        <ListItemIcon>
                            <SendIcon color='primary' />
                        </ListItemIcon>
                        <ListItemText primary='Inicio' />
                    </ListItem>
                    <ListItem component={Link} to='/informacion' button onClick={openCloseDrawerMenu} style={{ color: 'white' }}>
                        <ListItemIcon>
                            <SendIcon color='primary' />
                        </ListItemIcon>
                        <ListItemText primary='Informacion' />
                    </ListItem>
                    <ListItem component={Link} to='/consultas' button onClick={openCloseDrawerMenu} style={{ color: 'white' }}>
                        <ListItemIcon>
                            <SendIcon color='primary' />
                        </ListItemIcon>
                        <ListItemText primary='Consultas' />
                    </ListItem>
                    <ListItem  style={{ color: 'white' }}>
                        <ListItemIcon>
                            <SendIcon color='primary' />
                        </ListItemIcon>
                        <PublicMainMenu />
                    </ListItem>
                </List>

            </Drawer>
            <IconButton onClick={openCloseDrawerMenu} style={{ color: 'white' }}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default DrawerMenuPublic
