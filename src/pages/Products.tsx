import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct, IProductResponse } from "../interfaces";
import ProductSkeleton from "../components/skeleteon/ProductSkeleton";

const ProductsPage = () => {
  const getProductsList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_STRAPI_SERVER_URL
      }/api/products?populate=thumbnail,categories`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsList(),
  });

  //              Render
  const RenderProductsList = data?.data?.map((product: IProductResponse) => {
    const {
      id,
      attributes: { title, price, description, thumbnail },
    } = product;
    const props: IProduct = {
      id,
      title,
      price,
      description,
      imageURL: thumbnail.data.attributes.formats.thumbnail.url,
      buttonText: "View Details",
    };
    return <ProductCard key={id} attributes={props} />;
  });
  const RenderProductSkeleton = (
    <>
      {Array.from({ length: 20 }, (_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </>
  );
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(300px,1fr))"
      gap={4}
      margin={30}
    >
      {isLoading ? RenderProductSkeleton : RenderProductsList}
    </Grid>
  );
};

export default ProductsPage;
