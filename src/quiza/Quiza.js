import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory,useLocation} from 'react-router-dom'
import {checkQuiza, resetQuiza} from '../redux/actions/quiza'
import {Button,Modal,Typography,Row,Col,Radio, Space,message,notification,Statistic,Card} from 'antd'
import Spinning from '../components/Spinning'
import {Helmet} from 'react-helmet'

const Quiza = () =>{
    const [quizaId, setQuizaId] = useState(null)
    const [allQuestions, setAllQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [currentAns, setCurrentAns] = useState(null)
    const [duration, setDuration] = useState(-1)
    const [startTime, setStartTime] = useState(-1)
    const [currentStep, setCurrentStep] = useState(1)
    const [allChosenAns, setAllChosenAns] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const quizaCheck = useSelector(state=> state.quizaCheck)
    const {
        loading:loadingCheck,
        success: successCheck,
        error: errorCheck
    } = quizaCheck

    const quizaReset = useSelector(state=> state.quizaReset)
    const {
        loading: loadingReset,
        success: successReset,
        error: errorReset
    } = quizaReset

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const location = useLocation()
    const history = useHistory()
    const {confirm} = Modal
    const {Title,Text} = Typography
    const {Countdown} = Statistic

    /**
     * Submit Quiza
     */

    const clickSubmit = () =>{
        let data ={
            questions: allChosenAns,
            timeStarted: startTime,
            timeEnded: Date.now()
        }

        console.log(data)

        dispatch(
            checkQuiza({
                quizaId: quizaId,
                userId: userInfo.user._id
            }, data)
        )
    }

    /**
     * Modal to confirm the Quiza submitting
     */

    const confirmFinish = () =>{
        confirm({
            title:'Confirm to Submit the Quiza?',
            okType:"primary",
            okText:'Yes',
            onOk(){
                clickSubmit()
            },
            cancelText:'No',
            onCancel(){}
        })
    }



    /**
     * Handle timesUp state
     */
    const timesUp = () =>{
        dispatch(
            resetQuiza({
                userId: userInfo.user._id
            })
        )
    }


    const quizaEndTime = startTime + duration * 60 * 1000



    /**
     * Handle next button
     */

    const _next = () =>{
        let currQues = currentQuestion + 1
        setCurrentStep(currentStep + 1)
        setCurrentQuestion(currentQuestion + 1)
        setCurrentAns(allChosenAns[currQues].selectedOption)
    }

    /**
     * Handle Prev Button
     */
    const _prev = ()=>{
        let currQues = currentQuestion - 1
        setCurrentStep(currentStep - 1)
        setCurrentQuestion(currentQuestion - 1)
        setCurrentAns(allChosenAns[currQues].selectedOption)
    }

    /**
     * Prev Button
     */

    const prevButton = () =>{
        if(currentStep !== 1){
            return (
                <Button type="primary" onClick={_prev}>
                    Prev
                </Button>
            )
        }
        return null
    }

    /**
     * Next Button
     */

    const nextButton = ()=>{
        if(currentStep < allQuestions.length){
            return (
                <Button type="primary" onClick={_next}>
                    Next
                </Button>
            )
        }else if(currentStep === allQuestions.length){
            return (
                <Button type="primary" onClick={confirmFinish}>
                    Finish Quiza
                </Button>
            )
        }
    }

    /**
     * Handle Options Change
     */

    const handleChange = event =>{
        setCurrentAns(event.target.value)

        let newState = allChosenAns
        newState[currentQuestion].selectedOption = event.target.value
        setAllChosenAns(newState)
    }

    /**
     * Setup Quiza i.e questions and answers
     */

    const setupQuiza = questions =>{
        var questionsData = []
        var answerData = []

        if(questions.length === 0){
            setEmpty(true)
            return
        }

        // eslint-disable-next-line array-callback-return
        questions.map(question =>{
            let questionObj = {
                q_id: question.questionId,
                text: question.description,
                options: question.options
            }

            questionsData.push(questionObj)

            let ansObj = {
                quesId: question.questionId,
                selectedOption:null
            }

            answerData.push(ansObj)
        })


        setAllQuestions(questionsData)
        setAllChosenAns(answerData)
        setLoading(false)
    }

    useEffect(()=>{
        if(location.state === undefined){
            setRedirect(true)
            return
        }else {
            setQuizaId(location.state.quizaId)
            setDuration(location.state.duration)
            setStartTime(location.state.timeStarted)
            setAllQuestions(location.state.questions)
            setupQuiza(location.state.questions)
        }
    }, [location.state])

    

    useEffect(()=>{
        if(successReset || empty || redirect){
            history.push('/dashboard')
        }
    },[history, successReset, empty, redirect])

    useEffect(()=>{
        if(successCheck){
            history.push(`/results/${quizaId}`)
        }
    },[successCheck,history,quizaId])

    const rootStyle = {
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }

    const cardStyle = {
        padding:'10px',
        width:'40%',
        height:'40vh'
    }

    const titleStyle = {
        display:'inline-block'
    }

    return loading ? (
        <Spinning loading={loading}/>
    ): (
        <div style={rootStyle}>
            <Helmet>
                <title>Quiza | Kierstan</title>
            </Helmet>
            {loadingCheck && <Spinning visible={loadingCheck}/>}
            {errorCheck && message.error(errorCheck, 5)}
            {successCheck && notification.open({
                message:'Success Submission',
                description:'You have successfully submitted your quiza',
                placement:'topLeft',
                type:'success',
                duration:5
            })}
            {loadingReset && <Spinning visible={loadingReset}/>}
            {errorReset && message.error(errorReset,5)}
            {successReset && notification.open({
                message:"Time is Up!",
                description:"Your Quiza Duration has depleted, Try again",
                type:'info',
                duration:7,
                placement:'topLeft'
            })}
            <div style={titleStyle}>
                <Title level={4}>
                    Question {currentStep} Of {allQuestions.length}
                </Title>
                <Countdown style={{float:'right'}} title="Time Remaining" value={quizaEndTime} onFinish={timesUp} format="HH:mm:ss"/>
            </div>
            <Card style={cardStyle}>
                <Text>{allQuestions[currentQuestion].text} </Text>
                <br/>
                <Radio.Group onChange={handleChange} value={currentAns}>
                    <Space direction="vertical">
                        {allQuestions[currentQuestion].options.map(opt=>(
                            <Radio value={opt.text}>{opt.text}</Radio>
                        ))}
                    </Space>
                </Radio.Group>
            </Card>
            <Row>
                <Col span={8}>
                    {prevButton()}
                </Col>
                <Col span={8} offset={8}>
                    {nextButton()}
                </Col>
            </Row>
        </div>
    )
}

export default Quiza;  