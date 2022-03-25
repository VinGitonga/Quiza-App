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
    RadioGroup,
    Radio,
} from "@chakra-ui/react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { RiCheckDoubleFill } from "react-icons/ri";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";


const Results = () => {
    return (
        <Box px={8} style={{ fontFamily: "Poppins" }} >
            <Navbar />
            <Heading py={5}>Results</Heading>
            <Card>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                        <Avatar size="lg" mr={5} src={"https://source.unsplash.com/random"} />
                        <Text
                            fontSize={"xl"}
                        >
                            Machine Learning
                        </Text>
                    </Flex>
                    <Text
                        fontSize={"md"}
                    >
                        You scored 3 / 6
                    </Text>
                </Flex>
            </Card>
            <Box mb={4} />
            <Card>
                <Heading py={5}>Responses</Heading>
                <Accordion allowToggle>
                    <QuestionItem />
                    <QuestionItem />
                    <QuestionItem />
                </Accordion>
            </Card>
        </Box>
    )
}

const QuestionItem = () => {
    return (
        <AccordionItem my={3} >
            {({ isExpanded }) => (
                <>
                    <Heading as="h3" size={"sm"}>
                        <AccordionButton>
                            <Icon as={isExpanded ? FiChevronDown : FiChevronRight} w={6} h={6} />
                            <Box flex='1' textAlign='left' fontFamily={"Poppins"}>
                                What is Machine Learning ?
                            </Box>
                            <Icon as={RiCheckDoubleFill} w={4} h={4} color={'green'} />
                        </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                        <RadioGroup defaultValue='1'>
                            <Stack spacing={4} direction={"column"}>
                                <Radio value='1'>
                                    Radio 1
                                </Radio>
                                <Radio value='2'>Radio 2</Radio>
                                <Radio value='3'>Radio 3</Radio>
                                <Radio value='4'>Radio 4</Radio>
                            </Stack>
                        </RadioGroup>
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    )
}


export default Results;