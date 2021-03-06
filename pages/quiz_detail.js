import { useEffect, useState } from "react";
import { Heading, Box, SimpleGrid, GridItem } from "@chakra-ui/react";
import Info from "../components/Quiz/Info";
import Questions from "../components/Quiz/Questions";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
// import { getQuizDetail } from "../services/quiz";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((resp) => resp.data);

const QuizDetails = () => {
    const router = useRouter();
    const [quizId, setQuizId] = useState("");

    useEffect(() => {
        const { quizId: id } = router.query;
        if (id) {
            setQuizId(id);
        }
    }, [router]);

    const { data: quiz } = useSWR(() => `/api/quiz/details/${quizId}`, fetcher);

    // const fetchData = async (id) => {
    //     let data = await getQuizDetail(id);
    //     setQuiz(data);
    // };

    // useEffect(() => fetchData(quizId), [router]);

    return (
        <Box px={8} style={{ fontFamily: "Poppins" }}>
            <Navbar />
            <Heading py={5}>Quiz Details</Heading>
            <Box py={2} mx="auto">
                <SimpleGrid
                    w={{ base: "full", xl: 11 / 12 }}
                    columns={{ base: 1, lg: 11 }}
                    gap={{ base: 0, lg: 16 }}
                    // mx="auto"
                >
                    <GridItem colSpan={{ base: "auto", md: 4 }}>
                        <Info quiz={quiz} />
                    </GridItem>
                    <GridItem colSpan={{ base: "auto", lg: 7 }}>
                        <Questions
                            quiz={quiz}
                        />
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default QuizDetails;
