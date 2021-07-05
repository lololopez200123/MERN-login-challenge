import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'

export default function Header (params) {
    return (
        <div>
            <AppBar position="fixed" color="primary" >
                <Toolbar style={{ padding: '0 4em' }}>
                    <Typography variant="h6" style={{ flex: 1 }}>
                        Home
                    </Typography>
                    <Button color="inherit" onClick={params.logout} aria-label="Logout user">
                        Logout
                        <ExitToApp style={{ color: 'white' }}/>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
