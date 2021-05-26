import React, { useState, useEffect } from "react";
import {
    Form, Button, Card, Input, Alert, Row, Col, message, notification,
    Typography,Spin
} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {QuestionAnswerRounded, MailOutlineSharp, SmokingRoomsOutlined, VpnKey,LockOpen, Lock} from '@material-ui/icons'
import {loginUser} from '../redux/actions/user'
import {useHistory} from 'react-router-dom'
import Spinning from '../components/Spinning'
import {Helmet} from 'react-helmet'

const Login = ()=>{
    const [values, setValues] = useState({
        email:'',
        password:''
    })

    const [form] = Form.useForm()

    const history = useHistory()

    const dispatch = useDispatch()

    const userLogin = useSelector(state=> state.userLogin)
    const {
        loading, error,userInfo, success
    } = userLogin

    const clickSubmit = () =>{
        const user ={
            email: values.email || undefined,
            password: values.password || undefined
        }

        dispatch(
            loginUser(user)
        )
    }

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const {Link} = Typography

    const [visible, setVisible] = useState(true)

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, 2000)
        }
    }, [visible])

    const styling = {
        borderRadius:'25px',
        border:'2px solid #73ad21',
        padding:'10px'
    }

    const handleBtn = () =>{
        history.push('/register')
    }

    useEffect(()=>{
        if(success || userInfo || (success && userInfo)){
            history.push('/dashboard')
            form.resetFields()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success,userInfo,history])

    if(success){
        return (
            <>
               {success && notification.open({
                   message:`Welcome Back`,
                   duration:7,
                   description: `${userInfo.user.name}`,
                   icon:<SmokingRoomsOutlined/>
               })}
            </>
        )
    }


    return visible ? (
        <Spinning visible={visible}/>
    ): (
        <Row justify="center" gutter={32}>
            <Helmet>
                <title>Login | Kierstan</title>
            </Helmet>
            <Col span={12} offset={6}>
                <Card style={{width:'400px'}}>
                    <Alert
                        banner
                        message="Welcome Back"
                        description="Login with your email and password"
                        icon={<VpnKey style={{fontSize:'64px'}}/>}
                    />
                    <br/>
                    <br/>
                    {error && message.error(error, 7)}
                    {loading && <Spin tip='Loading ...' delay={1000}/>}
                    <Form
                        name="normal-login"
                        onFinish={clickSubmit}
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{required:true, message:'Input your email address'}]}
                        >
                            <Input
                                prefix={<MailOutlineSharp/>}
                                type="email"
                                placeholder="you@email.com"
                                value={values.email}
                                style={styling}
                                onChange={handleChange('email')}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{required:true, message:'Input your password'}]}
                        >
                            <Input.Password
                                prefix={<Lock/>}
                                type="password"
                                style={styling}
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange('password')}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="middle"
                                shape="round"
                                icon={<LockOpen/>}
                            >{' '}Sign In </Button>
                        </Form.Item>
                    </Form>
                    <Link onClick={handleBtn}>
                        New User {<QuestionAnswerRounded/>} Register 
                    </Link>
                </Card>
            </Col>
        </Row>
    )
}

export default Login