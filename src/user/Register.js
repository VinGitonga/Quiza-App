import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    Form, Input, Button, Alert, Typography, message, notification,
    Row, Col, Card, Select
} from 'antd'

import {
    FaCogs, FaLock, FaPen, FaEnvelope, FaUserAlt, FaSmileWink, FaPhoneAlt
} from 'react-icons/fa'
import {registerUser} from '../redux/actions/user'
import {useHistory} from 'react-router-dom'
import Spinning from '../components/Spinning'
import {Helmet} from 'react-helmet'

const Register = ()=>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        mobilePhone:'',
        role:''
    })

    const history = useHistory()

    const dispatch = useDispatch()

    const userRegister = useSelector(state=> state.userRegister)

    const {
        loading, success, error
    } = userRegister

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }
    
    const clickSubmit = () =>{
        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
            mobileNo: values.mobilePhone,
            role: values.role
        }

        dispatch(
            registerUser(user)
        )
    }

    useEffect(()=>{
        if(success){
            history.push('/login')
        }
    }, [success,history])

    const {Link} = Typography

    const [visible, setVisible] = useState(true)
    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, 2000)
        }
    },[visible])

    const handleBtn = () =>{
        history.push('/login')
    }


    const styling = {
        borderRadius:'25px',
        border:'2px solid #73ad21',
        padding:'10px'
    }

    return visible ? (
        <Spinning visible={visible}/>
    ):(
        <Row justify="center" gutter={32}>
            <Helmet>
                <title>Register | Kierstan</title>
            </Helmet>
            <Col span={12} offset={6}>
                <Card style={{width:'400px'}}>
                    <Alert
                        banner
                        message='Get Started With Quiza'
                        description="Create an Account"
                        style={{fontSize:'24px'}}
                        icon={<FaCogs style={{color:'teal', fontSize:'64px'}}/>}
                    />
                    <br/>
                    <br/>
                    {error && message.error(error, 7)}
                    {loading && <Spinning visible={loading}/>}
                    {success && notification.open({
                        message:'Welcome to Kierstan',
                        description:'Your account has been created successfully',
                        placement:'topRight',
                        icon:<FaSmileWink/>,
                        type:'success',
                        duration:5
                    })}
                    <Form
                         name="registration form"
                         onFinish={clickSubmit}
                         layout="vertical"
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{required:true, message:'Input your name'}]}
                        >
                            <Input
                                prefix={<FaUserAlt/>}
                                type="text"
                                placeholder="Pipper Chapman"
                                value={values.name}
                                onChange={handleChange('name')}
                                style={styling}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{required:true, message:'Input your email address'}]}
                        >
                            <Input
                                prefix={<FaEnvelope/>}
                                type="email"
                                placeholder="you@email.com"
                                value={values.email}
                                onChange={handleChange('email')}
                                style={styling}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{required:true, message:'Input your password'}]}
                        >
                            <Input.Password
                                type="password"
                                placeholder="Password"
                                prefix={<FaLock/>}
                                value={values.password}
                                onChange={handleChange('password')}
                                style={styling}
                            />
                        </Form.Item>
                        <Form.Item
                            name="mobilePhone"
                            label="Mobile No"
                            rules={[{required: true, message:'Input your mobile phone no'}]}
                        >
                            <Input
                                type="tel"
                                placeholder="+254768126608"
                                prefix={<FaPhoneAlt/>}
                                value={values.mobilePhone}
                                onChange={handleChange('mobilePhone')}
                                style={styling}
                            />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{required:true, message:'Select role'}]}
                        >
                            <Select value={values.role} onChange={e => setValues({...values, role:e})} placeholder="Choose ..." bordered={false}>
                                <Select.Option value="Student">Student</Select.Option>
                                <Select.Option value="Administrator">Administrator</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="middle"
                                shape="round"
                                icon={<FaPen/>}
                            >
                               {' '} Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link onClick={handleBtn}>
                        Already have an Account? Login
                    </Link>
                </Card>
            </Col>
        </Row>
    )
}

export default Register