import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}
export const AlertRegister=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Registro Exitoso {props.name}
            </Alert>
        </Snackbar>
    )
}
export const AlertDelete = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                Has eliminado a {props.name} 
            </Alert>
        </Snackbar>
    )
}

export const AlertEdit = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Edicion exitosa {props.name}
            </Alert>
        </Snackbar>
    )
}