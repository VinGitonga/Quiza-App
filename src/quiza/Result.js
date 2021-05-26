import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {detailsQuiza, responsesQuiza} from '../redux/actions/quiza'
import {useHistory,useParams} from 'react-router-dom'
import {Collapse, Divider, Typography, Button, Card,message, Descriptions,Space} from 'antd'
import Spinning from '../components/Spinning'
import {CaretRightOutlined} from '@ant-design/icons'
import {IoCheckmarkDoneOutline, IoDiscOutline, IoCloseOutline,IoWarningOutline} from 'react-icons/io5'
import {Helmet} from 'react-helmet'

const Result = () =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {quizaId} = useParams()
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const quizaDetails = useSelector(state=> state.quizaDetails)
    const {
        loading: loadingDetails,
        error: errorDetails,
        quiza
    } = quizaDetails

    const quizaResponses = useSelector(state=> state.quizaResponses)
    const {
        loading: loadingResponses,
        error: errorResponses,
        attemptInfo
    } = quizaResponses

    const [visible, setVisible] = useState(true)

    /**
     * 
     * @param {*} response 
     * @returns the correct Icon that indicate whether the Person got the question correct or not
     */
    const respIcon = (response) =>{
        if(response.selected === response.correctAnswer){
            return <IoCheckmarkDoneOutline style={{color:'green', marginLeft:'3px'}}/>
        }else if(response.selected === null){
            return <IoWarningOutline style={{color:'goldenrod',marginLeft:'3px'}}/>
        }else{
            return <IoCloseOutline style={{color:'red',marginLeft:'3px'}}/>
        }
    }

    useEffect(()=>{
        if(userInfo){
            dispatch(
                detailsQuiza({
                    quizaId: quizaId
                })
            )
            dispatch(
                responsesQuiza({
                    quizaId: quizaId
                })
            )
        }else{
            history.push('/login')
        }
    }, [dispatch, history, quizaId, userInfo])


    /**
     * Handle Spinning
     */
    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            },2000)
        }
    },[visible])

    const {Title} = Typography
    const {Panel} = Collapse

    const rootStyle = {
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }

    const cardStyle = {
        width:'88%',
        borderRadius:'25px',
        borderTop:'2px solid #151e3d',
        paddingTop:'10px'
    }



    return visible ? (
        <Spinning visible={visible}/>
    ):(
        <div style={rootStyle}>
            <Helmet>
                <title>Results | Kierstan</title>
            </Helmet>
            <Card style={cardStyle}>
                <Divider plain>
                    <Title level={3}>Results</Title>
                </Divider>
                {loadingDetails ? (
                    <Spinning visible={loadingDetails}/>
                ): errorDetails ? (
                    message.error(errorDetails, 5)
                ): (quiza && quiza !== undefined) && (
                    <>
                        <Descriptions>
                            <Descriptions.Item label="Quiza">{quiza.name}</Descriptions.Item>
                        </Descriptions>
                    </>
                )}
                {loadingResponses ? (
                    <Spinning visible={loadingResponses}/>
                ): errorResponses ? (
                    message.error(errorResponses, 5)
                ): (attemptInfo && attemptInfo !== undefined) && (
                    <div>
                        <Descriptions>
                            <Descriptions.Item label="Scored">{attemptInfo.score} Out Of {attemptInfo.responses.length}</Descriptions.Item>
                        </Descriptions>
                        <Divider plain>
                            <Title level={3}>
                                Responses
                            </Title>
                        </Divider>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={[1]}
                            expandIcon={({isActive})=> <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            >
                                {attemptInfo.responses.map(resp=>(
                                    <Panel header={<span>{resp.description} {respIcon(resp)}</span>} key={resp.quesId}>
                                        <Space direction="vertical">
                                            {resp.options.map(opt=>(
                                                <Button type="text" key={opt._id}>
                                                    {<IoDiscOutline style={{color: resp.correctAnswer === opt.text ? 'green' : (resp.selected === opt.text ? 'red' : 'black')}}/>}
                                                    <span style={{color: resp.correctAnswer === opt.text ? 'green' : (resp.selected === opt.text ? 'red' :'black')}}>{opt.text}</span>
                                                </Button>
                                            ))}
                                        </Space>
                                    </Panel>
                                ))}
                        </Collapse>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default Result;