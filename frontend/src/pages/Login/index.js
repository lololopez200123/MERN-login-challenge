import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Grid,
    Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useStyles } from './styles.js'
import loginServices from '../../config/api'

export default function Login () {
    const classes = useStyles()
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [user, setUserName] = useState('')
    const [validateToken, setValidateToken] = useState(false)
    const [showPasswordType, setShowPasswordType] = useState('password')

    const optionNoDisp = (e) => {
        e.preventDefault()
        alert('funcionalidad aun no implementada')
    }

    const showPassword = () => {
        (showPasswordType === 'password')
            ? setShowPasswordType('text')
            : setShowPasswordType('password')
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userLoged = await loginServices.login({
                email: userEmail,
                password: userPassword
            })
            localStorage.setItem('loggedUserToken', JSON.stringify(userLoged))

            setUserName(userLoged)
            setUserEmail('')
            setUserPassword('')
        } catch (e) {
            console.log('notificacion wrong credentials', e)
            setTimeout(() => {
                console.log('borrar notificacion')
            }, 3000)
        }
    }

    const userSessionVerify = async (token) => {
        try {
            const verify = await loginServices.verify(token)
            return verify
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        const userLogedJSON = localStorage.getItem('loggedUserToken')
        if (userLogedJSON) {
            const userSession = JSON.parse(userLogedJSON)
            const info = await userSessionVerify(userSession.token)
            if (info.status === 200) {
                setValidateToken(true)
            } else { setValidateToken(false) }
        }
    }, [user])

    return (
        <Grid container component="main" className={classes.root}>
            { validateToken && <Redirect to="/" /> }
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
            Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={({ target }) => setUserEmail(target.value)}
                            value={ userEmail }
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPasswordType}
                            id="password"
                            autoComplete="current-password"
                            value={userPassword}
                            onChange={({ target }) => setUserPassword(target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="showPassword" color="primary" />}
                            label="Show password" onChange={showPassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                                    Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={ optionNoDisp }>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={ optionNoDisp }>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}
