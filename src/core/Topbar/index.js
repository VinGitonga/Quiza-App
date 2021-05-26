import React from 'react'
import {
    AppBar,
    CssBaseline,
    Toolbar,
    Button,
    Typography,
    Link
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector,useDispatch} from 'react-redux'
import {logoutUser} from '../../redux/actions/user'
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme)=>({
    appBar:{
        borderBotton:`1px solid ${theme.palette.divider}`,
        background:'linear-gradient(90deg, rgba(131,58,180,1)0%, rgba(253, 29,29,1)50%, rgba(252,176,69,1)100%)'
    },
    toolBar:{
        flexWrap:'wrap'
    },
    toolbarTitle:{
        flexGrow:1
    },
    link:{
        margin: theme.spacing(1, 1.5)
    },
    buttonLogout:{
        float:'right'
    },
    logo1:{
        color:'#004953',
        fontSize:'35px',
        fontWeight:600
    },
    logo2:{
        color:'#b2ffff'
    },
    navCont:{
        color:'#fff',
        fontSize:'18px',
        fontWeight:500, margin: theme.spacing(1, 1.5)
    }
}))

const Topbar = ()=>{

    const classes = useStyles()
    const history = useHistory()

    const userLogin = useSelector(state=> state.userLogin)
    const {
        userInfo
    } = userLogin

    const dispatch = useDispatch()

    const logout = ()=>{
        dispatch(logoutUser())
    }

    const handleLogo = () =>{
        history.push('/dashboard')
    }

    const handleCreate = () =>{
        history.push('/newQuiza')
    }

    const handleLogin = () =>{
        history.push('/login')
    }

    const handleRegister = () =>{
        history.push('/register')
    }

    const handleList = () =>{
        history.push('/quizaList')
    }

    const handleDash = () =>{
        history.push('/quizas/main')
    }

    const handleMy = () =>{
        history.push('/quizas/myquizas')
    }

    const handleAll = () =>{
        history.push('/quizas/all')
    }



    return (
        <>
           <CssBaseline/>
           <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
               <Toolbar className={classes.toolBar}>
                   <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                       <Link className={classes.logo1} onClick={handleLogo}>
                           Kier<span className={classes.logo2}>stan</span>
                       </Link>
                   </Typography>
                   {userInfo ? (
                        <nav>
                            <Button variant="outlined" color="primary" onClick={handleCreate}>
                                Create New Quiz
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleList}>
                                Quiza List
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleDash}>
                                Quizas Section
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleMy}>
                                My Quizas
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleAll}>
                                All Quizas
                            </Button>
                            <Button variant="outlined" color="primary" className={classes.buttonLogout} onClick={logout}>
                                Logout
                            </Button>
                        </nav>
                   ): (
                    <>
                        <nav>
                            <Link className={classes.navCont} variant="button" color="textPrimary" href="#">
                                    About Us
                                </Link>
                                <Link className={classes.navCont} variant="button" color="textPrimary" href="#" >
                                    Contact
                                </Link>
                        </nav>
                        <Button onClick={handleLogin} color="primary" variant="outlined" className={classes.link}>
                            Sign in
                        </Button>
                        <Button onClick={handleRegister} color="primary" variant="outlined" className={classes.link}>
                            Register
                        </Button>
                    </>
                   )}
               </Toolbar>
           </AppBar>
        </>
    )
}

export default Topbar;