import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <>
      <Box padding="6" boxShadow="lg" bg="transparent" rounded={"lg"}>
        <SkeletonCircle size="10rem" mx={"auto"} />
        <SkeletonText
          my="4"
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
          maxWidth={"30%"}
          mx={"auto"}
        />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
        <SkeletonText
          my="4"
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
          maxWidth={"30%"}
          mx={"auto"}
        />

        <Flex justifyContent={"space-around"}>
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="6"
            w={"45%"}
          />
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="6"
            w={"45%"}
          />
        </Flex>
      </Box>
    </>
  );
};

export default ProductSkeleton;
