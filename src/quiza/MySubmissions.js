import React ,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {mySubmissionsList} from '../redux/actions/quiza'
import {useHistory} from 'react-router-dom'
import Spinning from '../components/Spinning'
import {Divider, message, List, Button, Card, Typography, Tooltip,Avatar} from 'antd'
import avr from '../assets/reacty.png'
import {IoChevronForwardOutline} from 'react-icons/io5'
import {Helmet} from 'react-helmet'

const MySubmissions = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const quizaListMySubmissions = useSelector(state=> state.quizaListMySubmissions)
    const {
        loading,
        error,
        quizas
    } = quizaListMySubmissions

    useEffect(()=>{
        if(userInfo){
            dispatch(
                mySubmissionsList({
                    userId: userInfo.user._id
                })
            )
        }else {
            history.push('/login')
        }
    },[dispatch, history, userInfo])

    const handleBtn = id =>{
        history.push(`/results/${id}`)
    }

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

    const [visible, setVisible] = useState(true)
    const {Title,Text} = Typography

    useEffect(()=>{
        if(visible){
            setTimeout(() => {
                setVisible(false)
            }, 2000);
        }
    },[visible])

    return visible ? (
        <Spinning visible={visible} />
    ): (
        <div style={rootStyle}>
            <Helmet>
                <title>My Submissions | Kierstan</title>
            </Helmet>
            <Card style={cardStyle}>
                <Divider plain>
                    <Title level={3}>My Submissions</Title>
                </Divider>
                {loading ? (
                    <Spinning visible={loading} />
                ): error ? (
                    message.error(error, 5)
                ): (quizas && quizas !== undefined) ? (
                    <div>
                        {quizas.length === 0 ? (
                            <Text>You have submitted any quizas yet. Take some yoo!</Text>
                        ): (
                            <List
                                itemLayout="horizontal"
                                dataSource={quizas}
                                renderItem={quiza=> (
                                    <List.Item
                                        key={quiza._id}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={avr}/>}
                                            title={quiza.quizaId.name}
                                            description={`Scored: ${quiza.score}`}
                                        />
                                        <Tooltip title="View Results">
                                            <Button type="dashed" icon={<IoChevronForwardOutline/>} size="large" shape="circle" onClick={()=> handleBtn(quiza.quizaId._id)} />
                                        </Tooltip>
                                    </List.Item>
                                )}
                            />
                        )}
                    </div>
                ):(
                    <Text>No Data</Text>
                )}
            </Card>
        </div>
    )
}

export default MySubmissions;