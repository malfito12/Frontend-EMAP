import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Protected = ({ component: Component, ...rest }) => {
    const userLogged = localStorage.getItem('token')
    if (!userLogged) {
        return <Redirect to="/" />
    }
    return <Route {...rest} component={Component} />
}

export default Protected