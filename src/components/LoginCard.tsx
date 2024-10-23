"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  Input,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";

import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/loginSlice";
import { AppDispatch } from "../app/store";

export default function SimpleCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(selectLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const [isIdentifier, setIsIdentifier] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    if (!user.identifier) {
      setIsIdentifier(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsIdentifier(false);
    setIsPassword(false);
    const res = await dispatch(userLogin(user));
    console.log(res.payload);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as={"form"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="identifier">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name={"identifier"}
                value={user.identifier}
                isInvalid={isIdentifier}
                onChange={onChangeHandler}
              />

              {isIdentifier ? (
                <FormHelperText color={"red.500"}>
                  * Email is required.
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  name={"password"}
                  isInvalid={isPassword}
                  onChange={onChangeHandler}
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? (
                <FormHelperText color={"red.500"}>
                  * Password is required.
                </FormHelperText>
              ) : null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox visibility="hidden">Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                type={"submit"}
                bg={isIdentifier || isPassword ? "red.500" : "blue.400"}
                color={"white"}
                _hover={{
                  bg: isIdentifier || isPassword ? "red.600" : "blue.600",
                }}
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
