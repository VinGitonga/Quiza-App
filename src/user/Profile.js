import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {detailsUser} from '../redux/actions/user'
import {useHistory,useParams} from 'react-router-dom'
import {Card, Typography, Divider, Image, Avatar,Tabs, Button, message, Row, Col} from 'antd'
import Spinning from '../components/Spinning'
import {FaUserTie, FaEnvelopeSquare, FaUserCog, FaRocketchat, FaPhoneAlt, FaTasks, FaMap, FaLayerGroup} from 'react-icons/fa'
import img1 from '../assets/boy.jpg'
import {Helmet} from 'react-helmet'


const Profile = () =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = useParams()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userDetails = useSelector(state=> state.userDetails)
    const {
        loading,
        error,
        user
    } = userDetails

    useEffect(()=>{
        if(userInfo){
            dispatch(
                detailsUser({
                    userId: userId
                })
            )
        }else{
            history.push('/login')
        }
    }, [userInfo, dispatch, userId, history])

    const styling = {
        borderRadius:'50%',
        border:'2px solid',
        padding:'20px'
    }

    const handleBtn = () =>{
        history.push(`/users/update/${userId}`)
    }

    const [visible, setVisible] = useState(true)
    const {Title} = Typography
    const {TabPane} = Tabs

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, 2000)
        }
    }, [visible])

    const ImgUrl = userId
        ? `/api/users/image/${userId}`
        : img1

    return visible ? (
        <Spinning visible={visible} />
    ): (
        <div>
            <Helmet>
                <title>Profile | Kierstan</title>
            </Helmet>
            <Card style={{width:'100%'}}>
                <Title className="title-style" level={3}>
                    {userInfo.user.role === 'Administrator' ? 'User Details' : 'Your Profile'}
                </Title>
                <Divider/>
                {loading ? (
                    <Spinning visible={loading}/>
                ): error ? (
                    message.error(error, 5)
                ): (user && user !== undefined) && (
                    <Row gutter={16}>
                        <Col flex="300px">
                            <Card style={{width:'100%'}}
                                cover={
                                    <Image
                                       width={380}
                                       height={400}
                                       alt="No Image yet"
                                       src={ImgUrl}
                                       style={styling}
                                    />
                                }
                                actions={[
                                    <Button shape="round" onClick={handleBtn} size="middle" type="ghost" icon={<FaUserCog/>}>
                                        Update Profile
                                    </Button>
                                ]}
                            >
                                <Card.Meta
                                    title={user.name}
                                    description={user.role}
                                />
                            </Card>
                        </Col>
                        <Col flex="auto">
                            <Row>
                                <Tabs>
                                    <TabPane tab="Basic Information" key="1">
                                        <Card.Meta
                                           title="Name"
                                           avatar={<Avatar icon={<FaUserTie/>}/>}
                                           description={user.name}
                                        />
                                        <Divider/>
                                        <Card.Meta
                                           title="Email"
                                           avatar={<Avatar icon={<FaEnvelopeSquare/>}/>}
                                           description={user.email}
                                        />
                                        <Divider/>
                                        <Card.Meta
                                           title="Role"
                                           avatar={<Avatar icon={<FaRocketchat/>}/>}
                                           description={user.role}
                                        />
                                        <Divider/>
                                        <Card.Meta
                                           title="Phone No"
                                           avatar={<Avatar icon={<FaPhoneAlt/>}/>}
                                           description={user.mobileNo}
                                        />
                                        <Divider/>
                                        {user.role === 'Administrator' ? (
                                            <Card.Meta
                                                title="Quizas Created"
                                                avatar={<Avatar icon={<FaMap/>}/>}
                                                description={user.quizas.length === 0 ? "You haven't generated any quizas, create some mehn!!" : user.quizas.length}
                                            />
                                        ): (
                                            <>
                                               <Card.Meta
                                                  title="Quizas Submitted"
                                                  avatar={<Avatar icon={<FaTasks/>}/>}
                                                  description={user.quizasGiven.length === 0 ? "You haven't submitted any quizas, try some yoo!!" : user.quizasGiven.length}
                                                />
                                                <Divider/>
                                                <Card.Meta
                                                    title="Quizas Enrolled"
                                                    avatar={<Avatar icon={<FaLayerGroup/>}/>}
                                                    description={user.quizasEnrolled.length === 0 ? "You haven't enrolled to any quizas yet, enroll mehn!!" : user.quizasEnrolled.length}
                                                />
                                                <Divider/>
                                            </>
                                        )}
                                    </TabPane>
                                </Tabs>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Card>
        </div>
    )
}

export default Profile