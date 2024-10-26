import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { IThumbnail } from "../interfaces";
interface IProp {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: IThumbnail;
}
const CartDrawerItem = ({ thumbnail, title, price, quantity }: IProp) => {
  console.log(thumbnail);
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} mb={".5rem"}>
        <Image
          src={`${import.meta.env.VITE_STRAPI_SERVER_URL}${
            thumbnail.data.attributes.formats.thumbnail.url
          }`}
          alt={title}
          w={"60px"}
          h={"60px"}
          rounded={""}
          objectFit={"cover"}
          mr={2}
        ></Image>
        <Stack>
          <Text fontSize={"sm"}>{title}</Text>
          <Text fontSize={"sm"}>Price: ${price}</Text>
          <Text fontSize={"sm"}>Quantity: {quantity} </Text>
        </Stack>
        <Flex flexDirection={"column"} gap={"1rem"}>
          <Button variant="outline" colorScheme="red" size="xs" w="fit-content">
            Remove One
          </Button>
          <Button variant="solid" colorScheme="red" size="xs" w="fit-content">
            Remove All
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};
export default CartDrawerItem;
