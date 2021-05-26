import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listByAuthor, myEnrolledQuizas,fines,startQuiza} from '../redux/actions/quiza'
import Spinning from '../components/Spinning'
import {Card, Typography, Modal, List, Avatar, notification, message, Button, Tooltip} from 'antd'
import {Helmet} from 'react-helmet'
import {EyeOutlined,EditFilled,PlayCircleFilled} from '@ant-design/icons'
import avr from '../assets/reacty.png'
import {useHistory} from 'react-router-dom'
import {IoReceiptOutline} from 'react-icons/io5'

const MyQuizas = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const quizaListByAuthor = useSelector(state=> state.quizaListByAuthor)
    const {
        loading,
        error,quizas
    } = quizaListByAuthor

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin;

    const quizaMyEnrolledList = useSelector(state=> state.quizaMyEnrolledList)
    const {
        loading: loadingEnrolledList,
        error: errorEnrolledList,
        quizas: quizasEnrolled
    } = quizaMyEnrolledList;

    const quizaFines = useSelector(state=> state.quizaFines)
    const {
        loading: loadingFines,
        error: errorFines,
        success: successFines
    } = quizaFines

    const quizaStart = useSelector(state=> state.quizaStart)
    const {
        loading: loadingStart,
        error: errorStart,
        success: successStart,
        quizaData,
        quizaDuration,
        quizaStatus
    } = quizaStart


    // eslint-disable-next-line no-unused-vars
    const [role, setRole] = useState(userInfo.user.role)
    const [quizaId, setQuizaId] = useState(null)

    useEffect(()=>{
        if(role === 'Administrator' || 'Teacher') {
            dispatch(
                listByAuthor({
                    userId: userInfo.user._id
                })
            )
            console.log(role)
        }
    }, [dispatch, role, userInfo])

    useEffect(()=>{
        if(role === 'Student' || (role === 'Student' && successFines)){
            dispatch(
                myEnrolledQuizas({
                    userId: userInfo.user._id
                })
            )
        }
    }, [dispatch, userInfo,role,successFines])

    const {confirm} = Modal
    const {Title, Text} = Typography

    const fineHandler = id =>{

        let data = {
            quizaId: id
        }

        dispatch(
            fines({
                userId: userInfo.user._id
            }, data)
        )
    }

    const confirmFines = id =>{
        confirm({
            title:'Confirm to Unenroll from this quiza',
            okText:'Yes',
            okType:"danger",
            cancelText:'No',
            onOk(){
                fineHandler(id)
            },
            onCancel(){}
        })
    }


    const quizaStartHandler = id =>{
        dispatch(
            startQuiza({
                quizaId:id,
                userId: userInfo.user._id
            })
        )
    }

    const confirmStartQuiza = id =>{
        confirm({
            title:'Do you confirm to start this quiza?',
            okText:'Yes',
            okType:'primary',
            cancelText:'No',
            onOk(){
                quizaStartHandler(id)
                setQuizaId(id)
            },
            onCancel(){}
        })
    }

    const handleDetailsBtn = id =>{
        history.push(`/quizaDetails/${id}`)
    }

    const handleSubmissionsBtn = () =>{
        history.push('/quizas/mysubmissions')
    }

    const [visible, setVisible] = useState(true)

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            },2000)
        }
    }, [visible])

    useEffect(()=>{
        if(successStart){
            history.push({
                pathname:'/quiza',
                state:{
                    questions: quizaData,
                    duration: quizaDuration,
                    timeStarted: Date.now(),
                    quizaId:quizaId,
                    quizaStatus: quizaStatus
                }
            })
        }
    }, [history, quizaData, quizaDuration, quizaId, quizaStatus, successStart])


    const rootStyle = {
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }

    const cardStyle = {
        borderRadius:'25px',
        borderTop:'1px solid #151e3d',
        padding:'10px',
        width:'90%'
    }

    

    return visible ? (
        <Spinning visible={visible}/>
    ): (
        <div style={rootStyle}>
            <Helmet>
                <title>My Quizas | Kierstan</title>
            </Helmet>
            <Text>{userInfo.user.role}</Text>
            <Card style={cardStyle}>
                <Title>My Quizas</Title>
                {userInfo.user.role === 'Student' && (
                    <Button type="primary" htmlType="button" size="large" shape="round" onClick={handleSubmissionsBtn}>
                        {<IoReceiptOutline/>} View My Submissions
                    </Button>
                )}
                {loadingFines && <Spinning visible={loadingFines}/>}
                {errorFines && message.error(errorFines, 5)}
                {successFines && notification.open({
                    message:'Unenroll Success',
                    description:'You have successfully unenrolled from the Quiza',
                    placement:'topLeft',
                    duration:5,
                    type:'success'
                })}
                {loadingStart && <Spinning visible={loadingStart} />}
                {errorStart && message.error(error, 5)}
                {successStart && notification.open({
                    message:'Quiza Start Success',
                    description:'You have successfully started the quiza',
                    placement:'topLeft',
                    duration:5,
                    type:'success'
                })}
                {(userInfo && userInfo.user.role === 'Administrator') ? (
                    <div>for admin fetches and errors <p> {userInfo.user.role} </p> </div>
                ): (
                    <div>
                        {loadingFines && <Spinning visible={loadingFines}/>}
                        {errorFines && message.error(errorFines, 5)}
                        {successFines && notification.open({
                            message:'Unenroll Success',
                            description:'You have successfully unenrolled from the Quiza',
                            placement:'topLeft',
                            duration:5,
                            type:'success'
                        })}
                    </div>
                )}
                <div>
                    {userInfo && userInfo.user.role === 'Administrator' ? (
                        <div>
                            {loading ? (
                                <Spinning visible={loading}/>
                            ): error ? (
                                message.error(error, 7)
                            ): (quizas && quizas !== undefined) ? (
                                <>
                                   {quizas.length === 0 ? (
                                       <Text>You haven't generated any quizas yet. Create some yoo!</Text>
                                   ): (
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={quizas}
                                        renderItem={quiza => (
                                            <List.Item
                                                key={quiza._id}
                                                actions={[
                                                    <Tooltip title="View Details">
                                                        <Button type="primary" size="small" shape="circle" icon={<EyeOutlined/>} onClick={()=> handleDetailsBtn(quiza._id)} />
                                                    </Tooltip>
                                                ]}
                                            >
                                                <List.Item.Meta
                                                    title={quiza.name}
                                                    avatar={<Avatar src={avr} />}
                                                    description={quiza.description}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                   )}
                                </>
                            ): (
                                <Text>No Data</Text>
                            )}
                        </div>
                    ): (
                        <div>
                            {loadingEnrolledList ? (
                                <Spinning visible={loadingEnrolledList} />
                            ): errorEnrolledList ? (
                                message.error(error, 5)
                            ): (quizasEnrolled && quizasEnrolled !== undefined) ? (
                                <>
                                   {quizasEnrolled.length === 0 ? (
                                       <Text>You haven't enrolled to any quizas. Enroll to some yoo! {userInfo.user.role} </Text>
                                   ): (
                                       <List
                                           itemLayout="horizontal"
                                           dataSource={quizasEnrolled}
                                           renderItem={quiza => (
                                               <List.Item
                                                   actions={[
                                                       <Tooltip title="Unenroll from quiza">
                                                           <Button type="primary" size="small" shape="circle" icon={<EditFilled/>} onClick={()=> confirmFines(quiza._id)}/>
                                                       </Tooltip>,
                                                       <Tooltip title="Start Quiza">
                                                           <Button type="primary" size="small" shape="circle" icon={<PlayCircleFilled/>} onClick={()=> confirmStartQuiza(quiza._id)} />
                                                       </Tooltip>
                                                   ]}
                                                >
                                                    <List.Item.Meta
                                                        title={quiza.name}
                                                        avatar={<Avatar src={avr}/>}
                                                        description={quiza.description}
                                                    />
                                                </List.Item>
                                           )}
                                        />
                                   )}
                                </>
                            ): (
                                <Text>No Data</Text>
                            )}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default MyQuizas;