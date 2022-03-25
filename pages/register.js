import { useState, useRef } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Avatar,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    IconButton,
    Icon,
    RadioGroup,
    Radio,
    Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiLoginCircleFill, RiUploadCloudLine } from "react-icons/ri";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { register, uploadImage } from "../services/auth";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const imagePickerRef = useRef(null);
    const [showPass, setShowPass] = useState(false);

    const handleShowPass = () => setShowPass(!showPass);

    const handleImageUpload = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImage(readerEvent.target.result);
        };
    };

    const clickSubmit = async () => {
        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("upload_preset", "qz-quiza");

        setLoading(true);
        uploadImage(imageData)
            .then((data) => {
                var userInfo = {
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    image: data.url,
                };

                register(userInfo).then((resp) => {
                    setLoading(false);
                    router.push("/login");
                });
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontFamily={"Poppins"}
        >
            <Stack spacing={8} mx={"auto"} w={"600px"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Get Started with Quiza</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Create an account
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={FiUser} w={4} h={4} />
                                </InputLeftElement>

                                <Input
                                    type="text"
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Jack Ryan"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={HiOutlineMail} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    type="email"
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={"jack@outlook.com"}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={BiLock} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    type={showPass ? "text" : "password"}
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    <IconButton
                                        size={"sm"}
                                        aria-label={"type"}
                                        icon={
                                            showPass ? <FiEye /> : <FiEyeOff />
                                        }
                                        isRound
                                        onClick={handleShowPass}
                                        bg={"gray.300"}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="confirmPassword">
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={BiLock} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    type={showPass ? "text" : "password"}
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Confirm Password"}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    <IconButton
                                        size={"sm"}
                                        aria-label={"type"}
                                        icon={
                                            showPass ? <FiEye /> : <FiEyeOff />
                                        }
                                        isRound
                                        onClick={handleShowPass}
                                        bg={"gray.300"}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="role">
                            <FormLabel>Role</FormLabel>
                            <RadioGroup value={role} onChange={setRole}>
                                <Stack spacing={5} direction="row">
                                    <Radio
                                        colorScheme="teal"
                                        color={"gray.500"}
                                        value="Administrator"
                                    >
                                        <Text
                                            color={"gray.500"}
                                            fontSize={"sm"}
                                        >
                                            Administrator
                                        </Text>
                                    </Radio>
                                    <Radio
                                        colorScheme="teal"
                                        color={"gray.500"}
                                        value="Student"
                                    >
                                        <Text
                                            color={"gray.500"}
                                            fontSize={"sm"}
                                        >
                                            Student
                                        </Text>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl id="role">
                            <FormLabel>Upload Profile Pic</FormLabel>
                            {image ? (
                                <Flex align={"center"}>
                                    <Avatar src={image} />
                                    <Button
                                        onClick={() =>
                                            imagePickerRef.current.click()
                                        }
                                        leftIcon={<RiUploadCloudLine />}
                                        colorScheme={"teal"}
                                        variant={"solid"}
                                        ml={5}
                                    >
                                        Change Image
                                    </Button>
                                </Flex>
                            ) : (
                                <Button
                                    onClick={() =>
                                        imagePickerRef.current.click()
                                    }
                                    leftIcon={<RiUploadCloudLine />}
                                    colorScheme={"teal"}
                                    variant={"solid"}
                                >
                                    Upload Image
                                </Button>
                            )}
                            <Input
                                mt={0}
                                type="file"
                                hidden
                                color={"gray.100"}
                                onChange={(e) => handleImageUpload(e)}
                                ref={imagePickerRef}
                            />
                        </FormControl>
                        <Button
                            bg={"blue.400"}
                            color={"white"}
                            isLoading={loading}
                            loadingText={"Saving your info ..."}
                            onClick={clickSubmit}
                            mt={10}
                            leftIcon={<RiLoginCircleFill />}
                            _hover={{
                                bg: "blue.500",
                            }}
                        >
                            Sign up
                        </Button>
                        <Link
                            color={"blue.400"}
                            onClick={() => router.push("/login")}
                        >
                            {" "}
                            Don&apos;t have an account? Register
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
