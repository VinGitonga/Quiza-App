import { useState, useEffect } from "react";
import {
    Heading,
    Box,
    Flex,
    Text,
    Avatar,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Icon,
    Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Loader from "../components/common/Loader";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
    IoCheckmarkDoneOutline,
    IoCloseOutline,
    IoWarningOutline,
    IoDiscOutline,
} from "react-icons/io5";

import { getQuizAttemptResponses } from "../services/quiz";

const Results = () => {
    const router = useRouter();
    const { quizId } = router.query;
    console.log(quizId);
    const [attemptInfo, setAttemptInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAttemptInfo = async (id) => {
        setLoading(true);
        let data = await getQuizAttemptResponses(id);
        console.log(data);
        setAttemptInfo(data);
        setLoading(false);
    };

    useEffect(() => fetchAttemptInfo(quizId), [quizId]);

    return (
        <Box px={8} style={{ fontFamily: "Poppins" }}>
            <Navbar />
            <Heading py={5}>Results</Heading>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Card>
                        <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Flex alignItems={"center"}>
                                <Avatar
                                    size="lg"
                                    mr={5}
                                    src={"https://source.unsplash.com/random"}
                                />
                                <Text fontSize={"xl"}>
                                    {attemptInfo?.quizTitle}
                                </Text>
                            </Flex>
                            <Text fontSize={"md"}>
                                You scored {attemptInfo?.attempt?.score} /{" "}
                                {attemptInfo?.attempt?.responses?.length}
                            </Text>
                        </Flex>
                    </Card>
                    <Box mb={4} />
                    <Card>
                        <Heading py={5}>Responses</Heading>
                        <Accordion allowToggle>
                            {attemptInfo?.attempt?.responses?.map((resp, i) => (
                                <QuestionItem key={i} response={resp} />
                            ))}
                        </Accordion>
                    </Card>
                </>
            )}
        </Box>
    );
};

const QuestionItem = ({ response }) => {
    const respIcon = (resp) => {
        if (resp.selected === resp.correctAnswer) {
            return (
                <Icon as={IoCheckmarkDoneOutline} w={4} h={5} color={"green"} />
            );
        } else if (resp.selected === null) {
            return (
                <Icon as={IoWarningOutline} w={4} h={5} color={"goldenrod"} />
            );
        } else {
            return <Icon as={IoCloseOutline} w={4} h={5} color={"red"} />;
        }
    };
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
                            <Box flex="1" textAlign="left">
                                {response?.description}
                            </Box>
                            {respIcon(response)}
                        </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                        <Stack spacing={4} direction={"column"}>
                            {response.options.map((opt, i) => (
                                <OptionItem
                                    resp={response}
                                    text={opt.text}
                                    key={i}
                                />
                            ))}
                        </Stack>
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
};

const OptionItem = ({ resp, text }) => (
    <Stack spacing={4} direction={"row"} alignItems={"center"} >
        <Icon
            as={IoDiscOutline}
            w={4}
            h={4}
            color={
                resp.correctAnswer === text
                    ? "green"
                    : resp.selected === text
                    ? "red.500"
                    : "gray.800"
            }
        />
        <Text
            color={
                resp.correctAnswer === text
                    ? "green"
                    : resp.selected === text
                    ? "red.500"
                    : "gray.800"
            }
        >
            {text}
        </Text>
    </Stack>
);

export default Results;
