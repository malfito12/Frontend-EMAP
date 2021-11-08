import React from 'react'
import { BrowserRouter as Switch } from 'react-router-dom'
import HomeAdmin from '../../Pages/PagesAdmin/HomeAdmin'
import Protected from '../Protected'
import Public from '../Public'
import PublicHome from '../../Pages/PagesPublic/PublicHome'
import HomeUser from '../../Pages/PagesUsers/HomeUser'
import PublicMainMenu from '../../Organismsm/PublicMenu/PublicMainMenu'
import Home from '../../Pages/PagesPublic/Home'

const AppPublic = () => {
    return (
        <>
            <PublicMainMenu />
            <Switch>
                <Protected exact path='/homeadmin' component={props => <HomeAdmin {...props} />} />
                <Protected exact path='/homeuser' component={props => <HomeUser {...props} />} />
                {/* <Public exact path='/homepublic' component={props => <PublicHome {...props} />} /> */}
                <Public exact path='/' component={props =><div id='home'><Home /></div>} />


                {/* <Public path='/login' exact component={props=><Login {...props} />}/> */}
                {/* <Public path='/' component={props=><Home {...props} />} /> */}

            </Switch>
        </>
    )
}

export default AppPublic
