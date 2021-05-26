/* eslint-disable no-restricted-globals */
/* eslint-disable no-native-reassign */
import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {createQuiza} from '../redux/actions/quiza'
import {
    Form, Input, Row, Col, notification, message, Button, Typography, Spin,Slider
} from 'antd'
import {QUIZA_CREATE_RESET} from '../redux/constants/quiza'
import {useHistory} from 'react-router-dom'
import Spinning from '../components/Spinning'
import {Helmet} from 'react-helmet'

const NewQuiza = ()=>{
    const [values, setValues] = useState({
        name:'',
        duration:5,
        description:''
    })

    const dispatch = useDispatch()
    const quizaCreate = useSelector(state => state.quizaCreate)

    const history = useHistory()

    const {
        loading, error, success,quiza
    } = quizaCreate

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const handleChange = name => event =>{
        setValues({...values, [name]:event.target.value})
    }

    const clickSubmit = () =>{
        let quizaData = new FormData()
        values.name && quizaData.append('name', values.name)
        values.duration && quizaData.append('duration', values.duration)
        values.description && quizaData.append('description', values.description)

        dispatch(
            createQuiza({
                userId: userInfo.user._id
            }, quizaData)
        )
    }

    useEffect(()=>{
        if(success){
            dispatch({
                type: QUIZA_CREATE_RESET
            })

            history.push(`/quizaDetails/${quiza._id}`)
        }
    }, [success,history,dispatch,quiza])

    const [visible, setVisible] = useState(true)

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, 2000)
        }
    },[visible])

    const {Title} = Typography

    return visible ? (
        <Spinning visible={visible}/>
    ): (
        <Row>
            <Helmet>
                <title>Create Quiza | Kierstan</title>
            </Helmet>
            <Col span={12} offset={6}>
                {error && message.error(error, 7)}
                {loading && <Spin tip="Saving Info ..." delay={500}/>}
                {success && notification.open({
                    message:'Quiza Create Success',
                    description:`${values.name} created successfully`,
                    placement:"topRight",
                    type:'success'
                })}
                <br/>
                <Title level={3}>Create New Quiza</Title>
                <br/>
                <Form
                    name="New Quiza"
                    onFinish={clickSubmit}
                    layout="vertical"
                    wrapperCol={{span:14}}
                >
                    <Form.Item
                        name="name"
                        label="Quiz Name"
                        rules={[{required:true, message:'Quiza name is required'}]}
                    >
                        <Input
                            type="text"
                            placeholder="React JS"
                            value={values.name}
                            onChange={handleChange('name')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Quiz Description"
                        rules={[{required:true, message:'Quiza description is required'},{min:10},{max:256}]}
                    >
                        <Input
                            type="text"
                            placeholder="Your Text Here"
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
                            onChange={e=> setValues({...values, duration:e})}
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
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default NewQuiza;