import { Skeleton, Stack } from "@chakra-ui/react";

const DashboardProductSkeleton = () => {
  return (
    <>
      <Stack gap={"1.5rem"}>
        {Array.from({ length: 10 }, (_, index) => (
          <Skeleton height="30px" key={index} />
        ))}
      </Stack>
    </>
  );
};

export default DashboardProductSkeleton;
