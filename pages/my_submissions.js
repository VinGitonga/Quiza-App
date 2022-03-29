import {
    Box,
    Flex,
    Tag,
    IconButton,
    Heading,
    Text,
    Avatar,
    HStack,
    Tooltip,
} from "@chakra-ui/react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { BsClipboardData } from "react-icons/bs";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const MySubmissions = () => {
    const { data: attempts } = useSWR("/api/quiz/submissions", fetcher);
    console.log(attempts);

    return (
        <Box px={8}>
            <Navbar />
            <Heading py={5}>My Submissions</Heading>
            <Card>
                {attempts?.length === 0 ? (
                    <Text>You haven&apos;t taken any quizzes yet.</Text>
                ) : (
                    <>
                        {attempts?.map((attempt, i) => (
                            <QuizItem key={i} attempt={attempt} />
                        ))}
                    </>
                )}
            </Card>
        </Box>
    );
};

const QuizItem = ({ attempt }) => {
    const router = useRouter();

    return (
        <Box mb={6}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                    <Avatar size="xl" mr={5} src={attempt?.quizId?.image} />
                    {/* To add a push state */}
                    <Text
                        fontSize={"3xl"}
                        _hover={{
                            borderBottom: "2px solid #4299E1",
                        }}
                        cursor={"pointer"}
                    >
                        {attempt?.quizId?.title}
                    </Text>
                </Flex>
                <Tag
                    display={{ base: "none", lg: "flex" }}
                    bg={"teal.400"}
                    variant="subtle"
                    size="lg"
                    borderRadius={"full"}
                >
                    You Scored {attempt?.score}/ {attempt?.responses?.length}
                </Tag>
                <HStack spacing={4}>
                    <Tooltip
                        label={"View My Results"}
                        hasArrow
                        placement={"top"}
                        bg={"teal"}
                    >
                        <IconButton
                            size={"md"}
                            icon={<BsClipboardData />}
                            isRound
                            bg={"gray.300"}
                            onClick={() =>
                                router.push(
                                    `/results/${attempt?.quizId?._id}/${attempt?.attemptId}`
                                    // {
                                    //     pathname: "/results",
                                    //     query: {
                                    //         quizId: attempt?.quizId?._id,
                                    //         attemptId: attempt?.attemptId,
                                    //     },
                                    // },
                                    // "/results"
                                )
                            }
                        />
                    </Tooltip>
                </HStack>
            </Flex>
            <br />
            <hr
                style={{
                    backgroundColor: "#CBD5E0",
                    color: "#CBD5E0",
                    height: 2,
                }}
            />
        </Box>
    );
};

export default MySubmissions;
