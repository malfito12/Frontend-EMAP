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
            <Alert onClose={props.onClose} severity='success'>
                Has eliminado a {props.name}
            </Alert>
        </Snackbar>
    )
}

export const AlertEdit = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Se a editado a {props.name}
            </Alert>
        </Snackbar>
    )
}
//------------------ALERTAS DE EMPLEADOS--------------------------
export const AlertEditEmpleado = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Se Editó Correctamente a {props.name}
            </Alert>
        </Snackbar>
    )
}
//------------------ALERTAS DE PERMISOS--------------------------
export const AlertErrorRegisterPermiso=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                ID Biometico incorrecto, no se puede registrar el permiso
            </Alert>
        </Snackbar>
    )
}
//------------------ALERTAS DE CARGOS--------------------------
export const AlertRegisterCargo=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Cargo registrado corretamente
            </Alert>
        </Snackbar>
    )
}
export const AlertErrorRegisterCargo=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                No se puede registrar el cargo por que ya existe un cargo asignado
            </Alert>
        </Snackbar>
    )
}
export const AlertEditCargo=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Se edito correctamente a {props.name}
            </Alert>
        </Snackbar>
    )
}
export const AlertErrorEditCargo=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                No se puede editar un registro que no existe
            </Alert>
        </Snackbar>
    )
}

export const AlertErrorDeleteCargo=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                No se puede eliminar un registro que no existe
            </Alert>
        </Snackbar>
    )
}
export const AlertDeleteCargo = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Has eliminado el cargo de {props.name}
            </Alert>
        </Snackbar>
    )
}

//------------------ELIMINACION DE CARGOS--------------------------
//------------------REGISTRO DE ASISTENCIAS--------------------------

export const AlertAddAsistencia=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Asistencias guardadas
            </Alert>
        </Snackbar>
    )
}
export const AlertErrorAsistencia=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                Error No se puede Guardar la Informacion
            </Alert>
        </Snackbar>
    )
}
export const AlertErrorAsistenciaPrint=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                Error No existe informacion para Imprimir
            </Alert>
        </Snackbar>
    )
}
//-----------------------REGISTRO DE PLANILLA REFRIGERIO-----------------------------
export const AlertAddPlanillaR=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Planilla Refrigerio Guardada
            </Alert>
        </Snackbar>
    )
}
export const AlertErrorPlanillaR=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                Error Planilla No Guardada
            </Alert>
        </Snackbar>
    )
}
//------------------REGSITRO DE PLANILLA SUELDOS---------------------------------------
export const AlertAddPlanillaS=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='success'>
                Planilla Sueldos Guardada
            </Alert>
        </Snackbar>
    )
}
export const AlertErrorPlanillaS=(props)=>{
    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity='error'>
                Error Planilla No Guardada
            </Alert>
        </Snackbar>
    )
}
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
