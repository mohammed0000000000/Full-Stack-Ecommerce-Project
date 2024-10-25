import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IProductResponse } from "../interfaces";
import ProductSkeleton from "../components/skeleteon/ProductSkeleton";
import { ReactNode, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const getProduct = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_STRAPI_SERVER_URL
      }/api/products/${id}?populate=thumbnail,category`
    );
    return data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ["product", `${id}`],
    queryFn: () => getProduct(),
  });
  const AddToCart = () => {
    const {
      id,
      attributes: { title, price },
    }: IProductResponse = data.data;
    dispatch(addToCart({ id, title, price, quantity: 0 }));
  };
  useEffect(() => {
    document.title = `Products Store | Product ${data?.data?.attributes.title} page`;
  }, []);
  //        Render
  const RenderProduct = (): ReactNode => {
    const {
      id,
      attributes: { title, price, description, thumbnail },
    }: IProductResponse = data.data;

    return (
      <>
        <Flex
          maxW={"fit-content"}
          maxH={"fit-content"}
          justifyContent={"left"}
          alignItems={"center"}
          my={"2"}
          onClick={() => navigate(-1)}
          cursor={"pointer"}
        >
          <ArrowLeftIcon fontSize={"1.5rem"} mr={2} />
          <Text maxH={"fit-content"} fontSize={"1.5rem"} fontWeight={"bold"}>
            Back
          </Text>
        </Flex>
        <Card
          maxW="md"
          key={id}
          bg={"transparent"}
          boxShadow={"xl"}
          border={"1px solid #a8b5c8"}
          mx={"auto"}
        >
          <CardBody>
            <Image
              src={`${import.meta.env.VITE_STRAPI_SERVER_URL}${
                thumbnail.data.attributes.formats.thumbnail.url
              }`}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              width={"350px"}
              height={"350px"}
              mx={"auto"}
              // fallbackSrc={}
            />
            <Stack mt="6" spacing="3">
              <Heading size="lg" as={"h1"} mx={"auto"} color={"blue.600"}>
                {title}
              </Heading>
              <Text
                letterSpacing={"1.5px"}
                lineHeight={"1.8"}
                textAlign={"center"}
                fontSize={"xl"}
              >
                {description}
              </Text>
              <Text
                color="blue.600"
                fontSize="3xl"
                mx={"auto"}
                fontWeight={"bold"}
              >
                ${price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter h={"auto"}>
            <Button
              variant="bold"
              // colorScheme="blue"
              fontSize={"2rem"}
              bgColor={"#1da1f2"}
              width={"100%"}
              py={"2rem"}
              _hover={{ backgroundColor: "#2b6cb0" }}
              onClick={AddToCart}
            >
              Add To Cart
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  };
  const RenderProductSkeleton = (): ReactNode => <ProductSkeleton />;
  return (
    <Box maxW={"md"} mt={"105px"} mx={"auto"}>
      {isLoading ? RenderProductSkeleton() : RenderProduct()}
    </Box>
  );
};

export default ProductPage;
