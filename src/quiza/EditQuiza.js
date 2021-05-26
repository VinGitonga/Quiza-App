import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {updateQuiza} from '../redux/actions/quiza'
import {QUIZA_UPDATE_RESET} from '../redux/constants/quiza'
import {Form, Button, Input,message, notification, Slider,Row} from 'antd'
import Spinning from '../components/Spinning'


const EditQuiza = ({quizaId}) =>{
    const [values, setValues] = useState({
        name:'',
        description:'',
        duration:0
    })

    const [form] = Form.useForm()

    const dispatch = useDispatch()
    const quizaUpdate = useSelector(state=> state.quizaUpdate)

    const {
        loading: loadingUpdate,
        success: successUpdate,
        error: errorUpdate
    } = quizaUpdate


    const clickSubmit = () =>{
        var quizaData = new FormData()
        values.name && quizaData.append('name', values.name)
        values.description && quizaData.append('description', values.description)
        values.duration && quizaData.append('duration', values.duration)

        dispatch(
            updateQuiza({
                quizaId:quizaId
            }, quizaData)
        )
    }

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const clearModal = () =>{
        setValues({...values, name:'',description:'',duration:0})
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
    }, [successUpdate, dispatch])

    return (
        <Row>
            {loadingUpdate && <Spinning visible={loadingUpdate} />}
            {errorUpdate && message.error(errorUpdate, 5)}
            {successUpdate && notification.open({
                message:'Quiza Update',
                description:'You have successfully updated the Quiza',
                duration:5,
                type:'success',
                placement:'topLeft'
            })}
            <Form
                name="Quiza Update"
                form={form}
                onFinish={clickSubmit}
                wrapperCol={{span:14}}
                layout="vertical"
            >
                <Form.Item
                   name="name"
                   label="Quiza Name"
                   required
                >
                    <Input
                        type="text"
                        value={values.name}
                        placeholder="Quiz Name"
                        onChange={handleChange('name')}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    required
                >
                    <Input
                        type="text"
                        value={values.description}
                        placeholder="Add New Description"
                        onChange={handleChange('description')}
                    />
                </Form.Item>
                <br/>
                <Form.Item
                    name="duration"
                    label="Duration"
                >
                    <Slider
                       min={0}
                       max={60}
                       step={5}
                       value={values.duration}
                       onChange={e=> setValues({...values, duration:e})}
                       tooltipVisible
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="middle" shape="round" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    )
}

export default EditQuiza;