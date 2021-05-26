import React from 'react'
import {Tabs} from 'antd'
import MyQuizas from './MyQuizas'
import AllQuizas from './AllQuizas'


const QuizasSection = () =>{
    const {TabPane} = Tabs

    return (
        <Tabs defaultActiveKey={[1]} size="large" centered>
            <TabPane tab="All Quizas" key="1">
                <AllQuizas />
            </TabPane>
            <TabPane tab="My Quizas" key="2">
                <MyQuizas/>
            </TabPane>
        </Tabs>
    )
}

export default QuizasSection;