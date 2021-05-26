import React from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Dashboard from './core/dashboard'
import Landing from './core/Landing'
import Login from './user/Login'
import Register from './user/Register'
import NewQuiza from './quiza/NewQuiza'
import QuizaList from './quiza/QuizaList'
import QuizaDetails from './quiza/QuizaDetails'
import QuizasSection from './quiza/QuizasSection'
import AllQuizas from './quiza/AllQuizas'
import MyQuizas from './quiza/MyQuizas'
import Quiza from './quiza/Quiza'
import Result from './quiza/Result'
import MySubmissions from './quiza/MySubmissions'
import QuizaSubmissions from './quiza/QuizaSubmissions'
import Sidebar from './core/Sidebar'
import Header1 from './core/Topbar/Header1'
import {Layout} from 'antd'
import Profile from './user/Profile'
import UpdateUser from './user/UpdateUser'
import AllUsers from './user/AllUsers'


function App() {

    const [collapsed, setCollapsed] = React.useState(false)
    const {Content} = Layout

    const onCollapse = collapsed =>{
        setCollapsed(collapsed)
    }

    const toggle = () =>{
        setCollapsed(!collapsed)
    }

    return (
        <Router>
            <Layout style={{minHeight:'50vh'}}>
                <Sidebar collapsed={collapsed} onChangeCollapse={onCollapse} />
                <Layout>
                    <Header1 menuToggler={toggle} />
                    <Content style={{margin:'24px 16px',padding:16}}>
                        <Switch>
                            <Route path="/" exact component={Landing} />
                            <Route path="/dashboard" exact component={Dashboard} />
                            <Route path='/newQuiza' exact component={NewQuiza} />
                            <Route path='/login' exact component={Login} />
                            <Route path='/register' exact component={Register} />
                            <Route path='/quizaList' exact component={QuizaList} />
                            <Route path='/quizaDetails/:quizaId' exact component={QuizaDetails}/>
                            <Route path='/quizas/main' exact component={QuizasSection}/>
                            <Route path="/quizas/myquizas" exact component={MyQuizas}/>
                            <Route path='/quizas/all' exact component={AllQuizas} />
                            <Route path='/quiza' exact component={Quiza} />
                            <Route path='/results/:quizaId' exact component={Result}/>
                            <Route path='/quizas/mysubmissions' exact component={MySubmissions}/>
                            <Route path='/quizas/submissions/:quizaId' exact component={QuizaSubmissions}/>
                            <Route path='/users/all' exact component={AllUsers}/>
                            <Route path='/users/profile/:userId' exact component={Profile}/>
                            <Route path='/users/update/:userId' exact component={UpdateUser}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}

export default App;