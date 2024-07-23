import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../config/axiosConfig";
import { useQuery } from "@tanstack/react-query";

const ProductsPage = () => {
  const getProductsList = async () => {
      const {} = axiosInstance.get(
        `${import.meta.env.STRAPI_SERVER_URL}/api/products?populate=thumbnail,categories`
      );
  };
  const { data, isLoading, error } = useQuery({ queryKey:["products"], queryFn:});

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px,1fr))" gap={4}>
      <ProductCard
        title="product 1"
        price={450}
        description="Lorem"
        imageURL="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      />
    </Grid>
  );
};

export default ProductsPage;
