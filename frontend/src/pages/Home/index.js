import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import { Typography } from '@material-ui/core'
import loginServices from '../../config/api'
import { Redirect } from 'react-router-dom'

export default function Home () {
    const [validateToken, setValidateToken] = useState(true)
    const [user, setUser] = useState('')
    const [validateUser, setValidateUser] = useState(false)

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUserToken')
        setValidateToken(false)
    }

    const userSessionVerify = async (token) => {
        try {
            const verify = await loginServices.verify(token)
            return verify
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const userLogedJSON = localStorage.getItem('loggedUserToken')
        const userSession = JSON.parse(userLogedJSON)
        if (!userSession) {
            setValidateUser(false)
            location.replace('./login')
        } else {
            setValidateUser(true)
        }
    }, [])

    useEffect(async () => {
        const userLogedJSON = localStorage.getItem('loggedUserToken')
        if (userLogedJSON) {
            const userSession = JSON.parse(userLogedJSON)
            const info = await userSessionVerify(userSession.token)
            if (info.status === 200) {
                setValidateToken(true)
                setUser(userSession.name)
            } else {
                window.localStorage.removeItem('loggedUserToken')
                setValidateToken(false)
            }
        }
    }, [validateToken])

    return (
        <> <Header className="App-header" logout={handleLogout}></Header>
            { (validateUser && !validateToken)
                ? <Redirect to="/login" />
                : <Typography
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', flexWrap: 'wrap', marginTop: '5em' }}
                    variant='h3'
                >
                    {user &&
                        <>
                            <span style={{ paddingLeft: '.3em', display: 'flex', margin: 0 }}>
                                Welcome
                            </span>
                            <span style={{ color: 'violet', paddingLeft: '.3em', display: 'flex', margin: 0 }}>
                                {user}
                            </span>
                        </>
                    }
                </Typography>
            }
        </>
    )
}
