import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Heading,
    IconButton,
    Flex,
    Box,
    Icon,
    Tooltip,
    HStack,
    Stack,
    RadioGroup,
    Radio,
    Text,
} from "@chakra-ui/react";
import Card from "../Card";
import { GrAdd } from "react-icons/gr";
import { CgTrash } from "react-icons/cg";
import { FiChevronRight, FiChevronDown, FiEdit3 } from "react-icons/fi";
import { useRouter } from "next/router";
import { getQuestions } from "../../services/question";

function getCorrectAns(allAns, correctAns) {
    let correctAnsObj = allAns.filter((obj) => obj.text === correctAns);
    return correctAnsObj[0].text;
}

const Questions = ({ quizId }) => {
    const router = useRouter();

    const [questions, setQuestions] = useState([]);

    const fetchQuestions = async (id) => {
        let data = await getQuestions(id);
        setQuestions(data);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchQuestions(quizId), []);

    return (
        <Card>
            <Flex justify={"space-between"} mb={3}>
                <Heading>Questions</Heading>
                <Tooltip
                    label={"Add Question"}
                    hasArrow
                    placement={"top"}
                    bg={"teal"}
                >
                    <IconButton
                        size={"md"}
                        aria-label={"type"}
                        icon={<GrAdd />}
                        isRound
                        bg={"gray.300"}
                        onClick={() =>
                            router.push({
                                pathname: "/create_question",
                                query: { quizId: quizId },
                            })
                        }
                    />
                </Tooltip>
            </Flex>
            {/* Our Accordion */}
            <Accordion allowToggle>
                {questions?.length === 0 ? (
                    <Text>No questions have been created yet.</Text>
                ) : (
                    <>
                        {questions?.map((question) => (
                            <QuestionItem
                                key={question?._id}
                                question={question}
                            />
                        ))}
                    </>
                )}
            </Accordion>
        </Card>
    );
};

const QuestionItem = ({ question }) => {
    return (
        <AccordionItem my={3}>
            {({ isExpanded }) => (
                <>
                    <Heading as="h3" size={"sm"}>
                        <AccordionButton>
                            <Icon
                                as={isExpanded ? FiChevronDown : FiChevronRight}
                                w={6}
                                h={6}
                            />
                            <Box
                                flex="1"
                                textAlign="left"
                                fontFamily={"Poppins"}
                            >
                                {question?.description}
                            </Box>
                            <HStack spacing={4}>
                                <Tooltip
                                    label={"Edit Question"}
                                    hasArrow
                                    placement={"left"}
                                    bg={"teal"}
                                >
                                    <IconButton
                                        size={"sm"}
                                        aria-label={"edit"}
                                        icon={<FiEdit3 />}
                                        isRound
                                        bg={"gray.300"}
                                    />
                                </Tooltip>
                                <Tooltip
                                    label={"Remove Question"}
                                    hasArrow
                                    placement={"right"}
                                    bg={"teal"}
                                >
                                    <IconButton
                                        size={"sm"}
                                        aria-label={"remove"}
                                        icon={<CgTrash />}
                                        isRound
                                        bg={"gray.300"}
                                    />
                                </Tooltip>
                            </HStack>
                        </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                        <RadioGroup
                            defaultValue={getCorrectAns(
                                question?.options,
                                question?.correctAnswer
                            )}
                        >
                            <Stack spacing={4} direction={"column"}>
                                {question?.options?.map((opt, i) => (
                                    <Radio key={i} value={opt?.text}>
                                        {opt?.text}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
};

export default Questions;
