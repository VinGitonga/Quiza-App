import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {detailsQuiza} from '../redux/actions/quiza'
import {useParams,useHistory} from 'react-router-dom'
import {Descriptions, Card,Typography,message,Divider,Button,Col,Row, Collapse,
       Modal,Form, Input,notification,Radio, Space,Select,Tooltip} from 'antd'
import Spinning from '../components/Spinning'
import './details.css'
import {CaretRightOutlined,PlusCircleOutlined,HighlightFilled,DeleteFilled,ExclamationCircleFilled} from '@ant-design/icons'
import {createQuestion, listQuestions, updateQuestion, removeQuestion} from '../redux/actions/question'
import { QUESTION_CREATE_RESET , QUESTION_UPDATE_RESET} from "../redux/constants/question";
import {IoNewspaperOutline} from 'react-icons/io5'
import {Helmet} from 'react-helmet'

function QuizaDetails() {
    const { quizaId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const quizaDetails = useSelector(state => state.quizaDetails)
    const [form] = Form.useForm()
    const {confirm} = Modal
    const {
        loading, error, quiza
    } = quizaDetails

    useEffect(() => {
        if (userInfo) {
            dispatch(
                detailsQuiza({
                    quizaId: quizaId
                })
            )
        } else {
            history.push('/login')
        }
    }, [userInfo, dispatch, history, quizaId])

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setVisible(false)
            }, 2000)
        }
    }, [visible])

    /**
     * Fetch question
     */

    const questionList = useSelector(state=> state.questionList)

    const {
        loading: loadingQuestions,
        error: errorListQuestions,
        questions
    } = questionList

    

    /**
     * Create / Update Quiza
     */

    
    const [questionModal, setQuestionModal] = useState(false)
    const [questionId, setQuestionId] = useState(null)
    const [modify, setModify] = useState(false)

    const [values, setValues] = useState({
        option1: '',
        option2:'',
        option3:'',
        option4:'',
        correctOption:''
    })

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const handleCreateBtn = () =>{
        setQuestionModal(true)
    }

    const clearModal = () =>{
        setValues({...values, option1:'', option2:'', option3:'', option4:'', correctOption:''})
        setQuestionModal(false)
        setModify(false)
    }

    const questionCreate = useSelector(state=> state.questionCreate)

    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate
    } = questionCreate

    useEffect(()=>{
        if(successCreate){
            dispatch({
                type: QUESTION_CREATE_RESET
            })
            clearModal()
            form.resetFields()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, successCreate])


    const clickSubmit = () =>{
        

        let options = [
            {text: values.option1},
            {text: values.option2},
            {text: values.option3},
            {text: values.option4}
        ]

        let data ={
            description: values.description,
            options: options,
            correctAnswer: values.correctOption
        }

        dispatch(
            createQuestion({
                quizaId: quizaId
            }, data)
        )
    }

    /**
     * Modify Question
     */

    const questionUpdate = useSelector(state=> state.questionUpdate)

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = questionUpdate;

    const modifyQuestion = () =>{
        let options = [
            {text: values.option1},
            {text: values.option2},
            {text: values.option3},
            {text: values.option4}
        ]

        let data = {
            description: values.description,
            correctAnswer: values.correctOption,
            options: options
        }

        dispatch(
            updateQuestion({
                questionId: questionId
            }, data)
        )
    }

    const handleBtnModify = id =>{
        setModify(true)
        setQuestionId(id)
        setQuestionModal(true)
    }

    /**
     * Remove Question
     */

    const questionRemove = useSelector(state=> state.questionRemove)
    const {
        loading: loadingRemove,
        error: errorRemove,
        success: successRemove
    } = questionRemove

    const removeHandler = id =>{
        dispatch(
            removeQuestion({
                questionId: id
            })
        )
    }

    const removeConfirm = id =>{
        confirm({
            title:'Are you sure you want remove this question ?',
            icon: <ExclamationCircleFilled />,
            content:'If Click Ok, you cant undo!',
            okText:'Yes',
            okType:'danger',
            cancelText:'No',
            onOk(){
                removeHandler(id)
            },
            onCancel(){}
        })
    }

    useEffect(()=>{
        if(userInfo || (userInfo && successCreate) || (userInfo && successUpdate) || (userInfo && successRemove)){
            dispatch(
                listQuestions({
                    quizaId: quizaId
                })
            )
        }
    },[quizaId, dispatch, userInfo, successCreate,successUpdate,successRemove])


    useEffect(()=>{
        if(successUpdate){
            dispatch({
                type: QUESTION_UPDATE_RESET
            })
            clearModal()
            form.resetFields()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successUpdate,dispatch])

    const handleSubmissionsBtn = () =>{
        history.push(`/quizas/submissions/${quizaId}`)
    }



    const cardStyle = {
        width: '88%',
        borderRadius: '25px',
        borderTop: '2px solid #151e3d',
        paddingTop: '10px'
    }

    const rootStyle = {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const titleStyle = {
        fontWeight: '800',
        color: '#004953',
        textAlign: 'center',
        marginBottom: '15px'
    }

    const labelStyle = {
        color: '#01796f',
        margin: 0,
        fontSize: '16px',
        fontWeight: '700'
    }

    const { Title } = Typography
    const { Panel } = Collapse
    const { TextArea } = Input
    const { Option } = Select
   

    return visible ? (
        <Spinning visible={visible} />
    ) : (
        <div style={rootStyle}>
            <Helmet>
                <title>Quiza Details | Kierstan</title>
            </Helmet>
            <Card style={cardStyle}>
                <Title level={3} style={titleStyle}>Quiza Details</Title>
                {loadingRemove && <Spinning visible={loadingRemove} />}
                {errorRemove && message.error(errorRemove, 7)}
                {loading ? (
                    <Spinning visible={loading} />
                ) : error ? (
                    message.error(error, 7)
                ) : (quiza && quiza !== undefined) ? (
                    <Descriptions style={{ paddingTop: '10px' }} labelStyle={labelStyle} layout="vertical">
                        <Descriptions.Item label="Name">{quiza.name}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{quiza.duration}{' '}min </Descriptions.Item>
                        <Descriptions.Item label="Quiza Code">{quiza.quizaCode}</Descriptions.Item>
                        <Descriptions.Item label="Description" span={2}>{quiza.description}</Descriptions.Item>
                    </Descriptions>
                ) : (
                    <Title level={4}>No Data yet!</Title>
                )}
                <br />
                <br />
                <Divider plain>Questions</Divider>
                <Button size="middle" shape="round" type="primary" htmlType="button" onClick={handleCreateBtn}>
                    {<PlusCircleOutlined />} Create New Question
                </Button>
                <Button size="middle" shape="round" type="primary" htmlType="button" style={{float:'right'}} onClick={handleSubmissionsBtn}>
                    {<IoNewspaperOutline />} View Submissions
                </Button>
                <div className="questions-section">
                    {loadingQuestions ? (
                        <Spinning visible={loadingQuestions} />
                    ): errorListQuestions ? (
                        notification.open({
                            message:'Error Fetching the Question',
                            description:{errorListQuestions},
                            duration:7,
                            type:'error',
                            placement:'topRight'
                        })
                    ): (questions && questions !== undefined) ? (
                        <div>
                            {questions.length === 0 ? (
                                <Title level={4}>There are not questions yet. Create some first!</Title>
                            ): (
                                <Collapse
                                   bordered={false}
                                   defaultActiveKey={['1']}
                                   expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                   className="collapse"
                                >
                                    {questions.map(qst => (
                                        <Panel header={qst.description} key={qst._id} className="panel" extra={[
                                            <Space>
                                                <Tooltip title="Modify Question" color="cyan">
                                                    <Button type="primary" size="small" icon={<HighlightFilled/>} onClick={()=> handleBtnModify(qst._id)} shape="circle"/>
                                                </Tooltip>
                                                <Tooltip title="Remove Question" color="cyan">
                                                    <Button type="primary" size="small" icon={<DeleteFilled/>} shape="circle" onClick={()=> removeConfirm(qst._id)} />
                                                </Tooltip>
                                            </Space>
                                        ]}>
                                            <Space direction="vertical">
                                                {qst.options.map(opt=>(
                                                    <Radio.Group defaultValue={qst.correctAnswer === opt.text ? opt.text : ''}>
                                                        <Space direction="vertical">
                                                            <Radio value={opt.text} >{opt.text}</Radio>
                                                        </Space>
                                                    </Radio.Group>
                                                ))}
                                            </Space>
                                        </Panel>
                                    ))}
                                </Collapse>
                            )}
                        </div>
                    ): (
                        <Title level={4}>No Data yet</Title>
                    )}
                </div>
            </Card>
            <Modal
                title={modify ? "Question Update": "Question Create"}
                visible={questionModal}
                footer={[
                    <Button key="back" shape="round" size="middle"
                       onClick={()=> {
                           setQuestionModal(false)
                           setModify(false)
                       }}
                    >Close</Button>
                ]}
                width={1000}
            >
                {modify ? (
                    <div>
                        {loadingUpdate && <Spinning visible={loadingUpdate}/>}
                        {errorUpdate && message.error(errorUpdate, 7)}
                        {successUpdate && notification.open({
                            message:'Success Update',
                            description:"You have successfully updated the question",
                            duration:7,
                            placement:'topRight'
                        })}
                    </div>
                ): (
                    <div>
                        {loadingCreate && <Spinning visible={loadingCreate}/>}
                        {errorCreate && message.error(errorCreate, 7)}
                        {successCreate && notification.open({
                            message:'Success Save',
                            description:'You have successfully saved the question',
                            duration:7,
                            type:'success',
                            placement:'topRight'
                        })}
                    </div>
                )}
                <Form
                    name={modify ? "Question Update": "Question Create"}
                    form={form}
                    onFinish={modify ? modifyQuestion : clickSubmit}
                    layout="vertical"
                    wrapperCol={{span:14}}
                >
                    <Form.Item
                       name="description"
                       label="Question"
                       required
                    >
                        <TextArea placeholder="Type description here" showCount autoSize value={values.description} onChange={handleChange('description')} allowClear/>
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="option1"
                                label="Option 1"
                                required
                            >
                                <Input
                                    type="text"
                                    value={values.option1}
                                    onChange={handleChange('option1')}
                                    placeholder="Option 1"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                               name="option2"
                               label="Option 2"
                               required
                            >
                                <Input
                                    type="text"
                                    value={values.option2}
                                    onChange={handleChange('option2')}
                                    placeholder="Option 2"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="option3"
                                label="Option 3"
                                required
                            >
                                <Input
                                    type="text"
                                    value={values.option3}
                                    onChange={handleChange('option3')}
                                    placeholder="Option 3"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="option4"
                                label="Option 4"
                                required
                            >
                                <Input
                                    type="text"
                                    value={values.option4}
                                    onChange={handleChange('option4')}
                                    placeholder="Option 4"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                       name="correctOption"
                       label="Correct Option"
                       required={[{required: true, message:'Choose the correct option'}]}
                    >
                        <Select value={values.correctOption} onChange={e=> setValues({...values, correctOption:e})} placeholder="Choose ...">
                            <Option value={values.option1}>{values.option1}</Option>
                            <Option value={values.option2}>{values.option2}</Option>
                            <Option value={values.option3}>{values.option3}</Option>
                            <Option value={values.option4}>{values.option4}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="medium" shape="round">
                            {modify ? "Update" : "Create"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default QuizaDetails;