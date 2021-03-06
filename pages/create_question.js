import { useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Textarea,
    useColorModeValue,
    SimpleGrid,
    GridItem,
    Select,
} from "@chakra-ui/react";
import { FiEdit3 } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { createQuestion } from "../services/question";

export default function CreateQuestion() {
    const router = useRouter();
    const { quizId } = router.query;
    const [description, setDescription] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setDescription("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setCorrectAnswer("");
        setLoading(false);
    };

    const clickSubmit = () => {
        setLoading(true);

        let options = [
            { text: option1 },
            { text: option2 },
            { text: option3 },
            { text: option4 },
        ];

        const questionData = {
            description: description,
            options: options,
            correctAnswer: correctAnswer,
        };

        createQuestion(quizId, questionData)
            .then((data) => {
                resetForm();
                router.push({
                    pathname: "/quiz_detail",
                    query: { quizId: quizId },
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box>
            <Navbar />
            <Flex
                justify={"center"}
                align={"flex-start"}
                bg={useColorModeValue("gray.50", "gray.800")}
                mt={2}
            >
                <Stack spacing={8} mx={"auto"} w={"768px"}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Create Question</Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <SimpleGrid spacing={6} columns={6} mb={8}>
                            <FormControl
                                id="description"
                                as={GridItem}
                                colSpan={6}
                            >
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Type Description here ..."
                                    size="md"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormControl
                                id="option1"
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel>Option 1</FormLabel>
                                <Input
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Option 1"}
                                    onChange={(e) => setOption1(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                id="option2"
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel>Option 2</FormLabel>
                                <Input
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Option 2"}
                                    onChange={(e) => setOption2(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                id="option3"
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel>Option 3</FormLabel>
                                <Input
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Option 3"}
                                    onChange={(e) => setOption3(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                id="option4"
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel>Option 4</FormLabel>
                                <Input
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Option 4"}
                                    onChange={(e) => setOption4(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                id="correctAns"
                                as={GridItem}
                                colSpan={6}
                            >
                                <FormLabel>Correct Answer</FormLabel>
                                <Select
                                    placeholder="Choose the correct Answer"
                                    onChange={(e) =>
                                        setCorrectAnswer(e.target.value)
                                    }
                                >
                                    <option value={option1}>{option1}</option>
                                    <option value={option2}>{option2}</option>
                                    <option value={option3}>{option3}</option>
                                    <option value={option4}>{option4}</option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>
                        <Stack spacing={10}>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                leftIcon={<FiEdit3 />}
                                loadingText={"Saving"}
                                isLoading={loading}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={clickSubmit}
                            >
                                Create
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
}
