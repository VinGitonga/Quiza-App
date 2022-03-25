import { useState, useEffect } from "react"
import {
    Box,
    Flex,
    Heading,
    Stack,
    Button,
    Text,
    RadioGroup,
    Radio,
    useColorModeValue,
} from "@chakra-ui/react"
import Navbar from "../components/Navbar";
import Countdown from "../components/Countdown";
import questions from "../utils/questions";


const Quiz = () => {

    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAns, setCurrentAns] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [allAns, setAllAns] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
     * Handle next btn
     */
    const _next = () => {
        let currQues = currentQuestion + 1;
        setCurrentStep(currentStep + 1);
        setCurrentQuestion(currentQuestion + 1);
        setCurrentAns(allAns[currQues].selectedOption);
    }

    /**
     * Handle Prev Btn
     */

    const _prev = () => {
        let currQues = currentQuestion - 1;
        setCurrentStep(currentStep - 1);
        setCurrentQuestion(currentQuestion - 1);
        setCurrentAns(allAns[currQues].selectedOption);
    }
    // Prev Btn
    const prevBtn = () => {
        if (currentStep !== 1) {
            return <QuizBtn text={"Prev"} onClick={_prev} />;
        }
        return null;
    }

    // Next Btn
    const nextBtn = () => {
        if (currentStep < allQuestions.length) {
            return <QuizBtn text={"Next"} onClick={_next} />;

        } else if (currentStep === allQuestions.length) {
            return <QuizBtn text={"Finish"} onClick={clickSubmit} />;
        }
    }

    // Save the answers on click next or prev

    const handleChange = event => {
        setCurrentAns(event);
        console.log(currentAns)

        let newState = allAns;
        newState[currentQuestion].selectedOption = event;
        setAllAns(newState);
    }

    const clickSubmit = () => { };

    /**
     * This methods takes an array of questions and restructures it in a form
     * for saving answers.
     * @param {*} questions 
     */

    const setupQuiz = (questions) => {
        console.log("Started")
        console.log(questions.length);
        var questionsData = [];
        var answerData = [];

        if (questions.length === 0) {
            console.log("Empty")
            return;
        }

        questions.map(ques => {
            let questObj = {
                text: ques.description,
                options: ques.options
            }

            questionsData.push(questObj);
            console.log("Tried")



            let ansObj = {
                selectedOption: null,
            }

            answerData.push(ansObj);
        });
        console.log(questionsData)
        console.log(answerData)

        setAllQuestions(questionsData);
        setAllAns(answerData);
        setLoading(false)
    }

    console.log(questions);


    useEffect(() => {
        if (questions) {
            setupQuiz(questions);
            console.log("did that")
        }
    }, []);

    console.log(allQuestions)
    console.log(loading)



    return (
        <Box fontFamily={"Poppins"} >
            <Navbar />
            <Flex
                justify={'center'}
                align={"flex-start"}
                bg={useColorModeValue('gray.50', 'gray.800')}
                mt={2}
            >
                <Stack spacing={8} mx={'auto'} w={"768px"} >
                    <Stack align={'center'} direction={"row"} justify={"space-between"} >
                        <Heading fontSize={"2xl"}>Question {currentStep} out of {allQuestions.length}</Heading>
                        {/* To Add Timer */}
                        <Countdown title={"Time Remaining"} />
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        {/* Quiz Content */}
                        <Text size={"md"} mb={3}>{allQuestions[currentQuestion]?.text}</Text>
                        <RadioGroup onChange={handleChange} value={currentAns}>
                            <Stack spacing={4} direction={"column"}>
                                {allQuestions[currentQuestion]?.options.map((opt, i) => (
                                    <Radio value={opt.text} key={i}>
                                        {opt.text}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                        <Stack spacing={10} direction={"row"} mt={5}>
                            {prevBtn()}
                            {nextBtn()}
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Box>
    )
}

const QuizBtn = ({ text, onClick }) => (
    <Button
        bg={'blue.400'}
        onClick={onClick}
        color={'white'}
        _hover={{
            bg: 'blue.500',
        }}>
        {text}
    </Button>
)

export default Quiz;