"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import cookieservices from "../services/cookieservices";
import { useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";

interface Props {
  children: string;
}

const Links = ["Dashboard", "Products", "Team"];

const NavLink = ({ children }: Props) => {
  return (
    <Box
      as={Link}
      to={children.toLowerCase()}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const count = useSelector(selectCart);

  const token: boolean = cookieservices.get("jwt") ? true : false;

  const LogoutClick = () => {
    cookieservices.remove("jwt");
    window.location.reload();
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link} to={"/"}>
              Logo
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, idx: number) => (
                <NavLink key={idx}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"} gap={"2rem"}>
            <Box>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Box>

            {!token ? (
              <>
                <Stack
                  flex={{ base: 1, md: 0 }}
                  justify={"flex-start"}
                  direction={"row"}
                  spacing={6}
                >
                  <Button
                    as={Link}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    to={"/login"}
                  >
                    Sign In
                  </Button>
                  <Button
                    as={Link}
                    to={"/register"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Box>Cart({count})</Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={LogoutClick}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
