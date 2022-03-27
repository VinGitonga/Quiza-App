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
import { CgTrash } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { useRouter } from "next/router";
import { getMyEnrolledQuizzes, startQuiz } from "../services/quiz";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { useSession } from "next-auth/react";

const MyQuizzes = () => {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);
    const { data: session } = useSession();

    const listQuizes = async () => {
        const allQuizzes = await getMyEnrolledQuizzes(session?.user?.id)
        setQuizzes(allQuizzes)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => listQuizes(), [])

    console.log(quizzes)

    return (
        <Box px={8}>
            <Navbar />
            <Heading py={5}>My Quizzes</Heading>
            <Card>
                {quizzes?.length === 0 ? (
                    <Text>
                        You haven&apos;t enrolled to any quizzes yet.
                    </Text>
                ) : (
                    <>
                        {quizzes?.map((quiz) => (
                            <QuizItem key={quiz?._id} quiz={quiz} user={session?.user} />
                        ))}
                    </>
                )}
            </Card>
        </Box>
    );
};

const QuizItem = ({ quiz, user }) => {
    const router = useRouter();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);


    const start = () => {
        startQuiz(quiz?._id, user?.id).then((data) => {
            setLoading(false);
            setShowConfirmModal(false);
            router.push(
                {
                    pathname: "/quiza",
                    query: { quizId: quiz._id },
                },
                "/quiza"
            )
        });
    };

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
                        label={"Start Quiz"}
                        hasArrow
                        placement={"top"}
                        bg={"teal"}
                    >
                        <IconButton
                            size={"md"}
                            icon={<FiEdit3 />}
                            isRound
                            bg={"gray.300"}
                            onClick={() =>setShowConfirmModal(true)}
                        />
                    </Tooltip>
                    <Tooltip
                        label={"Remove Quiz from List"}
                        hasArrow
                        placement={"top"}
                        bg={"teal"}
                    >
                        <IconButton
                            size={"md"}
                            icon={<CgTrash />}
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
            <ConfirmDialog
                isOpen={showConfirmModal}
                onClose={setShowConfirmModal}
                title={"Start Quiz"}
                description={`Are you sure you want to start ${quiz?.title} quiz`}
                isLoading={loading}
                loadingText={"Enrolling"}
                onClickConfirm={start}
            />
        </Box>
    );
};

export default MyQuizzes;
