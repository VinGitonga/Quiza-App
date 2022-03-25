import { useState, useEffect } from "react";
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
import { GrAdd } from "react-icons/gr";
import { useRouter } from "next/router";
import { getQuizzes } from "../services/quiz";
import { useSession } from "next-auth/react";

const Quizes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { data: session } = useSession();

    const listQuizes = async () => {
        const allQuizzes = await getQuizzes()
        setQuizzes(allQuizzes)
    }

    useEffect(() => {
        listQuizes()
        
    }, []);

    console.log(quizzes)

    return (
        <Box px={8}>
            <Navbar />
            <Heading py={5}>Quizzas</Heading>
            <Card>
                {quizzes.length === 0 ? (
                    <Text>
                        {session?.user?.role === "Administrator"
                            ? "No quizzes yet, Create some yoo!"
                            : "There no quizzes contact Admin!"}
                    </Text>
                ) : (
                    <Box>
                        <Text>Hi</Text>
                        {quizzes.map((quiz) => (
                            <QuizItem key={quiz._id} quiz={quiz} />
                        ))}
                    </Box>
                )}
            </Card>
        </Box>
    );
};

const QuizItem = ({ quiz }) => {
    const router = useRouter();
    return (
        <Box mb={6}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                    <Avatar size="xl" mr={5} src={quiz?.image} />
                    {/* To add a push state */}
                    <Text
                        fontSize={"3xl"}
                        _hover={{
                            borderBottom: "2px solid #4299E1",
                        }}
                        cursor={"pointer"}
                        onClick={() => router.push({
                            pathname: '/quiz_detail',
                            query: { quizId: quiz._id }
                        })}
                    >
                        {quiz?.title}
                    </Text>
                </Flex>
                <Tag
                    display={{ base: "none", lg: "flex" }}
                    bg={"teal.400"}
                    variant="subtle"
                    size="lg"
                    borderRadius={"full"}
                >
                    {quiz?.description}
                </Tag>
                <HStack spacing={4}>
                    <Tooltip
                        label={"Enroll to Quiz"}
                        hasArrow
                        placement={"top"}
                        bg={"teal"}
                    >
                        <IconButton
                            size={"md"}
                            icon={<GrAdd />}
                            isRound
                            bg={"gray.300"}
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

export default Quizes;
