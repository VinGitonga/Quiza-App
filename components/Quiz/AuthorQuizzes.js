import {
    Box,
    Flex,
    Tag,
    IconButton,
    Heading,
    Text,
    Avatar,
    HStack,
} from "@chakra-ui/react";
import Card from "../Card";
import Navbar from "../Navbar";
import { GrAdd } from "react-icons/gr";
import { useRouter } from "next/router";

const AuthorQuizzes = ({ quizzes }) => {

    return (
        <Box px={8}>
            <Navbar />
            <Heading py={5}>My Quizzes</Heading>
            <Card>
                {quizzes?.length === 0 ? (
                    <Text>You haven&apos;t authored any quizzes yet.</Text>
                ) : (
                    <>
                        {quizzes?.map((quiz) => (
                            <QuizItem
                                key={quiz?._id}
                                quiz={quiz}
                            />
                        ))}
                    </>
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
                        onClick={() =>
                            router.push(
                                {
                                    pathname: "/quiz_detail",
                                    query: { quizId: quiz._id },
                                },
                                "/quiz_detail"
                            )
                        }
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
                    <IconButton
                        size={"md"}
                        icon={<GrAdd />}
                        isRound
                        bg={"gray.300"}
                    />
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

export default AuthorQuizzes;
