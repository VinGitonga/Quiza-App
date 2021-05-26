import React,{useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import { 
   Box,
   Container,
   Grid,
   Card,
   CardContent,
   Typography
 } from "@material-ui/core";

 import {
     ArrowUpward,
     BarChartRounded,
     NoteAddOutlined,
     EventNoteOutlined,
     QuestionAnswerRounded,
     ChatBubbleRounded
 } from '@material-ui/icons'

import {useSelector} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import './index.css'
 

const useStyles = makeStyles((theme)=>({
    heading:{
        marginTop:'10px',
        alignItems:'center',
        textAlign:'center',
        textTransform:'uppercase'
    }
}))

 
const Dashboard = ()=>{

    const classes = useStyles()
    const [loading, setLoading] = useState(false)

    const userLogin = useSelector(state=> state.userLogin)

    const {userInfo} = userLogin;

    useEffect(()=>{
        if(userInfo){
            setLoading(true)
        }
    }, [userInfo, loading])


    return (
    <>
       <Helmet>
           <title>Dashboard | Kierstan</title>
       </Helmet>
       <Box
          sx={{
              backgroundColor:'background.default',
              minHeight:'100%',
              py:3
          }}
        >
            <Container maxWidth={false} style={{marginTop:'10px'}}>
                <Typography variant="h2" component="h1" className={classes.heading}>
                    Dashboard
                </Typography>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="card" style={{
                            background:'linear-gradient(80deg, rgba(2,0,36,1)0%, rgba(141, 58, 88, 0.6675431027131922)59%, rgba(0,212,255,1)100%)'
                        }}>
                            <CardContent className="p-3">
                                <div className="card-content1">
                                    <div className="card-box">
                                        <small>
                                            New Students
                                        </small>
                                        <span>5412</span>
                                    </div>
                                    <div className="icon">
                                        <div className="icon-box">
                                            <BarChartRounded/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-extra">
                                    <ArrowUpward className="icon1"/>
                                    <span>15.1%</span>
                                    <span style={{float:'right'}}>Increase this Semester</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <Card className="card" style={{
                            background:'linear-gradient(80deg, rgba(2,0,36,1)0%, rgba(141, 58, 88, 0.6675431027131922)59%, rgba(0,212,255,1)100%)'
                        }}>
                            <CardContent className="p-3">
                                <div className="card-content1">
                                    <div className="card-box">
                                        <small>
                                            Quizes Attempted
                                        </small>
                                        <span>243</span>
                                    </div>
                                    <div className="icon">
                                        <div className="icon-box">
                                            <NoteAddOutlined/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-extra">
                                    <EventNoteOutlined className="icon1" />
                                    <span>2.36%</span>
                                    <span style={{float:'right'}}>New Attempts</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <Card className="card" style={{
                            background:'linear-gradient(80deg, rgba(2,0,36,1)0%, rgba(141, 58, 88, 0.6675431027131922)59%, rgba(0,212,255,1)100%)'
                        }}>
                            <CardContent className="p-3">
                                <div className="card-content1">
                                    <div className="card-box">
                                        <small>
                                            New Quizes generated
                                        </small>
                                        <span>
                                            109
                                        </span>
                                    </div>
                                    <div className="icon">
                                        <div className="icon-box">
                                            <QuestionAnswerRounded/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-extra">
                                    <ChatBubbleRounded className="icon1"/>
                                    <span>11.49%</span>
                                    <span style={{float:'right'}}>New Insights</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
    )
}

export default Dashboard;