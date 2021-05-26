import React,{useState,useEffect,memo} from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import LockOutlined from '@material-ui/icons/LockOutlined'
import {makeStyles} from '@material-ui/core/styles'
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../redux/actions/user'
import Checkbox from '@material-ui/core/Checkbox'
import Loader from '../components/Loader'
import Snack from '../components/Snackbar'

function Copyright(){
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Copyright &copy;
            <Link color="inherit" href="https://ainosx.herokuapp.com">
               {' '} Ravens
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme)=>({
    paper:{
        marginTop: theme.spacing(8),
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    avatar:{
        margin:theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form:{
        width:'100%',
        marginTop: theme.spacing(1)
    },
    submit:{
        margin: theme.spacing(3, 0, 2)
    }
}));


const Signin = memo(({history})=>{
    const classes = useStyles()

    const [values, setValues] = useState({
        email: '',
        password:'',
    })

    //const [redirect, setRedirect] = useState(false)
    const [open, setOpen] = useState(true)

    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)

    const {userInfo, loading, error, success} = userLogin;

    const clickSubmit = ()=>{
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        dispatch(
            loginUser(user)
        )
    }


    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const handleSnackClose = () =>{
        setOpen(false)
    }


    useEffect(()=>{
        if(userInfo){
            history.push('/dashboard')
        }
    }, [userInfo, history])


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {loading && <Loader/>}
                {error && <Snack
                        title="Error during Sign up"
                        message={error}
                        open={open}
                        variant="error"
                        onClose={handleSnackClose}
                    />}
                <form className={classes.form} onSubmit={clickSubmit}>
                    <TextField
                       variant="outlined"
                       margin="normal"
                       required={true}
                       type="email"
                       fullWidth
                       id="email"
                       label="Email Address"
                       value={values.email}
                       onChange={handleChange('email')}
                       autoComplete="email"
                       autoFocus
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        type="password"
                        fullWidth
                        id="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange('password')}
                        autoComplete="Current Password"
                    />
                    <FormControlLabel
                       control={<Checkbox value="remember" color="primary" />}
                       label="Remember me"
                    />

                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign in
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    )
})

export default Signin;