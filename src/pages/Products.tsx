import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct, IProductResponse } from "../interfaces";

interface IResponseDate {
  id: number;
  attributes: IProduct;
}

const ProductsPage = () => {
  const getProductsList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_STRAPI_SERVER_URL
      }/api/products?populate=thumbnail,categories`
    );
    return data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsList(),
  });
  // const temp = data?.data[0];
  // console.log(temp.attributes.thumbnail.data.attributes.url);
  // Render Products
  const RenderProductsList = data?.data?.map((product: IProductResponse) => {
    const {
      id,
      attributes: { title, price, description, thumbnail },
    } = product;
    // console.log(id, title, price, description, thumbnail);
    const props: IProduct = {
      title,
      price,
      description,
      imageURL: thumbnail.data.attributes.formats.thumbnail.url,
    };
    return <ProductCard key={id} attributes={props} />;
  });

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px,1fr))" gap={4}>
      {RenderProductsList}
    </Grid>
  );
};

export default ProductsPage;
