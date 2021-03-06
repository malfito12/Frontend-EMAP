import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}
const AlertDelete = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                Has eliminado a {props.name} 
            </Alert>
        </Snackbar>
    )
}

export default AlertDelete
