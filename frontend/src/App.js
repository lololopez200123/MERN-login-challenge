import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Register from 'pages/Register'
import { ThemeProvider } from '@material-ui/core/styles'
import themeConfig from 'themeConfig'

const routes = [
    {
        key: 1,
        path: '/login',
        component: Login
    },
    {
        key: 2,
        path: '/',
        component: Home
    },
    {
        key: 3,
        path: '/register',
        component: Register
    }
]

function App () {
    return (
        <ThemeProvider theme={themeConfig}>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        {routes.map(({ path, component }) => (
                            <Route key={path} path={path} exact component={component} />
                        ))}
                        <Redirect to={routes[0].path} />
                    </Switch>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    )
}

export default App
