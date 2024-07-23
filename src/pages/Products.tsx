import { Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

interface IProps {}

const ProductsPage = ({}: IProps) => {
  return (
    <Box style={{ margin: 40 }}>
      <ProductCard />
    </Box>
  );
};

export default ProductsPage;
