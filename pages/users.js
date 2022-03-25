import { Box, Flex, IconButton, Heading, Text, Avatar, Tooltip, Tag } from "@chakra-ui/react"
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import { IoEyeSharp } from "react-icons/io5";

const Users = () => {
    return (
        <Box px={8} style={{ fontFamily: "Poppins" }} >
            <Navbar />
            <Heading py={5}>Users</Heading>
            <Card>
                {[Array(8)].map((_, i) => <UserItem key={i} />)}
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
            </Card>
        </Box>
    )
}

const UserItem = () => {
    return (
        <Box mb={6}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                    <Avatar size="lg" mr={5} src={"https://source.unsplash.com/random"} />
                    {/* To add a push state */}
                    <Flex alignItems={"flex-start"} justifyContent={"space-between"} flexDirection={"column"}>
                        <Text
                            fontSize={"xl"}
                        >
                            Ben Stone
                        </Text>
                        <Text
                            fontSize={"md"}
                            color={"gray.500"}
                        >
                            ben@outlook.com
                        </Text>
                    </Flex>
                </Flex>
                <Tag
                    display={{ base: "none", lg: "flex" }}
                    bg={"teal.400"}
                    variant="subtle"
                    size="lg"
                    borderRadius={"full"}
                >
                    Administrator
                </Tag>
                <Tooltip label={'View Profile'} hasArrow placement={'top'} bg={"teal"} >
                    <IconButton
                        size={"md"}
                        icon={<IoEyeSharp />}
                        isRound
                        bg={"cyan.100"}
                    />
                </Tooltip>
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
    )
}

export default Users;