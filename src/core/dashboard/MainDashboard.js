import React,{useEffect,useState} from 'react'
import {
    Container, Typography, AppBar, Tabs,Tab
}  from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import {useSelector}  from 'react-redux'
import Loader from '../../components/Loader'
import Quizes from '../../quiz/Quizes'
import MyQuizes from '../../quiz/MyQuizes'

function TabPanel(props){
    return (
        <div
            role="tabpanel"
            hidden={props.value !== props.index}
            id={`simple-tabpanel-${props.index}`}
            aria-labelledby={`simple-tab-${props.index}`}
        >
            <div>{props.children}</div>
        </div>
    )
}

function MainDashboard(props){
    const [tab,setTab] = useState(0)
    
    const handleTabChange = (e, newVal) =>{
        setTab(newVal)
    }

    const [redirect, setRedirect] = useState(false)
    const [loading , setLoading] = useState(true)

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin



    useEffect(()=>{
        if(!userInfo){
            setRedirect(true)
            return
        }else {
            setLoading(false)
        }
    },[userInfo])

    if(redirect){
        return (
            <Redirect to='/'/>
        )
    }

    
    return loading ? (
        <Loader/>
    ): (
        <Container className="dashboard-page">
            <Typography variant="h4" className="dash-title">Dashboard</Typography>
            <div className="dash-section">
                <AppBar position="static" color="default" className="bg-white tab-bar">
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullwidth"
                        aria-label="full width tabs dashboard"
                    >
                        <Tab label="Generated Quizes"/>
                        <Tab label="Your Quizes"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={tab} index={0}>
                    <Quizes/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <MyQuizes/>
                </TabPanel>
            </div>
        </Container>
    )
}

export default MainDashboard;