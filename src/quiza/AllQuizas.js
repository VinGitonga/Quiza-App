import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listQuizas, removeQuiza, enroll} from '../redux/actions/quiza'
import { useHistory } from "react-router-dom";
import {Modal,List, Avatar, Card, Typography,message,notification,Tooltip,Button, Space} from 'antd'
import Spinning from '../components/Spinning'
import {Helmet} from 'react-helmet'
import {EyeOutlined,HighlightFilled,DeleteFilled,PlayCircleFilled} from '@ant-design/icons'
import avr from '../assets/reacty.png'
import EditQuiza from './EditQuiza'

const  AllQuizas = () =>{ 
    const history = useHistory()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const quizaList = useSelector(state => state.quizaList)
    const {
        loading,
        error,
        quizas
    } = quizaList;

    useEffect(()=>{
        if(userInfo){
            dispatch(
                listQuizas()
            )
        }else {
            history.push('/login')
        }
    }, [userInfo, dispatch, history])

    const quizaRemove = useSelector(state=> state.quizaRemove)
    const {
        loading: loadingRemove,
        error: errorRemove,
        success: successRemove
    } = quizaRemove;

    const quizaEnroll = useSelector(state=> state.quizaEnroll);
    const {
        loading: loadingEnroll,
        success: successEnroll,
        error: errorEnroll
    } = quizaEnroll

    const {confirm} = Modal
    const {Text,Title} = Typography

    /**
     * Remove quiza
     */

    const removeHandler = id =>{
        dispatch(
            removeQuiza({
                quizaId: id
            })
        )
    }

    const confirmRemove = id =>{
        confirm({
            title:'Are you sure you want delete this quiza?',
            okText:'Yes',
            okType:'danger',
            cancelText:'No',
            onOk(){
                removeHandler(id)
            },
            onCancel(){}
        })
    }

    /**
     * Enroll to quiza
     */

    const enrollHandler = id =>{
        dispatch(
            enroll({
                quizaId: id,
                userId: userInfo.user._id
            })
        )
    }

    const confirmEnroll = id =>{
        confirm({
            title:'Confirm to enroll to this quiza',
            okText:'Yes',
            okType:'primary',
            cancelText:'No',
            onCancel(){},
            onOk(){
                enrollHandler(id)
            }
        })
    }


    const [visible, setVisible] = useState(true)
    const [quizaId, setQuizaId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleModBtn = id =>{
        setQuizaId(id)
        setModalOpen(true)
    }

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            },2000)
        }
    },[visible])

    const handleDetailsBtn = id =>{
        history.push(`/quizaDetails/${id}`)
    }

    const cardStyle= {
        padding:'10px',
        width:'90%',
        borderRadius:'25px',
        borderTop:'1px solid #151e3d'
    }

    const rootStyle = {
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }



    return visible ? (
        <Spinning visible={visible} />
    ): (
        <div style={rootStyle}>
            <Helmet>
                <title>Quiza List | Kierstan</title>
            </Helmet>
            <Card style={cardStyle}>
                <Title>Quiza List</Title>
                {loadingRemove && <Spinning visible={loadingRemove} />}
                {successRemove && notification.open({
                    message:'Remove Quiza Success',
                    description:'Quiza was removed successfully.',
                    duration:5,
                    placement:'topLeft',
                    type:'success'
                })}
                {errorRemove && message.error(errorRemove, 5)}
                {loadingEnroll && <Spinning visible={loadingEnroll}/>}
                        {successEnroll && notification.open({
                            message:'Enroll Success',
                            description:'You have successfully enrolled to the Quiza. Good Luck!',
                            duration:5,
                            placement:'topLeft',
                            type:'success'
                        })}
                        {errorEnroll && message.error(errorEnroll, 5)}
                {userInfo.user.role === 'Administrator' || 'Teacher' ? (
                    <div>
                        {loadingRemove && <Spinning visible={loadingRemove} />}
                        {successRemove && notification.open({
                            message:'Remove Quiza Success',
                            description:'Quiza was removed successfully.',
                            duration:5,
                            placement:'topLeft',
                            type:'success'
                        })}
                        {errorRemove && message.error(errorRemove, 5)}
                    </div>
                ): (
                    <div>
                        {loadingEnroll && <Spinning visible={loadingEnroll}/>}
                        {successEnroll && notification.open({
                            message:'Enroll Success',
                            description:'You have successfully enrolled to the Quiza. Good Luck!',
                            duration:5,
                            placement:'topLeft',
                            type:'success'
                        })}
                        {errorEnroll && message.error(errorEnroll, 5)}
                    </div>
                )}
                {loading ? (
                    <Spinning visible={loading}/>
                ) : error ? (
                    message.error(error, 7)
                ): (quizas && quizas !== undefined) ? (
                    <div>
                        {quizas.length === 0 ? (
                            <Text>There are no quizas generated yet. Contact Admin </Text>
                        ): (
                            <List
                                itemLayout="horizontal"
                                dataSource={quizas}
                                renderItem={quiza =>(
                                    <List.Item
                                        key={quiza._id}
                                        actions={[
                                            <Space direction="horizontal">
                                                {userInfo && userInfo.user.role === 'Administrator' ? (
                                                    <Space direction="horizontal">
                                                        <Tooltip title="View Details">
                                                            <Button type="primary" shape="circle" size="small" icon={<EyeOutlined/>} onClick={()=>handleDetailsBtn(quiza._id)} />
                                                        </Tooltip>
                                                        <Tooltip title="Modify Detail">
                                                            <Button type="primary" shape="circle" size="small" icon={<HighlightFilled/> } onClick={()=> handleModBtn(quiza._id)} />
                                                        </Tooltip>
                                                        <Tooltip title="Remove Quiza">
                                                            <Button type="primary" shape="circle" size="small" icon={<DeleteFilled/>} onClick={()=> confirmRemove(quiza._id)} />
                                                        </Tooltip>
                                                    </Space>
                                                ): (
                                                    <Tooltip title="Enroll to Quiza">
                                                        <Button type="primary" shape="circle" size="small" icon={<PlayCircleFilled/>} onClick={()=> confirmEnroll(quiza._id)}/>
                                                    </Tooltip>
                                                )}
                                            </Space>
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
                    </div>
                ): (
                    <Text>No Data yet</Text>
                )}
            </Card>
            <Modal
                title="Update Quiza Details"
                visible={modalOpen}
                footer={[
                    <Button
                       shape="round"
                       type="primary"
                       size="small"
                       onClick={()=> setModalOpen(false)}
                    >Close</Button>
                ]}
            >
                <EditQuiza quizaId={quizaId}/>
            </Modal>
        </div>
    )
}

export default AllQuizas;