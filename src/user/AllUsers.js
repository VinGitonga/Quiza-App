import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listUsers} from '../redux/actions/user'
import Spinning from '../components/Spinning'
import {Card, List, Avatar, Typography, Divider,message,Space,Tooltip,Button} from 'antd'
import {useHistory} from 'react-router-dom'
import {IoEyeOutline, IoPencil} from 'react-icons/io5'
import {Helmet} from 'react-helmet'


const getInitials = string =>{
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase()

    if(names.length > 1){
        initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }

    return initials
}

const AllUsers = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const userList = useSelector(state=> state.userList)

    const {
        loading,
        error,
        users
    } = userList;

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        if(userInfo && userInfo.user.role === 'Administrator'){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    },[userInfo, dispatch,history])

    const handleDetailsBtn = id =>{
        history.push(`/users/profile/${id}`)
    }

    const handleUpdateBtn = id =>{
        history.push(`/users/update/${id}`)
    }

    const [visible, setVisible] = useState(true)
    const {Title, Text} = Typography

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, 2000)
        }
    }, [visible])

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
                <title>All Users | Kierstan</title>
            </Helmet>
            <Card style={cardStyle}>
                <Divider plain>
                    <Title level={3}>Users</Title>
                </Divider>
                {loading ? (
                    <Spinning visible={loading}/>
                ): error ? (
                    message.error(error, 5)
                ): (users && users !== undefined) ? (
                    <div>
                       {users.length === 0 ? (
                           <Text>There are no users yet</Text>
                       ): (
                           <List
                               itemLayout="horizontal"
                               dataSource={users}
                               renderItem={user => (
                                   <List.Item
                                       key={user._id}
                                       actions={[
                                        <Space direction="horizontal">
                                            <Tooltip title="View Details">
                                                <Button shape="circle" size="small" type="primary" icon={<IoEyeOutline/>} onClick={()=> handleDetailsBtn(user._id)} />
                                            </Tooltip>
                                            <Tooltip title="Update User">
                                                <Button size="small" shape="circle" type="primary" icon={<IoPencil/>} onClick={()=> handleUpdateBtn(user._id)}/>
                                            </Tooltip>
                                        </Space>
                                       ]}
                                    >
                                        <List.Item.Meta
                                            title={user.name}
                                            description={user.email}
                                            avatar={<Avatar size={40}>{getInitials(user.name)}</Avatar>}
                                        />
                                    </List.Item>
                               )}
                            />
                       )}
                    </div>
                ): (
                    <Text>No data</Text>
                )}
            </Card>
        </div>
    )
}

export default AllUsers;