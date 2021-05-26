import React,{useState,useEffect} from 'react'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch,useSelector} from 'react-redux'
import {registerUser} from '../redux/actions/user'
import {Redirect} from 'react-router-dom'
import Loader from '../components/Loader'
import Snack from '../components/Snackbar'


const useStyles = makeStyles((theme)=>({
    paper:{
        marginTop:theme.spacing(8),
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
        marginTop:theme.spacing(3)
    },
    submit:{
        margin: theme.spacing(3, 0, 2)
    }
}))



const Signup = ()=>{

    const classes = useStyles()

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        mobileNo:'',
        open:true,
        redirect:false
    })

    const dispatch = useDispatch()

    const userRegister = useSelector(state=> state.userRegister)

    const {
        loading, error, success, userInfo
    } = userRegister

    const handleChange = name => event=>{
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = () =>{
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            mobileNo: values.mobileNo || undefined
        }

        dispatch(
            registerUser(user)
        )
    }

   useEffect(()=>{
       if(userInfo){
           setValues({...values, redirect:true})
       }
       if(success){
           setValues({
               ...values,redirect:true
           })
       }
   },[success,userInfo,values])

   const handleSnackClose = ()=>{
       setValues({...values, open:false})
   }

   if(values.redirect){
       return (
           <Redirect to='/signin'/>
       )
   }

    

    

    return  (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {loading && (
                    <Loader/>
                )}
                {success && (
                    <Snack
                       title="Registration success!"
                       message={`${values.name} your account has been created successfully`}
                       onClose={handleSnackClose}
                       open={values.open}
                       variant="success"
                    />  
                )}
                {error && (
                    <Snack
                        title="Error in Registration"
                        message={error}
                        variant="error"
                        onClose={handleSnackClose}
                        open={values.open}
                    />
                )}
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                               variant="outlined"
                               required
                               type="text"
                               fullWidth
                               value={values.name}
                               label="Name"
                               onChange={handleChange('name')}
                               id="name"
                               autoComplete="Name"
                               placeholder="John Snow"
                               autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={values.email}
                                type="email"
                                id="email"
                                label="Email Address"
                                onChange={handleChange('email')}
                                autoComplete="email"
                                placeholder="john.snow@stack.org"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                type="password"
                                fullWidth
                                value={values.password}
                                id="password"
                                label="Password"
                                onChange={handleChange('password')}
                                autoComplete="password"
                                placeholder="Password"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="tel"
                                value={values.mobileNo}
                                id="mobileNo"
                                label="Mobile No"
                                onChange={handleChange('mobileNo')}
                                autoComplete="+254716457824"
                                placeholder="+254716456123"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Button
                       type="submit"
                       fullWidth
                       variant="contained"
                       color="primary"
                       className={classes.submit}
                       onClick={clickSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Signup;