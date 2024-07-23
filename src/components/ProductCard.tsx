import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  useColorMode,
} from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import { Link } from "react-router-dom";

const ProductCard = ({ title, description, imageURL, price }: IProduct) => {
  const { colorMode } = useColorMode();
  console.log(colorMode);
  return (
    <>
      <Card border={"1px solid #a8b5c8"}>
        <CardBody>
          <Image
            src={`${imageURL}`}
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
            <Text color={""} fontSize={"20"}>
              {description}
            </Text>
            <Text color="blue.600" fontSize="2xl" fontWeight={"bold"}>
              ${price}
            </Text>
            <Button
              variant="solid"
              colorScheme="blue"
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
