import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../redux/actions/user'
import {useHistory,useParams} from 'react-router-dom'
import {message, Form, Input, Card, Button, Divider, Typography,Row,Col, Select,Space,notification} from 'antd'
import Spinning from '../components/Spinning'
import {Helmet} from 'react-helmet'


const UpdateUser = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {userId} = useParams()

    const userUpdate = useSelector(state=> state.userUpdate)
    const {
        loading,
        error,
        success
    } = userUpdate

    const [values, setValues] = useState({
        name:'',
        email:'',
        mobileNo:'',
        gender:'',
        image:'',
        physicalAddress:'',
        postalAddress:''
    })
    const [visible, setVisible] = useState(true)

    const handleChange = name => event =>{
        const value = name === 'image'
            ? event.target.files[0]
            : event.target.value
        setValues({...values, [name]: value})
    }

    const clickSubmit = () =>{
        var userData = new FormData()
        values.name && userData.append('name', values.name)
        values.email && userData.append('email', values.email)
        values.mobileNo && userData.append('mobileNo', values.mobileNo)
        values.gender && userData.append('gender', values.gender)
        values.image && userData.append('image', values.image)
        values.physicalAddress && userData.append('physicalAddress', values.physicalAddress)
        values.postalAddress && userData.append('postalAddress', values.postalAddress)

        console.log(userData)

        dispatch(
            updateUser({
                userId: userId
            }, userData)
        )
    }

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, 2000)
        }
    }, [visible])

    const {Title} = Typography
    const {Option} = Select

    useEffect(()=>{
        if(success){
            history.push(`/users/profile/${userId}`)
        }
    }, [success,history, userId])

    return visible ? (
        <Spinning visible={visible} />
    ): (
        <div>
            <Helmet>
                <title>Update User | Kierstan</title>
            </Helmet>
            <Card>
                <Divider plain>
                    <Title>Update User</Title>
                </Divider>
                {loading && <Spinning visible={loading}/>}
                {error && message.error(error, 5)}
                {success && notification.open({
                    message:'Success Update Profile',
                    description:'Your have success updated your profile',
                    duration:5,
                    placement:'topRight',
                    type:'success'
                })}
                <Form
                   name="Update User"
                   wrapperCol={{span:16}}
                   onFinish={clickSubmit}
                   layout="vertical"
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                required
                            >
                                <Input
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange('name')}
                                    placeholder="Your Name"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Email"
                                label="Email"
                                required
                            >
                                <Input
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    placeholder="you@outlook.com"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="Mobile No"
                                label="Phone No"
                                required
                            >
                                <Input
                                    type="tel"
                                    value={values.mobileNo}
                                    onChange={handleChange('mobileNo')}
                                    placeholder="Your Phone No"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Gender"
                                label="Gender"
                                required
                            >
                                <Select value={values.gender} onChange={e => setValues({...values, gender:e})} placeholder="Choose ...">
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Others">Others</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                               name="physicalAddress"
                               label="Current Location"
                               required
                            >
                                <Input type="text" value={values.physicalAddress} onChange={handleChange('physicalAddress')} placeholder="Your Current Address"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="postalAddress"
                                label="Postal Address"
                                required
                            >
                                <Input type="text" value={values.postalAddress} onChange={handleChange('postalAddress')} placeholder="Postal Address"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <Form.Item
                                name="Image"
                                label="Upload Image"
                            >
                                <input type="file" accept="image/*" onChange={handleChange('image')}/>
                                <span> {values.image ? values.image.name : 'No Image'} </span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space direction="horizontal">
                        <Button type="primary" size="large" shape="round" htmlType="submit">
                            Update
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    )
}

export default UpdateUser