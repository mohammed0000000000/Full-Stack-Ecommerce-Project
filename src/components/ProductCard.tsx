import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
} from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import { Link } from "react-router-dom";

interface IProps {
  attributes: IProduct;
}
const ProductCard = ({ attributes }: IProps) => {
  const { title, imageURL, price, description } = attributes;
  return (
    <>
      <Card border={"1px solid #a8b5c8"} backgroundColor={"transparent"}>
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_STRAPI_SERVER_URL}${imageURL}`}
            alt="Green double couch with wooden legs"
            borderRadius="50%"
            width={200}
            height={200}
            mx={"auto"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"}>
              {title}
            </Heading>
            <Text
              color={""}
              fontSize={"20"}
              maxHeight={"6rem"}
              overflowY={"clip"}
              textAlign={"center"}
            >
              {description}
            </Text>
            <Text
              color="blue.600"
              fontSize="2xl"
              fontWeight={"bold"}
              textAlign={"center"}
            >
              ${price}
            </Text>
            <Button
              variant="solid"
              backgroundColor={"#1da1f2"}
              mx={"auto"}
              width={"full"}
              as={Link}
              height={"3.5rem"}
              color={"white"}
              fontWeight={"bold"}
              letterSpacing={"2px"}
            >
              View Details
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductCard;
