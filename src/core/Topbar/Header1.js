import React from 'react'
import {Layout, Button,Typography,Menu,Dropdown} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {IoMenuOutline} from 'react-icons/io5'
import {logoutUser} from '../../redux/actions/user'
import {DownOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'

const Header1 = ({menuToggler})=>{
    const {Header} = Layout
    const history = useHistory()

    const dispatch = useDispatch()

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () =>{
        dispatch(
            logoutUser()
        )
    }

    const btnHandlerLogin = () =>{
        history.push('/login')
    }

    const btnHandlerRegister = () =>{
        history.push('/register')
    }

    const handleProfile = () =>{
        history.push(`/users/profile/${userInfo.user._id}`)
    }

    const {Link} = Typography

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link onClick={handleProfile}>
                   My Profile
                </Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link onClick={logoutHandler}>
                    Logout
                </Link>
            </Menu.Item>
        </Menu>
    )

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                {userInfo ? (
                    <>
                       <Menu.Item key="1">
                           <Button
                               icon={<IoMenuOutline/>}
                               style={{cursor:'pointer'}}
                               onClick={menuToggler}
                            />
                       </Menu.Item>
                       <Menu.Item key="2">
                            <Dropdown overlay={menu}>
                                <Link>
                                    {userInfo.user.name} <DownOutlined/>
                                </Link>
                            </Dropdown>
                       </Menu.Item>
                    </>
                ): (
                    <>
                       <Menu.Item key="3">
                            <Button size="medium" shape="round" type="ghost" onClick={btnHandlerLogin}>
                                Login
                            </Button>
                       </Menu.Item>
                       <Menu.Item key="4">
                            <Button size="medium" shape="round" type="ghost" onClick={btnHandlerRegister}>
                                Register
                            </Button>
                       </Menu.Item>
                    </>
                )}
            </Menu>
        </Header>
    )
}

export default Header1;