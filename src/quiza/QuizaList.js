import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listQuizas,removeQuiza,updateQuiza,enroll,myEnrolledQuizas,fines} from '../redux/actions/quiza'
import {List, Avatar,Card,Typography, message, Button, Modal,notification,Form,Input,Slider,Col,Row, Divider,Tooltip} from 'antd'
import {ExclamationCircleOutlined, SettingOutlined, EllipsisOutlined, EditOutlined} from '@ant-design/icons'
import avr from '../assets/reacty.png'
import Spinning from '../components/Spinning'
import {Helmet} from 'react-helmet'
import {QUIZA_UPDATE_RESET} from '../redux/constants/quiza'
import {useHistory} from 'react-router-dom'
import avr2 from '../assets/img2.jpg'
//import axios from 'axios'


const QuizaList = () =>{
    const dispatch = useDispatch();
    const history = useHistory()
    const [form] = Form.useForm()
    const quizaList = useSelector(state => state.quizaList)
    const {
        loading, quizas, error,
    } = quizaList;

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const quizaRemove = useSelector(state=> state.quizaRemove)
    const {
        loading: loadingRemove,
        error: errorRemove,
        success: successRemove
    } = quizaRemove

    const quizaEnroll = useSelector(state=> state.quizaEnroll)
    const {
        loading: loadingEnroll,
        error: errorEnroll,
        success: successEnroll
    } = quizaEnroll

    const quizaMyEnrolledList = useSelector(state=> state.quizaMyEnrolledList)
    const {
        loading: loadingMyEnrolledList,
        error: errorMyEnrolledList,
        quizas: quizasEnrolled
    } = quizaMyEnrolledList;

    const quizaFines = useSelector(state=> state.quizaFines)

    const {
        loading: loadingFines,
        error: errorFines,
        success: successFines
    } = quizaFines;

    useEffect(()=>{
        if(userInfo || (userInfo && successRemove) || (userInfo && successFines) ||(userInfo && successEnroll)){
            dispatch(listQuizas())
            dispatch(
                myEnrolledQuizas({
                    userId: userInfo.user._id
                })
            )
        }
    },[userInfo,dispatch,successRemove,successEnroll,successFines])



    const {Title} = Typography
    const {confirm} = Modal

    const [values, setValues] = useState({
        name:'',
        duration:'',
        description:'',
        quiza:{},
        modalOpen:false
    });

    const quizaUpdate = useSelector(state=> state.quizaUpdate)

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success:successUpdate
    } = quizaUpdate

    const clickSubmit = () =>{
        let quizaData = new FormData();
        values.name && quizaData.append('name', values.name);
        values.duration && quizaData.append('duration', values.duration);
        values.description && quizaData.append('description', values.description)

        dispatch(
            updateQuiza({
                quizaId:values.quiza._id
            }, quizaData)
        )
    }

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const clearModal = () =>{
        setValues({...values,name:'',duration:'',description:'',quiza:{}, modalOpen:false})
        form.resetFields()
    }

    useEffect(()=>{
        if(successUpdate){
            dispatch({
                type: QUIZA_UPDATE_RESET
            })
            clearModal()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successUpdate,dispatch,values])


    /**
     * Enroll
     */
    const enrollHandler = id =>{
        dispatch(
            enroll({
                quizaId: id,
                userId: userInfo.user._id
            })
        )
    }

    /**
     * Confirm to enroll using a dialog
     */
    const enrollConfirm = id =>{
        confirm({
            title:'Confirm to enroll to this quiza ?',
            icon: <ExclamationCircleOutlined/>,
            okText:'Yes',
            okType:'primary',
            cancelText:'No',
            onOk(){
                enrollHandler(id)
            },
            onCancel(){}
        })
    }

    /**
     * Unenroll handler
     */

    

    const finesHandler = id =>{

        var data = {
            quizaId: id
        }

        console.log(data)

        dispatch(
            fines({
                userId: userInfo.user._id
            },data)
        )
    }

    /**
     * Confirm to unenroll using a dialog box
     */
    const finesConfirm = id =>{
        confirm({
            title:'Confirm to unenroll to this quiza?',
            icon: <ExclamationCircleOutlined/>,
            okText:'Yes',
            okType:'primary',
            cancelText:'No',
            onOk(){
                finesHandler(id)
            },
            onCancel(){}
        })
    }


    const styling = {
        borderRadius:'25px',
        borderTop:'1px solid #151e3d',
        padding:'10px',
        width:'700px',
    }

    const styling1 = {
        borderRadius:'25px',
        borderTop:'1px solid #151e3d',
        padding:'10px',
        width:'90%',
    }

    const rootStyle = {
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }

    const removeHandler = id =>{
        dispatch(
            removeQuiza({
                quizaId: id
            })
        )
    }

    const [visible, setVisible] = useState(true)

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            },2000)
        }
    }, [visible])

    const deleteConfirm = id =>{
        confirm({
            title:'Do you want to delete this quiza ?',
            icon: <ExclamationCircleOutlined />,
            content:'If click ok, this process you cant be undone',
            okText:'Yes',
            okType:'danger',
            cancelText:'No',
            onOk(){
                removeHandler(id)
            },
            onCancel(){}
        })
    }

    const handleBtn = id =>{
        history.push(`/quizaDetails/${id}`)
    }

    return visible ? (
        <Spinning visible={visible}/>
    ): (
        <div style={rootStyle}>
            <Helmet>
                <title>Quiza List | Kierstan</title>
            </Helmet>
            <Card title='Quiz List' style={styling}>
                {loadingRemove && <Spinning visible={loadingRemove} />}
                {errorRemove && message.error(errorRemove, 7)}
                {successRemove && notification.open({
                    message:'Success Remove',
                    description:'Quiza removed successfully!',
                    placement:'topRight',
                    duration:7,
                    type:'success'
                })}
                {(loading) ? (
                    <Spinning visible={loading} />
                ) : error ? (
                    message.error(error, 7)
                ): (quizas && quizas !== undefined) ? (
                    <List
                        itemLayout="horizontal"
                        loading={loading}
                        dataSource={quizas}
                        renderItem={quiza =>(
                           <List.Item
                               actions={[
                                   <Button type="primary" shape="round" size="small" onClick={()=> handleBtn(quiza._id)}>
                                       View Details
                                   </Button>,
                                   <Button type="primary" shape="round" size="small" onClick={()=> setValues({...values, modalOpen:true, quiza: quiza})}>
                                       Modify
                                   </Button>,
                                   <Button type="primary" shape="round" size="small" onClick={()=> deleteConfirm(quiza._id)}>
                                       Delete
                                   </Button>
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
                ): (
                    <Title>No Data</Title>
                )}
            </Card>
            <Card style={styling1}>
                <Title>Quiza List</Title>
                {successFines && notification.open({
                    message:'Success Unenrolled',
                    description:{successFines},
                    duration:7,
                    type:'success',
                    placement:'topRight'
                })}
                {loadingEnroll && <Spinning visible={loadingEnroll} />}
                {errorEnroll && message.error(errorEnroll, 7)}
                {successEnroll && notification.open({
                    message:'Successfully Enrolled',
                    description:'You have successfully enrolled to new Quiza, Good Luck!',
                    duration:7,
                    type:'success',
                    placement:'topRight'
                })}
                {loading ? (
                    <Spinning visible={loading} />
                ): error ? (
                    message.error(error, 7)
                ): (quizas && quizas !== undefined) ? (
                    <Row gutter={[24,32]} justify="space-between">
                        {quizas.map(qz=> (
                            <Col key={qz._id} span={8}>
                                <Card style={{width:300}}
                                    cover={
                                        <img
                                           alt="Quiza"
                                           src={avr2}
                                        />
                                    }
                                    actions={[
                                        <Tooltip title="Enroll to Quiza">
                                            <SettingOutlined onClick={()=> enrollConfirm(qz._id)} key="setting" />
                                        </Tooltip>,
                                        <EditOutlined key="edit"/>,
                                        <EllipsisOutlined key="ellipsis" />
                                    ]}
                                >
                                    <Card.Meta
                                       avatar={<Avatar src={avr} />}
                                       title={qz.name}
                                       description={qz.description}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ): (
                    <Title>No data</Title>
                )}
            </Card>
            <Divider plain>Your Enrolled Quizas</Divider>
            <Card style={styling1}>
                <Title>Quiza List</Title>
                {loadingFines && <Spinning visible={loadingFines} />}
                {errorFines && message.error(errorFines, 7)}
                
                {loadingMyEnrolledList ? (
                    <Spinning visible={loadingMyEnrolledList} />
                ): errorMyEnrolledList ? (
                    message.error(error, 7)
                ): (quizasEnrolled && quizasEnrolled !== undefined) ? (
                    <div>
                        {quizasEnrolled.length === 0 ? (
                            <Title level={5}>You haven't enrolled to any quizas yet</Title>
                        ): (
                            <Row gutter={[24,32]} justify="space-between">
                                {quizasEnrolled.map(quiz=> (
                                    <Col key={quiz._id} span={8}>
                                        <Card style={{width:300}}
                                            cover={
                                                <img
                                                alt="Quiza"
                                                src={avr2}
                                                />
                                            }
                                            actions={[
                                                <Button icon={<SettingOutlined />} onClick={()=> finesConfirm(quiz._id)} />,
                                                <EditOutlined key="edit"/>,
                                                <EllipsisOutlined key="ellipsis" />
                                            ]}
                                        >
                                            <Card.Meta
                                            avatar={<Avatar src={avr} />}
                                            title={quiz.name}
                                            description={quiz.description}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                ): (
                    <Title>No data</Title>
                )}
            </Card>
            <Modal
                title="Update Quiza"
                visible={values.modalOpen}
                footer={[
                    <Button key="back" shape="round" size="middle"
                       onClick={()=> setValues({...values, modalOpen:false})}
                    >Close</Button>
                ]}
            >
                {loadingUpdate && <Spinning visible={loadingUpdate}/>}
                {errorUpdate && message.error(errorUpdate, 7)}
                {successUpdate && notification.open({
                    message:'Quiz Update',
                    description:`${values.name} updated successfully!`,
                    duration:7,
                    type:'success'
                })}
                <Form
                    name="Quiza Update"
                    onFinish={clickSubmit}
                    layout="vertical"
                    wrapperCol={{span:14}}
                    form={form}
                >
                    <Form.Item
                       name="name"
                       label="Quiz Name"
                    >
                        <Input
                            type="text"
                            placeholder={values.quiza.name}
                            value={values.name}
                            onChange={handleChange('name')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Quiz Description"
                    >
                        <Input
                           type="text"
                           placeholder={values.quiza.description === '' ? 'Type a description here' : values.quiza.description}
                           value={values.description}
                           onChange={handleChange('description')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="duration"
                        label="Quiz Duration in (Min)"
                    >
                        <Slider defaultValue={5}
                            min={0}
                            max={60}
                            step={5}
                            value={values.duration}
                            onChange={e => setValues({...values, duration: e})}
                            tooltipVisible
                            tooltipPlacement="bottomLeft"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="middle"
                            shape="round"
                        >
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            
        </div>
    )
}

export default QuizaList;