import React from 'react'
import {Layout, Menu,Typography} from 'antd'
import {IoAddCircleOutline, IoNewspaperOutline, IoPersonOutline, IoPaperPlane,IoPowerOutline,IoPeopleCircle} from 'react-icons/io5'
import {useSelector,useDispatch} from 'react-redux'
import {logoutUser} from '../../redux/actions/user'
import {useHistory} from 'react-router-dom'
import {DingtalkOutlined,ReconciliationOutlined, UserOutlined,FileDoneOutlined} from '@ant-design/icons'

const Sidebar = ({collapsed, onChangeCollapse})=>{
    const {Sider} = Layout
    const {SubMenu} = Menu
    const {Link,Title} = Typography

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const history = useHistory()

    const handleList = () =>{
        history.push('/quizas/all')
    }

    const handleCreate = () =>{
        history.push('/newQuiza')
    }

    const handleListMy = () =>{
        history.push('/quizas/myquizas')
    }

    const handleMySubs = () =>{
        history.push('/quizas/mysubmissions')
    }

    const handleLogout = () =>{
        dispatch(
            logoutUser()
        )
    }

    const handleProfileBtn = () =>{
        history.push(`/users/profile/${userInfo.user._id}`)
    }

    const handleUsersBtn = () =>{
        history.push('/users/all')
    }

    const styling = {
        height:'98vh',
        marginRight:'24px'
    }


    const logoStyling = {
        height:'32px',
        margin:'16px',
        background:'rgba(255,255,255,.3)'
    }


    return (
        <>
           {userInfo && (
               <Sider style={styling} trigger={null} collapsed={collapsed} onCollapse={onChangeCollapse} breakpoint={'lg'} theme="dark" collapsedWidth={80}>
                    <div style={logoStyling}>
                        <Title style={{textAlign:'center'}} level={3}>
                            Kierstan
                        </Title>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={[1]} mode="inline">
                        <SubMenu key="sub1" icon={<DingtalkOutlined/>} title={'Quizas'}>
                            <Menu.Item key="1" icon={<IoPaperPlane/>}>
                                <Link onClick={handleList}>All Quizas</Link>
                            </Menu.Item>
                            {userInfo.user.role === 'Administrator' && (
                                <Menu.Item key="2" icon={<IoAddCircleOutline/>}>
                                    <Link onClick={handleCreate}>Create Quiza</Link>
                                </Menu.Item>
                            )}
                            <Menu.Item key="3" icon={<IoNewspaperOutline/>}>
                                <Link onClick={handleListMy}>My Quizas</Link>
                            </Menu.Item>
                        </SubMenu>
                        {userInfo.user.role === 'Student' && (
                            <SubMenu key="sub2" icon={<ReconciliationOutlined/>} title="Submissions">
                                <Menu.Item key="4" icon={<FileDoneOutlined/>}>
                                    <Link onClick={handleMySubs}>My Submissions</Link>
                                </Menu.Item>
                            </SubMenu>
                        )}
                        <SubMenu key='sub3' icon={<UserOutlined/>} title="Profile">
                            <Menu.Item key="5" icon={<IoPersonOutline/>}>
                                <Link onClick={handleProfileBtn}>My Profile</Link>
                            </Menu.Item>
                            {userInfo.user.role === 'Administrator' && (
                                <Menu.Item key="7" icon={<IoPeopleCircle/>}>
                                    <Link onClick={handleUsersBtn}>Users</Link>
                                </Menu.Item>
                            )}
                            <Menu.Item key="6" icon={<IoPowerOutline/>}>
                                <Link onClick={handleLogout}>Logout</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
           )}
        </>
    )
}

export default Sidebar;