import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { IThumbnail } from "../interfaces";
import { useDispatch } from "react-redux";
import { decreaseQuantity, removeFromCart } from "../app/features/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
interface IProp {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: IThumbnail;
}
const CartDrawerItem = ({ id, thumbnail, title, price, quantity }: IProp) => {
  const dispatch = useDispatch();
  const removeOneHandler = () => {
    dispatch(decreaseQuantity({ id, thumbnail, title, price, quantity }));
  };
  const removeAllHandler = () => {
    dispatch(removeFromCart({ id, thumbnail, title, price, quantity }));
  };
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
          <Button
            variant="outline"
            colorScheme="red"
            size="xs"
            w="fit-content"
            onClick={removeOneHandler}
          >
            <FaTrashAlt className="mr-1" />
            Remove One
          </Button>
          <Button
            variant="solid"
            colorScheme="red"
            size="xs"
            w="fit-content"
            onClick={removeAllHandler}
          >
            <FaTrashAlt className="mr-1" />
            Remove All
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};
export default CartDrawerItem;
