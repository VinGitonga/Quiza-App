import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listQuizaSubmissions} from '../redux/actions/quiza'
import {useHistory,useParams} from 'react-router-dom'
import {Divider,List,message,Card,Typography,Avatar,Button,Tooltip} from 'antd'
import Spinning from '../components/Spinning'
import avr from '../assets/reacty.png'
import {IoChevronForwardOutline} from 'react-icons/io5'
import {Helmet} from 'react-helmet'

const QuizaSubmissions = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {quizaId} = useParams()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    
    const quizaSubmissionsList = useSelector(state => state.quizaSubmissionsList)
    const {
        loading,
        error,
        usersResults
    } = quizaSubmissionsList;

    const {Title, Text} = Typography

    const [visible, setVisible] = useState(true)

    const handleResponsesBtn = () =>{
        history.push(`/results/${quizaId}`)
    }

    useEffect(()=>{
        if(userInfo && userInfo.user.isAdmin){
            dispatch(
                listQuizaSubmissions({
                    quizaId:quizaId
                })
            )
        }else{
            history.push('/login')
        }
    }, [dispatch, history, quizaId, userInfo])

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, 2000)
        }
    }, [visible])

    const rootStyle = {
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }

    const cardStyle = {
        width:'920px',
        borderRadius:'25px',
        borderTop:'2px solid #151e3d',
        paddingTop:'10px'
    }

    return visible ? (
        <Spinning visible={visible}/>
    ): (
        <div style={rootStyle}>
            <Helmet>
                <title>Quiza Submissions | Kierstan</title>
            </Helmet>
            <Card style={cardStyle}>
                <Divider plain>
                    <Title level={3}>Submissions</Title>
                </Divider>
                {loading ? (
                    <Spinning visible={loading}/>
                ): error ? (
                    message.error(error,5)
                ): (usersResults && usersResults !== undefined) ? (
                    <div>
                        {usersResults.length === 0 ? (
                            <Text>There are no submissions yet.</Text>
                        ): (
                            <List
                                itemLayout="horizontal"
                                dataSource={usersResults}
                                renderItem={result => (
                                    <List.Item
                                        key={result._id}
                                    >
                                        <List.Item.Meta
                                           title={result.userId.name}
                                           description={`Scored: ${result.score}`}
                                           avatar={<Avatar src={avr}/>}
                                        />
                                        <Tooltip title="View Responses">
                                            <Button type="dashed" icon={<IoChevronForwardOutline />} shape="circle" size="large" onClick={handleResponsesBtn} />
                                        </Tooltip>
                                    </List.Item>
                                )}
                            />
                        )}
                    </div>
                ): (
                    <Text>No data</Text>
                )}
            </Card>
        </div>
    )
}

export default QuizaSubmissions