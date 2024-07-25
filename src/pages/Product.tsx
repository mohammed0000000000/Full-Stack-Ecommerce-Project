import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct, IProductResponse } from "../interfaces";
import ProductSkeleton from "../components/skeleteon/ProductSkeleton";
import { ReactNode, useEffect } from "react";
import { Box } from "@chakra-ui/react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  console.log(data);
  useEffect(() => {
    document.title = `Products Store | Product ${data?.data?.attributes.title} page`;
  }, [data?.data?.attributes.title]);
  //        Render
  const RenderProduct = (): ReactNode => {
    const {
      id,
      attributes: { title, price, description, thumbnail },
    }: IProductResponse = data.data;
    const props: IProduct = {
      id,
      title,
      price,
      description,
      imageURL: thumbnail.data.attributes.formats.thumbnail.url,
      buttonText: "ADD To Cart",
    };
    return <ProductCard key={id} attributes={props} />;
  };
  const RenderProductSkeleton = <ProductSkeleton />;
  return (
    <Box maxW={"md"} mt={"105px"} mx={"auto"}>
      {isLoading ? RenderProductSkeleton : RenderProduct()}
    </Box>
  );
};

export default ProductPage;
