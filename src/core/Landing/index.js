import React from 'react'
import { Container,Typography,Paper,Link,Button } from "@material-ui/core";
import {
    ArrowRightAltOutlined
} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import './index.css'
import background1 from '../../assets/img1.jpg'
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme)=>({
    landing:{
        backgroundImage:`url(${background1})`,
        width:'98vw',
        height:'90vh',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat'
    },
    landingOverlay:{
        position:'absolute',
        minWidth:'100%',
        minHeight:'100',
        top:0,
        left:0,
        background:'none'
    },
    landingDesc:{
        position:'absolute',
        top:'30%',
        left:'50%',
        marginTop:'20%',
        padding:'2em'
    },
    landingTitle:{
        fontSize:'30px',
        color:'#191970',
        textTransform:'uppercase'
    },
    landingText:{
        fontSize:'20px',
        color:'#46423b',
        lineHeight:1.5,
        width:"75%"
    },
    landingExtra:{
        display:'inline-text',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:'10px',
    },
    landingBtn:{
        color:'#fff',
        borderRadius:'5px',
        background:'#004953',
        boxShadow:'0px 5px 25px rgba(65, 84, 241, .3)'
    }
}))



export default function Landing(){
    
    const classes = useStyles()

    const history = useHistory()

    const handleBtn = ()=>{
        history.push('/login')
    }

    return (
        <Paper className={classes.landing}>
            <div className={classes.landingOverlay}>
                <Container>
                    <div className={classes.landingDesc}>
                        <Typography variant="h1" className={classes.landingTitle}>Welcome To Kierstan</Typography>
                        <br/>
                        <br/>
                        <Typography variant="h4" className={classes.landingText}>
                            Kierstan is an online platform where students can take quizes in 
                            various topics.
                        </Typography>
                        <div className={classes.landingExtra}>
                            <Link onClick={handleBtn} >
                                <Button variant="contained"
                                    className={classes.landingBtn}
                                    startIcon={<ArrowRightAltOutlined/>}
                                    size="medium"
                                >
                                    Proceed To Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </Paper>
    )
}